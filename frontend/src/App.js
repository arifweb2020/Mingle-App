import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import CreatePost from './screens/CreatePost';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import Signup from './screens/Signup';
import { reducer, initialState } from './reducers/userReducers'
import UserProfile from './screens/UserProfile';
import SubscribesUserPosts from './screens/SubscribesUserPosts';
import Footer from './components/Footer';
import PostDeatails from './screens/PostDeatails';
import Reset from './screens/Reset';
import NewPassword from './screens/NewPassword';
import UpdatePost from './screens/UpdatePost';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push('/')
    } else {
      if(!history.location.pathname.startsWith('/reset-password'))
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/postDetails/:id" component={PostDeatails} />
      <Route path="/followingPost" component={SubscribesUserPosts} />
      <Route path="/updatePost/:id" component={UpdatePost} />
      <Route exact path="/reset-password" component={Reset} />
	  <Route path="/reset-password/:token" component={NewPassword} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {/* <BrowserRouter forceRefresh={true}> */}
      <BrowserRouter>
        <Navbar />
        <Routing />
        {/* <Footer/> */}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
