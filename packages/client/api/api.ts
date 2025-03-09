import axios from "axios";
// import { API_URL } from "@env";

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
})

export const fetchBooks = async () => {
    const response = await api.get('/books')
    return response
}

export const fetchDailySunnah = async () => {
    const response = await api.get('/sunnah/daily')
    return response.data
}

export const fetchQuranEpub = async (fileName: string) => {
    const response = await api.get(`/files/file-url/${fileName}`)
    return response
}
