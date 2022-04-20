import React, { FormEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import { request } from "../../libs/request";
import "./style.css";

interface IProps {}

interface IState {
  username: string;
  password: string;
}
export default class HomePage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    request("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.token) {
          sessionStorage.setItem("token", res.token);
        }
      })
      .catch(console.error);
  };
  render() {
    if (sessionStorage.getItem("token")) {
      return <Redirect to="/welcome" />;
    }
    return (
      <>
        <form onSubmit={this.handleLoginSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              value={this.state.username}
              onChange={(e: { target: any }) => {
                this.setState({
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              value={this.state.password}
              onChange={(e: { target: any }) => {
                this.setState({
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}
