import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = { identifier: "", password: ""  };

export default function Login({ setUser, setCookie }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formState, setFormState] = useState(initialState);
    const history = useHistory();

    const login = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.post('http://localhost:1337/auth/local', {
        identifier: formState.identifier,
        password: formState.password
        });
        setUser({ username: res.data.user.username});
        setLoading(false);
        setCookie('jwt', res.data.jwt, { maxAge: 1000 * 60 * 3, path: '/'});
        history.push("/");
      } catch (err) {
        setLoading(false);
        setError(err.response.data.data[0].messages[0].message);
      }
    }

    return (
      <div>
        <div className="form">
          <h1>Login</h1>
        {
          
        }
        
          {
            error &&
              <p className="error-text" id="usernameErrorText">{ error }</p>
          }
          {
          loading &&
            <p>Loading ...</p>
          }
          {
            !loading &&
            <>
              <label>Username</label>
              <input
                type='text'
                onChange={event => setFormState({ ...formState, identifier: event.target.value })}
                value={ formState.identifier }
              />
              <label>Password</label>
              <input
                type='password'
                onChange={event => setFormState({ ...formState, password: event.target.value })}
                value={ formState.password }
              />
              <br />
              <button className="btn" onClick={ login }>Login</button>
            </>
          }
        </div>
      </div>
    )
}
