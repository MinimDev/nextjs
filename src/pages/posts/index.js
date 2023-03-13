import React, { useState } from "react";
import { authPage } from "../../../middleware/authorizationPage";
import Cookies from "js-cookie";
import Router from "next/router";
import Nav from "../../../component/Nav";
export async function getServerSideProps(ctx) {
  const auth = await authPage(ctx);

  //console.log(auth.token)

  const getPosts = await fetch("http://localhost:3000/api/post", {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const posts = await getPosts.json();
  //console.log(await getPosts.json());
  return {
    props: { posts, token: auth.token },
  };
}

function index(props) {
  const { token } = props;
  

  const [datas, setDatas] = useState(props.posts.data);
  async function DeleteHandler(postId, e) {
    e.preventDefault();

    const isDelete = confirm("Apakah data akan di hapus? ");
    if (isDelete) {
      const deletePost = await fetch("/api/post/delete/" + postId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const deleteRes = await deletePost.json();

      const filteredDatas = datas.filter((data) => {
        return data.id !== postId && data;
      });
      setDatas(filteredDatas);
      console.log(deleteRes);
    }
  }

  function EditHandler(id) {
    Router.push("/posts/edit/" + id);
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Posts</h1>
          <Nav />
        </div>
      </div>

      {datas.map((post) => (
        <div key={post.id}>
          <p>
            {post.title} --- {post.content} --- {post.created_at}
          </p>
          <div style={{ padding: "10px" }}>
            <button onClick={EditHandler.bind(this, post.id)}>Edit</button>
            <button
              onClick={(e) => {
                DeleteHandler(post.id, e);
              }}
            >
              DeletePost
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default index;
