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

   console.log('received event: ', req.body.type);

   switch (event.type) {
      case 'CommentCreated': {
         const status = event.payload.content.toLowerCase().includes('orange')
            ? 'rejected'
            : 'approved';

         try {
            await axios({
               method: 'post',
               url: 'http://localhost:4005/events',
               data: {
                  type: 'CommentModerated',
                  payload: {
                     ...event.payload,
                     status,
                  },
               },
            });
         } catch (error) {
            console.log(
               'error while sending CommentModerated event to event bus\n',
               error,
            );
         }

         break;
      }

      default: {
         console.log('ignored event', req.body);

         break;
      }
   }

   // Sending response to req origin
   res.send({ status: 'OK' });
});

server.listen(4003, () => console.log('listening on port 4003'));
