const form = document.getElementById('form')
const productName = document.getElementById("name")

let token = localStorage.getItem('token')
form.addEventListener("submit", async e => {
    e.preventDefault()
    const name = productName.value
    const res = await fetch('/categories/new', {
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name})
    })
   const r = await res.json()
   console.log(r);
   productName.textContent = ""
   window.location.reload()
   
})

