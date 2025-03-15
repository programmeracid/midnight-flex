import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function RegisterPage() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { register } = useAuthStore();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        register(formData);
        alert(data.message || "Registered successfully!");
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
