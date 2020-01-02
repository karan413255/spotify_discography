import React from "react";
import "../App.css";
import { Route, Link } from "react-router-dom";

const Artist = ({ artist }) => {
  return (
    <div className="artist">
      {/* <Route
        render={({ history }) => (
          <a href="" onClick={() => history.push(`/artist/${artist.id}`)}>
            {artist.images.length > 0 && (
              <img className="artistImage" alt="" src={artist.images[0].url} />
            )}
            <div className="artistName">{artist.name}</div>
          </a>
        )}
      ></Route> */}
      <Link to={`/artist/${artist.id}`}>
        {artist.images.length > 0 && (
          <img className="artistImage" alt="" src={artist.images[0].url} />
        )}
        <div className="artistName">{artist.name}</div>
      </Link>
    </div>
  );
};

export default Artist;
