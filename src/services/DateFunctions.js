function dateFormatFrDMHM (date, convert = 0){
    let d = new Date(date);
    const month = d.getMonth();
    const day = d.getDate();
    let monthFr = getMonthFr(month);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if (hours < 10){
        hours = "0"+hours;
    }
    if (minutes < 10){
        minutes = "0"+minutes;
    }
    return day + " " + monthFr + " "+ hours + "h" + minutes;
}

function dateFormatFrDM (date){
    let d = new Date(date);
    const month = d.getMonth();
    const day = d.getDate();
    let monthFr = getMonthFr(month);

    return day + " " + monthFr
}

function getMonthFr(month){
    let monthFr = "";
    switch (month) {
        case 0:
            return monthFr = "Janvier";
            break;
        case 1:
            return monthFr = "Février";
            break;
        case 2:
            return monthFr = "Mars";
            break;
        case 3:
            return monthFr = "Avril";
            break;
        case 4:
            return monthFr = "Mai";
            break;
        case 5:
            return monthFr = "Juin";
            break;
        case 6:
            return monthFr = "Juillet";
            break;
        case 7:
            return monthFr = "Août";
            break;
        case 8:
            return monthFr = "Septembre";
            break;
        case 9:
            return monthFr = "Octobre";
            break;
        case 10:
            return monthFr = "Novembre";
            break;
        case 11:
            return monthFr = "Décembre";
            break;
    }
}

function orderByDate(a, b) {
    let comparison = 0;
    if (a > b) {
        comparison = 1;
    } else if (a < b) {
        comparison = -1;
    }
    return comparison;
}

function getHoursHMV2(date, convert = 0) {
    let d = new Date(date);
    let hours = d.getHours();
    if (convert == 1){
        hours = hours - 2;
    } else if (convert == -1){
        hours = hours + 2;
    }
    let minutes = d.getMinutes();
    if (hours < 10){
        hours = "0"+hours;
    }
    if (minutes < 10){
        minutes = "0"+minutes;
    }
    return hours+"h"+minutes;
}



export default {dateFormatFrDMHM, dateFormatFrDM, orderByDate, getHoursHMV2}