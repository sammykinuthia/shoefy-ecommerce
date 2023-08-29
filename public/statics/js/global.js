import { usePost, useGet } from "./utils.js";
const token = localStorage.getItem("token")

try {
    if (!token) {
        window.location.replace("/auth/login.html")
    }
    else {
        fetch('/users/verifyuser', { method: "post", headers: { token } }).then(res => res.json()).then(res => {
            if (!res.username) {
                window.location.replace("/auth/login.html")
            }
            fetch("users/isadmin", { method: "post", headers: { token } }).then(res => res.json()).then(res => {
                const isAdmin = res.data[0].is_admin
                const addToProduct = document.getElementById("addProduct")
                const addToCategory = document.getElementById("addCategory")

                if (isAdmin){
                    addToProduct.style.display = "block"
                    addToCategory.style.display = "block"

                }
                else{

                    addToProduct.style.display = "none"
                    addToCategory.style.display = "none"
                }
            })
        })
    }
} catch (error) {
    console.log(error);
}



const header = document.getElementById("header")
fetch('statics/components/nav.html')
    .then(e => (e.text()))
    .then(e => header.innerHTML = e)

setTimeout(() => {
    getCartCount()
    handleCartClick()
    handleToggle()
}, 200)

async function getCartCount() {
    let cartCountSection = document.getElementById("cart-count")
    fetch("/carts", { headers: { token, 'Content-Type': "application/json" } })
        .then(e => e.json()).then(e => {
            cartCountSection.innerText = e.data.length
        })
}

function handleCartClick() {
    const cartBtn = document.getElementsByClassName("cart")[0]
    cartBtn.addEventListener("click", () => {
        console.log("clicked");
        window.location.replace("/cart.html")
    })
}

function handleToggle() {
    document.getElementById("toggle").addEventListener('click', () => {
        const navItems = document.getElementById("nav-items")
        if (navItems.style.display == "block") {

            navItems.style.display = "none"
            console.log("here");
        }
        else {

            navItems.style.display = "block"
            console.log("hwee 23");
        }
    })
}