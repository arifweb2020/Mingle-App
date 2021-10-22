import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
    useEffect(() => {
        if (url) {
            uploadFields()
        }
    }, [url])
    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mingleapp")
        data.append("cloud_name", "arifinsta")
        fetch("https://api.cloudinary.com/v1_1/arifinsta/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const uploadFields = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            // M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            toast.error("invalid email", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                pauseOnHover: false,
            })
            return
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic: url
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                     //M.toast({html: data.error,classes:"#c62828 red darken-3"})
                    toast.error("email exit or enter password", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        pauseOnHover: false,
                    })
                }
                else {
                    // M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    setTimeout(() => {
                        history.push('/signin')
                    }, 2000);
                    toast.success("you sucessfully SignUp", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        pauseOnHover: false,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const PostData = () => {
        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }

    }

    return (
        <div className="mycard">
            <img src="https://thefacevalue.in/img/ma-bg2.png" className="bgImg" />
            <div className="card auth-card input-field">
                <h2>Let's Mingle</h2>
                <input
                    type="text"
                    placeholder="enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="enter your password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload pic</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    SignUP
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
            <h6 className="developer">Made By <i class="material-icons" style={{ color: 'red', position: 'relative', top: '5px' }}>favorite</i> Arif Hussain</h6>
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


export default Signup