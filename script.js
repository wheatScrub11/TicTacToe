const theBody = document.querySelector("body");
const userInputBox = document.querySelector(".user-input");
const gamemodeButton = document.querySelectorAll(".a");
const okButton = document.querySelector('.ok-btn');
const allNineBoxes = document.querySelectorAll(".box");
const player1Score = document.querySelector(".player1-counter");
const player2Score = document.querySelector(".player2-counter");
const gameScore = document.querySelector(".game-counter");
const resBox = document.querySelector(".res-box");
const ex_Or_Circle = document.querySelector(".ex-or-circle");

let player1, player2, player1SS = 0, player2SS = 0, roundSS = 1;

let holder0 = 0;
let holder1 = 0;
let fillAllBoxes = 0;

gamemodeButton.forEach(element => {
    element.addEventListener("click", e =>{
        holder0 += 1;
        
        if(e.target.className == "a userEx"){
            ex_Or_Circle.firstElementChild.style.cssText = "box-shadow: 0px 0px 20px 5px white;"
            ex_Or_Circle.lastElementChild.style.cssText = "box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0);"

        }else if(e.target.className == "a userCircle"){
            ex_Or_Circle.lastElementChild.style.cssText = "box-shadow: 0px 0px 20px 5px white;"
            ex_Or_Circle.firstElementChild.style.cssText = "box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0);"
        }


        if(element.className == "a userEx"){
            player1 = "Ex";
            player2 = "Circle";
            holder1 = 0;
            player1Score.parentNode.style.cssText = "background-color:#31c5bf";
            player2Score.parentNode.style.cssText = "background-color:#f2b235";
        }else{
            player1 = "Circle";
            player2 = "Ex";
            holder1 = 1;
            player1Score.parentNode.style.cssText = "background-color:#f2b235";
            player2Score.parentNode.style.cssText = "background-color:#31c5bf";
        }
    })
});

okButton.addEventListener("click", e =>{
    holder0 > 0 ? theBody.removeChild(userInputBox) : 0
})

const reset = function(){
    fillAllBoxes = 9;
    setTimeout(() => {
        for(let i = 0; i < allNineBoxes.length; ++i){
            if(allNineBoxes[i].id == "hasMarked"){
                allNineBoxes[i].removeAttribute("id");
                allNineBoxes[i].removeChild(allNineBoxes[i].firstElementChild)
                allNineBoxes[i].style.cssText = "background-color:#1f3540"
                if(player1 == "Circle"){holder1 = 1}else{holder1 = 0}
            }
        }
        fillAllBoxes = 0;
    }, 1000);
}

resBox.addEventListener("click", e =>{
    for(let i = 0; i < allNineBoxes.length; ++i){
        if(allNineBoxes[i].id == "hasMarked"){
            allNineBoxes[i].removeAttribute("id");
            allNineBoxes[i].removeChild(allNineBoxes[i].firstElementChild)
            allNineBoxes[i].style.cssText = "background-color:#1f3540"
            if(player1 == "Circle"){holder1 = 1}else{holder1 = 0}
        }
    }
    fillAllBoxes = 0, player1SS = 0, player2SS = 0, roundSS = 1;
    gameScore.innerText = `${roundSS}`
    player1Score.innerText = `${player1SS}`
    player2Score.innerText = `${player2SS}`
})

