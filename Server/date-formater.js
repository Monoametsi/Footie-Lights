let minutesFormat = (time) => {
		if(time >= 10){
			return time;
		}else{
			return `0${ time }`;
		}
	}

let dateFormater = (dateType) => {

	let date = new Date(dateType);
	
	let messageSentDate = `${ minutesFormat(date.getFullYear()).toString().slice(2) }/${ minutesFormat(date.getMonth() + 1) }/${ minutesFormat(date.getDate()) }`;

	return messageSentDate; 

}

module.exports = {
	dateFormater
}