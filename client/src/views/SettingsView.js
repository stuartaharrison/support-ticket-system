import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OfficeSettingsView, UserSettingsView } from "./";

// basic display to allow navigation across the system settings routes!
const SettingsIndex = () => {
    return (
        <Container>
            <p className="fs-2 mt-4">System Settings</p>
            <div>
                <div className="row">
                    <SettingsIndexCard title="Offices" icon="fa-building-user" to="offices" />
                    <SettingsIndexCard title="Users" icon="fa-users" to="users" />
                </div>
            </div>
        </Container>
    );
};

const SettingsIndexCard = ({ title, icon, to }) => {
    return (
        <div className="col-3">
            <Card as={Link} to={to} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Card.Body className="text-center">
                    {icon && <FontAwesomeIcon icon={icon} size="2x" />} 
                    <br />
                    {title}
                </Card.Body>
            </Card>
        </div>
    )
};

// main navigation routes for the system settings area
const SettingsView = () => {
    return (
        <Routes>
            <Route path="/*" element={<SettingsIndex />} />
            <Route path="/offices" element={<OfficeSettingsView />} />
            <Route path="/users" element={<UserSettingsView />} />
        </Routes>
    );
};

export default SettingsView;