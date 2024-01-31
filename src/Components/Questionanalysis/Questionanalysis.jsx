import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from "./Questionanalysis.module.css"
import { useAddquiz } from '../../hook/useaddquiz'
const Questionanalysis = () => {
    const allquiz= useAddquiz()
    const quizindex = useLocation().pathname.split("/")[2]
  return (
    <div className={styles.maincontainer}>
        {
            <div className={styles.heading}>
            <h2>{allquiz[quizindex]?.quizname} Question Analysis</h2>
            <h3>
                Created on : {allquiz[quizindex]?.created_on} Impression: {allquiz[quizindex]?.impression}
            </h3>
            </div>
        }
        <div className={styles.questions}>
            {
                allquiz[quizindex]?.quiztype == "qna" &&
                allquiz[quizindex]?.questionarr.map((questionobj, index) => {
                    return(
                        <>
                        <div className={styles.question}>
                        <h2>Q.{index + 1} {questionobj?.question}</h2>
                        <div>
                            <div>
                                <h3>{questionobj.correct + questionobj.incorrect}</h3>
                                <h3>People Attempted the question</h3>
                            </div>
                            <div>
                                <h3>{questionobj.correct}</h3>
                                <h3>people Answered Correctly</h3>
                            </div>
                            <div>
                                <h3>{questionobj.incorrect}</h3>
                                <h3>people Answered Incorrectly</h3>
                            </div>
                        </div>
                        </div>        
                        <hr />
                        </>
                    )
                })
            }
            {
                allquiz[quizindex]?.quiztype == "poll" &&
                allquiz[quizindex]?.pollarr.map((pollobj, index) =>{
                    return(
                        <>
                        <div className={styles.question}>
                        <h2>Q. {index + 1} {pollobj.question}</h2>
                        <div>
                            <div>
                                <span>{pollobj.optionA}</span>
                                <span>option1</span>
                            </div>
                            <div>
                                <span>{pollobj.optionB}</span>
                                <span>option2</span>
                            </div>
                            {
                                pollobj.optioncount >= 3 && 
                                <div>
                                    <span>{pollobj.optionC}</span>
                                    <span>option3</span>
                                </div>
                            }
                            {
                                pollobj.optioncount == 4 &&
                                <div>
                                    <span>{pollobj.optionD}</span>
                                    <span>option4</span>
                                </div>
                            }
                        </div>
                    </div>    
                    <hr />
                    </>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Questionanalysis