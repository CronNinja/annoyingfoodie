import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const CUISINES = gql`
  query GetCuisines {
    cuisines {
      name,
      id
    }
  }
`;
export default function SiteHeader({ user, setUser, removeCookie }) {
  const { loading, error, data } = useQuery(CUISINES);
  const history = useHistory();

  const logout = () =>{
    setUser({});
    removeCookie('jwt', { maxAge: 1 });
    history.push('/');
  }
  return (
    <div>
      <nav className="site-header">
        <Link to="/"><h1>Annoying Foodie</h1></Link>
        <ul>
        {
          user.username &&
          <>
            <li>
              Welcome, { user.username }
            </li>
            <li>
              <button onClick={ logout } className="btn">Log out</button>
            </li>
          </>
        }
        {
          !user.username &&
            <Link to="/login">Login</Link>
        }
        </ul>
        
      </nav>
     
      <div>
           <div>
            { loading &&
                <p>Loading...</p>
            }
            { error &&
                <p>Error :(</p>
            }
            { data &&
                  <nav className="cuisines">
                   { data.cuisines.map(cuisine => (
                        <Link key={ cuisine.id } to={`/cuisine/${ cuisine.id }`}>{ cuisine.name }</Link>
                    ))
                  }
                  </nav>
            }
            </div>
        </div>
    </div>
  )
}