import { PostsCreationForm } from './components';
import { H1 } from './components/styled';
import './global.css';

export default () => {
   return (
      <>
         <H1>Create a post</H1>
         <PostsCreationForm />
      </>
   );
};
