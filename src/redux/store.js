import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./Userslice"
import QuizReducer from "./Quizslice"
import QuestionReducer from "./Questionslice"
import PollReducer from "./Pollslice"
import QuizeditReducer from "./Quizeditslice"

const store = configureStore({
    reducer : {
        user : UserReducer,
        quiz : QuizReducer,
        question : QuestionReducer,
        poll : PollReducer,
        quizedit : QuizeditReducer
    }
})

export default store