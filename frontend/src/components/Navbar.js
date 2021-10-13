import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

function Navbar(props) {
    const isDesktop = window.innerWidth > 640 ? true : false;
    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, [])
    const renderList = () => {

        if (state) {
            return [
                <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>search</i></li>,
                <li key="2">
                    {isDesktop ?
                        <Link to="/profile">Profile</Link>
                        :
                        <Link to="/profile"><i className="material-icons" title="user profile">person</i></Link>
                    }
                </li>,
                <li key="3">
                    {isDesktop ?
                        <Link to="/create">Create Post</Link> :
                        <Link to="/create"><i className="material-icons" title="create post">add_box</i></Link>
                    }
                </li>,
                <li key="4">
                    <i className="material-icons"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}
                        style={{ color: "black" }}>power_settings_new</i>

                </li>

            ]
        }
        else {
            return [
                <li key="5"><Link to="/signin">SignIn</Link></li>,
                <li key="6"><Link to="/signup">SignUp</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/search-users', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(results => {
                setUserDetails(results.user)
            })
    }

    return (
        <div className="navbar-fixed">
        <nav style={{ background: "#fff" }}>
            <div className="nav-wrapper white" style={{ maxWidth: '1054px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Link to={state ? "/" : "/signin"} className="brand-logo">Let's Mingle</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
            <div id="modal1" className="modal myModal" ref={searchModal} style={{ color: "black" }}>
                <div className="modal-content " style={{ background: '#fff' }}>
                    <input
                        type="text"
                        placeholder="search users"
                        value={search}
                        onChange={(e) => fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {userDetails.map(item => {
                            return <a href={item._id !== state._id ? "/profile/" + item._id : '/profile'} onClick={() => {
                                M.Modal.getInstance(searchModal.current).close()
                                setSearch('')
                            }}><li className="collection-item">
                                    <div className="row" key={item._id}>
                                        <div className="col s5 m3"><img src={item.pic} className="postPicHeader" /></div>
                                        <div className="col s7 m9 searchUser"><h5>{item.name}</h5></div>
                                    </div>
                                </li>
                                {/* <div style={{border:'2px solid red'}}></div> */}
                            </a>
                        })}

                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>close</button>
                </div>
            </div>
        </nav>
        </div>
    );
}

export default Navbar;