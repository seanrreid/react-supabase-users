import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

import styles from "./nav.module.css";

const MainNav = () => {
  const { isAuth, group } = useAuth();
  return (
    <nav className={styles.mainNav}>
      <ul>
        {isAuth ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {group && group === "admin" && <li>GROUP: ADMIN</li>}
        {group && group === "user" && <li>GROUP: USER</li>}
      </ul>
    </nav>
  );
};

export default MainNav;
