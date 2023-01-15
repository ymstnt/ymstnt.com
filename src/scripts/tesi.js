import jQuery from "jquery";
import moment from "moment/moment";

export function updateDays() {
  var start = moment();
  if (start.hours() > 16) {
    start.add(1, "day");
  }
  var end = moment("2023-05-06");

  var holidays = [
    moment("2023-01-01"),
    moment("2023-01-02"),
    moment("2023-01-03"),
    moment("2023-01-04"),
    moment("2023-01-05"),
    moment("2023-01-06"),
    moment("2023-03-15"),
    moment("2023-04-06"),
    moment("2023-04-07"),
    moment("2023-04-10"),
    moment("2023-04-11"),
    moment("2023-05-01"),
    moment("2023-05-29"),
  ];

  //const includeMondays = jQuery.$("#include-mondays").is(":checked");
  const includeMondays = true;
  let days = 0;

  // Count the days
  for (let current = moment(start); current < end; current.add(1, "day")) {
    const dayOfWeek = current.day();
    // Skip saturday and sunday
    if (dayOfWeek == 6 || dayOfWeek == 0) continue;
    // Skip monday if include mondays is turned off
    if (!includeMondays && dayOfWeek == 1) continue;
    // Skip if holiday
    const isHoliday = holidays.some((holiday) =>
      current.isSame(holiday, "day")
    );
    if (isHoliday) continue;
    // Increment days when it passed all the previous checks
    days++;
  }

  return days;
}