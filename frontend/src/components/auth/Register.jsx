import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, user_register } from "../../store/reducers/authReducer";
import { toast } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, loading, success, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(user_register({ email, password }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success.message);
      navigate("/");
    }
    if (error) {
      toast.error(error.message);
    }
    dispatch(clearMessage());
  }, [success, error]);

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  const handleFacebookRegister = () => {
    console.log("Facebook register clicked");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Register</h2>
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
            Register
          </button>
        </form>
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-light border w-48 d-flex align-items-center justify-content-center m-1"
            onClick={handleGoogleRegister}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Google
          </button>
          <button
            className="btn btn-light border w-48 d-flex align-items-center justify-content-center m-1"
            onClick={handleFacebookRegister}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Facebook
          </button>
        </div>
        <p className="text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
