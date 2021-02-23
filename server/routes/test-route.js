const tests = require('express').Router();
const { allOrganizations } = require('../static_data/sample-organizations');
tests.get('/check-organization-types', (req, res) => {
    let checkedTypes = {};
    let unchecked = [];
    for (let o = 0; o < allOrganizations.length; o++) {
        let type = allOrganizations[o].OrganizationType;
        if (checkedTypes[type]) {
        } else {
            checkedTypes[type] = true;
            unchecked.push(allOrganizations[o]);
        }
    }
    res.status(200).send({ success: true, checkedTypes, unchecked });
});
module.exports = tests;
