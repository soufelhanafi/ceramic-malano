import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LoginForm from "../../pages/login"

class PubliRouter extends React.Component {
  render() {
    return (
      <Router>
        <>
          <Route exact={true} path="/login" component={LoginForm} />
          <Route render={() => <Redirect to="/login" />} />
        </>
      </Router>
    );
  }
}

export default PubliRouter;
