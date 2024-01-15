let firstWeek: Date = new Date(2024, 1, 12);

function checkDateBefore(givenDate: Date): void {
  let currentDate = new Date();

  if (currentDate < givenDate){
    (<HTMLInputElement>document.querySelector('#week-number')).innerText = "Vizsgaidőszak - szünet";
    (<HTMLInputElement>document.querySelector('#week-number')).style.fontSize = "1.2em";
  } else {
    calculateWeekNumber(firstWeek);
  };
}

function calculateWeekNumber(givenDate: Date): void {
  let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  let currentDate = new Date();
  
  let timeDifference = currentDate.getTime() - givenDate.getTime();
  let weeksPassed = Math.ceil(timeDifference / oneWeekInMilliseconds);
  (<HTMLInputElement>document.querySelector('#week-number')).innerText = weeksPassed.toString() + ".";
}

checkDateBefore(firstWeek);