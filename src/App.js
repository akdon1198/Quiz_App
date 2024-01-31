import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import { Error } from "./Components/Error/Error";
function App() {
  const userid = useSelector(store => store.user.userid)
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<LoginSignup/>}/>
        <Route path = "/dashboard" element = {userid ? <Home/>: <Navigate replace to="/"/>}/>
        <Route path = "/analytics" element = {userid ? <Home/> : <Navigate replace to="/"/>}/>
        <Route path = "/createquiz" element = {userid ? <Home/> : <Navigate replace to="/"/>}/>
        <Route path = "/analytics/:id" element = {userid ? <Home/> : <Navigate replace to="/"/>}/>
        <Route path= "*" element = {<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
