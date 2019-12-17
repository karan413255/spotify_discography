import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

function Album(props) {
  const album = props.album;
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

export default Album;
