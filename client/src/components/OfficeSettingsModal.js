import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { patchReplace } from "../helpers/patchHelpers";

const OfficeSettingsModal = ({ office, setOffice, createOfficeMutation, updateOfficeMutation }) => {
    const [createOffice] = createOfficeMutation();
    const [patchOffice] = updateOfficeMutation();
    const [operations, setOperations] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (office && office.hasOwnProperty('_id')) {
            // update the office details
            patchOffice({ id: office._id, operations }).unwrap().then(_ => {
                setOperations([]);
                setOffice(null);
            });
        }
        else {
            // create new office
            createOffice(office).unwrap().then(_ => {
                setOperations([]);
                setOffice(null);
            });
        }
    };

    return (
        <Modal show={office} onHide={() => setOffice(null)}>
            <Modal.Header closeButton>
                {office && office.hasOwnProperty('_id') ? 'Edit' : 'Create'}
            </Modal.Header>
            <Modal.Body>
                {office && (
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Office Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={office.officeName}
                                        onBlur={(e) => {
                                            setOperations([
                                                ...operations,
                                                patchReplace('officeName', e.target.value, office.officeName)
                                            ]);
                                        }}
                                        onChange={(e) => {
                                            setOffice({
                                                ...office,
                                                officeName: e.target.value
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setOffice(null)}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    {office && office.hasOwnProperty('_id') ? 'Save Changes' : 'Create'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OfficeSettingsModal;