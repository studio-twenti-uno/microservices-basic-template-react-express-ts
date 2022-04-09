import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import {
   FormContainer,
   Form,
   FormGroup,
   Label,
   Input,
   PrimaryButton,
} from '../styled';

export const PostsCreationForm = () => {
   // State
   const [title, setTitle] = useState('');

   // handlers
   const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
   ) => {
      setTitle(e.target.value);
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         const response = await axios({
            method: 'post',
            url: 'http://localhost:4000/posts',
            data: {
               title,
            },
         });

         console.log(response);
         if (response.status === 201) {
            setTitle('');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <FormContainer>
         <Form name="createPost" onSubmit={handleSubmit}>
            <FormGroup>
               <Label htmlFor="title">Title</Label>
               <Input
                  id="title"
                  type="text"
                  placeholder="A wonderful post"
                  onChange={handleChange}
               />
            </FormGroup>

            <PrimaryButton type="submit">
               Submit
            </PrimaryButton>
         </Form>
      </FormContainer>
   );
};
