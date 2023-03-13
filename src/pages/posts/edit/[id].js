import React, { useState } from "react";
import { authPage } from "../../../../middleware/authorizationPage";
import Router from "next/router";
import Nav from "../../../../component/Nav";
export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  const { id } = ctx.query;

  const postReq = await fetch("http://localhost:3000/api/post/detail/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const resDetail = await postReq.json();

  return {
    props: {
      token,
      postDetail: resDetail,
    },
  };
}

function PostEdit(props) {
  const { id ,title, content } = props.postDetail.data;
  const [field, setField] = useState({
    title,
    content,
  });

  const [status, setStatus] = useState("normal");
  async function updateHandler(e) {
    e.preventDefault();

    setStatus("loading");
    const { token } = props;
    const updatePost = await fetch("/api/post/update/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(field),
    });

    const resultReq = await updatePost.json();
    if (!updatePost.ok) setStatus("error");

    console.log(resultReq);
    setStatus("success");
    Router.push("/posts");
  }

  function fieldHandler(e) {
    const name = e.target.name;

    setField({
      ...field,
      [name]: e.target.value,
    });

    console.log(field);
  }

  return (
    <div>
      <h1>Update a Post ID : {id}</h1>
      <Nav />
      <form onSubmit={updateHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="input title"
          name="title"
          defaultValue={title}
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="input content"
          name="content"
          defaultValue={content}
        ></textarea>
        <br />
        <button type="submit">Save Change</button>
        <p>Status: {status}</p>
      </form>
    </div>
  );
}

export default PostEdit;
