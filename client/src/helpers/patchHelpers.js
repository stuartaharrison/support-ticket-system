const patchAdd = (propName, newValue) => {
    return {
        path: `/${propName}/-`,
        op: 'add',
        value: newValue
    };
};

const patchRemoveFromArray = (propName, newValue) => {
    return {
        path: `/${propName}/-`,
        op: 'remove',
        value: newValue
    };
};

// this function will create a JSON Patch Document object
// example: { path: "/propName", op: "replace", from: "", value: "newValue" }
const patchReplace = (propName, newValue, previousValue = null) => {
    let patch = {
        path: `/${propName}`,
        op: 'replace',
        value: `${newValue}`
    };
    
    if (previousValue) {
        patch.from = previousValue;
    }

    return patch;
};

export {
    patchAdd,
    patchRemoveFromArray,
    patchReplace
};