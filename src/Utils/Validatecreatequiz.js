export const checkcreatequizvalid = (selectedquestion, question, op1, op2, op3, 
    op4, correctoption, optiontype, questionarr, pollarr,optioncount, quiztype) =>{
    let isquestionEmpty = false
    let isoptionEmpty = false
    let isoptionnotselected = false
    let textcount = 0
    let imgcount = 0
    op1.text != "" && textcount++
    op2.text != "" && textcount++
    op3.text != "" && textcount++
    op4.text != "" && textcount++
    
    op1.img != "" && imgcount++
    op2.img != "" && imgcount++
    op3.img != "" && imgcount++
    op4.img != "" && imgcount++
    
    if(question == "") isquestionEmpty = true
    if(optiontype == "text"){
        if(textcount != optioncount) isoptionEmpty = true
    }else if(optiontype == "img"){
        if(imgcount != optioncount) isoptionEmpty = true
    }else{
        if(imgcount != optioncount || textcount != optioncount) isoptionEmpty = true
    }
    if(isquestionEmpty || isoptionEmpty) return false
    console.log("called");
    if(quiztype == "poll"){
        for(let i = 0; i < pollarr.length; i++){
            textcount = 0
            imgcount = 0        
            if(i != selectedquestion && pollarr[i].question == ""){
                isquestionEmpty = true
                break;
            }
            if(i != selectedquestion){
                pollarr[i].option.forEach(optionobj =>{
                    optionobj.text != "" && textcount++ 
                    optionobj.img != "" && imgcount++ 
                })
                if(pollarr[i].optiontype == "text"){
                    if(textcount != pollarr[i].optioncount){ isoptionEmpty = true; break;}
                }else if(pollarr[i].optiontype == "img"){
                    if(imgcount != pollarr[i].optioncount){ isoptionEmpty = true; break;}
                }else{
                    if(imgcount != pollarr[i].optioncount || textcount != pollarr[i].optioncount){ isoptionEmpty = true; break;}
                }
            }
        }    
    }
    if(quiztype == "qna"){
        for(let i = 0; i < questionarr.length; i++){
            textcount = 0
            imgcount = 0        
            if(i != selectedquestion && questionarr[i].question == ""){
                isquestionEmpty = true
                break;
            }
            if(i != selectedquestion && questionarr[i].correctoption == 0 || correctoption == 0) isoptionnotselected = true
            if(i != selectedquestion){            
                questionarr[i].option.forEach(optionobj =>{
                        optionobj.text != "" && textcount++ 
                        optionobj.img != "" && imgcount++ 
                })
                if(questionarr[i].optiontype == "text"){
                    if(textcount != questionarr[i].optioncount){ isoptionEmpty = true; break;}
                }else if(questionarr[i].optiontype == "img"){
                    if(imgcount != questionarr[i].optioncount){ isoptionEmpty = true; break;}
                }else{
                    if(imgcount != questionarr[i].optioncount || textcount != questionarr[i].optioncount){ isoptionEmpty = true; break;}
                }
            }
        }
    }
    console.log(isquestionEmpty, isoptionEmpty, isoptionnotselected);
    if(isquestionEmpty || isoptionEmpty || isoptionnotselected){
        return false
    }
    return true
}