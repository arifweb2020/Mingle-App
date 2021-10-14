import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './../App'

function PostDeatails(props) {

    const { photo, body, comments, likes, title, postedBy  } = props.location.state.userData
    const { state, dispatch } = useContext(UserContext)

    return (
        <div className="container" style={{ marginTop: '10px' }}>
            <div className="row">
                <p><i className="material-icons pdi" onClick={() => props.history.goBack()}>arrow_back</i></p>
                <div className="row">
                    <div className="col s3 m1">
                    <Link to={postedBy._id !== state._id ? "/profile/" + postedBy._id : "/profile"}>
                        <img src={postedBy.pic} className="postPicHeader" /></Link></div>
                    <div className="col s9 m11"><span style={{ fontSize: '15px', textTransform: 'capitalize' }}>{title}</span></div>
                </div>
               
            <div className="col s12 m6">
                <div className="card">
                    <div className="card-image">
                        <img src={photo} className="pdImg" />
                    </div>

                </div>
            </div>
            <div className="col s12 m6">
                <div className="card postCard">

                    <div className="card-content">
                        <p className="paraBody">{body}</p>
                        <div className="comBody">{comments.map((c) => {
                            return <div key={c._id} className=" row">
                                <div className="col s3 m2">
                                <Link to={c.postedBy._id !== state._id ? "/profile/" + c.postedBy._id : "/profile"}>
                                    <img src={c.postedBy.pic} className="postPicHeader" /></Link></div>
                                <div className="col s9 m10"><span className="">{c.text}</span></div>
                            </div>
                        })}</div>
                    </div>
                    <div className="card-action ">
                        <div className="col s6 m6">
                            <span><i className="material-icons">thumb_up</i> {likes?.length}</span>
                        </div>
                        <div className="col s6 m6">
                            <span><i className="material-icons">chat_bubble_outline</i> {comments?.length} </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div >
    );
}

export default PostDeatails;