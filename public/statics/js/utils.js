
// let token = JSON.parse(localStorage.getItem("token")) | null
let token = localStorage.getItem("token")

export const usePost = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify(data),
    });
    return res.json();
}
export const useGet = async (url) => {
    const res = await fetch(url, {
        headers: {
            token,
            "Content-Type": "application/json",
        }
    })
    return await res.json()
}