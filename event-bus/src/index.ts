import express from 'express';
import axios from 'axios';

const server = express();

server.use(express.json());

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

// Events post route
server.post('/events', async (req, res) => {
   const event: Event = req.body;

   // Sending event to Posts Service
   try {
      await axios({
         method: 'post',
         url: 'http://localhost:4000/events',
         data: event,
      });
   } catch (error) {
      console.log('Error emitting event to postsService\n', error);
   }

   // Sending event to Comments Service
   try {
      await axios({
         method: 'post',
         url: 'http://localhost:4001/events',
         data: event,
      });
   } catch (error) {
      console.log('Error emitting event to commentsService\n', error);
   }

   // Sending event to Query Service
   try {
      await axios({
         method: 'post',
         url: 'http://localhost:4002/events',
         data: event,
      });
   } catch (error) {
      console.log('Error emitting event to queriesService\n', error);
   }

   // Sending response to req origin
   res.send({ status: 'OK' });
});

server.listen(4005, () => console.log('listening on port 4005'));
