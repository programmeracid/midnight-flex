import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,

    login: async ({username, password}) => {
        console.log(JSON.stringify({ username, password }));
        try {
            const res = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error("Login failed");

            set({ user: username, isLoggedIn: true });
        } catch (error) {
            console.error("Login error:", error);
        }
    },

    register: async (username, password) => {
        try {
            const res = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error("Registration failed");

            //const data = await res.json();
            set({ user: username, isLoggedIn: true });
        } catch (error) {
            console.error("Register error:", error);
        }
    },

    logout: async () => {
        try {
            await fetch("http://localhost:5001/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            set({ user: null, isLoggedIn: false });
        } catch (error) {
            console.error("Logout error:", error);
        }
    },

    checkAuth: async () => {
        try {
            const res = await fetch("http://localhost:5001/api/auth/check-auth", {
                credentials: "include",
            });

            if (!res.ok) throw new Error("Not authenticated");

            const data = await res.json();
            set({ user: data.username, isLoggedIn: true });
        } catch (error) {
            set({ user: null, isLoggedIn: false });
        }
    },
}));


