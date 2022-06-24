import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useCountTicketsQuery } from "../redux/apis/ticketsApi";

const TicketSummary = ({ ...rest }) => {
    const { data: ticketCount } = useCountTicketsQuery();
    const { totalTickets, totalTicketsOpen, totalTicketsClosed, totalUnclaimed, totalUserOpenTickets, totalUserClosedTickets } = ticketCount || {};
    return (
        <Row {...rest}>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Total Tickets</Card.Title>
                        <Card.Text>{totalTickets}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Open Tickets</Card.Title>
                        <Card.Text>{totalTicketsOpen}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Closed Tickets</Card.Title>
                        <Card.Text>{totalTicketsClosed}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Unclaimed</Card.Title>
                        <Card.Text>{totalUnclaimed}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>My Active Tickets</Card.Title>
                        <Card.Text>{totalUserOpenTickets}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>My Closed Tickets</Card.Title>
                        <Card.Text>{totalUserClosedTickets}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default TicketSummary;