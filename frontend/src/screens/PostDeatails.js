import React from 'react';

function PostDeatails(props) {

    const { photo, body, comments, likes, title, postedBy } = props.location.state.userData

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                <p><i className="material-icons pdi" onClick={() => props.history.goBack()}>arrow_back</i></p>
                <div className="row">
                    <div className="col s3 m2"><img src={postedBy.pic} className="postPicHeader" /></div>
                    <div className="col s9 m10"><span style={{ fontSize: '15px', textTransform: 'capitalize' }}>{title}</span></div>
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
                                <div className="col s3 m2"><img src={c.postedBy.pic} className="postPicHeader" /></div>
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