import { usePost, useGet } from "./utils.js";

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
        products.data.forEach(product => {
            productHtml += `
            <div class="product" id="${product.id}">
                <div class="product-img-section">
                    <img src="${product.image}" alt="">
                </div>
                <div class="product-lower">
                    <p class="product-title">${product.name}</p>
                    <h4 class="product-price">${product.price}</h4>
                    <button  class="view-product">View product</button>
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
    
    setTimeout(()=>{
        for(let i = 0; i< products.length;i++){
            products[i].addEventListener('click',e=>{
                let productId = e.target.parentNode.parentNode.id
                console.log("clicked",productId);
                sessionStorage.setItem("productId",productId)
                window.location.replace("/product.html")
            })
        }

    },1000)

   
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