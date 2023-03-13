import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';
import Router from 'next/router';
function Nav() {
    function logoutHandler(e) {
        e.preventDefault()
        Cookies.remove("token", Cookies.token);
    
        Router.replace("/auth/login");
      }
  return (
    <div>
        <Link href='/posts'>Post</Link>
        &nbsp; | &nbsp;
        <Link href='/posts/create'>Create Post</Link>
        &nbsp; | &nbsp;
        <a href='#' onClick={logoutHandler.bind(this)}>Logout</a>
    </div>
  )
}

export default Nav