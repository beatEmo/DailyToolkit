import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs("2024-08-08")}></Calendar>
    </div>
  );
}

export default App;
