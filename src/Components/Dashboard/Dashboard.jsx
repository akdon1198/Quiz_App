import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import outlineeyeimg from "../../images/outlineeyeimg.png"
import { useAddquiz } from '../../hook/useaddquiz'
const Dashboard = () => {
  const allquiz = useAddquiz()
  const[quizcreated, setquizcreated] = useState(0)
  const[totalquestion, settotalquestion] = useState(0)
  const[totalimpression, settotalimpression] = useState(0)
  useEffect(() => {
    let temptotalimpression = 0
    let temptotalquestion = 0
    allquiz.map(quiz => {
      temptotalquestion += (quiz.quiztype == "qna" ? quiz.questionarr.length : quiz.pollarr.length)
      temptotalimpression += quiz.impression
    })
    settotalquestion(temptotalquestion)
    settotalimpression(temptotalimpression)
    setquizcreated(allquiz.length)
  },[allquiz])
  return (
    <div className={styles.maincontainer}>
      <div className={styles.quizdetailcards}>
        <div>
          <span>{quizcreated}</span>
          <span>Quiz</span>
          <h3>Created</h3>
        </div>
        <div>
          <span>{totalquestion}</span>
          <span>questions</span>
          <h3>Created</h3>
        </div>
        <div>
          <span>{totalimpression}</span>
          <span>Total</span>
          <h3>Impressions</h3>
        </div>
      </div>
      <h2>Trending Quizs</h2>
      <div className={styles.trendingquizcards}>
        {
          allquiz?.map(quiz => {
            return(
              <div>
                <div>
                    <h3>{quiz.quizname}</h3>
                    <h3>{quiz.impression}
                      <img src={outlineeyeimg} alt="" />
                    </h3>
                </div>
                <h3>Created on : {quiz.created_on}</h3>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard