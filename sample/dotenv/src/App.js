import logo from './logo.svg';
import './App.css';
import {env} from "./env";

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: env.REACT_APP_COLOR}}>
        <img src={env.REACT_APP_LOGO_URL ?? logo} className="App-logo" alt="logo" />
        <p>
          {
            env.REACT_APP_MAIN_TEXT ??
            <span>Edit your environment variables and restart the application</span>
          }
        </p>
        <a
          className="App-link"
          href={env.REACT_APP_LINK_URL ?? "https://github.com/codegowhere/react-inject-env#readme"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {env.REACT_APP_LINK_URL ?? "README"}
        </a>
        <div style={{
          marginTop: 24,
          color: 'lightgrey',
          backgroundColor: '#111111',
          display:'flex',
          flexDirection:'column',
          alignItems:'start',
          padding: 16,
          fontSize: 16,
        }}>
          <div style={{textAlign:'left'}}>{`REACT_APP_COLOR: ${env.REACT_APP_COLOR}`}</div>
          <div style={{textAlign:'left'}}>{`REACT_APP_LOGO_URL: ${env.REACT_APP_LOGO_URL}`}</div>
          <div style={{textAlign:'left'}}>{`REACT_APP_MAIN_TEXT: ${env.REACT_APP_MAIN_TEXT}`}</div>
          <div style={{textAlign:'left'}}>{`REACT_APP_LINK_URL: ${env.REACT_APP_LINK_URL}`}</div>
        </div>
      </header>
    </div>
  );
}


export default App;
