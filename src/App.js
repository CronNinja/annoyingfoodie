import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// page & layout imports
import Home from './pages/Home'
import RestaurantDetails from './pages/RestaurantDetails'
import Cuisine from './pages/Cuisine'
import SiteHeader from "./components/SiteHeader"
import Login from './components/Login';
import { useState } from 'react';
import { withCookies, useCookies } from 'react-cookie';

// Apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [user, setUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies([]);
  return (
    <Router>
      <ApolloProvider client={ client }>
        <div className="App">
          <SiteHeader user={ user } removeCookie={ removeCookie } setUser={ setUser }/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/restaurant/:id">
              <RestaurantDetails user={ user }/>
            </Route>
            <Route path="/cuisine/:id">
              <Cuisine />
            </Route>
            <Route path="/login">
              <Login setUser={ setUser } setCookie={ setCookie } />
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default withCookies(App)