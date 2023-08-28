import { usePost, useGet } from "./utils.js";


try {
    const productId = sessionStorage.getItem("productId")
    getProduct(productId)
}
catch (error) {
    console.log(error);
}
async function getProduct(productId) {
    let productViewSection = document.getElementById("product-view")
    let product = await useGet(`/products/${productId}`)
    let prod = product.data[0]
    let productViewSectionHtml = `<div class="product_image">
    <img src="${prod.image}" alt="" />
    </div>
    <div class="product_details">
        <h2> ${prod.name}</h2>
        <span>
            <p class="subhead">
            ${prod.description}
            </p>
        </span> 
        <h4>ksh.  ${prod.price}</h4>
        <button id="add-cart" class="btn">Add to cart</button>

    </div>
    `
    productViewSection.innerHTML = productViewSectionHtml
    handleAddCart()

}

function handleAddCart() {
    try {

        let cartBtn = document.getElementById("add-cart")
        const productId = sessionStorage.getItem("productId")

        cartBtn.addEventListener("click",async e => {
           const res = await usePost("/carts/new", { product_id: productId })
           window.location.replace("/products.html")
           console.log(res);
        })
    }
    catch (error) {
        console.log(error);
    }
}