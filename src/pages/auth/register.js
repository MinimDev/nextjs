import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { unAuthPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(ctx){

  //unAuthPage(ctx)

  return{
    props:{}
  }
}

function register() {
  const [fieldFormRegister, setFieldFormRegister] = useState({});
  const [status, setStatus] = useState("normal")

  function setValue(e) {
    const target = e.target;
    const names = target.name;
    const value = target.value;

    setFieldFormRegister({
      ...fieldFormRegister,
      [names]: value,
    });
  }

  async function registerHandler(e) {
    e.preventDefault();
    setStatus("loading")

    console.log(fieldFormRegister)
    const registerReq = await fetch('/api/auth/register',{
        method: 'POST',
        headers: {
          "Content-Type":"application/json"  
        },
        body: JSON.stringify(fieldFormRegister)
    })
    if(!registerReq) setStatus("error")
    const registerRes = await registerReq.json();
    setStatus("success")
    console.log(registerRes);
    Router.push('/auth/login');
  }

  return (
    <div>
      
      <div className="login-box">
        
        <p>Register Form</p>
        <form onSubmit={registerHandler.bind(this)}>
          <div className="user-box">
            <input required=""  name="email" onChange={setValue.bind(this)} type="text" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="password" onChange={setValue.bind(this)} type="password" />
            <label>Password</label>
          </div>
          <a href="#">
            <span />
            <span />
            <span />
            <span />
            <button type="submit">
                Register
            </button>
            
          </a>
          <p>Status : {status}</p>
          <Link href='/auth/login'>Login</Link>
        </form>
        <p>
           Have an account?{" "}
          <a href="" className="a2">
            Sign in!
          </a>
        </p>
      </div>
    </div>
  );
}

export default register;
