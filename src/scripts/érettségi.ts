class DaySubject {
  dateTime: Date;
  subject: string;
  type: string;

  constructor(dateTime, subject, type) {
    this.dateTime = dateTime;
    this.subject = subject;
    this.type = type;
  }
}

function updateDays() {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date('2023-05-08');
  const finalDate: Date = new Date('2023-07-01');

  const timeDiff: number = targetDate.getTime() - currentDate.getTime();
  const daysLeft: number = Math.ceil(timeDiff / (1000 * 3600 * 24));

  var exams: DaySubject[] = [
    new DaySubject(new Date('2023-05-08 09:00'), 'Magyar nyelv és irodalom', "középszintű"),
    new DaySubject(new Date('2023-05-09 09:00'), 'Matematika', "középszintű"),
    new DaySubject(new Date('2023-05-10 09:00'), 'Történelem', "középszintű"),
    new DaySubject(new Date('2023-05-11 09:00'), 'Angol nyelv', "középszintű"),
    new DaySubject(new Date('2023-05-11 08:00'), 'Informatika', "középszintű"),
    new DaySubject(new Date('2023-05-17 09:00'), 'Informatika ismeretek', "középszintű és emelt"),
    new DaySubject(new Date('2023-05-22 08:00'), 'Informatika', "emelt"),
  ];

  if (currentDate < targetDate) {
    document.querySelector('#countdown').textContent = daysLeft.toString() + " nap";
  } else if (currentDate >= finalDate) {
    document.querySelector('#countdown-intro').textContent = "Vége az érettségi időszaknak.";
  } else {
    exams.forEach(element => {
      if (element.dateTime.getDate() == currentDate.getDate()) {
        document.querySelector('#countdown-intro').textContent = "A mai érettségi vizsga:";
        document.querySelector('#countdown').textContent = element.subject + " (" + element.type + ")";
        document.querySelector('#when').textContent = "Kezdés: " + element.dateTime.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }) + "-kor";
      } else {
        document.querySelector('#countdown-intro').textContent = "Pihenőnap 🌙";
      }
    });
  }

  
}
updateDays();
formUpdate();

var generatedLink: string;
var pressedButton: string;

function formUpdate() {
  console.log("Form updated");
  var year = (<HTMLInputElement>document.querySelector('#year')).value;
  var period = (<HTMLInputElement>document.querySelector('#period')).value;
  var difficulty = (<HTMLInputElement>document.querySelector('#difficulty')).value;
  var subject = (<HTMLInputElement>document.querySelector('#subject')).value;

  var finalPeriod: string;
  var periodMonth: string;
  var finalDifficulty: string;
  var finalSubject: string;
  var finalType: string;
  var fileType: string;

  if (period == "may") {
    finalPeriod = "tavasz";
    periodMonth = "maj";
  }
  else
  {
    finalPeriod = "osz";
    periodMonth = "okt";
  }

  if (difficulty == "medium") {
    finalDifficulty = "kozep";
  }
  else
  {
    finalDifficulty = "emelt";
  }

  if (subject == "it-office" || subject == "it") {
    (<HTMLInputElement>document.querySelector('#sourcefiles')).disabled = false;
    (<HTMLInputElement>document.querySelector('#solutionfiles')).disabled = false;
  }
  else
  {
    (<HTMLInputElement>document.querySelector('#sourcefiles')).disabled = true;
    (<HTMLInputElement>document.querySelector('#solutionfiles')).disabled = true;
  }

  switch (subject) {
    case "hungarian":
      finalSubject = "magyir";
      break;
    case "mathematics":
      finalSubject = "mat";
      break;
    case "history":
      finalSubject = "tort";
      break;
    case "english":
      finalSubject = "angol";
      break;
    case "it":
      finalSubject = "infoism";
      break;
    case "it-office":
      finalSubject = "inf";
      break;
    default:
      break;
  }

  switch (pressedButton) {
    case "task":
      finalType = "fl.pdf";
      fileType = "";
      break;
    case "sourcefiles":
      finalType = "fl.zip";
      fileType = "for";
      break;
    case "solution":
      finalType = "ut.pdf";
      fileType = "";
      break;
    case "solutionfiles":
      finalType = "ut.zip";
      fileType = "meg";
      break;
    default:
      finalType = "fl.pdf";
      fileType = "";
      break;
  }

  var convertedYear: number = +year;

  if (convertedYear == 2005 && period == "may") {
    if (pressedButton == "sourcefiles") {
      fileType = "forras";
    }
    else if (pressedButton == "solutionfiles") {
      fileType = "megoldas";
    }
    else {
      fileType = "";
    }

    generatedLink = `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok2005tavasz/${finalDifficulty}/${finalDifficulty.charAt(0)}_${finalSubject}${fileType}_${finalType}`
  }
  else if (convertedYear > 2005 && convertedYear <= 2008) {
    if (pressedButton == "sourcefiles") {
      fileType = "forras";
    }
    else if (pressedButton == "solutionfiles") {
      fileType = "megoldas";
    }
    else {
      fileType = "";
    }

    generatedLink = `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${finalPeriod}/${finalDifficulty}/${finalDifficulty.charAt(0)}_${finalSubject}${fileType}_${year.slice(-2)}${periodMonth}_${finalType}`
  }
  else if (convertedYear > 2008 && convertedYear <= 2012) {
    generatedLink = `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok${year}${finalPeriod}/${finalDifficulty}/${finalDifficulty.charAt(0)}_${finalSubject}${fileType}_${year.slice(-2)}${periodMonth}_${finalType}`
  }
  else if (convertedYear == 2012 && period == "october") {
    generatedLink = `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${finalPeriod}_${finalDifficulty}/${finalDifficulty.charAt(0)}_${finalSubject}${fileType}_${year.slice(-2)}${periodMonth}_${finalType}`;
  }
  else {
    generatedLink = `https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok_${year}${finalPeriod}_${finalDifficulty}/${finalDifficulty.charAt(0)}_${finalSubject}${fileType}_${year.slice(-2)}${periodMonth}_${finalType}`;
  }
  
  (<HTMLInputElement>document.querySelector('#output')).value = generatedLink;
}

const dropdowns = Array.from(document.getElementsByClassName('dropdown'));

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('change', formUpdate);
});

const buttons = Array.from(document.getElementsByClassName('btn'));

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let element = e.target;
    pressedButton = (<HTMLInputElement>element).id;
    formUpdate();
    window.open(generatedLink, '_blank');
  });
});