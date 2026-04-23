import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'



const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if(!token){
      return null;
    }

    try {
      
      const response = await axios.post(backendUrl + "api/orders/list", {}, {headers: {token}})
      console.log(response.data);
      

    } catch (error) {
      
    }
  }
  
  useEffect(()=>{
  
  },[token])



  return (
    <div>
      
    </div>
  )
}

export default Orders