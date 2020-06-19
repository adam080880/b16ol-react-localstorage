import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";

import Swal from "sweetalert2";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    if (Object.keys(JSON.parse(localStorage.getItem("user_auth"))).length > 0) {
      this.props.history.push("/", { error: "You already have an account" });
    }

    this.state = {
      username: "",
      password: "",
    };
  }

  checkExist = (username) => {
    const users = JSON.parse(localStorage.getItem("users"));

    return new Promise((resolve, reject) => {
      users.forEach((val) => {
        if (val.username === username) {
          resolve({ data: val });
        }
      });
      resolve(false);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.checkExist(username).then((res) => {
      if (res) {
        if (res.data.password === password) {
          Swal.fire("Success", "Login success", "success").then(() => {
            setTimeout(() => {
              localStorage.setItem("user_auth", JSON.stringify(res));
              this.props.history.push("/");
            }, 500);
          });
        } else {
          Swal.fire("Error", "Username and password is not match", "error");
        }
      } else {
        Swal.fire("Error", "Username is not found", "error");
      }
    });
  };

  render() {
    return (
      <Container>
        <Card>
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <h3 className="font-weight-bold mb-4">Login</h3>
              <div className="form-group">
                <label className="label-control">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="label-control">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  autoComplete="on"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="btn-wrapper mt-4 d-flex justify-content-between align-items-center">
                <Button type="submit">Login</Button>
                <span className="small text-secondary">
                  Not have an account? Sign up <Link to="/register">here</Link>
                </span>
              </div>
              {this.props.location.state && this.props.location.state.error && (
                <div className="error w-100 text-center text-danger small mt-4">
                  <span className="text-danger">
                    {this.props.location.state.error}
                  </span>
                </div>
              )}
            </div>
          </form>
        </Card>
      </Container>
    );
  }
}
