import { useActionData, redirect, json, Form } from "react-router-dom";
import supabase from "../supabase";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const group = formData.get("group");

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          group_membership: group,
        },
      },
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
        <div className="error">Unable to Register New User</div>
      )}
      <Form method="POST">
        <label>
          First Name
          <br />
          <input type="text" name="firstName" required />
        </label>
        <label>
          Last Name
          <br />
          <input type="text" name="lastName" required />
        </label>
        <label>
          Email
          <br />
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <br />
          <input type="password" name="password" required />
        </label>
        <label>
          Group
          <select name="group" required>
            <option value="">Select A User Group</option>
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </Form>
    </>
  );
};

export default Register;
