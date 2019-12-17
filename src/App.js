import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchSpotify from "./views/SearchSpotify";
import Artist from "./views/Artist";
import Album from "./views/Album";
import "./App.css";
import { spotifyApi, SpotifyContext } from "./util/spotify_context";
import Label from "./views/Label";

const Home = props => {
  return (
    <div>
      {props.loggedIn ? (
        <div className="search-box">
          <Link to="/search">
            <span className="search-placeholder">Search</span>
          </Link>
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
  constructor() {
    super();
    const params = this.getHashParams();
    const refreshToken = params.refresh_token;
    const error = params.error;
    let shouldLogin = params.invalid_token;
    // spotifyApi.setAccessToken(token);
    console.log(shouldLogin);
    if (shouldLogin) {
      localStorage.removeItem("token");
    }
    console.log(localStorage.getItem("token"));
    let token = localStorage.getItem("token");
    // console.log(token);
    if (params.access_token) {
      token = params.access_token;
      localStorage.setItem("token", params.access_token);
      console.log(params.access_token);
    }
    this.state = {
      loggedIn: token ? true : false,
      spotify: spotifyApi
    };
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

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!token) {
      this.setState({ loggedIn: false });
    }
  }
  render() {
    return (
      <div className="spotify-discography-home">
        <Router>
          <SpotifyContext.Provider value={this.state.spotify}>
            <Route
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
          </SpotifyContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
