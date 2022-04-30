import { useMemo } from 'react';
import {
   CommentContainer,
   CommentsListContainer,
   CommentText,
} from '../styled';

type Comments = Array<{
   content: string;
   id: string;
}>;
type CommentsListProps = { comments: Comments };

export const CommentsList = ({
   comments,
}: CommentsListProps): JSX.Element => {
   // Render memo
   const renderedComments = useMemo(
      () =>
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
