let firstWeek: Date = new Date(2023, 8, 11);

function calculateWeekNumber(givenDate: Date): void {
  let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  let currentDate = new Date();
  
  let timeDifference = currentDate.getTime() - givenDate.getTime();
  let weeksPassed = Math.ceil(timeDifference / oneWeekInMilliseconds);
  (<HTMLInputElement>document.querySelector('#week-number')).innerText = weeksPassed.toString() + ".";
}

calculateWeekNumber(firstWeek);