import React from "react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <h1>Keeper</h1>
      <button onClick={handleLogClick}>{user ? "Logout" : "Login"}</button>
    </header>
  );
}

export default Header;
