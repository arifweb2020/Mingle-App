import React from 'react';

function PostDeatails(props) {

    const { photo, body, comments, likes , title , postedBy} = props.location.state.userData

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                <p><i className="material-icons pdi" onClick={()=>props.history.goBack()}>arrow_back</i></p>
            <h4  style={{textTransform:'capitalize'}}><img src={postedBy.pic} className="postPicHeader"/> <span className="pdh">{title} </span></h4>
                <div className="col s12 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src={photo} className="pdImg"/>   
                        </div>

                    </div>
                </div>
                <div className="col s12 m6">
                    <div className="card postCard">

                        <div className="card-content">
                            <p className="paraBody">{body}</p>
                            <p className="comBody">{comments.map((c) => {
                                return <p key={c._id} className="pdetails">
                                    <img src={c.postedBy.pic} className="postPicHeader"/>
                                    <span className="pcom">{c.text}</span>
                                    </p>
                            })}</p>
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
        </div>
    );
}

export default PostDeatails;