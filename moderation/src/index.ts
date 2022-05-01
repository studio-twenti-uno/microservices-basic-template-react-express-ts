import express from 'express';
import axios from 'axios';

const server = express();

server.use(express.json());

// Event types
type CommentCreationEvent = {
   type: 'CommentCreated';
   payload: {
      postId: string;
      id: string;
      content: string;
      status: 'pending' | 'approved' | 'rejected';
   };
};

type Event = CommentCreationEvent;

// Events post route
server.post('/events', async (req, res) => {
   const event: Event = req.body;

   switch (event.type) {
      case 'CommentCreated': {
         break;
      }

      default: {
         console.log('received unregistered event', req.body);

         break;
      }
   }

   // Sending response to req origin
   res.send({ status: 'OK' });
});

server.listen(4003, () => console.log('listening on port 4003'));
