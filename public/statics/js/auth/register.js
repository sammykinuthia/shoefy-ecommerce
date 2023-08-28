import { usePost, useGet } from "../utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("form-registration");
    registrationForm.addEventListener("submit", handleRegistration);
});

async function handleRegistration(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwd").value;

    const registrationData = { username, email, password };

    try {
           const response = await usePost("/users/register", registrationData)
        if (response.token) {
            console.log(response);
            localStorage.setItem("token", response.token)
            const errorSection = document.getElementById("error")
            errorSection.style.background = "green"
            errorSection.textContent = response.message;
            errorSection.style.visibility = "visible"
            setTimeout(() => {
                errorSection.style.visibility = "hidden"
                // window.location.replace("/")
            }, 2000)

        }
         else {
            const errorSection = document.getElementById("error")
            errorSection.textContent = response.message;
            setTimeout(() => {
                errorSection.style.visibility = "hidden"
                window.location.replace("/")
            }, 3000)
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
