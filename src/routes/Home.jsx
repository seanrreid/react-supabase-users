import { useLoaderData, json } from "react-router-dom";
import supabase from "../supabase";
import { useAuth } from "../AuthContext";

export const loader = async () => {
  try {
    const jwt = localStorage.getItem("access_token");
    const { data } = await supabase.auth.getUser(jwt);
    const { user } = data;

    const metadata = user.user_metadata;
    return metadata;
  } catch (err) {
    return json(err);
  }
};

const Home = () => {
  const loaderData = useLoaderData();
  const { isAuth, group } = useAuth();

  return (
    <>
      <h1>Home</h1>
      <>
        {loaderData && isAuth ? (
          <>
            <p>
              Welcome home {loaderData.first_name} {loaderData.last_name}!
              You&apos;ve arrived!
            </p>
            <p>You are in the {group} group.</p>
          </>
        ) : (
          <p>Welcome home, you&apos;ve arrived.</p>
        )}
      </>
    </>
  );
};

export default Home;
