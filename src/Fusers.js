import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from './Fusers.module.css';
const Users = () => {
  const [state, setstate] = useState({ userId: "1", title: "", body: "" });
  const [users, setusers] = useState([]);
  const [posts, setposts] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setusers(data);
      } catch (err) {
        console.error(err);
      }
    }
    async function getdata() {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setposts(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchdata();
    getdata();
  }, []);
  async function deletedata(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const post = posts.filter((post) => post.id !== id);
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }
  function editpost(post) {
    setstate({ ...post });
  }
  async function update() {
    try {
      const { id, userId, title, body } = state;
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { userId, title, body }
      );
      console.log(data);
      const post = [...posts];
      const index = post.findIndex((post) => post.id === id);
      post[index] = data;
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }
  async function create() {
    try {
      const { userId, title, body } = state;
      const { data } = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        { userId, title, body }
      );
      const post = [...posts, data];
      setposts(post);
    } catch (err) {
      console.error(err);
    }
  }

  function submithandler(event) {
    event.preventDefault();
    console.log(state);
    if (state.id) update();
    else create();
    setstate({ userId: "1", title: "", body: "" });
  }
  const changehandle = ({ target: { name, value } }) => {
    setstate({ ...state, [name]: value });
  };
  return (
    <div>
      <div  className={` col-sm-3 ${classes.left}`}>
        <div>
          <p>Add post </p>
          <label> User </label>
          <select className="form-control form-select"value={state.userId}onChange={changehandle} name="userId">
            {users.map((ele) => (
              <option key={ele.id} value={ele.id}>
                {ele.name}
              </option>
            ))}
          </select>
          <label> Title </label>
          <input className="form-control form-control-sm" name="title" value={state.title} onChange={changehandle} />
          <label> Body </label>
          <input className="form-control form-control-sm" name="body" value={state.body}onChange={changehandle}/>
          <br/>
          <button className=" btn btn-primary" onClick={submithandler}>Submit</button>
        </div>
      </div>

      <div className={`col-sm-8 ${classes.right}`}>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td className={classes.but}>
                  <button className="btn btn-primary btn-sm px-3" onClick={() => editpost(post)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deletedata(post.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};
export default Users;
