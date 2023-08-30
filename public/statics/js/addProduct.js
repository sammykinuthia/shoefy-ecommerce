import { usePost, useGet } from "./utils.js";
let imgUrl = ""
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

let token = localStorage.getItem('token')
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
    const data = {name,image:imgUrl,description,price,category_id}
    const res = await fetch('/products/new', {
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
   const r = await res.json()
   console.log(r);
   form.reset()
})

productImage.addEventListener("change",e=>{
        let { files } = e.target
        if (files?.length) {
            const images = Object.entries(files)
            images.forEach((file) => {                                
                const formData = new FormData()
                formData.append('file', file[1])
                formData.append("upload_preset", "shoefy")
                fetch("https://api.cloudinary.com/v1_1/dbeq8dpkz/image/upload", { method: "POST", body: formData }).then(res => res.json()).then(res=>{
                    // setProductImage([...productImage, res.url])
                    console.log(res.url);
                    imgUrl = res.url
                })
            })
        }
    
})