import axios from 'axios';
import {
   useState,
   useEffect,
   useMemo,
   useCallback,
} from 'react';
import {
   CommentContainer,
   CommentsListContainer,
   CommentText,
} from '../styled';

type Comments = Array<{ content: string; id: string }>;
type CommentsListProps = { postId: string };

export const CommentsList = ({
   postId,
}: CommentsListProps): JSX.Element => {
   // State
   const [comments, setComments] = useState<
      Comments | undefined
   >(undefined);

   // Fetching function
   const fetchComments = async () => {
      try {
         const response = await axios({
            url: `http://localhost:4001/posts/${postId}/comments/`,
         });
         setComments(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   // memoized fetch
   const memoizedFetchComments = useCallback(
      fetchComments,
      [],
   );

   // Effect
   useEffect(() => {
      memoizedFetchComments();
   }, []);

   // Render memo
   const renderedComments = useMemo(
      () =>
         comments &&
         comments.map((comment) => (
            <CommentContainer key={comment.id}>
               <CommentText>{comment.content}</CommentText>
            </CommentContainer>
         )),
      [comments],
   );

   return (
      <CommentsListContainer>
         {renderedComments}
      </CommentsListContainer>
   );
};
