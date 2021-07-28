import { useEffect, useState } from 'react';
const RatingAverage = (reviews) => {
    const [average, setAverage] = useState(0);
    useEffect(() => {
        const ra = () => {
            let a = 0;
            reviews.map(review => a += review.rating);
            if(reviews.length) setAverage(a / reviews.length);
            setAverage("-");
        }
        ra();

    }, [reviews]);
    return { average }
}

export default RatingAverage