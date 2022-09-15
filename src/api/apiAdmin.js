import { API } from "../utils/config";
import axios from "axios";

export const createCategory = (token, data) => {
    return axios.post(`${API}/category`, data,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getCategories = () => {
    return axios.get(`${API}/category`)
}