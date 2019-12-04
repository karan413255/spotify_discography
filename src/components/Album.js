import React, { Component } from "react";
import "../App.css";
import { Route } from "react-router-dom";

class Album extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const album = this.props.album;
    return (
      <div className="album">
        <Route
          render={({ history }) => (
            <a href="" onClick={() => history.push("/album/" + album["id"])}>
              <img
                className="albumImage"
                alt=""
                src={album["images"][1]["url"]}
              />
              <div className="albumName">{album["name"]}</div>
            </a>
          )}
        ></Route>
      </div>
    );
  }
}

export default Album;
