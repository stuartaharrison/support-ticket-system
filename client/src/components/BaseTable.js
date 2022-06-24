import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BaseTable = ({ columns, data, errorMsg, isLoading }) => {

    const onClick = () => { }

    const renderColumn = (data, columnData) => {
        if (columnData.component) {
            return (<columnData.component data={data} />)
        }
        else if (typeof(columnData) === 'object') {
            return data[columnData.value];
        }
        else {
            return data[columnData];
        }
    };

    const renderColumnHeader = (columnData) => {
        if (typeof(columnData) === 'object') {
            return columnData.icon
                ? <FontAwesomeIcon icon={columnData.icon} />
                : columnData.title;
        }
        else {
            return columnData;
        }
    };

    return (
        <React.Fragment>
            <Table hover>
                <thead>
                    <tr>
                        {columns && columns.map((v, i) => (
                            <th key={i}>{renderColumnHeader(v)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && errorMsg && (
                        <tr>
                            <td colSpan={columns.length}>
                                {errorMsg}
                            </td>
                        </tr>
                    )}
                    {!isLoading && !errorMsg && (!data || data.length === 0) && (
                        <tr>
                            <td colSpan={columns.length}>
                                No records found.
                            </td>
                        </tr>
                    )}
                    {!isLoading && !errorMsg && data && data.map((d, i) => (
                        <tr key={i}>
                            {columns && columns.map((c, j) => (
                                <td 
                                    key={`${i}-${j}`}
                                    onClick={() => c.onClick ? c.onClick(d, c) : onClick(d, c)}
                                >
                                    {renderColumn(d, c)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default BaseTable;