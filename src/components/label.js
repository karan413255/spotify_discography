import React from "react";
import "../App.css";
import { Route, Link } from "react-router-dom";

export default function Label({ label }) {
  return (
    <div className="label">
      {/* <Route
        render={({ history }) => (
          <a href="" onClick={() => history.push(`/label/${label.id}`)}>
            <img className="labelImage" alt={label.title} src={label.thumb} />
            <div className="labelName">{label.title}</div>
          </a>
        )}
      ></Route> */}
      <Link to={`/label/${label.id}`}>
        <img className="labelImage" alt={label.title} src={label.thumb} />
        <div className="labelName">{label.title}</div>
      </Link>
    </div>
  );
}
