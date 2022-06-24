import React, { useId, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { TicketTable } from "../components";
import { useGetSessionQuery } from "../redux/apis/authApi";

const TicketsView = () => {
    const tabsId = useId();
    const [key, setKey] = useState('mytickets');
    const { data: session } = useGetSessionQuery();
    const { _id: currentUserId } = session || null;

    return (
        <Container fluid className="mt-3">
            <Tabs
                id={tabsId}
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="mytickets" title="My Tickets">
                    <TicketTable
                        condition={{ claimedBy: currentUserId }}
                    />
                </Tab>
                <Tab eventKey="opentickets" title="Open">
                    <TicketTable
                        condition={{ claimedBy: null, isCompleted: false }}
                    />
                </Tab>
                <Tab eventKey="answeredtickets" title="Answered">
                    <TicketTable
                        condition={{ claimedBy: `!null`, isCompleted: false  }}
                    />
                </Tab>
                <Tab eventKey="closedtickets" title="Closed">
                    <TicketTable
                        condition={{ isCompleted: true  }}
                    />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default TicketsView;