let examPeriods: { start: Date; end: Date }[] = [
  //make sure to format dates correctly
  //months are indexed from 0 to 11, 0 being January
  //exam dates should end on a Monday (beginning of new semester)
  { start: new Date(2023, 11, 18), end: new Date(2024, 1, 12) },
  { start: new Date(2024, 4, 20), end: new Date(2024, 5, 29) },
];

let currentDate = new Date();

function checkDateBefore(): void {
  console.log(currentDate.getDay());
  let isInExamPeriod = examPeriods.some(period => currentDate >= period.start && currentDate <= period.end);
  if (isInExamPeriod){
    (<HTMLInputElement>document.querySelector('#week-number')).innerText = "Exams - break";
    (<HTMLInputElement>document.querySelector('#week-number')).style.fontSize = "1.2em";
  } else {
    let lastExamPeriodEnd = getLastExamPeriodEnd();
    calculateWeekNumber(lastExamPeriodEnd);
  };
}

function getLastExamPeriodEnd(): Date {
  let lastExamPeriodEnd = new Date();

  for (const period of examPeriods) {
    if (period.end < currentDate) {
      lastExamPeriodEnd = period.end;
    }
  }

  return lastExamPeriodEnd;
}

function calculateWeekNumber(firstWeek: Date): void {
  let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  
  let timeDifference = currentDate.getTime() - firstWeek.getTime();
  let weeksPassed = Math.floor(timeDifference / oneWeekInMilliseconds) + 1;

  let suffix = ".";
  if (weeksPassed == 1)
  {
    suffix = "st";
  }
  else if (weeksPassed == 2)
  {
    suffix = "nd";
  }
  else if (weeksPassed == 3)
  {
    suffix = "rd";
  }
  else
  {
    suffix = "th";
  }
  
  (<HTMLInputElement>document.querySelector('#week-number')).innerText = (weeksPassed).toString() + suffix;
}

document.addEventListener("astro:page-load", () => checkDateBefore());
