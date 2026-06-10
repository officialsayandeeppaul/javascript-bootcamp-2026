// DOME Element accesing
const hourElem = document.querySelector(".hour");
const minuteElem = document.querySelector(".minutes");
const secondElem = document.querySelector(".seconds");
const periodElem = document.querySelector(".period");
const dayElem = document.querySelector(".day-name");
const monthElem = document.querySelector(".month-name");
const dayNumberElem = document.querySelector(".day-number");
const yearElem = document.querySelector(".year");

const days = [
  "Sunday", // 0
  "Monday", // 1
  "Tuesday", // 2
  "Wednesday", // 3
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "Jan", // 0
  "Feb", // 1
  "Mar", // 2
  "Apr", // 3
  "May", // 4
  "Jun", // 5
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const clock = () => {
  const today = new Date();
  console.log(today);

  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const month = today.getMonth();
  const day = today.getDay();

  console.log(
    `Hour: ${hour}, \nMinutes: ${minutes}, \nSeconds: ${seconds}, \nMonth: ${month}, \nDay: ${day}`,
  );

  hourElem.innerHTML = addZero(hour);
  minuteElem.innerHTML = addZero(minutes);
  secondElem.innerHTML = addZero(seconds);
  periodElem.innerHTML = setTimePeriod(hour);
};

function setTimePeriod(time) {
  if (time < 12) {
    return "AM";
  } else {
    return "PM";
  }
}

function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }

  return time;
}

clock();

// Event call
const updatedTime = setInterval(clock, 1000);
