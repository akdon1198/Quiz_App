import React, { useEffect, useState } from 'react'
import styles from "./Quizcard2.module.css"
import deleteimg from "../../images/deleteimg.png"
import crossimg from "../../images/crossimg.png"
import addimg from "../../images/addimg.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { commonapiurl } from '../../Constant'
import { createdate } from '../../Utils/Createdate'
import { useDispatch, useSelector } from 'react-redux'
import {addquestion, updatequestion, deletequestion, resetquestion} from "../../redux/Questionslice"
import { checkcreatequizvalid } from '../../Utils/Validatecreatequiz'
import { addpoll, deletepoll, resetpoll, updatepoll } from '../../redux/Pollslice'
import { setquizcreatedid } from '../../redux/Quizslice'
import { setcardnumber, setquizeditid, settimer } from '../../redux/Quizeditslice'
const Quizcard2 = () => {
    const history = useNavigate()
    const dispatch = useDispatch()  
    const quizname = useSelector(store => store.quizedit.quizname)
    const quiztype = useSelector(store => store.quizedit.quiztype)
    const quizeditid = useSelector(store => store.quizedit.quizeditid)
    const userid = useSelector(store => store.user.userid)
    const questionarr = useSelector(store => store.question.questionarr)
    const pollarr = useSelector(store => store.poll.pollarr)
    const timer = useSelector(store => store.quizedit.timer)
    const[selectedquestion, setselectedquestion] = useState(0)
    const[optioncount, setoptioncount] = useState(2)
    const[op1, setop1] = useState({img:"", text:""})
    const[op2, setop2] = useState({img:"", text:""})
    const[op3, setop3] = useState({img:"", text:""})
    const[op4, setop4] = useState({img:"", text:""})
    const[optionarr, setoptionarr] = useState([
        {text:"",img:""}, {text:"",img:""}, {text:"",img:""}, {text:"",img:""}
    ])
    const[quizcreate, setquizcreate] = useState(false)
    const[question, setquestion] = useState("")
    const[optiontype, setoptiontype] = useState("text")
    const[correctoption, setcorrectoption] = useState(0)
    if(quizcreate){
        const date = createdate()
        if(quizeditid == ""){
            axios.post(commonapiurl + "quiz/addquiz", {
                quizname, quiztype, questionarr, pollarr, userid, timer, date
            }).then((response) => {
                dispatch(setquizcreatedid(response.data.quizobj._id))
                dispatch(settimer(0))
            }).catch((err) => {
                console.log("error occured");
            })
        }else{
            axios.patch(commonapiurl + "quiz/updatequiz/" + quizeditid, {
                quizname, quiztype, questionarr, pollarr, userid, timer, created_on : date
            }).then(response => {
                dispatch(setquizcreatedid(quizeditid))
                dispatch(setquizeditid(""))
                dispatch(settimer(0))
            }).catch(err =>{
                console.log("some error occur");
            })
        }
        quiztype == "qna"?
        dispatch(resetquestion())
        :
        dispatch(resetpoll())
        dispatch(setcardnumber(3))
    }
    function handledelete(optionnumber){
        if(quizeditid){
            alert("You cannot delete option")
            return
        }
        setoptioncount(optioncount - 1);
        if(correctoption == optionnumber){
            setcorrectoption(0)
        }
        if(optionnumber == 3){
            setoptionarr([...optionarr.map((optionobj, index) =>{
                if(optionnumber == index + 1) return {img:op4.img, text:op4.text}
                else if(index == 3) return {img : "", text:""}
                else return optionobj
            })])
            setop3({img: op4.img, text:op4.text})
            setop4({img:"",text:""})
        }else{
            setoptionarr([...optionarr.map((optionobj, index) =>{
                if(index == 3) return {img : "", text:""}
                else return optionobj
            })])
            setop4({img:"", text:""})
        }
    }
    function handleadd(){
        if(quizeditid){
            alert("You cannot add new question")
            return;
        }
        quiztype == "qna" ?
        dispatch(addquestion({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                correct : 0,
                incorrect : 0,
                correctoption : correctoption     
            },
            selectedquestion: selectedquestion
        }))
        :
        dispatch(addpoll({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                optionA : 0,
                optionB : 0,
                optionC : 0,
                optionD : 0
            },
            selectedquestion: selectedquestion
        }))
        if(quiztype == "qna"){
            setselectedquestion(questionarr.length)
        }else{
            setselectedquestion(pollarr.length)
        }
    }
    function removequestion(index){
        if(quizeditid){
            alert("You cannot remove question")
            return;
        }
        if(quiztype == "qna"){
            dispatch(updatequestion({
                questionobj :{
                    question : question,
                    option : [op1, op2, op3, op4],
                    optiontype : optiontype,
                    optioncount : optioncount,
                    correct : 0,
                    incorrect : 0,
                    correctoption : correctoption     
                },
                selectedquestion: selectedquestion
            }))
            dispatch(deletequestion(index))
        }else{
            dispatch(updatepoll({
                questionobj :{
                    question : question,
                    option : [op1, op2, op3, op4],
                    optiontype : optiontype,
                    optioncount : optioncount,
                    optionA : 0,
                    optionB : 0,
                    optionC : 0,
                    optionD : 0    
                },
                selectedquestion: selectedquestion
            }))
            dispatch(deletepoll(index))
        }
        setselectedquestion(index - 1)
    }
    function storequestion(index){
        if(quizeditid && quiztype == "qna"){
            let imgcount = 0, textcount = 0;
            if(questionarr[selectedquestion].question == question &&
                questionarr[selectedquestion].correctoption == correctoption    
            ){
                questionarr[selectedquestion].option.forEach((optionobj, i) =>{
                    if(i < optioncount){
                        optionobj.text == optionarr[i].text && textcount++
                        optionobj.img == optionarr[i].img && imgcount++
                    }
                })
                if(optiontype == "text" && optioncount == textcount){
                    setselectedquestion(index)
                    return;
                }else if(optiontype == "img" && optioncount == imgcount){
                    setselectedquestion(index)
                    return;
                }else if(optioncount == textcount && optioncount == imgcount){
                    setselectedquestion(index)
                    return;
                }    
            }
        }
        if(quizeditid && quiztype == "poll"){
            let imgcount = 0, textcount = 0;
            if(pollarr[selectedquestion].question == question){
                pollarr[selectedquestion].option.forEach((optionobj, i) =>{
                    if(i < optioncount){
                        optionobj.text == optionarr[i].text && textcount++
                        optionobj.img == optionarr[i].img && imgcount++
                    }
                })
                if(optiontype == "text" && optioncount == textcount){
                    setselectedquestion(index)
                    return;
                }else if(optiontype == "img" && optioncount == imgcount){
                    setselectedquestion(index)
                    return;
                }else if(optioncount == textcount && optioncount == imgcount){
                    setselectedquestion(index)
                    return;
                }    
            }
        }
        quiztype == "qna" ? 
        dispatch(updatequestion({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                correct : 0,
                incorrect : 0,
                correctoption : correctoption     
            },
            selectedquestion: selectedquestion
        }))
        :
        dispatch(updatepoll({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                optionA : 0,
                optionB : 0,
                optionC : 0,
                optionD : 0
            },
            selectedquestion: selectedquestion
        }))
        setselectedquestion(index)
    }
    function handlecancelclick(){
        dispatch(setcardnumber(1))
        dispatch(setquizeditid(""))
        dispatch(settimer(0))
        if(quiztype == "qna"){
            dispatch(resetquestion())
        }else{
            dispatch(resetpoll())
        }
        history("/dashboard")
    }
    function createquiz(){
        if(quizeditid){
            if(quiztype == "qna"){
                let imgcount = 0, textcount = 0;
                if(questionarr[selectedquestion].question == question &&
                    questionarr[selectedquestion].correctoption == correctoption    
                ){
                    questionarr[selectedquestion].option.forEach((optionobj, i) =>{
                        if(i < optioncount){
                            optionobj.text == optionarr[i].text && textcount++
                            optionobj.img == optionarr[i].img && imgcount++
                        }
                    })
                    if(optiontype == "text" && optioncount == textcount){
                        setquizcreate(true)
                        return;
                    }else if(optiontype == "img" && optioncount == imgcount){
                        setquizcreate(true)
                        return;
                    }else if(optioncount == textcount && optioncount == imgcount){
                        setquizcreate(true)
                        return;
                    }        
                }
            }else{
                let textcount = 0, imgcount = 0
                if(pollarr[selectedquestion].question == question){
                    pollarr[selectedquestion].option.forEach((optionobj, i) =>{
                        if(i < optioncount){
                            optionobj.text == optionarr[i].text && textcount++
                            optionobj.img == optionarr[i].img && imgcount++
                        }
                    })
                    if(optiontype == "text" && optioncount == textcount){
                        setquizcreate(true)
                        return;
                    }else if(optiontype == "img" && optioncount == imgcount){
                        setquizcreate(true)
                        return;
                    }else if(optioncount == textcount && optioncount == imgcount){
                        setquizcreate(true)
                        return;
                    }        
                }
            }
        }
        const isvalid = checkcreatequizvalid(
            selectedquestion,
            question, 
            op1,
            op2,
            op3,
            op4,
            correctoption,
            optiontype,
            questionarr,
            pollarr,
            optioncount,
            quiztype
        )
        if(!isvalid){
            alert("Either option not checked or question field Empty or option Empty")
            return
        }
        quiztype == "qna" ?
        dispatch(updatequestion({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                correct : 0,
                incorrect : 0,
                correctoption : correctoption
            },
            selectedquestion: selectedquestion
        }))
        :
        dispatch(updatepoll({
            questionobj :{
                question : question,
                option : [op1, op2, op3, op4],
                optiontype : optiontype,
                optioncount : optioncount,
                optionA : 0,
                optionB : 0,
                optionC : 0,
                optionD : 0
            },
            selectedquestion: selectedquestion
        }))
        setquizcreate(true)
    }
    function handletimer(timerval){
        if(quizeditid){
            alert("You cannot edit timer")
            return
        }
        dispatch(settimer(timerval))
    }
    function handleoptiontype(optionval){
        if(quizeditid){
            alert("You cannot edit optiontype")
            return;
        }
        setoptiontype(optionval)
    }
    function handleoptionchange(e, option){
        if(option == 0){
            setop1({...op1, [e.target.name] : e.target.value})
            setoptionarr([...optionarr.map((optionobj, index)=>{
                if(index == option) return {...optionobj, [e.target.name] : e.target.value}
                else return optionobj
            })])
        }else if(option == 1){
            setop2({...op2, [e.target.name] : e.target.value})
            setoptionarr([...optionarr.map((optionobj, index)=>{
                if(index == option) return {...optionobj, [e.target.name] : e.target.value}
                else return optionobj
            })])
        }else if(option == 2){
            setop3({...op3, [e.target.name] : e.target.value})
            setoptionarr([...optionarr.map((optionobj, index)=>{
                if(index == option) return {...optionobj, [e.target.name] : e.target.value}
               else return optionobj
            })])
        }else{
            setop4({...op4, [e.target.name] : e.target.value})
            setoptionarr([...optionarr.map((optionobj, index)=>{
                if(index == option) return {...optionobj, [e.target.name] : e.target.value}
                else return optionobj
            })])
        }
    }
    function addnewoption(){
        if(quizeditid){
            alert("You cannot add new option")
            return;
        }
        setoptioncount(optioncount + 1)
    }
    useEffect(()=>{
        if(quiztype == "qna"){
            setquestion(questionarr[selectedquestion].question)
            setcorrectoption(questionarr[selectedquestion].correctoption)
            setoptiontype(questionarr[selectedquestion].optiontype)
            setop1(questionarr[selectedquestion].option[0])
            setop2(questionarr[selectedquestion].option[1])
            setop3(questionarr[selectedquestion].option[2])
            setop4(questionarr[selectedquestion].option[3])
            setoptionarr([
                questionarr[selectedquestion].option[0],
                questionarr[selectedquestion].option[1],
                questionarr[selectedquestion].option[2],
                questionarr[selectedquestion].option[3]
            ])
            setoptioncount(questionarr[selectedquestion].optioncount)
        }else{
            setquestion(pollarr[selectedquestion].question)
            setoptiontype(pollarr[selectedquestion].optiontype)
            setop1(pollarr[selectedquestion].option[0])
            setop2(pollarr[selectedquestion].option[1])
            setop3(pollarr[selectedquestion].option[2])
            setop4(pollarr[selectedquestion].option[3])
            setoptionarr([
                pollarr[selectedquestion].option[0],
                pollarr[selectedquestion].option[1],
                pollarr[selectedquestion].option[2],
                pollarr[selectedquestion].option[3]
            ])
            setoptioncount(pollarr[selectedquestion].optioncount)
        }
        console.log("called");
    },[selectedquestion])
  return (
    <div className={styles.maincontainer}>
        <div className={styles.questionclass}>
            <div className={styles.questionnumbercontainer}>
                {
                    Array(Math.max(questionarr.length, pollarr.length)).fill("val").map((questionobj, index) =>{
                        return(
                            <div>
                            <div className={selectedquestion == index ? 
                                `${styles.questionnumber} ${styles.selectedquestion}`:
                                styles.questionnumber
                            }
                            onClick={()=>storequestion(index)}>
                            {index + 1}
                            </div>
                            {
                                index > 0 && 
                                <img src={crossimg} alt="" 
                                onClick={() => removequestion(index)}
                                />
                            }
                            </div>
                        )
                    })
                }
                {
                    Math.max(questionarr.length, pollarr.length) < 5 && 
                    <img src={addimg} alt="" 
                    onClick={handleadd}
                    />
                }
            </div>
            <h4>Max 5 questions</h4>
        </div>
        <input type="text" 
        placeholder={quiztype == "qna" ? "QnA question" : "Poll question"}
        onChange={(e)=>setquestion(e.target.value)}
        value={question}
        />
        <div className={styles.optiontype}>
            <h4>Option Type</h4>
            <div>
                <input type="radio" className={styles.radio}
                onChange={()=>handleoptiontype("text")}
                checked={optiontype == "text" ? true : false}
                />
                <label>Text</label>
            </div>
            <div>
                <input type="radio" className={styles.radio}
                checked={optiontype == "img" ? true : false}
                onChange={()=>handleoptiontype("img")}
                />
                <label>image URL</label>
            </div>
            <div>
                <input type="radio" className={styles.radio}
                checked={optiontype == "textimg" ? true : false}
                onChange={()=>handleoptiontype("textimg")}
                />
                <label>Text & image URL</label>
            </div>
        </div>
        <div className={styles.optioncontainer}>
            {
                Array(optioncount).fill("val").map((optionobj, index) =>{
                    return(
                        <div className={styles.option}>
                        {
                            quiztype == "qna" &&
                            <input type="radio" className={styles.radio}
                            onChange={()=>setcorrectoption(index + 1)}
                            checked={correctoption == index + 1 ? true : false}
                            />
                        }
                        {
                            (optiontype == "text" || optiontype == "textimg") &&
                            <input type="text" 
                            placeholder='Text'
                            onChange={(e)=>handleoptionchange(e, index)}
                            name = "text"
                            value={optionarr[index].text}
                            className={correctoption == index + 1 && styles.selectedbttn}
                            />
                        }
                        {
                            (optiontype == "img" || optiontype == "textimg") &&
                            <input type="text" 
                            placeholder='image URL'
                            onChange={(e)=>handleoptionchange(e, index)}
                            name = "img"
                            value={optionarr[index].img}
                            className={correctoption == index + 1 && styles.selectedbttn}
                            />
                        }
                        {
                        index > 1 &&
                        <img src={deleteimg}
                        onClick={()=>handledelete(index + 1)}
                        />                            
                        }
                        </div>
                    )
                })
            }
            {
                optioncount < 4 &&
                <button onClick={addnewoption}>Add Option</button>
            }
        </div>
        {
            quiztype == "qna" &&
            <div className={styles.timer}>
                <h4>Timer</h4>
                <button className={timer == 0 && styles.selectedtimer}
                onClick={()=>handletimer(0)}
                >OFF</button>
                <button className={timer == 5 && styles.selectedtimer}
                onClick={()=>handletimer(5)}
                >5sec</button>
                <button className={timer == 10 && styles.selectedtimer}
                onClick={()=>handletimer(10)}
                >10sec</button>
            </div>
        }
        <div className={styles.createquiz}>
            <button onClick={handlecancelclick}>Cancel</button>
            <button onClick={createquiz}
            className={styles.selectedbttn}>Create Quiz</button>
        </div>
    </div>
  )
}

export default Quizcard2