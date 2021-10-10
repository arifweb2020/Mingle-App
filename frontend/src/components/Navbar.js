import React, { useContext } from 'react';
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../App'

function Navbar(props) {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {

        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                    <i className="material-icons"
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                      }}
                    style={{ color: "red" }}>input</i>
             
            </li>
            ]
        }
        else {
            return [
                <li><Link to="/signin">SignIn</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <nav style={{background:"#fff"}}>
            <div className="nav-wrapper white" style={{maxWidth:'1054px',marginLeft:'auto',marginRight:'auto'}}>
                <Link to={state ? "/" : "/signin"} className="brand-logo">Let's Mingle</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;