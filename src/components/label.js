import React, { Component } from "react";
import "../App.css";
import { Route } from "react-router-dom";

export default class Label extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const label = this.props.label;
    return (
      <div className="label">
        <Route
          render={({ history }) => (
            <a href="" onClick={() => history.push("/label/" + label.id)}>
              <img
                className="labelImage"
                alt={label.title}
                src={label.thumb}
              />
              <div className="labelName">{label.title}</div>
            </a>
          )}
        ></Route>
      </div>
    );
  }
}
