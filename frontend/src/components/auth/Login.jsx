import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  get_user_info,
  user_login,
} from "./../../store/reducers/authReducer";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(user_login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (success) {
      toast.success(success.message);
      navigate("/");
    }
    dispatch(clearMessage());
  }, [error, success]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      dispatch(get_user_info());
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleGoogleLogin = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
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
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline-primary d-flex align-items-center"
          >
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              alt="Google Logo"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Đăng nhập với Google
          </button>
        </div>
        <p className="text-center">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
        <p className="text-center">
          Don't want to sign in? <Link to="/">Go back here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
