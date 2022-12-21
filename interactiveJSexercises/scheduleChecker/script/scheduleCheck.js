while(true){
	const day = prompt("Select a day(mon to sun) :").toLowerCase();
	let failCheck = false;
	switch (day) {
	  case "monday":
	  case "mon":
		console.log("InClass");
		break;
	  case "tuesday":
	  case "tue":
		console.log("InClass");
		break;
	  case "wednesday":
	  case "wed":
		console.log("InClass");
		break;
	  case "thursday":
	  case "thu":
		console.log("InClass");
		break;
	  case "friday":
	  case "fri":
		console.log("Teamwork");
		break;
	  case "saturday":
	  case "sat":
		console.log("InClass & Workshop");
		break;
	  case "sunday":
	  case "sun":
		console.log("Self Study");
		break;
	  default:
		console.log("Please enter the correct name of the day.");
		failCheck = true;
		break;
	}
	if (failCheck){
		continue;
	} else{
		break;
	}
}

