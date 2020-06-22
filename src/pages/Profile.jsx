import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";

import Swal from "sweetalert2";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    if (
      Object.keys(JSON.parse(localStorage.getItem("user_auth"))).length === 0 ||
      Object.keys(JSON.parse(localStorage.getItem("users"))).length === 0
    ) {
      this.props.history.push("/login", {
        error: "You must login first",
      });
    }

    const user = JSON.parse(localStorage.getItem("user_auth"));

    const { username, password, name } = user.data;

    this.state = {
      username,
      password,
      name,
      oldUsername: username,
      oldPassword: password,
      oldName: name,
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
      if (!res) {
        Swal.fire("Error", "Username is not found", "error");
      } else {
        if (
          password.match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
        ) {
          new Promise((resolve, reject) => {
            this.checkExist(username).then((res2) => {
              if (res2 && username !== this.state.oldUsername) {
                reject("Username is exists");
              } else {
                resolve(
                  users.map((val) => {
                    if (val.username === this.state.oldUsername) {
                      localStorage.setItem(
                        "user_auth",
                        JSON.stringify({ data: { username, password, name } })
                      );
                      this.setState({
                        oldUsername: username,
                        oldPassword: password,
                        oldName: name,
                      });

                      return {
                        username,
                        password,
                        name,
                      };
                    } else {
                      return val;
                    }
                  })
                );
              }
            });
          })
            .then((res) => {
              Swal.fire("Success", "Success edited profile", "success");
              localStorage.setItem("users", JSON.stringify(res));
            })
            .catch((reject) => {
              Swal.fire("Error", "Username has been exist", "error");
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
              <h3 className="font-weight-bold mb-4">Profile</h3>
              <div className="form-group">
                <label className="label-control">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="label-control">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={this.state.name}
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
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="btn-wrapper mt-4 d-flex justify-content-between align-items-center">
                <Button type="submit">Change</Button>
                <span className="small">
                  {"<<"} Back to <Link to="/">Home</Link>
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
