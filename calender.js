const globalDate = new Date();
let maxDate = globalDate;
let minDate = globalDate;

const calender = document.getElementById("calender-wrapper");
calender.addEventListener("load", () => { onLoad() })

const datesDiv = calender.querySelector("#dates-wrap");

let currPos = datesDiv.scrollLeft;


function rightScroll(){
    const datesDiv = calender.querySelector("#dates-wrap");
    if ((datesDiv.scrollLeft + datesDiv.clientWidth) >= datesDiv.scrollWidth) {
        datesDiv.removeChild(datesDiv.firstElementChild);
        console.log(datesDiv);
        datesDiv.appendChild(...divAppenderForward(maxDate, 1, 1));
        minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 1);
        currPos = datesDiv.scrollLeft = currPos + 100;
    }else{
        currPos = datesDiv.scrollLeft = currPos + 100;
    }

}

function leftScroll(){
    const datesDiv = calender.querySelector("#dates-wrap");
    if (datesDiv.scrollLeft <= 0) {
        datesDiv.removeChild(datesDiv.lastElementChild);
        datesDiv.prepend(...divAppenderBackward(minDate, 1, 0));
        maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate() - 1);
        currPos = datesDiv.scrollLeft = currPos - 100;
    }else{
        currPos = datesDiv.scrollLeft = currPos - 100;
    }

}


function onLoad() {
    //let bwd = divAppenderBackward(date);
    let fwd = divAppenderForward(globalDate);
    datesDiv.append(...fwd);
    console.log(datesDiv);

    /* datesDiv.addEventListener('scroll', () => {

        if ((datesDiv.scrollLeft + datesDiv.clientWidth) >= datesDiv.scrollWidth) {
            datesDiv.removeChild(datesDiv.firstElementChild);
            datesDiv.appendChild(...divAppenderForward(maxDate, 1, 1));
        } else if (datesDiv.scrollLeft <= 0) {
            datesDiv.removeChild(datesDiv.lastElementChild);
            datesDiv.prepend(...divAppenderBackward(minDate, 1, 0));
            

        }

    }); */

}

function divAppenderForward(date, e = 20, next = 0) {


    const divArr = [];
    let i = 0;
    while (i < e) {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i + next);
        divArr[i] = datesDivCreater(d);
        //console.log(d,new Date(globalDate.getFullYear(), globalDate.getMonth(), globalDate.getDate()));
        if(d.toDateString() === new Date(globalDate.getFullYear(), globalDate.getMonth(), globalDate.getDate()).toDateString()){
            divArr[i].classList.add("present");  
        }
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
    div.className = "dates";

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

