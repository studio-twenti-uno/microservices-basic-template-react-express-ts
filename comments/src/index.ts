import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

// Types
type CommentModerationEvent = {
   type: 'CommentModerated';
   payload: {
      postId: string;
      id: string;
      content: string;
      status: 'pending' | 'approved' | 'rejected';
   };
};

type Comment = {
   postId: string;
   content: string;
   id: string;
   status: 'pending' | 'rejected' | 'approved';
};

type Comments = Array<Comment>;

// data constants (DB mock)
const commentsByPostId: Record<string, Comments> = {};

// Get comments
server.get('/posts/:id/comments', (req, res) => {
   res.send(commentsByPostId[req.params.id]);
});

// Post a comment
server.post('/posts/:id/comments', async (req, res) => {
   const { content }: { content: string } = req.body;
   const postId = req.params.id;

   const comments = commentsByPostId[postId] || [];

   const newCommentId = randomBytes(4).toString('hex');
   const newComment: Comment = { id: newCommentId, content, status: 'pending', postId };

   comments.unshift(newComment);
   commentsByPostId[postId] = comments;

   // Emit event to event bus
   try {
      await axios({
         method: 'post',
         url: 'http://localhost:4005/events',
         data: {
            type: 'CommentCreated',
            payload: {
               ...newComment,
               postId,
            },
         },
      });
   } catch (error) {
      console.log('Error while posting event to event bus\n', error);
   }

   res.status(201).send(newComment);
});

// Event receiver
server.post('/events', async (req, res) => {
   console.log('received event: ', req.body.type);

   const event: CommentModerationEvent = req.body;

   switch (event.type) {
      case 'CommentModerated': {
         const comments = commentsByPostId[event.payload.postId];

         const comment = comments.find((comment) => comment.id === event.payload.id);

         if (comment === undefined) {
            console.log('Comment not found');

            break;
         }

         comment.status = event.payload.status;

         try {
            await axios({
               method: 'post',
               url: 'http://localhost:4005/events',
               data: {
                  type: 'CommentUpdated',
                  payload: {
                     ...comment,
                  },
               },
            });
         } catch (error) {
            console.log('Error emitting event to event bus', error);
         }

         break;
      }

      default: {
         console.log('ignored event', req.body);

         break;
      }
   }

   res.send({});
});

server.listen(4001, () => console.log('listening on port:', 4001));
