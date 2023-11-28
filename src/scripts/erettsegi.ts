let generatedLink: string;
let pressedButton: string;

formUpdate();

//Érettségi link generator
function formUpdate() {
  console.log("Form updated");
  let year = (<HTMLInputElement>document.querySelector("#year")).value;
  let period = (<HTMLInputElement>document.querySelector("#period")).value;
  let generatedDifficulty = (<HTMLInputElement>document.querySelector("#difficulty"))
    .value;
  let subject = (<HTMLInputElement>document.querySelector("#subject")).value;

  let generatedPeriod: string;
  let periodMonth: string;
  let generatedSubject: string;
  let generatedFileType: string;
  let itFileType: string;

  if (period == "majus") {
    generatedPeriod = "tavasz";
    periodMonth = "maj";
  } else {
    generatedPeriod = "osz";
    periodMonth = "okt";
  }

  if (subject == "inf" || subject == "infoism") {
    (<HTMLInputElement>document.querySelector("#sourcefiles")).disabled = false;
    (<HTMLInputElement>document.querySelector("#solutionfiles")).disabled =
      false;
  } else {
    (<HTMLInputElement>document.querySelector("#sourcefiles")).disabled = true;
    (<HTMLInputElement>document.querySelector("#solutionfiles")).disabled =
      true;
  }

  let convertedYear: number = parseInt(year);

  //Hide október-november if 2023 is selected using .hidden class
  if (convertedYear == 2024 && period == "oktober") {
    (<HTMLInputElement>document.querySelector("#oktober")).classList.add("hidden");
    //Select május if október-november is selected and 2023
    (<HTMLInputElement>document.querySelector("#period")).value = "majus";
    period = "majus";
    generatedPeriod = "tavasz";
  } else if (convertedYear == 2024) {
    (<HTMLInputElement>document.querySelector("#oktober")).classList.add("hidden");
  } else {
    (<HTMLInputElement>document.querySelector("#oktober")).classList.remove("hidden");
  }

  //Hide ágazati informatika if below 2017 using .hidden class
  if (convertedYear < 2017 && subject == "infoism") {
    //Select another subject if ágazati informatika is selected and below 2017
    (<HTMLInputElement>document.querySelector("#subject")).value = "inf";
    (<HTMLInputElement>document.querySelector("#infoism")).classList.add("hidden");
    subject = "inf";
    generatedSubject = "inf";
  } else if (convertedYear < 2017) {
    (<HTMLInputElement>document.querySelector("#infoism")).classList.add("hidden");
  } else {
    (<HTMLInputElement>document.querySelector("#infoism")).classList.remove("hidden");
  }

  if (subject == "inf" && convertedYear <= 2011 && !(convertedYear == 2011 && period == "oktober")) {
    generatedSubject = "info";
  }
  else {
    generatedSubject = subject;
  }

  let linkPrefix: string = "https://www.oktatas.hu/bin/content/dload/erettsegi/feladatok";

  switch (pressedButton) {
    case "task":
      generatedFileType = "fl.pdf";
      itFileType = "";
      break;
    case "sourcefiles":
      if (convertedYear >= 2005 && convertedYear <= 2008) {
        itFileType = "forras";
      } else {
        itFileType = "for";
      }
      generatedFileType = "fl.zip";
      break;
    case "solution":
      generatedFileType = "ut.pdf";
      itFileType = "";
      break;
    case "solutionfiles":
      if (convertedYear >= 2005 && convertedYear <= 2008) {
        itFileType = "megoldas";
      } else {
        itFileType = "meg";
      }
      generatedFileType = "ut.zip";
      break;
    default:
      generatedFileType = "fl.pdf";
      itFileType = "";
      break;
  }

  if (convertedYear > 2012) {
    linkPrefix = linkPrefix + '_';
  }

  let firstCharDifficulty: string = generatedDifficulty.charAt(0);
  let cutYear: string = year.slice(-2);

  let assembledPart: string;

  if (convertedYear == 2005 && period == "majus") {
    assembledPart = `${year}${generatedPeriod}/${generatedDifficulty}/${firstCharDifficulty}_${generatedSubject}${itFileType}_${generatedFileType}`;
  }
  else if (convertedYear >= 2005 && convertedYear <= 2012 && !(convertedYear == 2005 && period == "majus") && !(convertedYear == 2012 && period == "oktober")) {
    assembledPart = `${year}${generatedPeriod}/${generatedDifficulty}/${firstCharDifficulty}_${generatedSubject}${itFileType}_${cutYear}${periodMonth}_${generatedFileType}`;
  }
  else {
    assembledPart = `${year}${generatedPeriod}_${generatedDifficulty}/${firstCharDifficulty}_${generatedSubject}${itFileType}_${cutYear}${periodMonth}_${generatedFileType}`;
  }

  generatedLink = linkPrefix + assembledPart;

  (<HTMLInputElement>document.querySelector("#output")).value = generatedLink;
}

//Form elements event listeners
const dropdowns = Array.from(document.getElementsByClassName("dropdown"));

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("change", formUpdate);
});

const buttons = Array.from(document.getElementsByClassName("btn"));

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let element = e.target;
    pressedButton = (<HTMLInputElement>element).id;
    formUpdate();
    window.open(generatedLink, "_blank");
  });
});
