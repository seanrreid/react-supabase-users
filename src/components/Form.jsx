import supabase from '../supabase';

const MyForm = () => {
    const handleUpload = async (photo) => {
        const fileName = photo.name;
        const { data, error } = await supabase.storage
            .from('profile-photos')
            .upload(`test/${fileName}`, photo);
        console.log('data, or error', data, error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const photo = formData.get('photo2');
        return handleUpload(photo);
    };

    return (
        <>
            <p>
                This example has a <code>&lt;form&gt;</code> that uses a{' '}
                <code>handleSubmit()</code> and <code>FormData()</code> to
                submit a file.
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='photo2'>File: </label>
                <input type='file' name='photo2' />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
};

export default MyForm;
