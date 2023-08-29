// import { useFetchPost } from "./utilities.js"
import { usePost, useGet } from "../utils.js";


document.getElementById("form-login").addEventListener('submit', async e => {
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("passwd").value;
    const errorElement = document.querySelector(".error");

    const loginData = { email, password };

    try {
        const response = await usePost("/users/login", loginData)
        console.log(response);
        if(response.token){
            localStorage.setItem("token",response.token)
            errorElement.style.background = "green"
            errorElement.textContent = response.message;
            errorElement.style.visibility = "visible"
            setTimeout(()=>{
                errorElement.style.visibility = "hidden"
                window.location.replace("/")
            },2000)
        }
        else{
            errorElement.textContent = response.message;
            errorElement.style.visibility = "visible"
            console.log(response);
            setTimeout(()=>{
                errorElement.style.visibility = "hidden"
            },2000)
            
        }
     
    } catch (error) {
        console.error("Error:", error);
    }
})