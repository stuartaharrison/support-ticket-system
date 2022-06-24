import React from "react";

const BaseTableDropdown = React.forwardRef(({ children, onClick }, ref) => (
    <a className="text-muted" href="" ref={ref} onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}>
        {children}
    </a>
));

export default BaseTableDropdown;