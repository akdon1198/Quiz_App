import { montharr } from "../Constant";

export const createdate = () =>{
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let yyyy = new Date().getFullYear();
    let tempdate = (date < 10 ? "0" + date : date) + " " + montharr[month] + ", " + yyyy
    return tempdate
}