const MongoQS = require('mongo-querystring');

const buildPaginationResult = (records, page, limit, totalCount) => {
    return {
        results: records,
        pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
    };
};

const extractPageParams = (req, wherePropConfiguration = {}) => {
    const { page, limit, sort, ...rest } = req.query;
    let rPage = page || 1;
    let rLimit = limit || 25;
    var rSort = parseSort(sort || '');

    // prevent negative page
    try {
        rPage = parseInt(page);
        if (isNaN(rPage) || rPage <= 0) {
            rPage = 1;
        }
    }
    catch {
        rPage = 1;
    }
    
    // prevent negative limit or trying to get too many..
    try {
        rLimit = parseInt(limit);
        if (isNaN(rLimit) || rLimit <= 0 || rLimit > 100) {
            rLimit = 25;
        }
    }
    catch {
        rLimit = 25;
    }

    // build the where clause from the rest of the parameters
    var qs = new MongoQS(wherePropConfiguration);
    var where = qs.parse(rest);

    console.log('where query', {
        rest,
        where
    });

    return { 
        page: rPage, 
        limit: rLimit, 
        sort: rSort, 
        where: where
    };
};

const parseSort = (query) => {
    let sort = {};
    let aQuery = query.split(',');

    for (var i = 0; i < aQuery.length; i++) {
        let aVal = aQuery[i].split(' ');
        if (aVal.length === 2) {
            let order = aVal[1].toLowerCase() === 'asc' ? 1 : -1;
            sort[aVal[0]] = order;
        }
        else {
            sort[aVal[0]] = 1;
        }
    }

    return sort;
};

module.exports = {
    buildPaginationResult,
    extractPageParams
};