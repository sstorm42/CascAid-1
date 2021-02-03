const { Individual } = require('../models/individual-user-model');
// const updateForStep1 = ['firstName','lastName','phone','dateOfBirth','']

exports.show = async (req, res) => {};

exports.update = async (userId, step, individual) => {
    console.log('🚀 ~ file: individual-controller.js ~ line 7 ~ exports.update= ~ userId, step, individual', userId, step, individual);
    if (step === 2) {
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            { $set: { basicInfo: individual.basicInfo } },
            {
                new: true,
            },
        );
        if (!updatedIndividual)
            return {
                statusCode: 404,
                json: {
                    success: false,
                    message: 'Individual user not found!',
                },
            };
        else
            return {
                statusCode: 200,
                json: {
                    success: true,
                    message: 'Individual information saved successfully!',
                    stepCompleted: step,
                },
            };
    } else if (step === 3) {
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            { $set: { involvement: individual.involvement } },
            {
                new: true,
            },
        );
        if (!updatedIndividual)
            return {
                statusCode: 404,
                json: {
                    success: false,
                    message: 'Individual user not found!',
                },
            };
        else
            return {
                statusCode: 200,
                json: {
                    success: true,
                    message: 'Individual information saved successfully!',
                    stepCompleted: step,
                },
            };
    } else if (step === 4) {
        const updatedIndividual = await Individual.findOneAndUpdate(
            { userId: userId },
            { $set: { privacy: individual.privacy } },
            {
                new: true,
            },
        );
        if (!updatedIndividual)
            return {
                statusCode: 404,
                json: {
                    success: false,
                    message: 'Individual user not found!',
                },
            };
        else
            return {
                statusCode: 200,
                json: {
                    success: true,
                    message: 'Individual information saved successfully!',
                    stepCompleted: step,
                },
            };
    }
};
