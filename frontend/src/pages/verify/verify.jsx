import React from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchparams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{sucess,orderid});
        if (response.data.sucess) {
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])


  return (
    <div className='verify'>
    <div className="spinner"></div>    

        </div>
    )
}

export default Verify