import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs("2024-08-08")}

        // dateInnerContent={(date) => {
        //   return (
        //     <div>
        //       <p
        //         style={{
        //           background: "yellowgreen",
        //           height: "30px",
        //           color: "blue",
        //         }}
        //       >
        //         {date.format("YYYY/MM/DD")}
        //       </p>
        //     </div>
        //   );
        // }}
      ></Calendar>
    </div>
  );
}

export default App;
