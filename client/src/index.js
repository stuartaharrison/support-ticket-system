import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeAgo from "javascript-time-ago";
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';

// import bootstrap & custom stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import './styles/main.css';

// set the timezone so we can use TimeAgo
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

// configure our font awesome library of icons
library.add(fas);

// get the root div container so we can deploy our js app
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

// render the app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);