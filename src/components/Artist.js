import React, { Component } from "react";
import "../App.css";
import { Route } from "react-router-dom";

class Artist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const artist = this.props.artist;
    return (
      <div className="artist">
        <Route
          render={({ history }) => (
            <a href="" onClick={() => history.push("/artist/" + artist.id)}>
              <img className="artistImage" alt="" src={artist.images[1].url} />
              <div className="artistName">{artist.name}</div>
            </a>
          )}
        ></Route>
      </div>
    );
  }
}

export default Artist;
