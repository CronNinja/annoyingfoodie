import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import CreateReview from './CreateReview';
import { useCookies } from 'react-cookie';
import { useMutation, gql } from '@apollo/client';


const initialReviewState = { title: '', rating: 0.00, body: '', restaurant: 0};
const stateFormInitial = { "Review": initialReviewState};

const CREATE_REVIEW = gql`
 mutation addReview($title: String!, $rating: Float!, $body: String!, $restaurant: ID){
  createReview(input: { data: { title: $title, rating: $rating, body: $body, restaurant: $restaurant } }){
    review {
      title
      rating
      body
      restaurant {
        name
      }
    }
  }
}
`;
const Create = ({ type, obj = [] }) => {
    const [formState, setFormState] = useState({ ...stateFormInitial[type], [obj[0]]: obj[1] });
    const [cookies] = useCookies(['jwt']);
    const [createReview, { data }] = useMutation(CREATE_REVIEW);
    const createDForm = {
        "Review": <CreateReview formState={ formState } setFormState={ setFormState }/>
    }
    const create = async () => {
      console.log(formState);
      try{
        const d = await createReview({ variables: { ...formState } });
        console.log(d);
      } catch (err){
        console.log(err);
      }
    }
    return (
        <div className="form">
          <h2>Create { type }</h2>
            { createDForm[type] }
            <Button onClick={ create }>Create { type }</Button>
        
        </div>
      );
}
 
export default Create;