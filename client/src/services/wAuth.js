import React, { useState, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';


import api from './api';
import { login, logout, getToken } from './auth';

export default function WAuth({component: Component, ...rest}) {
     const [ redirect, setRedirect ] = useState(false)
     const [ loading, setLoading ] = useState(true)

     useEffect(() => {
        async function verify() {
            var res = await api.get('/api/users/checkToken', {params: {token: getToken()}})

            if(res.data.status === 200){
                setLoading(false)
                setRedirect(false)
            }else {
                logout()
                setLoading(false)
                setRedirect(true)
            }
        }
        verify()
     }, [])

     return(
         loading?<LinearProgress style={{margin: "200px auto", width: "70vw"}} />:<Route { ...rest }
         render={props => !redirect?(
             <Component {...props} />
         ):<Redirect to={{pathname: "/admin/login", state: {from:props.location}}}/> }
         />
     )
}