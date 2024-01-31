import {createSlice} from "@reduxjs/toolkit"

const Questionslice = createSlice({
    name : "question",
    initialState : {
        questionarr : [
            {
                question : "",
                option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                optiontype : "text",
                optioncount : 2,
                correct : 0,
                incorrect : 0,
                correctoption : 0         
            }
        ]
    },
    reducers : {
        addquestion : (state, action) =>{
            state.questionarr[action.payload.selectedquestion] = action.payload.questionobj
            state.questionarr = [...state.questionarr, {
                question : "",
                option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                optiontype : "text",
                optioncount : 2,
                correct : 0,
                incorrect : 0,
                correctoption : 0             
            }]
        },
        deletequestion : (state, action) =>{
            state.questionarr = [...state.questionarr.filter((questionobj, index) => index != action.payload)]
        },
        updatequestion : (state, action) =>{
            state.questionarr[action.payload.selectedquestion] = action.payload.questionobj
        },
        resetquestion : (state, action) =>{
            state.questionarr = [
                {
                    question : "",
                    option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                    optiontype : "text",
                    optioncount : 2,
                    correct : 0,
                    incorrect : 0,
                    correctoption : 0         
                }
            ]
        },
        setquestionarr : (state, action) =>{
            state.questionarr = action.payload
        }
    }
})

export const {setquestionarr, addquestion, deletequestion, updatequestion, resetquestion} = Questionslice.actions
export default Questionslice.reducer