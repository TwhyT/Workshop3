import React, { useState, useEffect } from "react";
import './ProductDetail.css'
import Navbar from "../component/Navbar";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CategoryBox from "../component/CategoryBox";
import { Carousel } from "react-bootstrap";
import Footer from "../component/Footer";
import { addCart } from "../actions/cartAction";

export default function DetailProduct() {

    const [data, setData] = useState([]);
    const [album, setAlbum] = useState([]);
    const [num,setNum] = useState(1);

    const history = useHistory()
    const dispatch = useDispatch()

    const productReducer = useSelector(state => state.product)
    const categoryReducer = useSelector(state=>state.category)
    const cartReducer = useSelector(state=>state.cart)
    const {categoryname} = categoryReducer
    const {category} = categoryReducer 
    console.log("DetailID",productReducer);
    
    useEffect (() => {
        const {product} = productReducer
        console.log("DetailID",product);
        axios.get(`http://127.0.0.1:8000/product/${product}/`)
            .then((detail) => {
                setData(detail.data.data)
                setAlbum(detail.data.data.album)
                // console.log("Detail",data);
            }) 
        }, [cartReducer])

    const addItem = (data,num) =>{
        var token = localStorage.getItem('token')
        if (token){
            dispatch(addCart(data.id,num))
        }
        else{
            history.push("/singin")
        }
    }

    console.log("Detail",album);
    
    if(!data.image){
        return <div>LOADING</div>
    }
    if(!album){
        return <div>LOADING</div>
    }

    return (<React.Fragment>
                <div className="row d-flex mx-0 px-0 my-0">
                    <div className="col-12 justify-content-start">
                        <div className="row ml-3 bredcum">
                            <h3 className="bred_link mx-1" onClick={()=>history.push("/")}>HOME</h3>
                            <h3> / </h3>
                            {category === null ? <h3 className="bred_link mx-1" onClick={()=>history.push('/product')}>ALL</h3> : <h3 className="bred_link mx-1" onClick={()=>history.push(`/product?category_in=${categoryname}`)} >{categoryname}</h3>}
                            <h3> / </h3>
                            <h3>{data.name}</h3>
                        </div>
                    </div>
                </div>
                <div className="row my-0 mt-2 mx-0 d-flex justify-content-center">
                    <div className="col-2 mx-0 px-0">
                        <CategoryBox/>
                    </div>
                    <div className="col-10">
                        <div className="row d-flex w-100">
                            <div className="col-6 d-flex justify-content-center">
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                        className=" d-inline-flex"
                                        src={data.image.medium}
                                        alt=""
                                        />
                                    </Carousel.Item>
                                    {album.map((item) => 
                                        <Carousel.Item>
                                            <img
                                            className=" d-inline-flex"
                                            src={item.image.medium}
                                            alt=""
                                            />
                                        </Carousel.Item>      
                                    )}
                                    
                                </Carousel>
                            </div>
                            <div className="col-6 d-flex">
                                <div className="row d-flex w-100">
                                    <div className=" container-fluid ProName my-0 py-0">{data.name}</div>
                                    <div className=" container-fluid ProPrice my-0 py-0">Price: {data.price} BTH</div>
                                    <div className=" container-fluid ProDetail my-0 py-0">{data.detail}</div>
                                    <div className="my-2 d-flex justify-content-start w-100">
                                        <form className="d-flex justify-content-center align-items-center">
                                            <input className="mx-5 addcartspan text-center " value={num} onChange={(e)=>setNum(e.target.value)}>
                                            </input>
                                            <button className="btn buybut" onClick={()=>addItem(data,num)}>BUY</button>
                                        </form>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>        
    );
  }