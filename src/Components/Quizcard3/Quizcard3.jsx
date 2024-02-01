import React from 'react'
import styles from "./Quizcard3.module.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import crossimg from  "../../images/crossimg.png"
import { ToastContainer, toast} from 'react-toastify';
import {CopyToClipboard} from "react-copy-to-clipboard"
import 'react-toastify/dist/ReactToastify.css';
import { setcardnumber} from '../../redux/Quizeditslice'

const Quizcard3 = () => {
  const history = useNavigate()
  const quizcreatedid = useSelector(store => store.quiz.quizcreatedid)
  const dispatch = useDispatch()
  function handleclick(){
    dispatch(setcardnumber(1))
    history("/dashboard")
  }
  function copytexttoclipboard(){
    toast("Link copied to Clipboard")
  }
  return (
    <>
    <div className={styles.maincontainer}>
        <img src={crossimg} alt="" onClick={handleclick}/>
        <h2>Congrats your Quiz is Published!</h2>
        <input type="text" value={"https://quiz-play-app-vful.vercel.app/quizplay/" + quizcreatedid}
        />
        <CopyToClipboard text={"https://quiz-play-app-vful.vercel.app/quizplay/" + quizcreatedid}>
          <button onClick={copytexttoclipboard}>Share</button>
        </CopyToClipboard>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Quizcard3