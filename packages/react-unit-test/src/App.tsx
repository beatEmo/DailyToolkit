import logo from "./logo.svg";
import "./App.css";
import useCounter from "./useCounter";
import Toggle from "./Toggle";

function App() {
  const [count, increment, decrement] = useCounter();

  return (
    <div className="App">
      <div>
        <div>{count}</div>
        <div>
          <button onClick={() => increment(1)}>加一</button>
          <button onClick={() => decrement(2)}>减二</button>
        </div>
      </div>
      <hr />
      <Toggle />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
