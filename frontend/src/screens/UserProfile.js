import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './../App'
import { useParams } from 'react-router-dom'

function UserProfile(props) {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow, setShowFollow] = useState(true)
   // const [showfollow, setShowFollow] = useState(state ? !state.following?.includes(userid) : false)
    // const [image,setImage] = useState("")
    useEffect(() => {
        setShowFollow(state && !state.following.includes(userid))
     }, state)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)

                setProfile(result)
            })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setShowFollow(true)

            })
    }

    return (
        <>
            {userProfile ?
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
                                    src={userProfile.user.pic}
                                />
                            </div>
                            <div className="profileDiv">
                                <h4>{userProfile.user.name}</h4>
                                <h5>{userProfile.user.email}</h5>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                    <h6>{userProfile.posts?.length} posts</h6>
                                    <h6>{userProfile.user.followers?.length} followers</h6>
                                    <h6>{userProfile.user.following?.length} following</h6>
                                </div>
                                {showfollow ?
                                    <button style={{
                                        margin: "10px"
                                    }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                        onClick={() => followUser()}
                                    >
                                        Follow
                                    </button>
                                    :
                                    <button
                                        style={{
                                            margin: "10px"
                                        }}
                                        className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                        onClick={() => unfollowUser()}
                                    >
                                        UnFollow
                                    </button>
                                }
                            </div>
                        </div>

                        {/* <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div> */}
                    </div>
                    <div class="row">
                        {
                            userProfile.posts.map(item => {
                                return (

                                    <div className="col s12 m4" key={item._id}>
                                        <div className="card">
                                            <div className="card-image waves-effect waves-block waves-light">
                                                <img key={item._id}
                                                    className="item"
                                                    src={item.photo}
                                                    alt={item.title}
                                                    onClick={() => props.history.push({ pathname: `/postDetails/${item._id}`, state: { userData: item } })}
                                                />
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
                : <h2 style={{ textAlign: 'center', marginTop: '220px', fontSize:'30px' }}>loading...!</h2>
            }
        </>

    );
}

export default UserProfile;