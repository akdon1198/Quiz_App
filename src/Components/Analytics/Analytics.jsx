import React, {useState } from 'react'
import styles from "./Analytics.module.css"
import deleteimg from "../../images/deleteimg.png"
import editimg from "../../images/editimg.png"
import shareimg from "../../images/shareimg.png"
import { commonapiurl } from '../../Constant'
import {NavLink, useNavigate} from "react-router-dom"
import { useAddquiz } from '../../hook/useaddquiz'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deletequiz} from '../../redux/Quizslice'
import {CopyToClipboard} from "react-copy-to-clipboard"
import { ToastContainer, toast } from 'react-toastify'
import { setpollarr } from '../../redux/Pollslice'
import { setquestionarr } from '../../redux/Questionslice'
import { setcardnumber, setquizname, setquiztype, setquizeditid, settimer} from '../../redux/Quizeditslice'
const Analytics = () => {
  const allquiz = useAddquiz()
  const dispatch = useDispatch()
  const[quizid, setquizid] = useState("")
  const history = useNavigate()
  const[displaydeletecont, setdisplaydeletecont] = useState(false)
  function handledelete(quiz){
    setdisplaydeletecont(true)
    setquizid(quiz._id)
  }
  function handleconfirmdelete(){
    axios.delete(commonapiurl + "quiz/deletequiz/" + quizid)
    .then((response) => {
      dispatch(deletequiz(response.data.deletedquiz))
      setdisplaydeletecont(false)
    })
    .catch((err) =>{
      console.log("error occured");
    })
  }
  function handleedit(quiz){
    dispatch(setquizeditid(quiz._id))
    dispatch(setcardnumber(2))
    dispatch(setquizname(quiz.quizname))
    dispatch(setquiztype(quiz.quiztype))
    dispatch(settimer(quiz.timer))
    if(quiz.quiztype == "poll"){
      dispatch(setpollarr(quiz.pollarr))
    }else{
      dispatch(setquestionarr(quiz.questionarr))
    }
    history("/createquiz")
  }
  function copytexttoclipboard(){
    toast("Link copied to Clipboard")
  }
  return (
    <>
    <div className={styles.maincontainer}>
      <h1>Quiz Analysis</h1>
      <div>
        <div className={styles.detailheading}>
          <h3>S.No</h3>
          <h3>Quiz Name</h3>
          <h3>Created on</h3>
          <h3>Impression</h3>
        </div>
        {
          allquiz.map((quiz, index) => {
            return(
              <div className={styles.detailvalue}>
              <h3>{index + 1}</h3>
              <h3>{quiz.quizname}</h3>
              <h3>{quiz.created_on}</h3>
              <h3>{quiz.impression}</h3>
              <div>
                <img src={editimg} alt="" 
                onClick={() => handleedit(quiz)}
                />
                <img src={deleteimg} alt="" 
                onClick={() => handledelete(quiz)}
                />
                <CopyToClipboard text={"https://quiz-play-app.vercel.app/quizplay/" + quiz._id}>
                <img src={shareimg} alt="" 
                onClick={copytexttoclipboard}
                />
                </CopyToClipboard>
              </div>
              <NavLink to = {`/analytics/${index}`}>
                <p>Question Wise Analysis</p>
              </NavLink>
              </div>
            )
          })
        }
      </div>
    </div>
    {
    displaydeletecont && 
    <div className={styles.deletecontainer}>
        <div className={styles.deletecard}>
          <h1>Are you confirm you want to delete ?</h1>
          <div>
            <button onClick={handleconfirmdelete}>Confirm Delete</button>
            <button onClick={() => setdisplaydeletecont(false)}>Cancel</button>
          </div>
        </div>
    </div>
    }
    <ToastContainer/>
    </>
  )
}

export default Analytics