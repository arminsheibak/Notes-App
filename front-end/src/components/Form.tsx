import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

interface Props {
  route: string;
  method: "login" | "register";
}

interface FormData {
  username: string;
  password: string;
}

const Form = ({ route, method }: Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const name = method == "login" ? "Login" : "Register";
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    apiClient
      .post(route, formData)
      .then((res) => {
        if (method == "login") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container-sm p-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h1>{name}</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary" type="submit">
          {name}
        </button>
      </form>
    </div>
  );
};

export default Form;
