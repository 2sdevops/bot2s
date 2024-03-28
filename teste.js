var data = new Date();

var diaAMais = new Date();
diaAMais.setDate(diaAMais.getDate() + 1);
    
var strfromDate = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes();
var strtoDate = (data.getMonth() + 1) + '/' + (data.getDate() + 1) + '/' + data.getFullYear() + ' 23:00';   


console.log(strfromDate)
console.log(strtoDate)