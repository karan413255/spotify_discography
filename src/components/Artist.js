import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

function Artist(props) {
  const artist = props.artist;
  return (
    <div className="artist">
      <Route
        render={({ history }) => (
          <a
            href=""
            onClick={() =>
              history.push({
                pathname: "/artist/" + artist.id,
                state: {
                  artist: artist
                }
              })
            }
          >
            {artist.images.length > 0 && (
              <img className="artistImage" alt="" src={artist.images[1].url} />
            )}
            <div className="artistName">{artist.name}</div>
          </a>
        )}
      ></Route>
    </div>
  );
}

export default Artist;
