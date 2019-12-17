import React from "react";
import "../App.css";
import { Route } from "react-router-dom";

export default function Label(props) {
  const label = props.label;
  return (
    <div className="label">
      <Route
        render={({ history }) => (
          <a
            href=""
            onClick={() =>
              history.push({
                pathname: "/label/" + label.id,
                state: {
                  label: label
                }
              })
            }
          >
            <img className="labelImage" alt={label.title} src={label.thumb} />
            <div className="labelName">{label.title}</div>
          </a>
        )}
      ></Route>
    </div>
  );
}
