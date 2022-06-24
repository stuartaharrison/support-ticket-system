import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { TicketItem } from "./index";
import { useFetchTicketsQuery } from "../redux/apis/ticketsApi";

const TicketList = ({ condition, title = "Tickets", displayLimit = 5 }) => {
    const { data, error, isLoading } = useFetchTicketsQuery({ page: 1, limit: displayLimit, ...condition });
    const { pagination, results } = data || {};
    
    return (
        <Card>
            <Card.Header>
                <span>{title}</span>&nbsp;
                {!isLoading && pagination && (<span>({pagination.totalCount})</span>)}
            </Card.Header>
            {!isLoading && results && results.length === 0 && (
                <Card.Body>
                    <p>Hooray! You're all caught up!</p>
                </Card.Body>
            )}
            {!isLoading && results && results.length > 0 && (
                <ListGroup variant="flush">
                    {results.map((ticket, i) => (
                        <TicketItem key={ticket._id} ticket={ticket} as={ListGroup.Item} />
                    ))}
                </ListGroup>
            )}
        </Card>
    );
};

export default TicketList;