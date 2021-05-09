import {
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import { Grommet } from 'grommet';
import Home from '../Home/Home';
import LeadDetail from '../LeadDetail/LeadDetail';
import React from 'react';

const theme = {
  global: {
    colors: {
      brand: '#e14e54',
      secondary: '#grey',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const App = () => {
  return (
    <Grommet theme={theme} full>
      <Router>
        {/* <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leads">Leads</Link>
          </li>
        </ul>
      </div> */}

        <Switch>
          <Route path="/leads">
            <Leads />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
};

const Leads = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Lead />
      </Route>
    </Switch>
  );
};

const Lead = () => {
  let { id } = useParams();
  return <LeadDetail key={`lead-detail-${id}`} id={id} />;
};

export default App;
