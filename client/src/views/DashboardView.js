import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header, PrivateRoute } from "../components";
import { SettingsView, SummaryView, TicketsView, UserTicketsView } from './';
import { useGetSessionQuery } from "../redux/apis/authApi";

const DashboardView = () => {
    const { data: session } = useGetSessionQuery();
    return (
        <React.Fragment>
            <Header />
            <main className="container-fluid">
                <Routes>
                    <Route path="/" element={<SummaryView />} />
                    <Route path="/tickets/*" element={(
                        <React.Fragment>
                            {session && session.userType === 'user' && (<UserTicketsView />)}
                            {session && session.userType !== 'user' && (<TicketsView />)}
                        </React.Fragment>
                    )} />
                    <Route path="/settings/*" element={
                        <PrivateRoute
                            deniedAccessRoute="/forbidden"
                            userTypeRequired={['admin']}
                        >
                            <SettingsView />
                        </PrivateRoute>
                    } />
                </Routes>
            </main>
        </React.Fragment>
    );
};

export default DashboardView;