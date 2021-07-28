import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ModalIt from './ModalIt';
import DeleteReview  from './Delete';

/*
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
*/

export default function Review({ review, user }) {
    const [show, setShow] = useState(false);
    // const [deleteReview, { data }] = useMutation(DELETE_REVIEW);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            {
                review &&
                    <div className="review-card">
                        <div className="rating">{ review.rating }</div>
                        <h2>{ review.title }</h2>
                        <small>{ review.created_at.split('T')[0] }</small>
                        <p className="review-description">{ review.body }</p>
                        {
                            Object.keys(user).length !== 0 &&
                            <>
                            <Button onClick={ handleShow }>Edit Review</Button>{' '}
                            <DeleteReview id={ review.id } />
                            <ModalIt show={ show } handleClose={ handleClose } options={ ["Edit Review", "updateReview", review ]}/>
                        </>
                    }
                    </div>
            }
        </div>
    )
}
