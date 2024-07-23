import { useActionData, redirect, json, Form } from "react-router-dom";
import supabase from "../supabase";

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
      return redirect("/");
    } else {
      throw new Error("Registration Failed");
    }
  } catch (errors) {
    return json(errors);
  }
};

const Register = () => {
  const errors = useActionData();

  return (
    <>
      {errors && errors.status === 400 && (
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

export default Register;
