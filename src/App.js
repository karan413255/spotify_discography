import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import SearchSpotify from "./views/SearchSpotify";
import Artist from "./views/Artist";
import Album from "./views/Album";
import "./App.css";
import { SpotifyContext } from "./util/spotify_context";
import Label from "./views/Label";
import * as SpotifyWebApi from "spotify-web-api-js";

const Home = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <div className="search-box">
          <Redirect to="/search" />
        </div>
      ) : (
        <div className="search-box">
          <a href="http://localhost:8888/login">
            <span className="search-placeholder">Login to Spotify</span>
          </a>
        </div>
      )}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "",
      spotify: new SpotifyWebApi()
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({ loggedIn: true });
      console.log("has token");
      this.state.spotify.setAccessToken(token);
      console.log(this.state.spotify.getAccessToken());
    }
    const params = this.getHashParams();
    const refreshToken = params.refresh_token;
    const error = params.error;
    let shouldLogin = params.invalid_token;
    console.log(shouldLogin);
    if (shouldLogin) {
      localStorage.removeItem("token");
    }
    console.log(localStorage.getItem("token"));
    if (params.access_token) {
      token = params.access_token;
      localStorage.setItem("token", params.access_token);
      console.log(params.access_token);
      this.setState({ loggedIn: true });
    }
    if (!token) {
      this.setState({ loggedIn: false });
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  render() {
    return (
      <Router>
        <div className="spotify-discography-home">
          <SpotifyContext.Provider value={this.state.spotify}>
            <Switch>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <Home {...routeProps} loggedIn={this.state.loggedIn} />
                )}
              />
              <Route
                exact
                path="/search/"
                render={routeProps => <SearchSpotify {...routeProps} />}
              />
              <Route
                exact
                path="/artist/:id"
                render={routeProps => <Artist {...routeProps} />}
              />
              <Route
                exact
                path="/album/:id"
                render={routeProps => <Album {...routeProps} />}
              />
              <Route
                exact
                path="/label/:id"
                render={routeProps => <Label {...routeProps} />}
              />
            </Switch>
          </SpotifyContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
