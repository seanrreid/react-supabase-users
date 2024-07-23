import { useActionData, Form } from 'react-router-dom';
import supabase from '../supabase';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    console.log('DATA', data);
    console.error('ERROR', error);
    return data;
};

const Register = () => {
    const data = useActionData();
    console.log('DATA IN REGISTER:', data);
    return (
        <Form method="POST">
            <label>
                Email
                <br />
                <input type='email' name='email' />
            </label>
            <label>
                Password
                <br />
                <input type='password' name='password' />
            </label>
            <button type="submit">Login</button>
        </Form>
    );
};

export default Register;
