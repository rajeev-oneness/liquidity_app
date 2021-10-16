export function getExactDate(afterYear,afterMonth,afterDay){
    let dt = new Date();
    let year : any  = dt.getFullYear();
    let month : any = dt.getMonth().toString().padStart(2, "0");
    let day : any = dt.getDate().toString().padStart(2, "0");
    if(afterYear > 0){
        year = parseInt(year) + parseInt(afterYear);
    }
    if(afterMonth > 0){
        month = parseInt(month) + parseInt(afterMonth);
    }
    if(afterDay > 0){
        day = parseInt(day) + parseInt(afterDay);
    }
    return year+'-'+month+'-'+day;
}

export function getTimeFormat(time) : any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'PM' : 'AM';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`;
}

export function isNumberKey(event) : any {
    if(event.charCode >= 48 && event.charCode <= 57){
        return true;
    }
    return false;
}

export function validateEmail(email) : any {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
}