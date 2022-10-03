import axios from "axios";
import { API } from "../utils/config";

export const createFeedback = (data, token) => axios.post(`${API}/feedback`, data, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

export const getFeedback = productId => axios.get(`${API}/feedback`,{
    headers: {
        product: productId
    }
})