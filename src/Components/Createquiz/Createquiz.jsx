import React from 'react'
import styles from "./Createquiz.module.css"
import Quizcard1 from '../Quizcard1/Quizcard1'
import Quizcard2 from '../Quizcard2/Quizcard2'
import Quizcard3 from '../Quizcard3/Quizcard3'
import { useSelector } from 'react-redux'
const Createquiz = () => {
  const cardnumber = useSelector(store => store.quizedit.cardnumber)
  return (
    <div className={styles.maincontainer}>
      {
        cardnumber == 1 && <Quizcard1 />
      }
      {
        cardnumber == 2 && <Quizcard2/>
      }
      {
        cardnumber == 3 && <Quizcard3/>
      }
    </div>
  )
}

export default Createquiz