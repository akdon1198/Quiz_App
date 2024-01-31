import { createSlice } from "@reduxjs/toolkit";

const Pollslice = createSlice({
    name : "poll",
    initialState : {
        pollarr : [
            {
                question : "",
                option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                optiontype : "text",
                optioncount : 2,
            }
        ]
    },
    reducers : {
        addpoll : (state, action) =>{
            state.pollarr[action.payload.selectedquestion] = action.payload.questionobj
            state.pollarr = [...state.pollarr, {
                question : "",
                option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                optiontype : "text",
                optioncount : 2,
            }]
        },
        updatepoll : (state, action) =>{
            state.pollarr[action.payload.selectedquestion] = action.payload.questionobj
        },
        deletepoll : (state, action) =>{
            state.pollarr = [...state.pollarr.filter((questionobj, index) => index != action.payload)]
        },
        resetpoll : (state, action) =>{
            state.pollarr = [
                {
                    question : "",
                    option : [{text:"",img :""},{text:"",img :""},{text:"",img :""},{text:"",img :""}],
                    optiontype : "text",
                    optioncount : 2,
                }    
            ]
        },
        setpollarr : (state, action) =>{
            state.pollarr = action.payload
        }
    }
})

export const {setpollarr, addpoll, updatepoll, deletepoll, resetpoll} = Pollslice.actions
export default Pollslice.reducer