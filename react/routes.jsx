import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import BrowsePage from './pages/BrowsePage';
import ConnectPage from './pages/ConnectPage';
import ConnectSpotifyPage from './pages/ConnectSpotifyPage';
import SpotifyConfirmationPage from './pages/SpotifyConfirmationPage';
import PlaylistsPage from './pages/PlaylistsPage';
import TestAPIPage from './pages/TestAPIPage';
import NotFoundPage from './pages/NotFoundPage';


//Order of routes matter!! * be last
const routes = (
  <Route path="/">
    <IndexRoute                     component={IndexPage} />
    <Route component={MainLayout}>
      <Route path="confirm/spotify"	component={SpotifyConfirmationPage} />
      <Route path="browse"          component={BrowsePage} />
      <Route path="playlists"       component={PlaylistsPage} />
      {/* <Route path="login"           component={LoginPage} />
      <Route path="logout"          component={LogoutPage} />
      <Route path="connect" exact   component={ConnectPage} />
      <Route path="connect/spotify" component={ConnectSpotifyPage} />
      <Route path="/testapi"        component={TestAPIPage} /> */}
      <Route path="*"               component={NotFoundPage} />
    </Route>
  </Route>
);

export default routes;
