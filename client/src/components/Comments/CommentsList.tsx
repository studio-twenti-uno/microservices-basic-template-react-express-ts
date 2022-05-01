import { useMemo } from 'react';
import {
   CommentContainer,
   CommentsListContainer,
   CommentText,
} from '../styled';

type Comment = {
   content: string;
   id: string;
   postId: string;
   status: 'approved' | 'pending' | 'rejected';
};
type Comments = Array<Comment>;
type CommentsListProps = { comments: Comments };

const resolveCommentContent = (
   comment: Comment,
): string => {
   if (comment.status === 'rejected') {
      return 'rejected Comment';
   } else if (comment.status === 'approved') {
      return comment.content;
   } else {
      return 'awaiting approval';
   }
};

export const CommentsList = ({
   comments,
}: CommentsListProps): JSX.Element => {
   // Render memo
   const renderedComments = useMemo(
      () =>
         comments.map((comment) => (
            <CommentContainer key={comment.id}>
               <CommentText>
                  {resolveCommentContent(comment)}
               </CommentText>
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
