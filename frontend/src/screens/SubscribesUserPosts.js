import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from './../App'
import {Link} from 'react-router-dom'
import moment from "moment";

const SubscribesUserPosts  = ()=>{
    const [data,setData] = useState([])
    const [loader, setLoader] = useState(true);
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/getsubpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
          // console.log(result)
           setData(result.posts)
           setLoader(false);
       })
    },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
    if (loader) return <h2 style={{ textAlign: 'center', marginTop: '220px', fontSize: '30px' }}>loading...!</h2>

   return (
       <div className="home">
           {data ? (
           <>
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>
                            <img src={item.postedBy.pic} className="postPicHeader"/>  <span style={{position:'relative',top:'-20px', textTransform:'capitalize'}}> {item.postedBy.name}</span></Link>
                            <span className="date_time">{moment(item.createdAt).format("ll HH:mm A")}</span> 
                                {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                            
                           
                                <h6>{item.likes.length} <span style={{fontWeight:'bold',color:'#4caf50'}}>likes</span></h6>
                                <h6 style={{color: '#3f51b5',textTransform:'capitalize'}}><b>{item.title}</b></h6>
                                <p className="bodyText">{item.body}</p>
                                <p style={{marginTop:'10px'}}><span style={{color:'#9c27b0',fontWeight:'bold'}}>Total Comments </span> : {item.comments.length}</p>
                                <div className="commentBox" >
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <div className="row" style={{marginTop:'15px'}} key={record._id}>
                                            <div className="col s3 m2"><Link to={record.postedBy._id !== state._id ? "/profile/" + record.postedBy._id : "/profile"}><img src={record.postedBy.pic} className="postPicHeader"/></Link></div>
                                                            <div className="col s9 m10"><span style={{fontSize:'15px'}}>{record.text}</span></div>
                                                                 
                                                        </div>
                                        )
                                    })
                                }
                                </div>
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
           </>
           ): <h5 style={{textAlign:'center',marginTop:'30px'}}>Sorry You are not following any one yet</h5>
           }

           
          <p className="mTop" ><i class="material-icons" onClick={()=>window.scroll(0,0)} title="move top" style={{fontSize:'30px'}}>arrow_upward</i></p>
          
       </div>
   )
}


export default SubscribesUserPosts