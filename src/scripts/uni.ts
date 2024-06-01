//months are indexed from 0 to 11, 0 being January
let examPeriods: { start: Date; end: Date }[] = [
  //make sure to format dates correctly
  //exam dates should end on a Saturday
  { start: new Date(2023, 11, 18), end: new Date(2024, 1, 3) },
  { start: new Date(2024, 4, 20), end: new Date(2024, 5, 29) },
  { start: new Date(2024, 11, 16), end: new Date(2025, 1, 8) },
];

let studyPeriods : { start: Date; end: Date}[] = [
  //study dates should end on a Saturday
  { start: new Date(2023, 8, 11), end: new Date(2023, 11, 16) },
  { start: new Date(2024, 1, 12), end: new Date(2024, 4, 18) },
  { start: new Date(2024, 8, 9), end: new Date(2024, 11, 14) },
];

let currentDate = new Date();

let weekNumberElement = <HTMLInputElement>document.querySelector('#week-number');

function checkDateBefore(): void {
  console.log(currentDate.getDay());
  let isInExamPeriod = examPeriods.some(period => currentDate >= period.start && currentDate <= period.end);
  let isInStudyPeriod = studyPeriods.some(period => currentDate >= period.start && currentDate <= period.end);
  if (isInExamPeriod){
    weekNumberElement.innerText = 'Exams - break';
    weekNumberElement.style.fontSize = '1.2em';
  } else if (isInStudyPeriod) {
    calculateWeekNumber(getFirstStudyPeriodDay());
  } else {
    weekNumberElement.innerText = 'Break';
    weekNumberElement.style.fontSize = '1.2em';
  };
}

function getFirstStudyPeriodDay(): Date {
  let firstDay = new Date();

  for (const period of studyPeriods) {
    if (period.end > currentDate) {
      firstDay = period.start;
    }
  }

  return firstDay;
}

function calculateWeekNumber(firstWeek: Date): void {
  let oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  
  let timeDifference = currentDate.getTime() - firstWeek.getTime();
  let weeksPassed = Math.floor(timeDifference / oneWeekInMilliseconds) + 1;

  let suffix = '.';
  switch(weeksPassed) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }
  
  weekNumberElement.innerText = (weeksPassed).toString() + suffix;
}

document.addEventListener('astro:page-load', checkDateBefore);
