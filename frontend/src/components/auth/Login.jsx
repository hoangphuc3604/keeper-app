import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
    } else {
      setError("");
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  const clientId =
    "194488984899-skhdjuip4me22bjvbkmmqmi2rsib94nm.apps.googleusercontent.com";

  const onSuccess = async (response) => {
    const idToken = response.credential;

    try {
      const backendResponse = await axios.post(
        "http://localhost:4000/auth/google",
        {
          token: idToken,
        }
      );
      console.log("Backend Response:", backendResponse.data);
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const onFailure = (response) => {
    console.log("Google login failed. Response:", response);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
        <div className="d-flex justify-content-center mb-3">
          <GoogleOAuthProvider clientId={clientId}>
            <div>
              <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
            </div>
          </GoogleOAuthProvider>
        </div>
        <p className="text-center">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
