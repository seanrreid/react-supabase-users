import { useEffect } from "react";
import { useActionData, useNavigate, json, Form } from "react-router-dom";
import supabase from "../supabase";
import { useAuth } from "../AuthContext";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw error;
    }
    if (data.user.id) {
      const { user, session } = data;
      localStorage.clear();
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("access_token", session.access_token);
      localStorage.setItem("refresh_token", session.refresh_token);
      localStorage.setItem("expiration", session.expires_at);
      return data;
    } else {
      throw new Error("Registration Failed");
    }
  } catch (errors) {
    return json(errors);
  }
};

const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const { setIsAuth, setGroup } = useAuth();

  useEffect(() => {
    const checkAuth = () => {
      if (
        typeof actionData !== "undefined" &&
        actionData?.user?.aud === "authenticated"
      ) {
        const group = actionData?.user?.user_metadata?.group_membership;
        setIsAuth(true);
        setGroup(group);

        if (group === "admin") {
          return navigate("/admin");
        } else {
          return navigate(`/`);
        }
      }
    };
    checkAuth();
  }, [actionData, setIsAuth, setGroup, navigate]);

  return (
    <>
      {actionData?.errors && actionData?.errors.status === 400 && (
        <div className="error">Invalid Login Credentials</div>
      )}
      <Form method="POST">
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </Form>
    </>
  );
};

export default Login;
