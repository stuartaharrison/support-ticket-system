import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const CollectionBody = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const CollectionHeader = styled.div`
    display: flex;
`;

const CollectionItem = styled.div`
    flex: 1;
    border: 1px solid black;
    border-radius: 2.5px;
    background-color: white;
`;

const CollectionTitle = styled.div`
    font-size: 18px;
`;

const CollectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TicketCollection = () => {
    return (
        <CollectionWrapper>
            <CollectionHeader>
                <CollectionTitle>My Tickets (100)</CollectionTitle>
            </CollectionHeader>
            <CollectionBody>
                <CollectionItem>One</CollectionItem>
                <CollectionItem>Two</CollectionItem>
                <CollectionItem>Three</CollectionItem>
                <CollectionItem>Four</CollectionItem>
                <CollectionItem>Five</CollectionItem>
                <CollectionItem>Six</CollectionItem>
                <CollectionItem>Seven</CollectionItem>
                <CollectionItem>Eight</CollectionItem>
                <CollectionItem>Nine</CollectionItem>
                <CollectionItem>Ten</CollectionItem>
            </CollectionBody>
        </CollectionWrapper>
    );
};

export default TicketCollection;


/*
<div className="collection-wrapper">
                <div className="collection-header">
                    <div className="collection-title">My Tickets (100)</div>
                    <div className="collection-options">
                    
                    </div>
                </div>
                <div className="collection-body">

                </div>
            </div>
*/