import React, { useId } from "react";
import Select from "react-select";

const SelectDropdown = ({ label, options, value, onChange, isMultiple = false, ...rest }) => {
    const id = useId();
    return (
        <div {...rest}>
            {label && (
                <label htmlFor={`select-${id}`} className="form-label">{label}</label>
            )}
            <Select
                id={`select-${id}`}
                value={options.filter(e => e.value === value)}
                isMulti={isMultiple}
                isLoading={!options}
                isSearchable={false}
                options={options}
                onChange={onChange}
            />
        </div>
    );
};

export default SelectDropdown;