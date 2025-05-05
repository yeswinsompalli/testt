import React, { useContext, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Myorders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchorders = async () => {
        const response = await axios.post(url+"/api/orders/useorders",{},{headers:{token}});
        setData(response.data.data);
    }

    useEffect (()=>{
        if (token) {
            fetchorders();
        }
    },[token])




    return (
        <div className='My-orders'>
            <h2>My orders</h2>
            <div className="container">
                {data.map((PlaceOrder,index)=>{
                    return (
                        <div key={index} classname='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if (index === order.items.length-1) {
                                    return item.name+" X "+item.quantity
                                }
                                else {
                                    return item.name+" X "+item.quantity+", "

                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>items: {order.items.length}</p>
                            <p><span>$#x25cf;</span> <b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Myorders