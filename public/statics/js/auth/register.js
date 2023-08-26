// import { useFetchPost } from "./utilities.js";

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
      const response = await fetch("http://localhost:3030/users/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(registrationData)
      });

      if (response.ok) {
          const data = await response.json();
          // Redirect to login page after successful registration
          window.location.href = "./login.html";
      } else {
          const errorData = await response.json();
          const errorElement = document.querySelector(".error");
          errorElement.textContent = errorData.message;
      }
  } catch (error) {
      console.error("Error:", error);
  }
}




// const username = document.getElementById("username").value;
// const email = document.getElementById("email").value;
// const password = document.getElementById("passwd").value;

 

// registerForm.addEventListener("submit", (e) => {

//   e.preventDefault();


// if (user) {
//   axios

//     .post(
//       "http://localhost:3030/users/register",

//       {
//         username: username.value,

//         email: email.value,

//         password: password.value,


//       },

//       {
//         headers: {
//           "Content-type": "application/json",
//         },
//       }
//     )

//     .then((response) => {
//       console.log(response.data);

//       window.location.href = "./login.html";
//     })

//     .catch((e) => {
//       console.log(e);
//     });
// }
