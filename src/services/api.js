import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-cadastro-e-login.onrender.com/",
    timeout: 8 * 1000,
})