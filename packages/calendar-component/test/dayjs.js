const dayjs = require("dayjs");

// console.log(dayjs("2023-11-1").daysInMonth()); // 30

// console.log(dayjs("2023-11-1").startOf("month").format("YYYY-MM-DD")); // 2023-11-01

// console.log(dayjs("2023-11-1").endOf("month").format("YYYY-MM-DD")); // 2023-11-30

// console.log(dayjs("2023-11-1").startOf("day").format("YYYY-MM-DD"));

console.log(
  dayjs("2023-11-1").startOf("month").add(0, "day").format("YYYY-MM-DD")
);
