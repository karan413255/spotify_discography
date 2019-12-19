import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

function Album({ album }) {
  return (
    <div className="album">
      <Route
        render={({ history }) => (
          <a href="" onClick={() => history.push(`/album/${album.id}`)}>
            {album.images.length > 0 && (
              <img className="albumImage" alt="" src={album.images[0].url} />
            )}
            <div className="albumName">{album.name}</div>
          </a>
        )}
      ></Route>
    </div>
  );
}

export default Album;
