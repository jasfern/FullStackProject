import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CollectionList from './CollectionList'
import CreateCache from './CreateCache'
import CacheList from './CacheList'

function App() {
  const [data, setData] = useState([]);

  return (
    <>
        <div className="app">
            <div className="banner">
                <h1>Geocacher</h1>
            </div>
            <div className="main-content">
                <div className="sidebar">
                    <CollectionList/>
                </div>
                <div className="panes">
                    <div className="pane">
                        <CreateCache/>
                    </div>
                    <div className="pane">
                        <CacheList/>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
