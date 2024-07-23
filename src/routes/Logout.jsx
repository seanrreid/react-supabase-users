import { useEffect } from "react";
import { useLoaderData, useNavigate, json } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabase";

export async function loader() {
  try {
    const jwt = localStorage.getItem("access_token");
    const { error } = await supabase.auth.signOut(jwt);
    if (error) {
      throw error;
    }
    return true;
  } catch (errors) {
    return json(errors);
  }
}

const Logout = () => {
  const response = useLoaderData();
  const navigate = useNavigate();
  const { setIsAuth, setGroup } = useAuth();

  let logged_in = true;

  if (response) {
    localStorage.clear();
    logged_in = false;
  } else {
    alert("PROBLEM LOGGING OUT");
  }

  useEffect(() => {
    setIsAuth(logged_in);
    setGroup("");
    return navigate(`/login`);
  }, [setIsAuth, setGroup, logged_in, response, navigate]);
};

export default Logout;
