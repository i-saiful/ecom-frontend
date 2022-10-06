import axios from "axios";
import { API } from "../utils/config";

export const createCoupon = (token, coupon) => axios.post(`${API}/coupon`,
    coupon, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getCoupon = token => axios.get(`${API}/coupon`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const checkCoupon = (token, coupon) => axios.get(`${API}/coupon/check`,{
    headers: {
        Authorization: `Bearer ${token}`,
        coupon: coupon
    }
})