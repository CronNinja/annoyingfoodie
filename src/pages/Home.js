import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const RESTAURANTS = gql`
    query GetRestaurants {
        restaurants {
            id,
            name,
            description,
            cuisines {
                name,
                id
            },
            reviews {
                title,
                rating,
                body,
                restaurant {
                    name
                }
            }
        }
    }
`;
export default function Home() {
    const { loading, error, data } = useQuery(RESTAURANTS);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>

    const ratingAverage = (reviews) => {
        let average = 0.00;
        reviews.map(review => average += review.rating);
        if(reviews.length) return (average / reviews.length);
        return "-"
       
    }
    return (
        <div>
            { data &&
                    data.restaurants.map(restaurant => (
                        <div key={ restaurant.id } className="review-card">
                            <div className="rating">{ ratingAverage(restaurant.reviews)}</div>
                            <h2>{restaurant.name}</h2>
                            {
                                restaurant.cuisines.map(c => {
                                    return <small key={ c.id }>{ c.name }</small>
                                })
                            }
                            <p className="review-description">{restaurant.description}</p>

                            <Link to={`/restaurant/${restaurant.id}`}>Read More</Link>
                        </div>
                    ))
            }
        </div>
    )
}
