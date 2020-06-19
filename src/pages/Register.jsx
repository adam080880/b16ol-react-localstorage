import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";

import Swal from "sweetalert2";

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    if (Object.keys(JSON.parse(localStorage.getItem("user_auth"))).length > 0) {
      this.props.history.push("/", { error: "You already have an account" });
    }

    this.state = {
      username: "",
      password: "",
      name: "",
    };
  }

  checkExist = (username) => {
    const users = JSON.parse(localStorage.getItem("users"));

    return new Promise((resolve, reject) => {
      users.forEach((val) => {
        if (val.username === username) {
          resolve(true);
        }
      });
      resolve(false);
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const { username, password, name } = this.state;

    if (!username || !password || !name) {
      Swal.fire("Error", "All fields is required", "success");
      return;
    }

    this.checkExist(username).then((res) => {
      if (res) {
        Swal.fire("Error", "Username has been taken by another user", "error");
      } else {
        if (
          password.match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
        ) {
          users.push({
            username,
            password,
            name,
          });
          localStorage.setItem("users", JSON.stringify(users));
          Swal.fire("Success", "Register success", "success").then(() => {
            this.props.history.push("/login");
          });
        } else {
          Swal.fire(
            "Error",
            "Password is not valid (must be 8 character (min) and must contain digits and symbols)",
            "error"
          );
        }
      }
    });
  };

  render() {
    return (
      <Container>
        <Card>
          <form onSubmit={this.onSubmit}>
            <div className="card-body">
              <h3 className="font-weight-bold mb-4">Register</h3>
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
                <label className="label-control">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  onChange={(e) => this.setState({ name: e.target.value })}
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
                  Already have an account? Sign in <Link to="/login">here</Link>
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
