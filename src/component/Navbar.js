import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import './navbar.css'
import './Search.css'
import { useSelector } from "react-redux";
import axios from "axios";
import { FilterCategory, SearchCategory } from "../actions/categoryAction";
import { ListCart } from "../actions/cartAction";

export function Productlist ()  {
    const dispatch = useDispatch()
    const [category, setCategory] = useState([]);
    const history = useHistory()

    useEffect (() => {
        axios.get('http://127.0.0.1:8000/category/')
            .then((category) => {
                setCategory(category.data.data.results)
                console.log("INDEX_CATEGORY",category);
            })
        }, [])

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
            <div className="row mx-3 py-3">
                        {/* <Link to="/product/" className="nav_text" >ALL</Link> */}
                        <h6 className="nav_textNew" onClick={()=>ALL()}>ALL</h6>
            </div>
            {category.map((item) => {
                return  <div className="row mx-3 py-3">
                            <h6 className="nav_textNew" onClick={()=>CATE_BUTTON(item)} >{item.name}</h6>
                        </div>
            })}
        </React.Fragment>
    )
}

export function Hiddenbar(props) {

    const [status, setStatus] = useState(false);
    const [productlist, setProductlist] = useState(null);
    const history = useHistory()

    const List = () => {
        if (status===false){
            setProductlist(<Productlist/>)
            setStatus(true)
        }
        else{
            setProductlist(null)
            setStatus(false)
        }
    }

    return (
        <React.Fragment>
        <div className="row w-100 mx-5 justify-content-start align-items-center">
            <div className="mx-2 py-3 nav_text" onClick={()=>List()}>
                {/* <h1 className="nav_text" onClick={()=>List()}> */}
                    PRODUCT
                {/* </h1> */}
            </div>
            <div className="mx-2 py-3 nav_text" onClick={()=>history.push("/invoice")}>
                {/* <h1 className="nav_text"> */}
                    INVOICE
                {/* </h1> */}
            </div>
            {/* <div className="mx-2 py-3 nav_text">
                <h1 className="nav_text">
                    CONTACT
                </h1>
            </div> */}
        </div>
        <div className="col nav-dropdown">
            {productlist}
        </div>
        </React.Fragment>
    );
}

export function Banner(){

    const dispatch = useDispatch()

    const location = useLocation();
    console.log("Loaction",location.pathname);

    const {cart} = useSelector((state)=> state.cart)
    console.log("NavCARTQUANTITY",cart);

    const [count, setCount] = useState([0])
    console.log("NAV-CART",count);

    const {user} = useSelector(state => state.auth)
    const categoryReducer = useSelector(state=>state.category)
    const {sort_price} = categoryReducer


    const [status, setStatus] = useState(false);
    const [subbar, setSubbar] = useState([]);
    const [searched, setSearched] = useState('')

    const token = localStorage.getItem('token')
    const history = useHistory()

    const [focused, setFocused] = React.useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const [classnavbar, setClassnavbar] = useState("row hidden-bar w-100")
    const [classmenu1, setMenu1] = useState("menu1")
    const [classmenu2, setMenu2] = useState("menu2")
    const [classmenu3, setMenu3] = useState("menu3")

    const Show = () => {
        if (status===false){
            setSubbar(<Hiddenbar/>)
            setStatus(true)
            setClassnavbar("row show-bar")
        }
        else{
            setSubbar([])
            setClassnavbar("row hidden-bar")
            setStatus(false)
        }
    }

    const Logomenu = (x) => {
        if (status===false){
            setMenu1("change menu1")
            setMenu2("change menu2")
            setMenu3("change menu3")
        }
        else{
            setMenu1("menu1")
            setMenu2("menu2")
            setMenu3("menu3")
        }
    }

    const Hidden = () => {
        setSubbar([])
        setClassnavbar("row hidden-bar")
        setMenu1("menu1")
        setMenu2("menu2")
        setMenu3("menu3")
        setStatus(false)
    }

    const Login = () => {
        // localStorage.getItem('token')
        dispatch(ListCart())
        history.push("/singin")
    }

    const Singup = () => {
        // localStorage.getItem('token')
        history.push("/singin")
    }

    const Logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expire_in')
        window.location.href='/'
    }

    const Search = () => {
        onBlur()
        dispatch(SearchCategory(searched))
        history.push(`/product?&search=${searched}&sort_price=${sort_price}`)
    }

    const Close = () => {
        onBlur()
        setSearched('')
    }
    
    const pathNow = window.location.pathname

    useEffect (() => {
        setSearched('')
        const token = localStorage.getItem('token')
        const config = { headers: {Authorization: `Bearer ${token}`}};
        axios.get('http://127.0.0.1:8000/cart/', config)
                .then((carts) => {
                    setCount(carts.data)
                    console.log("NavPrice",cart);
                })
        }, [cart, categoryReducer, user])
    
    return(
        <React.Fragment>
            <div className="row mx-0 px-0">
                <Link to="/" className="logo_text">CHANEL</Link>
            </div>
            <div className="row banner w-100 py-3 m-0 mb-3">
                <div className="col-5 banner-detail" >
                    <div className="row nav-cate ml-3">
                        {/* CAT */}
                        <div className="mx-1 align-items-center" onClick={()=>Show()&Logomenu()}>
                            <div class={classmenu1}></div>
                            <div class={classmenu2}></div>
                            <div class={classmenu3}></div>
                        </div>
                        <div className={classnavbar} onMouseLeave={Hidden}>
                            {subbar}
                        </div>
                        {/* GORY */}
                    </div>
                </div>
                <div className="col-2">
                    <div className="row w-100 d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                                <div onFocus={onFocus} class="search mx-3">
                                    {!focused   ? 
                                    <button className="Hidebutton" type="button" onClick={() =>Search()} >SEARCH</button> 
                                    :
                                    <button className="Showbutton" type="button" onClick={() =>Search()} >SEARCH</button>
                                    }
                                    <input type="text" placeholder="Type Product's name" value={searched} onChange={e => setSearched(e.target.value)} />
                                    <span onClick={()=>Close()}></span>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-5 menu_position">
                    <div className="row mr-3">
                        {token &&
                            <div className="Count">{count.reduce((sum,item) => sum + parseFloat(item.quantity),0)}</div>
                        }
                        {token &&
                            <button className="btn btn_login"><Link to="/cart/" className="btn_cart">CART</Link></button>
                        }
                        {!token && 
                            (
                            !pathNow === '/signin'   ?
                            <button type="button" className="btn btn_login" onClick={()=>Login()}>SIGN IN</button>
                            :
                            <button type="button" className="btn btn_login" onClick={()=>Login()}>SING IN</button>
                            )
                            
                        }
                        {token &&
                            <button type="button" className="btn btn_logout" onClick={()=>Logout()}>SIGN OUT</button>
                        }

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default function Navbar() {

    return (
        <React.Fragment>
            <Banner/>
        </React.Fragment>
    );
  }