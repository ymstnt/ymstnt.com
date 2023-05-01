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