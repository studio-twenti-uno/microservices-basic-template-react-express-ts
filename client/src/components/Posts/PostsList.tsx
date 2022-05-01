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

type Comment = {
   id: string;
   content: string;
   postId: string;
   status: 'approved' | 'pending' | 'rejected';
};

type Comments = Array<Comment>;

type Post = {
   id: string;
   title: string;
   comments: Comments;
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
            url: 'http://localhost:4002/posts',
         });

         console.log(response.data);

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
               <CommentsList comments={post.comments} />
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
