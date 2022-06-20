import React, { useEffect, useState } from "react";
import './Index.css'
import Navbar from "../component/Navbar";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { FilterCategory } from "../actions/categoryAction";
import { useHistory } from "react-router-dom";
import Footer from "../component/Footer";
// import

export default function Index() {

    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    const [category, setCategory] = useState([]);
    const history = useHistory()
    // const category__in = useDispatch()

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/category/?is_enable=true')
            .then((category) => {
                setCategory(category.data.data.results)
                console.log("INDEX_CATEGORY",category);
            })
        }, [])

    const SHOP = (items) =>{
            dispatch(FilterCategory(items.id,items.name))
            console.log("CheckSend",items.id)
            history.push(`/product/?category__in=${items.id}`)
        }

    return (
        <React.Fragment>
            <div className="row w-100 h-100 my-4 mx-0 px-0 d-flex justify-content-center">

            </div>
            <div className="row w-100 h-100 my-5 mx-0 px-0 d-flex align-items-lg-start justify-content-center">
                <div className="INDEX" style={{ backgroundImage: 'url(https://www.jeban.com/uploads/2019/05/373823_02b12bf791.png)' }}>RULE YOUR LIFE<br/>RULE YOUR SMELL</div>
                <iframe width="1120" height="630" src="https://www.youtube.com/embed/tgetStLp1PU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="row w-100 h-100 mx-0 px-0">
                {/* <div className="col-1 bgBlack"></div> */}
                <div className="col-12">
                    <div className="row w-100 h-100 d-flex justify-content-center">
                    {category.map((items) => {
                                return<React.Fragment key="CATEGORY">
                                        <div class="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center Cate_container m-3">
                                            <img src={items.image.medium} alt={items.name} class="Cate_image"/>
                                            <div class="Cate_overlay">
                                                <div class="Cate_text">
                                                    <div className="Cate_name">{items.name}</div>
                                                    <button className="btn Cate_button text-center" onClick={()=>SHOP(items)}>SHOP NOW</button>
                                                </div>
                                            </div>
                                        </div>
                                        </React.Fragment>
                        })}
                    </div>
                </div>
                {/* <div className="col-1 bgBlack"></div> */}
            </div>
        </React.Fragment>
    );
  }