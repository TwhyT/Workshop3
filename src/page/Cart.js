import React, { useState, useEffect } from "react";
import './cart.css'
import Navbar from "../component/Navbar";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, EditCart } from "../actions/cartAction";
import { DetailProduct } from "../actions/productAction";
import { useHistory } from "react-router-dom";
import Footer from "../component/Footer";

export default function Cart() {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [carts, setCarts] = useState([]);
    const {cart} = useSelector(state => state.cart)
    const categoryReducer = useSelector(state=>state.cart)
    const {categoryname} = categoryReducer
    const {category} = categoryReducer

    useEffect (() => {
        const token = localStorage.getItem('token')
        console.log("TekonCart",token);
        const config = { headers: {Authorization: `Bearer ${token}`} };
        axios.get('http://127.0.0.1:8000/cart/', config)
            .then((Newcart) => {
                setCarts(Newcart.data)
                // console.log("NEW CART",carts);
            })
        }, [cart])
        console.log("NEW CART",carts);

    const DelItem = (item) =>{
        console.log("price",item.total);
        dispatch(deleteCart(item.id))
    }

    const IncreaItem = (item) =>{
        item.quantity = item.quantity +++ 1
        dispatch(EditCart(item.id,item.quantity))
    }

    const DecreaItem = (item) =>{
        item.quantity = item.quantity --- 1
        if (item.quantity <= 0){
            dispatch(deleteCart(item.id))
        }
        dispatch(EditCart(item.id,item.quantity))
    }

    const EditItem = (value,id) =>{
        console.log("Item Id",id);
        console.log("Item Quan",value);
        if (value === ''){
            value = 0
        }
        dispatch(EditCart(id,value))
    }

    const DetailItem = (item) =>{
        dispatch(DetailProduct(item.product.id))
        history.push(`/product/detail/${item.product.name}`)
    }

    const Checkout = () =>{
        const token = localStorage.getItem('token')
        const data = {}
        const config = { headers: {Authorization: `Bearer ${token}`}};
        axios.post('http://127.0.0.1:8000/checkout/', data, config)
        window.location.href=("/invoice")
    }

    return (
        <React.Fragment>
            <div className="row w-100 m-0">
                <div className="container-fluid m-0 my-1 nav-ban">
                    <div className="col-5">
                        <div className="row ml-3 bredcum">
                                    <h3 className="bred_link mx-1" onClick={()=>history.push("/")}>HOME</h3>
                                    <h3> / </h3>
                                    <h3 className="mx-1">CART</h3>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <h1>CART</h1>
                    </div>
                    <div className="col-5"></div>
                </div>
                <div className="row w-100 mx-0 px-0">
                    {carts.map((item) => {
                              return<React.Fragment key="CART">
                                 <div className="mx-0 col-xl-12 col-lg-12 col-md-12">
                                    <div className="container w-100">
                                        <section id="cart"> 
                                            <article className="product w-100">
                                                <header>
                                                <div className="remove">
                                                    <img className="Cart-img" src={"http://127.0.0.1:8000"+item.product.image.thumbnail} alt=""/>
                                                    <h3 onClick={()=>DetailItem(item)}>DETAIL</h3>
                                                </div>
                                                </header>
                                                <div className="content">
                                                    <h1>{item.product.name}</h1>
                                                    <div className="type"  onClick={()=>DelItem(item)}>X</div>
                                                </div>
                                                <footer className="content my-auto">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                    <span className="btn qt-minus mx-2" onClick={()=>DecreaItem(item)}>-</span>
                                                    <form>
                                                        <input className="qt mx-2" value={item.quantity} onChange={(e)=>EditItem(e.target.value,item.id)}>
                                                        </input>
                                                    </form>
                                                    <span className="btn qt-minus mx-2" onClick={()=>IncreaItem(item)}>+</span>
                                                    <h2 className="price">
                                                        {item.product.price} THB
                                                    </h2>
                                                    <h2 className="full-price">
                                                        {item.total} THB
                                                    </h2>
                                                    </div>
                                                </footer>
                                            </article>
                                        </section>
                                        </div>
                                        </div>
                                    </React.Fragment>
                    })}
                <div className="row w-100 d-flex align-content-center my-3">
                    <div className="container w-100">
                        <article className="w-100">
                                <div className="d-flex justify-content-end align-items-center">
                                    <h2 className="total-box d-flex align-items-center">
                                        TOTAL
                                    </h2>
                                    <h2 className="full-price total">
                                    {carts.reduce((sum,item) => sum + parseFloat(item.total),0)} THB
                                    </h2>
                                </div>
                        </article>
                    </div>
                    <div className="container w-100">
                        <article className="w-100">
                                <div className="d-flex justify-content-end align-items-center checkout" onClick={()=>Checkout()}>
                                    <h2 className="total-box d-flex align-items-center">
                                        CHECK
                                    </h2>
                                    <h2 className="full-price total">
                                        OUT
                                    </h2>
                                </div>
                        </article>
                    </div>
                </div>
                </div>  
            </div>
        </React.Fragment>
    );
  }