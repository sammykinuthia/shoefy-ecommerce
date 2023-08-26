
// let token = JSON.parse(localStorage.getItem("token")) | null
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbW15IiwiZW1haWwiOiJzYW11ZWxtd2FuaWtpMTdAZ21haWwuY29tIiwiaWQiOiJmYzdlMTIxNy00Y2Y5LTRlMGEtYmY1OS01YTM5NDEwMWRlNzYiLCJpYXQiOjE2OTI2NDUxNjUsImV4cCI6MTY5MjY1OTU2NX0.FYiVGeEC3zUrqZLee6sTu0oRetNyRXOBYW-YYxIfumo"
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