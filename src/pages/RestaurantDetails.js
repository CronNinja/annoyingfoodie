import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReviewList from '../components/ReviewList';
import ModalIt from '../components/ModalIt';
import Button from 'react-bootstrap/Button';

const RESTAURANT = gql`
    query GetRestaurant($id: ID!) {
        restaurant(id: $id) {
            id,
            name,
            description,
            cuisines {
                name,
                id
            },
            reviews {
                id,
                title,
                rating,
                body,
                created_at,
                restaurant {
                    name
                }
            }
        }
    }
`;
export default function RestaurantDetails({ user }) {
    const { id } = useParams();
    const { loading, error, data } = useQuery(RESTAURANT, {
        variables: {
            id: id
        }
    });
    const [ restaurant, setRestaurant ] = useState({});
    useEffect(() => {
        if(data){
            setRestaurant(data.restaurant);
        }
    }, [data]);
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    const ratingAverage = (reviews) => {
        if(typeof reviews === "undefined"){
            return "-";
        }
        else if(reviews[0]) {
            let average = 0.00;
            reviews.map(review => average += review.rating);
            return Number(average / reviews.length).toFixed(2);
        }
        return "-";
    }

    return (
        <div>
            { restaurant &&
            <>
                <div key={ restaurant.id } className="review-card">
                    <div className="rating">{ ratingAverage(restaurant.reviews) }</div>
                     <h2>{restaurant.name}</h2>
                     {
                        data.restaurant.cuisines.map(c => {
                            return <small key={ c.id }>{ c.name }</small>
                        })
                    }
                    <p className="review-description">{restaurant.description}</p>
                    {
                        Object.keys(user).length !== 0 &&
                            <>
                                <Button onClick={ handleShow }>Create New Review</Button>
                                <ModalIt show={ show } handleClose={ handleClose } options={ ["Create New Review", "createReview", restaurant.id ]}/>
                            </>
                    }
                </div>
                <ReviewList reviews={ restaurant.reviews } user={ user } />
            </>
            }
        </div>
    )
}
