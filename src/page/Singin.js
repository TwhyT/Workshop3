import axios from 'axios';
import React, { useCallback, useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthAsync } from '../actions/authAction.js'
import Navbar, { Banner } from '../component/Navbar';
import './singin.css'
import { Redirect, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer.js';

export default function Singin() {
    // const user = useSelector(state => state.auth)
    // console.log("userName",user);
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {error} = useSelector(state => state.status) 
    console.log("Error",error.msg);
    const history = useHistory()
    const categoryReducer = useSelector(state=>state.category)
    const {categoryname} = categoryReducer
    const {category} = categoryReducer 

    // useEffect (() => {
    //         const token = localStorage.getItem('token')
    //         if (token){
    //             history.push('/')
    //         }
    //     }, [])

    return (
        <React.Fragment>
            <div className="row w-100 m-0">
                <div className="container-fluid m-0">
                    <div className="row">
                    <div className="row ml-3 bredcum">
                                <h3 className="bred_link mx-1" onClick={()=>history.push("/")}>HOME</h3>
                                <h3> / </h3>
                                <h3 className="mx-1">SIGN IN</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row w-100 formzone">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="row justify-content-center HeadText">SIGN IN</div>
                    <form>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input id="username" type="username" class="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input id="password" type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <p>{error ?error.msg:[]}</p>
                        <button type="button" class="btn btn-primary" onClick={() =>dispatch(fetchAuthAsync(username, password))} >Submit</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        </React.Fragment>
    );
  
}
