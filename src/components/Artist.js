import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

function Artist({ artist }) {
  return (
    <div className="artist">
      <Route
        render={({ history }) => (
          <a href="" onClick={() => history.push(`/artist/${artist.id}`)}>
            {artist.images.length > 0 && (
              <img className="artistImage" alt="" src={artist.images[0].url} />
            )}
            <div className="artistName">{artist.name}</div>
          </a>
        )}
      ></Route>
    </div>
  );
}

export default Artist;
