export const isLoggedIn = () => {
    return !!localStorage.getItem("token");   // true/false
};
export const getUserRole = () => {
    return localStorage.getItem("role");      // returns "admin" / "icmr" / etc.
};
