import React, { useState } from "react";
import BaseTable from "./BaseTable";
import BaseTablePagination from "./BaseTablePagination";

const QueryTable = ({ columns, query, defaultPage = 1, defaultLimit = 25, defaultSort, refreshInterval = 30000 }) => {
    const [sort, setSort] = useState(defaultSort);
    const [page, setPage] = useState(defaultPage);
    const [limit, setLimit] = useState(defaultLimit);
    
     // refetch our list every X seconds (refresh interval)
     const { data, error, isLoading } = query({ page, limit, sort }, {
        pollingInterval: refreshInterval
    });
    const { pagination, results } = data || {};

    return (
        <React.Fragment>
            <BaseTable
                columns={columns}
                data={results}
                errorMsg={error}
                isLoading={isLoading}
            />
            <BaseTablePagination
                pagination={pagination}
                onPageSelected={setPage}
                onLimitSelected={setLimit}
            />
        </React.Fragment>
    );
};

export default QueryTable;