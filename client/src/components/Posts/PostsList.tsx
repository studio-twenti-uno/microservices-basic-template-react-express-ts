import {
   useState,
   useEffect,
   useCallback,
   useMemo,
} from 'react';
import axios from 'axios';
import {
   H2,
   PostContainer,
   PostsListContainer,
} from '../styled';

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
   const memoizedFetchPosts = useCallback(fetchPosts, []);

   // Effect
   useEffect(() => {
      memoizedFetchPosts();
   }, []);

   // Render memo
   const renderedPosts = useMemo(
      () => Object.values(posts),
      [],
   );

   return (
      <PostsListContainer>
         {renderedPosts.map((post) => (
            <PostContainer key={post.id}>
               <H2>{post.title}</H2>
            </PostContainer>
         ))}
      </PostsListContainer>
   );
};
