import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout';
import LandingLayout from './components/LandingLayout';

import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import BrowsePage from './components/BrowsePage';
import ConnectPage from './components/ConnectPage';
import ConnectSpotifyPage from './components/ConnectSpotifyPage';
import PlaylistsPage from './components/PlaylistsPage';
import TestAPIPage from './components/TestAPIPage';
import NotFoundPage from './components/NotFoundPage';


//Order of routes matter!! * be last
const routes = (
  <Route path="/">
    <Route component={LandingLayout}>
      <IndexRoute                   component={IndexPage} />
      <Route path="login"           component={LoginPage} />
    </Route>
    <Route component={MainLayout}>
      <Route path="logout"          component={LogoutPage} />
      <Route path="browse"          component={BrowsePage} />
      <Route path="connect" exact   component={ConnectPage} />
      <Route path="connect/spotify" component={ConnectSpotifyPage} />
      <Route path="playlists"       component={PlaylistsPage} />
      <Route path="/testapi"        component={TestAPIPage} />
      <Route path="*"               component={NotFoundPage} />
    </Route>
  </Route>
);

export default routes;
