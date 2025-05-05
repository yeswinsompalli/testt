import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/Storeontext'

const PlaceOrder = () => {

    const {getTotalCartAmount,token,food_list,cartitems,url} = usecontext(StoreContext)

    const [data,setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:'',
      country:"",
      phone:"",
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];
      food_list.map((item)=>{
        if (cartItems[item._id]>0) {
           let itemInfo = item;
           itemInfo["quantity"] = cartItems[item._id];
           orderItems.push(itemInfo);
        }
      })
      let orderData = {
        address:data,
        items:orderitems,
        amount:getTotalCartAmount()+2,
      }
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const{session_url} = response.data;
        window.location.replace(session_url);
      }  
      else{
        alert("Error");
      }  
   }

   const navigate = useNavigate();

   useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }

   },[token])

  return (
    <form onSubmit={placeholder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fileds">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div classname="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zipcode' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                    <div classname="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()===0?0:2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                              <p>Delivery Fee</p>
                              <p>${getTotalCartAmount()===0?0:2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                              <b>Total</b>
                              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()===0?0:2}</b>
                            </div>
                          </div>
                          <button type='submit'>PROCEED TO PAYMENT</button>
                      </div>
      </div>
    </form>
  )
}

export default PlaceOrder
