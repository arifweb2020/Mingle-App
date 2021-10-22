import React, { useState, useContext, } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';

const NewPassword = (props) => {
    const history = useHistory()
    const [password, setPasword] = useState("")
    const { token } = useParams()
    console.log(token)
    const PostData = () => {
        fetch("/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    // M.toast({html: data.error,classes:"#c62828 red darken-3"})
                    toast.error("Try again session expired", {
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
                    toast.success("password updated successfully", {
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
            <img src="https://thefacevalue.in/img/ma-bg.jpg" className="bgImg" style={{height:'450px',width:'500px',left:'14%'}}/>
            <div className="card auth-card input-field">
                <h2>Let's Mingle</h2>

                <input
                    type="password"
                    placeholder="enter a new password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    New password
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


export default NewPassword