import {
   useState,
   useEffect,
   useCallback,
   useMemo,
} from 'react';
import axios from 'axios';
import {
   H2,
   H3,
   PostContainer,
   PostsListContainer,
} from '../styled';
import { CommentsCreationForm } from '../Comments/CommentsCreationForm';
import { CommentsList } from '../Comments/CommentsList';

type Post = {
   id: string;
   title: string;
};

type Posts = Record<string, Post>;

export const PostsList = (): JSX.Element => {
   // State
   const [posts, setPosts] = useState<Posts>({});

   // Fetching functions
   const fetchPosts = async () => {
      try {
         const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/posts',
         });

         setPosts(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   // Fetch memoization
   const memoizedFetchPosts = useCallback(fetchPosts, [
      posts,
   ]);

   // Effect
   useEffect(() => {
      memoizedFetchPosts();
   }, []);

   // Render memo
   const renderedPosts = useMemo(
      () =>
         Object.values(posts).map((post) => (
            <PostContainer key={post.id}>
               <H2>{post.title}</H2>
               <H3>Comments</H3>
               <CommentsList postId={post.id} />
               <CommentsCreationForm postId={post.id} />
            </PostContainer>
         )),
      [posts],
   );

   return (
      <PostsListContainer>
         {renderedPosts}
      </PostsListContainer>
   );
};