for(let i = 0; i < allNineBoxes.length; ++i){
    allNineBoxes[i].addEventListener("click", e =>{
        fillAllBoxes += 1;

        let exSVG = document.createElement("img");
        exSVG.setAttribute("id", "Equis");
        exSVG.style.cssText = "height:130px;width:130px;"
        exSVG.src = "Photos/ex.svg";

        let circleSVG = document.createElement("img");
        circleSVG.setAttribute("id", "Circulo");
        circleSVG.style.cssText = "height:130px;width:130px;"
        circleSVG.src = "Photos/cr.svg";

        if(holder1 == 0 && fillAllBoxes < 10){
            if(allNineBoxes[i].id == "hasMarked"){
                fillAllBoxes -= 1;
                    
            }else{
                allNineBoxes[i].appendChild(exSVG);
                allNineBoxes[i].setAttribute("id", "hasMarked");
                holder1 = 1;
            }
            
        }else if(holder1 == 1 && fillAllBoxes < 10){
            if(allNineBoxes[i].id == "hasMarked"){
                fillAllBoxes -= 1;
                    
            }else{
                allNineBoxes[i].appendChild(circleSVG);
                allNineBoxes[i].setAttribute("id", "hasMarked")
                holder1 = 0;
            }
        }
        
        

        try {
            if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 3].lastElementChild.id == "Circulo") && 
            (allNineBoxes[i + 6].lastElementChild.id == "Circulo")) || (((allNineBoxes[i].lastElementChild.id == "Equis") &&
            (allNineBoxes[i + 3].lastElementChild.id == "Equis") && (allNineBoxes[i + 6].lastElementChild.id == "Equis")))){
                
                allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i + 3].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i + 6].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                
                roundSS += 1;
                gameScore.innerText = `${roundSS}`

                if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 3].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i + 6].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 3].lastElementChild.id == "Equis") &&
                (allNineBoxes[i + 6].lastElementChild.id == "Equis") && (player1 == "Ex")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }
                else{
                    player2SS += 1;
                    player2Score.innerText = `${player2SS}`;
                }
                
                reset();
            }
        } catch (error) {}
        try {
            if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 3].lastElementChild.id == "Circulo") && 
            (allNineBoxes[i + 3].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
            (allNineBoxes[i - 3].lastElementChild.id == "Equis") && (allNineBoxes[i + 3].lastElementChild.id == "Equis"))){

                allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i - 3].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i + 3].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                

                roundSS += 1;
                gameScore.innerText = `${roundSS}`
                
                if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 3].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i + 3].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i - 3].lastElementChild.id == "Equis") &&
                (allNineBoxes[i + 3].lastElementChild.id == "Equis") && (player1 == "Ex")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }
                else{
                    player2SS += 1;
                    player2Score.innerText = `${player2SS}`;
                }

                reset();
            }
        } catch (error) {}
        try {
            if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 3].lastElementChild.id == "Circulo") && 
            (allNineBoxes[i - 6].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
            (allNineBoxes[i - 3].lastElementChild.id == "Equis") && (allNineBoxes[i - 6].lastElementChild.id == "Equis"))){

                allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i - 3].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                allNineBoxes[i - 6].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                
                roundSS += 1;
                gameScore.innerText = `${roundSS}`
                
                if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 3].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i - 6].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i - 3].lastElementChild.id == "Equis") &&
                (allNineBoxes[i - 6].lastElementChild.id == "Equis") && (player1 == "Ex")){
                    player1SS += 1;
                    player1Score.innerText = `${player1SS}`;
                }
                else{
                    player2SS += 1;
                    player2Score.innerText = `${player2SS}`;
                }

                reset();
            }
        } catch (error) {}
        try {
            if((i == 0) || (i == 3) || (i == 6)){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 1].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i + 2].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                (allNineBoxes[i + 1].lastElementChild.id == "Equis") && (allNineBoxes[i + 2].lastElementChild.id == "Equis"))){

                    allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i + 1].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i + 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                    
                    roundSS += 1;
                    gameScore.innerText = `${roundSS}`
                
                    if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 1].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i + 2].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 1].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i + 2].lastElementChild.id == "Equis") && (player1 == "Ex")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }
                    else{
                        player2SS += 1;
                        player2Score.innerText = `${player2SS}`;
                    }

                    reset();
                }
            }
        } catch (error) {}
        try {
            if((i == 1) || (i == 4) || (i == 7)){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 1].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i - 1].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                (allNineBoxes[i + 1].lastElementChild.id == "Equis") && (allNineBoxes[i - 1].lastElementChild.id == "Equis"))){

                    allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i + 1].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i - 1].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                    
                    roundSS += 1;
                    gameScore.innerText = `${roundSS}`
                
                    if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 1].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 1].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 1].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i - 1].lastElementChild.id == "Equis") && (player1 == "Ex")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }
                    else{
                        player2SS += 1;
                        player2Score.innerText = `${player2SS}`;
                    }

                    reset();
                }
            }
        } catch (error) {}
        try {
            if((i == 2) || (i == 5) || (i == 8)){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 1].lastElementChild.id == "Circulo") && 
                (allNineBoxes[i - 2].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                (allNineBoxes[i - 1].lastElementChild.id == "Equis") && (allNineBoxes[i - 2].lastElementChild.id == "Equis"))){

                    allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i - 1].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                    allNineBoxes[i - 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                    
                    roundSS += 1;
                    gameScore.innerText = `${roundSS}`
                
                    if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 1].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 2].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i - 1].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i - 2].lastElementChild.id == "Equis") && (player1 == "Ex")){
                        player1SS += 1;
                        player1Score.innerText = `${player1SS}`;
                    }
                    else{
                        player2SS += 1;
                        player2Score.innerText = `${player2SS}`;
                    }

                    reset();
                }
            }
        } catch (error) {}
        try {
            if(i == 0){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 4].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i + 8].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i + 4].lastElementChild.id == "Equis") && (allNineBoxes[i + 8].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 8].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 4].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i + 8].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 4].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i + 8].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}
        try {
            if(i == 4){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 4].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 4].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i + 4].lastElementChild.id == "Equis") && (allNineBoxes[i - 4].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 4].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i - 4].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 4].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i - 4].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}
        try {
            if(i == 8){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 4].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 8].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i - 4].lastElementChild.id == "Equis") && (allNineBoxes[i - 8].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 8].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 4].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i - 8].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i - 4].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i - 8].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}
        try {
            if(i == 2){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 2].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i + 4].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i + 2].lastElementChild.id == "Equis") && (allNineBoxes[i + 4].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 2].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i + 4].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 2].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i + 4].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}
        try {
            if(i == 4){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 2].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 2].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i + 2].lastElementChild.id == "Equis") && (allNineBoxes[i - 2].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i + 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i + 2].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i - 2].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i + 2].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i - 2].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}
        try {
            if(i == 6){
                if(((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 2].lastElementChild.id == "Circulo") && 
                    (allNineBoxes[i - 4].lastElementChild.id == "Circulo")) || ((allNineBoxes[i].lastElementChild.id == "Equis") &&
                    (allNineBoxes[i - 2].lastElementChild.id == "Equis") && (allNineBoxes[i - 4].lastElementChild.id == "Equis"))){

                        allNineBoxes[i].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 2].style.cssText = `background-color: rgba(76, 255, 81, 1)`
                        allNineBoxes[i - 4].style.cssText = `background-color: rgba(76, 255, 81, 1)`

                        
                        roundSS += 1;
                        gameScore.innerText = `${roundSS}`
                
                        if((allNineBoxes[i].lastElementChild.id == "Circulo") && (allNineBoxes[i - 2].lastElementChild.id == "Circulo") && 
                        (allNineBoxes[i - 4].lastElementChild.id == "Circulo") && (player1 == "Circle")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }else if((allNineBoxes[i].lastElementChild.id == "Equis") && (allNineBoxes[i - 2].lastElementChild.id == "Equis") &&
                        (allNineBoxes[i - 4].lastElementChild.id == "Equis") && (player1 == "Ex")){
                            player1SS += 1;
                            player1Score.innerText = `${player1SS}`;
                        }
                        else{
                            player2SS += 1;
                            player2Score.innerText = `${player2SS}`;
                        }

                        reset();
                    }
            }
        } catch (error) {}

        fillAllBoxes == 9 ? reset() : false
    })
}

