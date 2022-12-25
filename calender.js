"use strict";
const globalDate = new Date();
const selected = {};
let maxDate = globalDate;
let minDate = globalDate;

const calender = document.getElementById("calender-wrapper");
const datesDiv = calender.querySelector("#dates-wrap");
let scrollPos = datesDiv.scrollLeft;
datesDiv.addEventListener("scroll",()=>{scrollPos = datesDiv.scrollLeft})
onLoad1(calender,datesDiv);


function onLoad1(calender,datesDiv) {
    


    const leftBtn = calender.querySelector("#left");
    const rightBtn = calender.querySelector("#right");
    initialLoading(globalDate, datesDiv);


    leftBtn.addEventListener("click",()=>{
        if (datesDiv.scrollLeft <= 0) {
            //datesDiv.replaceChild(divAppenderBackward(minDate, 1, 0),datesDiv.childNodes[datesDiv.childNodes.length-1]);
            datesDiv.removeChild(datesDiv.childNodes[datesDiv.childNodes.length-1]);
            datesDiv.prepend(...divAppenderBackward(minDate, 1, 0));
            maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() - 1);
            scrollPos = datesDiv.scrollLeft = scrollPos - 100;
        }

    });
    rightBtn.addEventListener("click",()=>{
        if ((datesDiv.scrollLeft + datesDiv.clientWidth) >= datesDiv.scrollWidth) {
            datesDiv.removeChild(datesDiv.firstElementChild);
            //console.log(datesDiv);
            datesDiv.appendChild(...divAppenderForward(maxDate, 1, 1));
            minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 1);
            scrollPos = datesDiv.scrollLeft = scrollPos + 100;
        }

    });


}

function initialLoading(globalDate, datesDiv) {
    const fragment = document.createDocumentFragment();
    
    let fwd = divAppenderForward(globalDate);
    fragment.append(...fwd);
    datesDiv.append(fragment);
}

function divAppenderForward(date, e = 20, next = 0) {

    const divArr = [];
    let i = 0;
    while (i < e) {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i + next);
        divArr[i] = datesDivCreater(d);
        maxDate = d;
        i++;
    }
    //console.log(divArr);
    return divArr;

}

function divAppenderBackward(date, e = 20, prev = 0) {
    const divArr = [];
    let i = e - 1;
    while (i >= 0) {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (e - 1) + i - 1 - prev);
        divArr[i] = datesDivCreater(d);
        minDate = d;
        i--;
    }
    //console.log(divArr);
    return divArr;

}


function datesDivCreater(dates) {

    let { day, month, monthDate, year } = dateFormate(dates);
    const div = document.createElement("div");
    if (dates.toDateString() === new Date(globalDate.getFullYear(), globalDate.getMonth(), globalDate.getDate()).toDateString()) {
        div.className=("dates present");
    }else {
        div.className = "dates";
    }
    //selected.date && console.log(dates.toDateString(),new Date(selected.date).toDateString());
    if(selected.date && dates.toDateString() === new Date(selected.date).toDateString()){
        div.classList.add("selected");
    }
    div.dataset.date = dates;
    div.addEventListener("click",(e)=>{
        if(div.classList.contains("selected")){
            div.classList.remove("selected");
            selected.date = null;
            
        }else if(datesDiv.querySelector(".selected")){
            //console.log(datesDiv.querySelector(".selected"));
            datesDiv.querySelector(".selected").classList.remove("selected");
            div.classList.add("selected");
            selected.date = div.dataset.date;
        }else{
            div.classList.add("selected");
            selected.date = div.dataset.date;
        }
        //console.log(selected);
    })


    

    const pDay = document.createElement("p");
    pDay.innerHTML = day;

    const pMonthDate = document.createElement("p");
    pMonthDate.innerHTML = monthDate;

    const pMonth = document.createElement("p");
    pMonth.innerHTML = month;

    const pYear = document.createElement("p");
    pYear.innerHTML = year;

    div.append(pDay, pMonthDate, pMonth, pYear);

    return div;
}

function dateFormate(date) {
    const d = new Date(date);

    let year = d.getFullYear();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()];

    let monthDate = d.getDate();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];

    return { day, month, monthDate, year };
}
