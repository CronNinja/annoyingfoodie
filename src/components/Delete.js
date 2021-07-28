import { useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';

const DELETE_REVIEW = gql`
 mutation DeleteReview($id: ID!){
  deleteReview(input: { 
      where: { id: $id }
    }){
    review {
        id
        title
    }
  }
}
`;

const DeleteReview = (id) => {
    const [deleteReview, { data }] = useMutation(DELETE_REVIEW);
    const deleteRev = async () => {
        deleteReview({ variables: { id: id.id } })
      }
    return <Button onClick={ deleteRev } variant="danger">Delete Review</Button>
}

export default DeleteReview 