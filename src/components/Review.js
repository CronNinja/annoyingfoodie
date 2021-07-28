import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ModalIt from './ModalIt';

export default function Review({ review, user }) {
    const [show, setShow] = useState(false);
    
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
                            <Button onClick={ handleShow }>Edit Review</Button>
                            <ModalIt show={ show } handleClose={ handleClose } options={ ["Edit Review", "updateReview", review ]}/>
                        </>
                    }
                    </div>
            }
        </div>
    )
}
