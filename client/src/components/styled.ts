import styled from '@emotion/styled';

export const H1 = styled.h1`
   font-size: 4.5rem;
   padding-bottom: 2.1rem;

   color: #212121;
`;

export const FormContainer = styled.div``;

export const Form = styled.form`
   max-width: 450px;
   width: 100%;
`;

export const FormGroup = styled.div`
   display: flex;
   flex-direction: column;

   padding-bottom: 1.5rem;
`;

export const Label = styled.label`
   font-size: 1.5rem;
   font-weight: 500;
   padding-bottom: 0.9rem;
`;

export const Input = styled.input`
   width: 100%;

   outline: none;

   border: none;
   border-bottom: 1px solid #6c6c6c;
   border-radius: 0rem;

   padding: 1.2rem 0.45rem;

   font-size: 1.8rem;

   background-color: transparent;

   :hover {
      border-bottom: 1px solid #212121;
   }

   :focus {
      border: none;
      border-bottom: 1px solid #212121;
   }
`;

export const PrimaryButton = styled.button`
   background-color: #fafafa;

   border: 1px solid #212121;

   padding: 0.9rem 0.9rem;

   min-width: 15rem;

   font-size: 1.8rem;
   color: #212121;

   :hover {
      background-color: #6e6e6e;
      color: #fafafa;
   }

   :active {
      background-color: #212121;
   }
`;

export const HR = styled.hr`
   width: 100%;
   height: 0.15rem;
   background-color: #212121;
   border: none;

   margin: 3rem 0;
`;

export const PostsListContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 3rem;
`;

export const PostContainer = styled.div`
   border: 1px solid #6e6e6e;
   padding: 1.2rem 1.5rem;
`;

export const H2 = styled.h2`
   font-size: 2.7rem;
   padding-bottom: 1.5rem;

   color: #6e6e6e;
`;
