import { PostsCreationForm, PostsList } from './components';
import { H1, HR } from './components/styled';
import './global.css';

export default () => {
   return (
      <>
         <H1>Create a post</H1>
         <PostsCreationForm />
         <HR />
         <H1>Posts:</H1>
         <PostsList />
      </>
   );
};
