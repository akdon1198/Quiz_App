import {createSlice} from "@reduxjs/toolkit"

const userslice = createSlice({
    name : "user",
    initialState : {
        userid : localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).userid || "",
        jwt : localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).jwt || ""
    },
    reducers : {
        adduser : (state, action) =>{
            state.userid = action.payload.userid
            state.jwt = action.payload.jwttoken
            localStorage.setItem("user", JSON.stringify(state))
        },
        resetuser : (state, action) =>{
            state.userid = ""
            state.jwt = ""
            localStorage.setItem("user", JSON.stringify(state))
        }
    }
})

export const {adduser, resetuser} = userslice.actions
export default userslice.reducer