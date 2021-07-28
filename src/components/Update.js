import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import CreateReview from './CreateReview';
import { useMutation, gql } from '@apollo/client';


const initialReviewState = { title: '', rating: 0.00, body: ''};
const stateFormInitial = { "Review": initialReviewState};

const UPDATE_REVIEW = gql`
 mutation UpdateReview($id: ID!, $title: String!, $rating: Float!, $body: String!){
  updateReview(input: { 
      where: { id: $id }
      data: { title: $title, rating: $rating, body: $body }
    }){
    review {
        id
        title
    }
  }
}
`;
const Update = ({ type, obj = [] }) => {
    const [formState, setFormState] = useState({ id: obj[1].id, title: obj[1].title, rating: obj[1].rating, body: obj[1].body });
    const [updateReview, { data }] = useMutation(UPDATE_REVIEW);
    const createDForm = {
        "Review": <CreateReview formState={ formState } setFormState={ setFormState }/>
    }
    const update = async () => {
      console.log(formState);
      try{
        const d = await updateReview({ variables: { ...formState } });
        console.log(d);
      } catch (err){
        console.log(err);
      }
    }
    return (
        <div className="form">
          <h2>Update { type }</h2>
            { createDForm[type] }
            <Button onClick={ update }>Update { type }</Button>
        
        </div>
      );
}
 
export default Update;