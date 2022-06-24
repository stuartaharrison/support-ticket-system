import React, { useId } from "react";
import { Form } from "react-bootstrap";
import { patchReplace } from "../helpers/patchHelpers";

const FormInput = ({ 
    label, 
    obj, 
    setObj, 
    operations, 
    setOperations,
    onChange,
    onBlur, 
    valueProp, 
    type = "text" 
}) => {
    const id = useId();

    const handleOnBlur = (e) => {
        // stop any exceptions/errors when props not set correctly
        if (!obj || !valueProp) {
            return;
        }

        // create our patch document operation
        let patchOp = patchReplace(valueProp, e.target.value);
        
        // check if we are passing back the list of operations to parent
        if (operations && setOperations && typeof (setOperations) === 'function') {
            setOperations([...operations, patchOp]);
        }

        // check if we have an additional 'onBlur' attached to the component for additional updates to call
        if (onBlur && typeof (onBlur) === 'function') {
            onBlur(e, e.target.value, patchOp);
        }
    };

    const handleOnChange = (e) => {
         // stop any exceptions/errors when props not set correctly
         if (!obj || !valueProp) {
            return;
        }

        // because you can't manipulate the object easily enough, we create a new version and update the prop
        // then update the state. This allows us to use the obj[prop] notation as we can't do 'valueProp': value here
        let newVersion = { ...obj };
        newVersion[valueProp] = e.target.value;

        // check if we are passing back the object state update to the parent
        if (setObj && typeof (setObj) === 'function') {
            setObj(newVersion);
        }

        // check if we have an additional 'onChange' attached to the component
        if (onChange && typeof (onChange) === 'function') {
            onChange(e, e.target.value, newVersion);
        }
    };

    return (
        <Form.Group controlId={`formgrp-${id}`}>
            {label && (
                <Form.Label>
                    {label}
                </Form.Label>
            )}
            <Form.Control
                type={type}
                value={obj[valueProp]}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
            />
        </Form.Group>
    );
};

export default FormInput;