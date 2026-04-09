let number = document.querySelector(".number")
let text = document.querySelector(".text")
let circle = document.querySelector("circle")

let counter = 0

setInterval(()=>{
    if(counter===35){
        clearInterval()
    }else{
        counter+=1
        number.innerHTML = counter + "%"
        text.innerHTML = 'Skills'
        text.style.fontWeight='bold'
        // Calculate stroke-dashoffset based on counter (0-100 scale)
        // stroke-dasharray is 25, so: offset = 25 - (counter/100 * 25)
        circle.style.strokeDashoffset = 25 - (counter / 100 * 25)
    }
},30)