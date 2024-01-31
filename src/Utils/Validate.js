export const checkvalidatedata = (field, signup)=>{
    const isEmailvalid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.email)
    const ispasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(field.password)
    let isnamevalid = true
    let isconfirmpassvalid = true
    if(signup){
        isnamevalid = field.name != ""
    }
    if(signup){
        isconfirmpassvalid = (field.password && field.password == field.confirmpass)? true : false
    }
    const flag = isEmailvalid && isnamevalid && ispasswordvalid && isconfirmpassvalid
    return {isEmailvalid, ispasswordvalid, isnamevalid, isconfirmpassvalid, flag}
}