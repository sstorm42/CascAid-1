const { OrganizationType } = require('../models/organization-type-model');
const { OrganizationTypes } = require('../static_data/seed-data');
const { lineToWordConverter } = require('../utils/library');

exports.seed = async (req, res) => {
    try {
        const initialData = req.body.OrganizationTypes || OrganizationTypes;
        for (let i = 0; i < initialData.length; i++) {
            let orgTypeFound = await OrganizationType.find({ label: initialData[i] });
            if (orgTypeFound && orgTypeFound.length > 0) continue;
            let organizationType = await new OrganizationType({
                value: lineToWordConverter(initialData[i]),
                label: initialData[i],
            });
            let savedData = await organizationType.save();

            if (!savedData) return res.status(500).send({ success: false, message: initialData[i] + ' Could not be saved on database' });
        }
        res.status(200).send({ success: true, message: 'All organization types are created' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};

exports.getAll = async (req, res) => {
    const organizationTypes = await OrganizationType.find({
        isActive: true,
        isDeleted: false,
    });
    res.status(200).send({
        success: true,
        organizationTypes,
    });
};

exports.getOne = async (req, res) => {
    const organizationTypeId = req.params.organizationTypeId;
    const organizationType = await OrganizationType.findById(organizationTypeId);
    if (!organizationType) return res.status(404).send({ success: false, message: 'No organization type found.' });
    res.status(200).send({ success: true, organizationType });
};
