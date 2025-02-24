import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.js";
import '../css/NavBar.css';

function NavBar() {
    const { isLoggedIn, user, logout, checkAuth } = useAuthStore();

    useEffect(() => {

        checkAuth();
    }, []);

    return (
        <nav className="navbar">
            {/* Brand Name */}
            <div className="navbar-brand">
                <Link to="/">Midnight</Link>
            </div>

            {/* Navigation Links + Auth Status */}
            <div className="navbar-container">
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/players" className="nav-link">Players</Link>
                    <Link to="/addplayers" className="nav-link">Add Player</Link>
                </div>

                <div className="auth-section">
                    {isLoggedIn ? (
                        <>
                            <span className="auth-status">Logged in as {user}</span>
                            <button onClick={logout} className="logout-btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
