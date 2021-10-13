import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';

const Reset = (props) => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch('/reset-password', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // M.toast({html: data.error,classes:"#c62828 red darken-3"})
                    toast.error("user dont exit with that email", {
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
                        props.history.push("/signin")
                    }, 2000);
                    toast.success("check your email", {
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
    return (
        <div className="mycard">
            <p style={{maxWidth:'420px',marginLeft:'auto',marginRight:'auto'}}><i className="material-icons pdi" onClick={() => props.history.goBack()}>arrow_back</i></p>
            <div className="card auth-card input-field">
                <h2>Let's Mingle</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    reset password
                </button>
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


export default Reset