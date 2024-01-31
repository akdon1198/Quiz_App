import { createSlice } from "@reduxjs/toolkit";

const QuizSlice = createSlice({
    name : "quiz",
    initialState : {
        allquiz : [],
        quizcreatedid : "",
    },
    reducers : {
        addquiz : (state, action) =>{
            state.allquiz = action.payload 
        },
        deletequiz : (state, action) =>{
            state.allquiz = [...state.allquiz.filter(quiz => quiz._id != action.payload._id)]
        },
        setquizcreatedid : (state, action) =>{
            state.quizcreatedid = action.payload
        },
    }
})

export const {addquiz, deletequiz, setquizcreatedid} =  QuizSlice.actions
export default QuizSlice.reducer