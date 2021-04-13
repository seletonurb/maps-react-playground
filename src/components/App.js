import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route as ReactRouter, Switch, Redirect, useLocation } from 'react-router-dom';
import OuterLayout from './OuterLayout';
import 'font-awesome/css/font-awesome.min.css';
import ROUTES from '../constants/routes';
import NotFound from '../pages/NotFound';
import MapsViewPage from '../pages/MapsViewPage';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const Route = ({ path, component, exact }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <ReactRouter exact={exact} path={path} component={component} />;
};

const App = () => {

  return (
    <OuterLayout  >
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/maps/google" />} />
        <Route path="/maps/:mapsType" component={MapsViewPage} />
        <Route exact path="/not-found" component={NotFound} />
        <Route path="*" component={() => <Redirect to={ROUTES.NOT_FOUND} />} />
      </Switch>
    </OuterLayout>

  );

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
