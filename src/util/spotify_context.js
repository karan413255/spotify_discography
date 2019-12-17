import * as SpotifyWebApi from "spotify-web-api-js";
import React from "react";

export const spotifyApi = new SpotifyWebApi();

export const SpotifyContext = React.createContext(spotifyApi);
