import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

// Event types
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
   };
};

type Event = PostCreationEvent | CommentCreationEvent;

// Comment type
type Comments = Array<{ content: string; id: string }>;

// Posts constant (DB mock)
const posts: Record<string, { title: string; id: string; comments: Comments }> = {};

// Get posts + comments
server.get('/posts', (_req, res) => {
   res.send(posts);
});

// Event receiver
server.post('/events', (req, res) => {
   console.log('received event: ', req.body.type);

   const { type, payload }: Event = req.body;

   switch (type) {
      case 'PostCreated': {
         const { id, title } = payload;

         posts[id] = { id, title, comments: [] };

         break;
      }

      case 'CommentCreated': {
         const { id, postId, content } = payload;

         const targetPost = posts[postId];

         targetPost.comments.push({ id, content });

         break;
      }

      default: {
         console.log('received unregistered event', req.body);

         break;
      }
   }

   console.log(posts);
   res.send({});
});

server.listen(4002, () => console.log('listening on port:', 4002));
