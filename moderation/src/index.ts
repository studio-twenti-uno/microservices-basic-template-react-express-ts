import express from 'express';
import axios from 'axios';

const server = express();

server.use(express.json());

// Events post route
server.post('/moderation', async (req, res) => {
   // Sending response to req origin
   res.send({ status: 'OK' });
});

server.listen(4003, () => console.log('listening on port 4003'));
