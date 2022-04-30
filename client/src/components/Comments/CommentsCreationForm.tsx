import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
   Form,
   FormContainer,
   FormGroup,
   Input,
   Label,
   PrimaryButton,
} from '../styled';

type CommentsCreationFormProps = {
   postId: string;
};

export const CommentsCreationForm = ({
   postId,
}: CommentsCreationFormProps): JSX.Element => {
   // State
   const [comment, setComment] = useState('');

   // handlers
   const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
   ) => {
      setComment(e.target.value);
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         const response = await axios({
            method: 'post',
            url: `http://localhost:4001/posts/${postId}/comments`,
            data: {
               content: comment,
            },
         });
         if (response.status === 201) {
            setComment('');
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            alert(error.message);
         } else {
            alert(`Something went wrong\n${error}`);
         }
      }
   };

   return (
      <FormContainer>
         <Form name="createComment" onSubmit={handleSubmit}>
            <FormGroup>
               <Label>New Comment</Label>
               <Input
                  placeholder="Be nice..."
                  value={comment}
                  onChange={handleChange}
               />
            </FormGroup>

            <PrimaryButton type="submit">
               submit
            </PrimaryButton>
         </Form>
      </FormContainer>
   );
};
