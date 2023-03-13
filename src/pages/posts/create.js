import React, { useState } from 'react'
import { authPage } from '../../../middleware/authorizationPage'
import Router from 'next/router'
import Nav from '../../../component/Nav'
export async function getServerSideProps(ctx){
  const {token} = await authPage(ctx)
  return {
    props: {
      token: token
    }
  }
}

function PostCreate(props) {
  const [field, setField] = useState({
    title: '',
    content:''
  })

  const [status, setStatus] = useState("normal")
  async function CreateHandler(e){
    e.preventDefault()

    setStatus('loading')
    const {token} = props
    const createPost = await fetch("/api/post/create",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      },
      body: JSON.stringify(field)
    })

    const resultReq = await createPost.json()
    if(!createPost.ok) setStatus('error')

    console.log(resultReq)
    setStatus('success');
    Router.push("/posts")
  }

  function fieldHandler(e){
    const name =  e.target.name;

    setField({
      ...field,
      [name]: e.target.value
    })

    console.log(field)

  }

  return (
    <div>
      <h1>Create a Post</h1>
      <Nav />
      <form onSubmit={CreateHandler.bind(this)}>
        <input onChange={fieldHandler.bind(this)} type='text' placeholder='input title' name='title' />
        <br/>
        <textarea onChange={fieldHandler.bind(this)} placeholder='input content' name='content'></textarea>
        <br/>
        <button type='submit'>Create Post</button>   
        <p>Status: {status}</p> 
      </form>

    </div>
  )
}

export default PostCreate 