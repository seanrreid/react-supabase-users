import { useEffect } from "react";
import { useLoaderData, useNavigate, json } from "react-router-dom";
import { useAuth } from "../AuthContext";
import supabase from "../supabase";

export async function loader() {
  try {
    const { error } = await supabase.auth.signOut();
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
  const { setIsAuth } = useAuth();

  let logged_in = true;

  if (response) {
    localStorage.clear();
    logged_in = false;
  } else {
    alert("PROBLEM LOGGING OUT");
  }

  useEffect(() => {
    setIsAuth(logged_in);
    return navigate(`/login`);
  }, [setIsAuth, logged_in, response, navigate]);
};

export default Logout;
