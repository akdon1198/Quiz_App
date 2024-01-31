import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import styles from "./LoginSignup.module.css"
import axios from "axios"
import { checkvalidatedata } from '../../Utils/Validate'
import { commonapiurl } from '../../Constant'
import { useDispatch } from 'react-redux'
import { adduser } from '../../redux/Userslice'
const LoginSignup = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const[signup, setsignup] = useState(true)
  const[name, setname] = useState("")
  const[email, setemail] = useState("")
  const[password, setpassword] = useState("")
  const[confirmpass, setconfirmpass] = useState("")
  const[errfield, seterrfield] = useState({
    nameerr : false, emailerr : false, passworderr : false, confirmpasserr : false
  })
  function handleclick(){
    const validdata = checkvalidatedata({name, email, password, confirmpass}, signup)
    if(signup){
      if(!validdata.isnamevalid) setname("");
      if(!validdata.isEmailvalid) setemail("")
      if(!validdata.ispasswordvalid) setpassword("")
      if(!validdata.isconfirmpassvalid) setconfirmpass("")
      seterrfield({
        nameerr : !validdata.isnamevalid,
        emailerr : !validdata.isEmailvalid,
        passworderr : !validdata.ispasswordvalid,
        confirmpasserr : !validdata.isconfirmpassvalid
      })
      if(validdata.flag){
        axios.post(commonapiurl + "auth/register", {name, email, password})
        .then((response) =>{
          if(response.data.jwttoken){
            const jwttoken = response.data.jwttoken
            const userid = response.data.user._id
            dispatch(adduser({jwttoken, userid}))
            history("/dashboard")
          }else{
            alert("Email already in use")
            return;
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }else{
      if(!validdata.isEmailvalid) setemail("")
      if(!validdata.ispasswordvalid) setpassword("")  
      if(validdata.isEmailvalid && validdata.ispasswordvalid){
        axios.post(commonapiurl + "auth/login", {email, password})
        .then((response) => {
          if(response.data.jwttoken){
            const jwttoken = response.data.jwttoken
            const userid = response.data.user._id
            dispatch(adduser({jwttoken, userid}))
            history("/dashboard")
          }else{
            alert("Wrong Email or password")
            return;
          }
        })
        .catch(err => console.log(err))
      }
      seterrfield({
        emailerr : !validdata.isEmailvalid,
        passworderr : !validdata.ispasswordvalid
      })
    }
  }
  function handlesignup(){
    seterrfield({nameerr : "", emailerr : "", passworderr : "", confirmpasserr : ""})
    setname("")
    setemail("")
    setpassword("")
    setconfirmpass("")
    setsignup(true)
  }
  function handlelogin(){
    seterrfield({nameerr : "", emailerr : "", passworderr : "", confirmpasserr : ""})
    setemail("")
    setpassword("")
    setsignup(false)
  }
  return (
    <div className={styles.outercontainer}>
      <div className={styles.innercontainer}>
        <h1>QUIZZIE</h1>
        <div className={styles.loginsignup}>
          <div className={signup && styles.backgrnd}
          onClick={()=>handlesignup()}>Sign Up</div>
          <div className={!signup && styles.backgrnd}
          onClick={()=>handlelogin()}>Log In</div>
        </div>
        <form>
          {
            signup && 
          <div>
          <label >Name</label>
          <input type="text" name="name" className={errfield.nameerr && styles.inputclass}
          placeholder={errfield.nameerr && "Invalid name"}
          onChange={(e)=>setname(e.target.value)}
          value={name}
          />
          </div>
          }
          <div>
          <label>Email</label>
          <input type="email" name="email" className={errfield.emailerr && styles.inputclass}
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          placeholder={errfield.emailerr && "Invalid email"}
          />
          </div>
          <div>
          <label>Password</label>
          <input type="password" name="password" className={errfield.passworderr && styles.inputclass}
          placeholder={errfield.passworderr && "Weak password"}
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          />
          </div>
          {
            signup &&
          <div>
          <label>Confirm Password</label>
          <input type="password" name="password" className={errfield.confirmpasserr && styles.inputclass}
          placeholder={errfield.confirmpasserr && "password doesn't match"}
          value={confirmpass}
          onChange={(e)=>setconfirmpass(e.target.value)}
          />
          </div>
          }
        </form>
        <button onClick={() => handleclick()}>{signup ? "Sign-up" : "Log In"}</button>
      </div>
    </div>
  )
}

export default LoginSignup