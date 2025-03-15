import { create } from "zustand";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";
console.log("BASE_URL : " + BASE_URL)

export const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    

    login: async ({username, password}) => {
        console.log(JSON.stringify({ username, password }));
        try {
            const res = await fetch(BASE_URL+"/api/auth/login", {
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

    register: async ({username, password}) => {
        try {
            const res = await fetch(BASE_URL+"/api/auth/register", {
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
            await fetch(BASE_URL+"/api/auth/logout", {
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
            const res = await fetch(BASE_URL+"/api/auth/check-auth", {
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


