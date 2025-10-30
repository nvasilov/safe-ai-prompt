import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import ReduxProvider from "@/entrypoints/redux/ReduxProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReduxProvider>
            <App/>
        </ReduxProvider>
    </React.StrictMode>,
);
