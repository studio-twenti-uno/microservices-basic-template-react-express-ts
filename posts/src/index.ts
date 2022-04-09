import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

const server = express();

server.use(express.json());
server.use(cors());

const posts: Record<string, { title: string; id: string }> = {};

// Get posts
server.get('/posts', (_req, res) => {
   res.send(posts);
});

// Post post
server.post('/posts', (req, res) => {
   const id = randomBytes(4).toString('hex');

   const { title } = req.body;

   posts[id] = {
      id,
      title,
   };

   res.status(201).send(posts[id]);
});

server.listen(4000, () => console.log('listening on port:', 4000));
