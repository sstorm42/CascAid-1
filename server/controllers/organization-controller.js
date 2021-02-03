const { Organization } = require('../models/organization-model');
// const updateForStep1 = ['firstName','lastName','phone','dateOfBirth','']

exports.show = async (req, res) => {};

exports.update = async (userId, step, organization) => {
    if (step === 2) {
        const updatedOrganization = await Organization.findOneAndUpdate(
            { userId: userId },
            { $set: { basicInfo: basicInfo } },
            {
                new: true,
            },
        );
        if (!updatedOrganization)
            return res.status(200).send({
                success: false,
                message: 'Organization user does not exists',
            });
    }
};
