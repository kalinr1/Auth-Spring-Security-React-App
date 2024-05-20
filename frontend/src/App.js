import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import { useAuth } from "./auth/AuthContext";

function App() {

    const { isAuthenticated, isAdmin } = useAuth();

  return (


    <div className="App">




      <header className="App-header">
          <Header/>
          {isAuthenticated && <div>logged in</div>}

          {!isAuthenticated && <div>not logged in</div>}

          {isAuthenticated && isAdmin && <div>ADMIN</div>}

          {isAuthenticated && !isAdmin && <div>USER</div>}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
