import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { unAuthPage } from "../../../middleware/authorizationPage";
import Link from "next/link";
export async function getServerSideProps(ctx){
    await unAuthPage(ctx)
    
    return{
        props:{}
    }
}

function login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status,setStatus] = useState('normal')

//   client side redirect
//   useEffect(() =>{
//     const cookieToken = Cookies.get("token")
//     if(cookieToken) Router.push('/posts')
//   },[])
  async function loginHandler(e) {
    console.log("login")
    e.preventDefault();
    setStatus('loading')
    const loginReq = await fetch("/api/auth/login",{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(fields)
    })
    if(!loginReq.ok) return setStatus('error');

    const loginRes = await loginReq.json();
    setStatus('success')
    //console.log(loginRes)
    Cookies.set("token",loginRes.token)
    Router.push("/posts")
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name')
    setFields({
        ...fields,
        [name]:e.target.value
    })
    console.log(fields)
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler.bind(this)}>
        <input type="text" onChange={(e)=>fieldHandler((e))} name="email" placeholder="Email..." />
        <input type="password" onChange={(e)=>fieldHandler(e)} name="password" placeholder="Password..." />
        <button type="submit">Login</button>
      </form>

      <div>Status: {status}</div>
      <Link href='/auth/register'>Register</Link>
    </div>
  );
}

export default login;

// const [fieldFormLogin, setFieldFormLogin] = useState({});
//     const [status, setStatus] = useState('normal')

//     function setValuef(e) {
//         const target = e.target;
//         const names = target.name;
//         const value = target.value;

//         setFieldFormLogin({
//           ...fieldFormLogin,
//           [names]: value,
//         });
//       }

//       async function loginHandler(e) {
//         e.preventDefault();
//         setStatus("loading")

//         console.log(fieldFormLogin)
//         const loginReq = await fetch('/api/auth/login',{
//             method: 'POST',
//             headers: {
//               "Content-Type":"application/json"
//             },
//             body: JSON.stringify(fieldFormLogin)
//         })

//         if(!loginReq.ok) return setStatus('error '+loginReq.status);

//         const loginRes = await loginReq.json();

//         setStatus("success")
//         Cookies.set('token',loginRes.token)
//         Router.push("/posts")
//         console.log(loginRes);
//       }
//   return (
//     <div>
//         <div className="login-box">

//         <p>Login Form</p>
//         <form onSubmit={loginHandler.bind(this)}>
//           <div className="user-box">
//             <input required=""  name="email" onChange={setValuef.bind(this)} type="text" />
//             <label>Email</label>
//           </div>
//           <div className="user-box">
//             <input required="" name="password" onChange={setValuef.bind(this)} type="password" />
//             <label>Password</label>
//           </div>
//           <a href="#">
//             <span />
//             <span />
//             <span />
//             <span />
//             <button type="submit">
//                 Login
//             </button>

//           </a>
//         </form>
//         <p>
//           <a href="" className="a2">
//             Status : {status}
//           </a>
//         </p>
//       </div>
//     </div>
//   )
