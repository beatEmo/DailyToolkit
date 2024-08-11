import { useContext } from "react";
import { Dayjs } from "dayjs";
import cs from "classnames";
import { CalendarProps } from ".";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}

function MonthCalendar(props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext);

  const { value, dateRender, dateInnerContent, selectHandler, curMonth } =
    props;

  const CalendarLocale = allLocales[localeContext.locale];

  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const allDays = getAllDays(curMonth);

  function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
    // 分行列渲染二维数组
    const rows = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const item = days[i * 7 + j];
        row[j] = (
          <div
            className={
              "calendar-month-body-cell " +
              (item.currentMonth ? "calendar-month-body-cell-current" : "")
            }
            onClick={() => {
              selectHandler?.(item.date);
            }}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className="calendar-month-body-cell-date">
                <div
                  className={cs(
                    "calendar-month-body-cell-date-value",
                    item.date.format("YYYY-MM-DD") ===
                      value.format("YYYY-MM-DD")
                      ? "calendar-month-body-cell-date-value-selected"
                      : ""
                  )}
                >
                  {item.date.date()}
                </div>
                <div className="calendar-month-body-cell-date-content">
                  {dateInnerContent?.(item.date)}
                </div>
              </div>
            )}
          </div>
        );
      }
      rows.push(row);
    }

    return rows.map((row, index) => (
      <div className="calendar-month-body-row" key={index}>
        {row}
      </div>
    ));
  }

  return (
    <main className="calendar-month">
      <section className="calendar-month-week-list">
        {weekList.map((week, index) => (
          <div className="calendar-month-week-list-item" key={index}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </section>
      <section className="calendar-month-body">{renderDays(allDays)}</section>
    </main>
  );
}

export default MonthCalendar;
