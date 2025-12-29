export const findNoOfWeekendsDays=(from:Date, to:Date):number=>{
    const newTo=new Date(to)
    const newFrom= new Date(from)
    const noOfDays=(newTo.getTime()-newFrom.getTime())/(1000*24*60*60);
    let weekendDays=0;
    for(let i=1;i<=noOfDays;i++){
        const day=newFrom.getDay();
        if(day==0 || day==6){
            weekendDays++;
        }
        newFrom.setDate(newFrom.getDate()+1);
    }
    return weekendDays;

}
export const checkSameDate=(first:Date,second:Date):boolean=>{
    const firstDate=new Date(first);
    const secondDate=new Date(second)
    if(firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()){
        return true;
    }
    return false;
}
export const TfindNoOfWeekendsDays=(date:{date:Date}[]):number=>{
    let count=0;
    for(let i=0;i<date.length;i++){
        if(date[i].date.getDay()==0 || date[i].date.getDay()==6) {
            count++;
        }
    }
    return count;
}