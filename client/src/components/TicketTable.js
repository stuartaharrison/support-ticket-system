import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useFetchTicketsQuery } from "../redux/apis/ticketsApi";

const TicketTable = ({ condition = {}, displayLimit = 25, ...rest }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(displayLimit);
    const [sort, setSort] = useState('submittedDate desc');
    const { data, error, isLoading } = useFetchTicketsQuery({ page, limit, sort, ...condition });
    const { pagination, results } = data || {};

    return (
        <Table {...rest}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Deadline</th>
                    <th>Claimed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {!isLoading && results && results.length > 0 && results.map((ticket, i) => (
                    <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.isCompleted}</td>
                        <td>{ticket.submittedDate}</td>
                        <td>{ticket.deadlineDate}</td>
                        <td>{ticket.claimedBy}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TicketTable;