import { CSSProperties, ReactNode, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import "./index.scss";
import cs from "classnames";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期格式 会完全覆盖单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格 内容会被添加到单元格内 只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { value, style, className: propClassName, locale, onChange } = props;

  const classNames = cs("calendar", propClassName);

  function changeDate(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  // 日期cell 点击事件
  const [curValue, setCurValue] = useState<Dayjs>(value);
  function selectHandler(date: Dayjs) {
    changeDate(date);
  }

  // header 切换日期
  const [curMonth, setCurMonth] = useState<Dayjs>(value);
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }
  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }
  // 今天的处理事件
  function todayHandler() {
    const date = dayjs(Date.now());
    changeDate(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
