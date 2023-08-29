import { usePost, useGet } from "../utils.js";
let resetEmail = ""

document.getElementById("sendEmailBtn").addEventListener("click", async e=>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const messageSection = document.getElementsByClassName("error")[0]
    const res = await usePost("/users/reset",{email})
    console.log(res);

    if(res.message == "ok"){
        messageSection.textContent = `Code sent to ${email}`
        messageSection.style.visibility="visible"
        messageSection.style.background = "green"
        setTimeout(()=>{
            messageSection.style.visibility = "hidden"
        },2000)
    }
    else{
        messageSection.textContent = res.message
        messageSection.style.visibility="visible"
        messageSection.style.background = "red"
        setTimeout(()=>{
            messageSection.style.visibility = "hidden"
        },2000)
    }

})


document.getElementById("form-forgotpwd").addEventListener("submit",async e=>{
    e.preventDefault()
    const messageSection = document.getElementsByClassName("error")[0]
    const email = document.getElementById("email").value
    const code =  document.getElementById("code").value
    const res = await usePost("/users/verifycode",{email,code})
    console.log(res);
    if(res.message == 'Code verified'){
        messageSection.textContent = `Code Verified`
        messageSection.style.visibility="visible"
        messageSection.style.background = "green"
        resetEmail = email
        setTimeout(()=>{
            messageSection.style.visibility = "hidden"
            document.getElementById("new-password-section").style.display = "flex"
            document.getElementById("reset-password-section").style.display = "none"
            
        },2000)
    }
})


document.getElementById("form-new-pwd").addEventListener("submit",async e=>{
    e.preventDefault()
    const messageSection = document.getElementsByClassName("error")[1]
    const password = document.getElementById("passwd").value
    const passwordConfirm = document.getElementById("passwd2").value
    if(password != passwordConfirm){
        messageSection.textContent = "passwords do not match"
        messageSection.style.visibility="visible"
        messageSection.style.background = "red"
        setTimeout(()=>{
            messageSection.style.visibility = "hidden"
        },2000)
    }
    else{
    const res = await usePost("/users/changepwd",{email:resetEmail,password})
    console.log(res);
    messageSection.textContent = res.message
    messageSection.style.visibility="visible"
    messageSection.style.background = "green"
    setTimeout(()=>{
        messageSection.style.visibility = "hidden"
        window.location.replace("/auth/login.html")
    },2000)

    }
})