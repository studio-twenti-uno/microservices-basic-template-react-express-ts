import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const server = express();

server.use(express.json());
server.use(cors());

const posts: Record<string, { title: string; id: string }> = {};

// Get posts
server.get('/posts', (_req, res) => {
   res.send(posts);
});

// Post post
server.post('/posts', async (req, res) => {
   const id = randomBytes(4).toString('hex');

   const { title } = req.body;

   posts[id] = {
      id,
      title,
   };

   // Emit event
   try {
      const response = await axios({
         method: 'post',
         url: 'http://localhost:4005/events',
         data: {
            type: 'PostCreated',
            payload: {
               id,
               title,
            },
         },
      });
   } catch (error) {
      console.log('Error posting event to event bus\n', error);
   }

   res.status(201).send(posts[id]);
});

// Event receiver
server.post('/events', (req, res) => {
   console.log('received event: ', req.body.type);

   res.send({});
});

server.listen(4000, () => console.log('listening on port:', 4000));
