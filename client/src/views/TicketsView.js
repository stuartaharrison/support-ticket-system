import React, { useId, useState } from "react";
import { Card, Container, Tab, Tabs } from "react-bootstrap";
import { TicketCollection, TicketTable } from "../components";
import { useGetSessionQuery } from "../redux/apis/authApi";

const TicketsView = () => {
    const tabsId = useId();
    const [key, setKey] = useState('mytickets');
    const { data: session } = useGetSessionQuery();
    const { _id: currentUserId } = session || null;

    return (
        <Container className="mt-3">
            <TicketCollection />
        </Container>
    );
};

export default TicketsView;