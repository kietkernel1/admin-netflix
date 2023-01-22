import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeContextProvider from "./darkTheme/themeContextProvider";
import './index.css';
import { Provider } from 'react-redux';
import globalStore from './Redux/globalStore';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <Provider store={globalStore}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    </Provider>
  </>
  // </React.StrictMode>
);


