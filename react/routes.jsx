import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout';
import LandingLayout from './components/LandingLayout';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import BrowsePage from './pages/BrowsePage';
import ConnectPage from './pages/ConnectPage';
import ConnectSpotifyPage from './pages/ConnectSpotifyPage';
import PlaylistsPage from './pages/PlaylistsPage';
import TestAPIPage from './pages/TestAPIPage';
import NotFoundPage from './pages/NotFoundPage';


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
