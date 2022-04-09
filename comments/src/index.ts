import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';

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
server.post('/posts/:id/comments', (req, res) => {
   const { content } = req.body;

   const postId = req.params.id;

   const comments = commentsByPostId[postId] || [];

   const newCommentId = randomBytes(4).toString('hex');

   const newComment = { id: newCommentId, content };

   comments.unshift(newComment);

   commentsByPostId[postId] = comments;

   res.status(201).send(comments);
});

server.listen(4001, () => console.log('listening on port:', 4001));
