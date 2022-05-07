import express from 'express';
import axios from 'axios';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

// Types
type Comment = {
   postId: string;
   content: string;
   id: string;
   status: 'pending' | 'rejected' | 'approved';
};

type Comments = Array<Comment>;

type Post = {
   id: string;
   title: string;
   comments: Comments;
};

type PostCreationEvent = {
   type: 'PostCreated';
   payload: {
      id: string;
      title: string;
   };
};

type CommentCreationEvent = {
   type: 'CommentCreated';
   payload: {
      postId: string;
      id: string;
      content: string;
      status: 'pending' | 'approved' | 'rejected';
   };
};

type CommentUpdateEvent = {
   type: 'CommentUpdated';
   payload: {
      postId: string;
      id: string;
      content: string;
      status: 'pending' | 'approved' | 'rejected';
   };
};

type Event = CommentUpdateEvent | PostCreationEvent | CommentCreationEvent;

// Posts constant (DB mock)
const posts: Record<string, { title: string; id: string; comments: Comments }> = {};

// handle events function
const handleEvent = (event: Event) => {
   const { type, payload } = event;

   switch (type) {
      case 'PostCreated': {
         const { id, title } = payload;

         posts[id] = { id, title, comments: [] };

         break;
      }

      case 'CommentCreated': {
         const comment: Comment = payload;

         const targetPost = posts[comment.postId];

         targetPost.comments.push({ ...comment });

         break;
      }

      case 'CommentUpdated': {
         const { postId, content, id, status }: Comment = payload;

         const targetPost: Post = posts[postId];
         const targetComment: Comment | undefined = targetPost.comments.find(
            (comment) => comment.id === id,
         );

         if (targetComment === undefined) {
            console.log('Comment not located in queryService database');

            break;
         }

         targetComment.content = content;
         targetComment.status = status;

         break;
      }

      default: {
         break;
      }
   }
};

// Get posts + comments
server.get('/posts', (_req, res) => {
   res.send(posts);
});

// Event receiver
server.post('/events', (req, res) => {
   console.log('received event: ', req.body.type);

   const event: Event = req.body;

   handleEvent(event);

   res.send({});
});

server.listen(4002, async () => {
   console.log('Query service running on port: ', 4002);

   // Catch up on any missed events
   try {
      const response = await axios({
         method: 'get',
         url: 'http://localhost:4005/events',
      });

      const events: Array<Event> = response.data;

      for (const event of events) {
         console.log('catching up on event: ', event.type);
         handleEvent(event);
      }
   } catch (error) {
      console.log('error while catching up on events');
   }
});
