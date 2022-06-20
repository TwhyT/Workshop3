import React, { useState, useEffect } from "react";
// import './category.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { FilterCategory, SortCategory, SearchCategory } from "../actions/categoryAction";
import { useHistory } from "react-router-dom";

export default function CategoryBox() {

    const dispatch = useDispatch()
    const history = useHistory()

    const [data, setData] = useState([])

    const categoryReducer = useSelector(state=>state.category)

    useEffect (() => {
        axios.get("http://127.0.0.1:8000/category/?is_enable=true")
            .then((category) => {
                setData(category.data.data.results)
            })
            
            console.log("DATA",data);
        }, [categoryReducer])

    const ALL = () => {
        dispatch(FilterCategory(null))
        history.push('/product/?category=all')
    }

    const CATE_BUTTON = (item) => {
        dispatch(FilterCategory(item.id,item.name))
        history.push(`/product/?category=${item.name}`)
    }

    return (
        <React.Fragment>
                        <div className="w-100 category-box">
                            CATEGORY
                        </div>
                        <div className="my-0 w-100 category-box-item" onClick={()=>ALL()}>
                            ALL
                        </div>
                        {data.map((item) => {
                                    return<React.Fragment key="CATEGORY-BOX">
                                            <div className="my-0 w-100 category-box-item" onClick={()=>CATE_BUTTON(item)}>
                                                {item.name}
                                            </div>
                                            </React.Fragment>
                            })}
        </React.Fragment>
    );
  }