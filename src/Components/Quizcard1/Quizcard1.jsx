import React, { useState } from 'react'
import styles from "./Quizcard1.module.css"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setcardnumber, setquizname, setquiztype } from '../../redux/Quizeditslice'
const Quizcard1 = () => {
  const[quiztypetemp, setquiztypetemp] = useState("")
  const[quiznametemp, setquiznametemp] = useState("")
  const history = useNavigate()
  const dispatch = useDispatch()
  const cardnumber = useSelector(store => store.quizedit.cardnumber)
  function handleclick(){
    history("/dashboard")
  }
  function addnametype(){
    if(quiznametemp == "" || quiztypetemp == ""){
      alert("Please fill all the details")
      return;
    }
    dispatch(setcardnumber(2))
    dispatch(setquizname(quiznametemp))
    dispatch(setquiztype(quiztypetemp))
  }
  return (
    <div className={styles.maincontainer}>
      <input type="text" 
      placeholder='Quiz name'
      onChange={(e) => setquiznametemp(e.target.value)}
      value={quiznametemp}
      />
      <div className={styles.quiztypebttn}>
        <h3>Quiz Type</h3>
        <button className={quiztypetemp == "qna" && styles.selectedbttn} 
        onClick={()=>setquiztypetemp("qna")}
        >Q & A</button>
        <button className={quiztypetemp == "poll" && styles.selectedbttn}
        onClick={()=>setquiztypetemp("poll")}
        >Poll Type</button>
      </div>
      <div className={styles.continuebttn}>
        <button onClick={handleclick}>Cancel</button>
        <button onClick={addnametype} className={styles.selectedbttn}>Continue</button>
      </div>
    </div>
  )
}

export default Quizcard1