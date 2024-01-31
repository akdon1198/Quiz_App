import { useEffect, useState } from "react";
import { commonapiurl } from "../Constant";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { addquiz } from "../redux/Quizslice";

export const useAddquiz = () =>{
    const allquizinitialstate = useSelector(store => store.quiz.allquiz)
    const[allquiz, setallquiz] = useState(allquizinitialstate)
    const userid = useSelector(store => store.user.userid)
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(commonapiurl + "quiz/getquiz/" + userid)
        .then((response) =>{
            dispatch(addquiz(response.data.allquiz))
        }).catch(err =>{
            console.log("some error occured");
        })
    },[])
    useEffect(()=>{
        setallquiz(allquizinitialstate)
    },[allquizinitialstate])
    return allquiz
}