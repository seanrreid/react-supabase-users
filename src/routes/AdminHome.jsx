import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminHome = () => {
  const navigate = useNavigate();
  const { isAuth, group } = useAuth();

  // Simple check to prevent unauthorized access
  // This isn't ideal, but works as a quick demo
  useEffect(() => {
    if (!isAuth && group !== "admin") {
      return navigate("/login");
    }
  }, [isAuth, group, navigate]);

  return (
    <>
      <h1>Admin Home</h1>
      <p>This is the Administrator Homepage</p>
    </>
  );
};

export default AdminHome;
