import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './../App';
import { Link } from 'react-router-dom'


function Profile(props) {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")

    useEffect(() => {
        if (image) {
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
                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                            //window.location.reload()
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])
    const updatePhoto = (file) => {
        setImage(file)
    }


    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                //console.log(result)
                setPics(result.mypost)
            })
    }, [])
    return (
        <>
            <div style={{ maxWidth: "750px", margin: "0px auto" }}>
                <div style={{
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",

                    }}>
                        <div>
                            <img className="profilePic"
                                src={state ? state.pic : "loading"}
                            />
                        </div>
                        <div className="profileDiv">
                            <h4 style={{textTransform:'capitalize'}}>{state ? state.name : "loading"}</h4>
                            <h5>{state ? state.email : "loading"}</h5>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{mypics?.length} posts</h6>
                                <h6>{state ? state.followers?.length : "0"} followers</h6>
                                <h6>{state ? state.following?.length : "0"} following</h6>
                            </div>
                            <div>
                                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                    onClick={() => props.history.push("/followingPost")}
                                >
                                    Following Post
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="file-field input-field uploadButton" style={{ margin: "10px" }}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper" style={{ width: '100px' }}>
                            <input className="file-path validate" type="text" style={{ borderBottom: 'none' }} />
                        </div>
                    </div>
                </div>
                {/* <div className="gallery">
                {
                    mypics.map(item => {
                        return (
                            
                                // <Link to={{ pathname: `/postDetails/${item._id}`, state: { userData: item } }}>
                                <img key={item._id}
                                onClick={()=>props.history.push({ pathname: `/postDetails/${item._id}`, state: { userData: item } })}
                                 className="item"
                                  src={item.photo} 
                                  alt={item.title} />
                        )
                    })
                }
            </div> */}

                <div class="row">
                    {
                        mypics.map(item => {
                            return (
                                // <Link to={{ pathname: `/postDetails/${item._id}`, state: { userData: item } }}>
                                <div className="col s12 m4" key={item._id}>
                                    <div className="card">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img key={item._id}
                                                onClick={() => props.history.push({ pathname: `/postDetails/${item._id}`, state: { userData: item } })}
                                                className="item"
                                                src={item.photo}
                                                alt={item.title} />
                                        </div>
                                        <div className="card-action ">
                                            <div className="col s6 m6">
                                            <span><i className="material-icons">thumb_up</i> {item.likes?.length}</span>
                                            </div>
                                            <div className="col s6 m6">
                                            <span><i className="material-icons">chat_bubble_outline</i> {item.comments?.length} </span>
                                            </div>
                            
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>


            </div>
            <p className="mTop" ><i className="material-icons" onClick={() => window.scroll(0, 0)} title="move top" style={{ fontSize: '30px' }}>arrow_upward</i></p>
        </>
    );
}

export default Profile;