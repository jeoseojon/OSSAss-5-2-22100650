import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShowList from './components/Pages/ShowList';
import ViewStudent from './components/Pages/ViewStudent';
import EditStudent from './components/Pages/EditStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ShowList />} />
                <Route path="/list" element={<ShowList />} />
                <Route path="/view/:id" element={<ViewStudent />} />
                <Route path="/edit/:id" element={<EditStudent />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App; 