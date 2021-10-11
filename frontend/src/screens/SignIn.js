import React, { useState, useContext, } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from './../App'
import M from 'materialize-css'
import { ToastContainer, toast } from 'react-toastify';

function SignIn(props) {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            //M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
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
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.error) {
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    toast.error("wrong username or password", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        progress: undefined,
                        pauseOnHover: false,
                    })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    //M.toast({ html: "signedin success", classes: "#43a047 green darken-1" })
                    setTimeout(() => {
                        history.push("/")
                    }, 2000);
                    toast.success("welcome to Let's Mingle", {
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
            <div className="card auth-card input-field">
                <h2>Let's Mingle</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Dont have an account ?</Link>
                </h5>
                {/* <h6>
              <Link to="/reset">Forgot password ?</Link>
          </h6> */}

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
    );
}

export default SignIn;