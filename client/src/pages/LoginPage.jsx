import { useState } from "react";
import {useAuthStore} from "../store/useAuthStore.js"; // Import Zustand auth store

function LoginPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { login } = useAuthStore();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        await login(formData); // Call login function from auth store
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
