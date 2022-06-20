import React, { useState, useEffect } from "react";
import './category.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { addCart, fetchCartAsync } from "../actions/cartAction";
import { FilterCategory, SortCategory, SearchCategory } from "../actions/categoryAction";
import { DetailProduct } from "../actions/productAction";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import CategoryBox from "../component/CategoryBox";

export default function Category() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [data, setData] = useState([])
    const [Data, setDATA] = useState([])

    const categoryReducer = useSelector(state=>state.category)
    const sortValue = categoryReducer.sort_price
    const {categoryname} = categoryReducer
    const {category} = categoryReducer

    useEffect (() => {
        const {category} = categoryReducer
        const {sort_price} = categoryReducer
        const {search} = categoryReducer

        let path = "http://127.0.0.1:8000/product/?"
        if (search!=null){
            path = path + `search=${search}&`
        }
        if (category!=null){
            path = path + `category__in=${category}&`
        }
        
        axios.get(`${path}sort_price=${sort_price}&is_enable=true`)
            .then((product) => {
                setData(product.data.results)
                console.log("Cate_PRODUCT",product);
            })
        
        axios.get("http://127.0.0.1:8000/category/?is_enable=true")
            .then((category) => {
                setDATA(category.data.data.results)
            })
            
            console.log("DATA",data);
        }, [categoryReducer])

    const detail = (item) => {
        dispatch(DetailProduct(item.id))
        history.push(`/product/detail/${item.name}`)
    }

    const sort = (item) => {
        console.log("SortStatus",item);
        dispatch(SortCategory(item))
        history.push(`/product?sort_price=${item}`)
    }
    
    const addItem = (item) =>{
        var token = localStorage.getItem('token')
        if (token){
            dispatch(fetchCartAsync(item.id,1))
        }
        else{
            history.push("/singin")
        }
    }

    return (
        <React.Fragment>
            <div className="row mx-0">
                <div className="container-fluid m-0 px-0 nav-ban">
                    <div className="col-4">
                        <div className="row ml-3 bredcum">
                            <h4 className="bred_link mx-1" onClick={()=>history.push("/")}>HOME</h4>
                            <h4> / </h4>
                            {category === null ? <h4 className="mx-1">ALL</h4> : <h4 className="mx-1">{categoryname}</h4>}
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        {category === null ?<h3>CATEGORY ALL</h3>:<h3>CATEGORY {categoryname}</h3>}
                    </div>
                    <div className="col-4">
                        <div className="row container-fluid m-0 justify-content-end">
                            <Dropdown variant="sort_button" className="sort_button">
                                <DropdownButton variant="dark" className="sort_button" id="dropdown-item-button" title="SORT BY PRICE">
                                    <Dropdown.Item as="button" onClick={()=>sort("asc")}>LOW TO HIGH</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>sort("desc")}>HIGH TO LOW</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                            
                        </div>
                    </div>
                </div>
                
                
                <div className="row w-100 d-flex">
                    <div className="col-2 mx-0 mt-4">
                        <CategoryBox/>
                    </div>
                    <div className="col-10 mx-0">
                        <div className="row w-100 d-flex ">
                            {data.map((item) => {
                                    return<React.Fragment key="PRODUCT">
                                            <div className="col-lg-3 col-md-6 col-sm-12 w-100 d-flex justify-content-center">
                                                <ul className="cards">
                                                <li>
                                                    <div className="card">
                                                    <img src={item.image.medium} className="card__image" alt="" />
                                                    <div className="card__overlay">
                                                        <div className="card__header">
                                                        <div className="card__header-text">
                                                            <h3 className="card_name">{item.name}</h3>            
                                                            <span className="card__status">{item.price} BTH</span>
                                                        </div>
                                                        </div>
                                                        <div className="row buttonzone">
                                                            <button className="btn buttonlink text-center" onClick={()=>addItem(item)}>ADD CART</button>
                                                            <button className="btn buttonlink text-center" onClick={()=>detail(item)}>DETAIL</button>
                                                        </div>
                                                    </div>
                                                    </div>      
                                                </li>
                                                </ul>
                                            </div>
                                            </React.Fragment>
                            })}
                        </div>
                        <div className="d-flex justify-content-center">
                            {/* <ReactPaginate
                                pre */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
  }