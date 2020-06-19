import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    if (
      Object.keys(JSON.parse(localStorage.getItem("user_auth"))).length === 0
    ) {
      this.props.history.push("/login", {
        error: "You must login first",
      });
    }
  }

  render() {
    const data = JSON.parse(localStorage.getItem("user_auth")).data;

    return (
      <Container>
        <Card>
          <div className="card-body text-center">
            <h1>Welcome, {data.name}</h1>
            <div className="btn-wrapper w-100 text-center">
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
              <button
                onClick={(e) => {
                  localStorage.setItem("user_auth", JSON.stringify({}));
                  this.props.history.push("/login");
                }}
                className="btn btn-danger px-3 py-2 font-weight-bold ml-2"
              >
                Logout
              </button>
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}
