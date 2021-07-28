import React from 'react'
import Review from './Review';

export default function ReviewList({reviews, user}) {
    const printReviews = (reviews) => {
        if(reviews === undefined) return "";
        return reviews.map(review => {
            return <div key={`review-card-${review.title}`}><Review review={ review } user={user}/></div>
        });
    }
    return (
        <div>
            {
                reviews &&
                <ul>
                    {
                        printReviews(reviews)
                    }
                </ul>
            }
        </div>
    )
}
