import logo from "./logo.svg";
import "./App.css";

import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header>Hello, Header Test...</Header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Hello Storybook Test react</Button>
      </header>
    </div>
  );
}

export default App;
