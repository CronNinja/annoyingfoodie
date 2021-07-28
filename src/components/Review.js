import React from 'react'

export default function Review({ review }) {
    return (
        <div>
            {
                review &&
                    <div className="review-card">
                        <div className="rating">{ review.rating }</div>
                        <h2>{review.title}</h2>
                        <small>{ review.created_at.split('T')[0] }</small>
                        <p className="review-description">{ review.body }</p>
                    </div>
            }
        </div>
    )
}
