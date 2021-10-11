import React from 'react';

function PostDeatails(props) {

    const { photo,body,comments,likes} = props.location.state.userData
   
    return (
        <div>
            {likes.length}
            <p>Post Deatils {body}</p>
            <p>{comments.map((c)=>{
                return <span key={c._id}>{c.text}-{c.postedBy.name} <img src={c.postedBy.pic} width="100"/></span>
            })}</p>
            <img src={photo} />
        </div>
    );
}

export default PostDeatails;