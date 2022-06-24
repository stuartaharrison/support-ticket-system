import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";

const BaseTablePagination = ({ pagination, onPageSelected, onLimitSelected, size="md" }) => {
    // do not render anything when the pagination data is not set!
    if (!pagination) {
        return;
    }

    // de-construct the pagination data to use
    const { limit, page, totalCount, totalPages } = pagination;

    const changePage = (pageNumber) => {
        // check if the selection is out of range
        if (pageNumber <= 0 || pageNumber > totalPages) {
            return;
        }

        if (typeof(onPageSelected) === 'function') {
            onPageSelected(pageNumber);
        }
    };

    const pageNumbers = (count, current) => {
        var shownPages = 5;
        var result = [];
        if (count < shownPages) {
            result.push(count);
        } else if (current > count - shownPages) {
            result.push(count - 4, count - 3, count - 2, count - 1, count);
        } else {
            result.push(current, current + 1, current + 2, current + 3, current + 4);
        }
        return result;
    };

    return (
        <div className="d-flex justify-content-end">
            <Pagination className="m-0" size={size}>
                <Pagination.First
                    onClick={() => changePage(1)}
                />
                <Pagination.Prev 
                    onClick={() => changePage(page - 1)}
                />

                {pageNumbers(totalPages, page).map((p, i) => (
                    <Pagination.Item 
                        key={i} 
                        active={page == p}
                        onClick={() => changePage(p)}
                    >
                        {p}
                    </Pagination.Item>
                ))}

                <Pagination.Next
                    onClick={() => changePage(page + 1)}
                />
                <Pagination.Last 
                    onClick={() => changePage(totalPages)}
                />
            </Pagination>
        </div>
    );
};

export default BaseTablePagination;