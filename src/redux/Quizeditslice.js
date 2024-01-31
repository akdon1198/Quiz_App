import { createSlice } from "@reduxjs/toolkit";

const Quizeditslice = createSlice({
    name : "Quizedit",
    initialState : {
        cardnumber : 1,
        quizname : "",
        quiztype : "",
        quizeditid : "",
        timer : 0
    },
    reducers : {
        setcardnumber : (state, action) =>{
            state.cardnumber = action.payload
        },
        setquizname : (state, action) =>{
            state.quizname = action.payload
        },
        setquiztype : (state, action) =>{
            state.quiztype = action.payload
        },
        setquizeditid : (state, action) =>{
            state.quizeditid = action.payload
        },
        settimer : (state, action) =>{
            state.timer = action.payload
        }
    }
})

export const {setquizeditid, setcardnumber, setquizname, setquiztype, settimer} = Quizeditslice.actions
export default Quizeditslice.reducer