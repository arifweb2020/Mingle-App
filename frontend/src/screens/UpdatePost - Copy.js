import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

const UpdatePost = ({ match }) => {
    //  const { postId } = useParams();
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [pic, setPic] = useState();
    const [picMessage, setPicMessage] = useState();
    //  const [url, setUrl] = useState("")


    useEffect(() => {
       
            fetch(`/allpost/${match.params.id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
                .then(result => {
                    console.log(result.posts)
                    setTitle(result.title);
                    setBody(result.body);
                    setPic(result.pic);
                })

    }, []);


    const postDetails = (pics) => {
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "mingleapp")
            data.append("cloud_name", "arifinsta")
            fetch("https://api.cloudinary.com/v1_1/arifinsta/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(pic);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    };


    const updatePost = (id, title, body, photo) => {
        fetch(`/editpost/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id,
                title,
                body,
                photo
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                history.push('/')
            }).catch(err => {
                console.log(err)
            })
    }


    const submitHandler = (e) => {
        e.preventDefault();
        updatePost()
    };


    return (
        <div className="myCard">
            <div className="card input-filed"
                style={{
                    margin: "30px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}
            >
                <img src={pic} width="400" />
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <input
                        type="text"
                        placeholder="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}

                    />
                    <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Uplaod Image</span>
                            <input type="file" onChange={(e) => setPic(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={() => postDetails()}
                    >
                        Update Post
                    </button>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
            />
        </div>
    )
}


export default UpdatePost