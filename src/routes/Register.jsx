import { useActionData, Form } from "react-router-dom";
import supabase from "../supabase";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log("DATA", data);
  console.error("ERROR", error);
  return data;
};

const Register = () => {
  const data = useActionData();
  console.log("DATA IN REGISTER:", data);
  return (
    <Form method="POST">
      <label>
        First Name
        <br />
        <input type="text" name="f_name" />
      </label>
      <label>
        Last Name
        <br />
        <input type="text" name="l_name" />
      </label>
      <label>
        Email
        <br />
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <br />
        <input type="password" name="password" />
      </label>
      <label>
        Group
        <select name="group">
          <option value="user">User</option>
          <option value="admin">Administrator</option>
        </select>
      </label>
      <button type="submit">Register</button>
    </Form>
  );
};

export default Register;
