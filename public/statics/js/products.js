import { usePost, useGet } from "./utils.js";
import {getCartCount} from '../js/global.js'

const cartIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M0 1h4.764l3 11h10.515l3.088-9.265l1.898.633L19.72 14H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0V1Zm14 1v3h3v2h-3v3h-2V7H9V5h3V2h2ZM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0Z"/></svg>'
let category = null
const categorySection = document.getElementById("category-filter")
categorySection.addEventListener("change", e => {
    e.preventDefault()
    category = categorySection.value
    renderProducts()
})

renderProducts()
async function getProducts() {
    const products = await useGet('/products')
    const res = await products
    return res

}

async function renderProducts() {
    let productSection = document.getElementById("products")
    const products = await getProducts()
    let productHtml = ''
    if (!products.data) {
        productHtml = "<h4>No products</h4>"
    }
    else {
        let productList = []
        if (category)
            productList = products.data.filter(p => p.category == category)
        else
        productList = products.data
        console.log(productList);
        productList.forEach(product => {
            productHtml += `
            <div class="product" id="${product.id}">
                <div class="product-img-section">
                    <img src="${product.image}" alt="">
                </div>
                <div class="product-lower">
                    <p class="product-title">${product.name}</p>
                    <h4 class="product-price">${product.price}</h4>
                    <div class="card-btns">
                        <button  class="view-product">View</button>
                        <button class="cart-btn" >${cartIcon}</button>
                        
                    </div>
                </div>
            </div>
            `
        })
        handleViewProduct()
    }
    productSection.innerHTML = productHtml
}

function handleViewProduct() {
    let products = document.getElementsByClassName("view-product")

    setTimeout(() => {
        for (let i = 0; i < products.length; i++) {
            products[i].addEventListener('click', e => {
                let productId = e.target.parentNode.parentNode.id
                console.log("clicked", productId);
                sessionStorage.setItem("productId", productId)
                window.location.replace("/product.html")
            })
        }

    }, 1000)


}

async function getCategories() {
    let html = '<option value="">Select category</option>'
    const categories = await useGet('/categories')
    const productCategory = document.getElementById("category-filter")
    categories.data.forEach((category) => {
        html += `<option value="${category.id}">${category.name}</option>`
    })
    productCategory.innerHTML = html
}
getCategories()

setTimeout(()=>{
    let cartBtnList = document.getElementsByClassName("cart-btn")
    for(let i=0;i<cartBtnList.length;i++){
        cartBtnList[i].addEventListener("click",async(e)=>{
            let productId = e.target.parentNode.parentNode.parentNode.parentNode.id
            // console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
            const res = await usePost("/carts/new", { product_id: productId })
            console.log(res);
            // window.location.reload()
            await getCartCount()
        })
    }
   
},1000)