import { usePost, useGet } from "./utils.js";

// get categories
async function getCategories() {
    let html = '<option value="">Select category</option>'
    const categories = await useGet('/categories')
    const productCategory = document.getElementById("category")
    console.log(categories.data);
    categories.data.forEach((category) => {
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


let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbW15IiwiZW1haWwiOiJzYW11ZWxtd2FuaWtpMTdAZ21haWwuY29tIiwiaWQiOiJmYzdlMTIxNy00Y2Y5LTRlMGEtYmY1OS01YTM5NDEwMWRlNzYiLCJpYXQiOjE2OTI2NDUxNjUsImV4cCI6MTY5MjY1OTU2NX0.FYiVGeEC3zUrqZLee6sTu0oRetNyRXOBYW-YYxIfumo"

form.addEventListener("submit", async e => {
    e.preventDefault()

    const name = productName.value
    const image = productImage.files[0]
    const description = productDescription.value
    const price = Number(productPrice.value)
    const category_id = productCategory.value

    const formData = new FormData()
    formData['name'] = name
    formData['image'] = image
    formData['description'] = description
    formData['price'] = price
    formData['category_id'] = category_id

    const res = await fetch('/products/new', {
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "multipart/form-data",
            boundary:formData.getBoundary(),
        },
        body: formData
    })
    console.log(res);
})