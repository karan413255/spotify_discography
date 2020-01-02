import React from "react";
import Album from "../components/album";

export default function ALbumList({ albums }) {
  return (
    <div>
      Albums
      {albums.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </div>
  );
}
