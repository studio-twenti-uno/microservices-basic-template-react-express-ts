import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

// Comment type
type Comments = Array<{ content: string; id: string }>;

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

   const newComment = { id: newCommentId, content };

   comments.unshift(newComment);

   commentsByPostId[postId] = comments;

   // Emit event to event bus
   try {
      const response = await axios({
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

   res.status(201).send(comments);
});

// Event receiver
server.post('/events', (req, res) => {
   console.log('received event: ', req.body.type);

   res.send({});
});

server.listen(4001, () => console.log('listening on port:', 4001));
