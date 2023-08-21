
// let token = JSON.parse(localStorage.getItem("token")) | null
let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbW15IiwiZW1haWwiOiJzYW11ZWxtd2FuaWtpMTdAZ21haWwuY29tIiwiaWQiOiJmYzdlMTIxNy00Y2Y5LTRlMGEtYmY1OS01YTM5NDEwMWRlNzYiLCJpYXQiOjE2OTI1NTg4NjcsImV4cCI6MTY5MjU3MzI2N30.S6JSpbQ3zkaSfawcN0Aq4brEyemZEvLeRXhQgzHZGgI"
export const usePost = async (url, data) => {
    const res = await fetch(url, { headers: { token }, method: "POST", body: JSON.stringify(data) })
    return await res.json()
}
export const useGet = async (url) => {
    const res = await fetch(url, { headers: { token } })
    return await res.json()
}