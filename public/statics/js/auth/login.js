// import { useFetchPost } from "./utilities.js"

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("form-login");
    loginForm.addEventListener("submit", handleLogin);
});

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("passwd").value;

    const loginData = { username, password };

    try {
        const response = await fetch("http://localhost:3030/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            // Redirect to products page after successful login
            window.location.href = "../products.html";
        } else {
            const errorElement = document.querySelector(".error");
            errorElement.textContent = "Invalid username or password.";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
