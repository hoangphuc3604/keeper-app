import React from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/reducers/authReducer";
import { toast } from "react-hot-toast";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogClick = () => {
    if (user) {
      dispatch(logout());
      toast.success("Logged out successfully");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <h1>Keeper</h1>
      <button onClick={handleLogClick}>{user ? "Logout" : "Login"}</button>
    </header>
  );
}

export default Header;
