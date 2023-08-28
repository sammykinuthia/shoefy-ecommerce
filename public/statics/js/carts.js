import { usePost } from "./utils.js"

const token = localStorage.getItem("token")

getCarts()
async function getCarts() {
    fetch("/carts", { headers: { token, 'Content-Type': "application/json" } })
        .then(e => e.json()).then(e => {
            let data = e.data
            let total = 0
            let cartSectionHtml = ""
            data.forEach(d=>{
                total+=d.price
                cartSectionHtml +=`<tr id="${d.id}">
                                        <td><img src="${d.image}"/></td>
                                        <td>${d.name}</td>
                                        <td>${d.description}</td>
                                        <td>${d.price}</td>
                                        <td class="cartRemove"><b>Remove</b></td>
                                    </tr>`

            })
            document.getElementById("cart-body").innerHTML = cartSectionHtml
            document.getElementById("cart-total").textContent = Intl.NumberFormat("en-US",{style:"currency",currency:"Ksh"}).format(total)
            // document.getElementById("cart-total").textContent = total
        })

}

setTimeout(()=>{
    handleCartRemovefromCart()

},200)

function handleCartRemovefromCart(){
    const removeBtnList = document.querySelectorAll(".cartRemove")
removeBtnList.forEach((btn, i)=>{
    btn.addEventListener("click",(e)=>{
        let product_id = removeBtnList[i].parentNode.id
        usePost('/carts/remove',{product_id})
        window.location.reload()

    })
})
}