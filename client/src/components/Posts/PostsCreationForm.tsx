import {
   FormContainer,
   Form,
   FormGroup,
   Label,
   Input,
   PrimaryButton,
} from '../styled';

export const PostsCreationForm = () => {
   return (
      <FormContainer>
         <Form name="createPost">
            <FormGroup>
               <Label htmlFor="title">Title</Label>
               <Input
                  id="title"
                  type="text"
                  placeholder="A wonderful post"
               />
            </FormGroup>

            <PrimaryButton type="submit">
               Submit
            </PrimaryButton>
         </Form>
      </FormContainer>
   );
};
