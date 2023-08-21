import { usePost, useGet } from "./utils.js";

// get categories
async function getCategories() {
    let html = '<option value="">Select category</option>'
    const categories = await useGet('/categories')
    const productCategory = document.getElementById("category")
    console.log(categories.data);
    categories.data.forEach((category)=>{
        html += `<option value="${category.id}">${category.name}</option>`
    })
    productCategory.innerHTML = html
}
getCategories()


const form = document.getElementById('form')
const productName = document.getElementById("name")
const productPrice = document.getElementById("price")
const productDescription = document.getElementById("description")
const productImage = document.getElementById("image")
const productCategory = document.getElementById("category")

form.addEventListener("submit",e=>{
    e.preventDefault()
    const res = usePost('/products/new',{
        name:productName.value, image:productImage.files[0], description:productDescription.value, price:productPrice.value, category_id:productCategory.value
    })
})