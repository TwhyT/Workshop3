import React, { useState, useEffect } from "react";
import './cart.css'
import './invoice.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Invoice() {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [invoice, setInvoice] = useState([]);
    const {cart} = useSelector(state => state.cart)
    const categoryReducer = useSelector(state=>state.cart)
    const {categoryname} = categoryReducer
    const {category} = categoryReducer

    useEffect (() => {
        const token = localStorage.getItem('token')
        const config = { headers: {Authorization: `Bearer ${token}`} };
        axios.get('http://127.0.0.1:8000/invoice/', config)
            .then((invoic) => {
                setInvoice(invoic.data.data.results)
                console.log("invoice",invoic);
            })
        }, [cart])

    return (
        <React.Fragment>
            <div className="row w-100 m-0">
                <div className="container-fluid m-0 my-1 nav-ban">
                    <div className="col-5">
                        <div className="row ml-3 bredcum">
                                    <h3 className="bred_link mx-1" onClick={()=>history.push("/")}>HOME</h3>
                                    <h3> / </h3>
                                    <h3 className="mx-1">INVOICE</h3>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <h1>INVOICE</h1>
                    </div>
                    <div className="col-5"></div>
                </div>
                <div className="row w-100 mx-0 px-0 d-flex justify-content-center">
                    {invoice.map((item) => {
                              return<React.Fragment key="CART">
                                 <div className="mx-5 col-xl-3 col-lg-6 col-md-12 col-sm-12">
                                
                                    <div class="wrapper">
                                        <div class="product-info">
                                            <div class="product-text">
                                                <h1>เลขที่ใบสั่งซื้อ : {item.id}</h1>
                                                <br/>
                                                <h2>Status : <br/>{item.status}</h2>
                                                <h2>Create Date : <br/>{item.created_datetime}</h2>
                                            </div>
                                            <div class="product-price-btn">
                                                <div className="row w-100 span d-flex justify-content-center">
                                                    {item.total} BTH
                                                </div>
                                                {/* <div className="row w-100">
                                                    <button type="button">CANCEL</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                    </React.Fragment>
                    })}    
                </div>
                    
            </div>
        </React.Fragment>
    );
  }