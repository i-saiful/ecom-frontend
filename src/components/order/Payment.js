import { useEffect, useState } from "react"
import { initPayment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import { Link , useLocation} from "react-router-dom";

const Payment = () => {
    const coupon = useLocation().search.slice(1)
    const [sessionSuccess, setSessionSuccess] = useState(false);
    const [failed, setFailed] = useState(false)
    const [redirectUrl, setRidirectUrl] = useState(false)

    useEffect(() => {
        initPayment(userInfo().token, coupon)
            .then(response => {
                if (response.data.status === 'SUCCESS') {
                    console.log(response.data.status);
                    setSessionSuccess(true)
                    setRidirectUrl(response.data.GatewayPageURL)
                }
            }).catch(() => {
                setFailed(false)
                setSessionSuccess(false)
            })
    }, [coupon])

    return (
        <div>
            {sessionSuccess ? window.location = redirectUrl : 'payment is processing....'}
            {failed ? (
                <><p>Failed to start payment ....</p> <Link to='/cart'>go to cart</Link></>
            ) : ""}
        </div>
    )
}

export default Payment