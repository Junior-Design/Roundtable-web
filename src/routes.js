// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={LandingPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;