import React from "react";
import store from './redux/store';
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components";
import { DashboardView, ForbiddenView, LoginView } from "./views";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/404" element={<h1>Not Found</h1>} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/forbidden" element={<ForbiddenView />} />
                    <Route path="/*" element={
                        <PrivateRoute>
                            <DashboardView />
                        </PrivateRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
};

export default App;