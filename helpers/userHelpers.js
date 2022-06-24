const buildDisplayName = (user) => {
    if (user.forenames && user.surname) {
        return `${user.forenames} ${user.surname}`;
    }
    else if (user.forenames) {
        return user.forenames;
    }
    else {
        return user.username
    }
};

const buildUserListView = (user) => {
    return {
        label: buildDisplayName(user),
        value: user._id
    };
};

const buildUserViewModel = (user) => {
    return {
        _id: user._id,
        displayName: buildDisplayName(user),
        username: user.username,
        userType: user.userType,
        email: user.email,
        forenames: user.forenames,
        surname: user.surname,
        officeId: user.defaultOffice ? user.defaultOffice._id : null,
        officeName: user.defaultOffice ? user.defaultOffice.officeName : null
    };
};

module.exports = {
    buildUserListView,
    buildUserViewModel
};