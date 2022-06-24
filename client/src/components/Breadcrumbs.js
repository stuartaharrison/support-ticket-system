import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <ol className="breadcrumb">
            {breadcrumbs.map(({ breadcrumb, key }, i) => (
                <li className="breadcrumb-item" key={i}>
                    <Link to={key}>
                        {breadcrumb}
                    </Link>
                </li>
            ))}
        </ol>
    );
};

export default Breadcrumbs;