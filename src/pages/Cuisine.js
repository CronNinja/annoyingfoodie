import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CUISINE = gql`
    query GetCuisine($id: ID!){
        cuisine(id: $id){
            name,
            id,
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
    }
`;
export default function Cuisine() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(CUISINE, {
        variables: {
            id: id
        }
    });
    const ratingAverage = (reviews) => {
        let average = 0.00;
        reviews.map(review => average += review.rating);
        if(reviews.length) return Number(average / reviews.length).toFixed(2);
        return "-"
       
    }
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error :(</p>
    return (
        <div>
            <div>
                { data &&
                    <h2>{ data.cuisine.name }</h2>
                }
                {   data &&
                        data.cuisine.restaurants.map(restaurant => (
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
        </div>
    )
}
