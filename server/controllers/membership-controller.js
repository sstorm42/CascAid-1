const { Membership } = require('../models/membership-model');
const MembershipResponse = require('../responses/membership-response');
const mongoose = require('mongoose');

// CREATE ONE
exports.createOne = async (req, res) => {
    try {
        const membership = { ...req.body, status: 'pending' };

        const membership_ = new Membership(membership);
        const savedMembership = await membership_.save();
        if (savedMembership && savedMembership._id) {
            return res.status(200).send({ ...MembershipResponse.Created, membership: savedMembership });
        } else {
            return res.status(401).send({ ...MembershipResponse.NotCreated });
        }
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};

// UPDATE ONE
exports.updateOne = async (req, res) => {
    try {
        const membershipId = req.params.membershipId;
        const membership = req.body;
        const updatedMembership = await Membership.findOneAndUpdate(
            { _id: membershipId },
            { $set: membership },
            { new: true },
        );
        if (!updatedMembership) return res.status({ ...MembershipResponse.NotUpdated });
        else return res.status(200).send({ ...MembershipResponse.Updated, membership: updatedMembership });
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};

// DELETE ONE
exports.deleteOne = async (req, res) => {
    try {
        const membershipId = req.params.membershipId;
        const deletedMembership = await Membership.findOneAndDelete({ _id: membershipId });
        if (!deletedMembership) return res.status({ ...MembershipResponse.NotDeleted });
        else return res.status(200).send({ ...MembershipResponse.Deleted, membership: deletedMembership });
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};

// GET ALL
exports.getAll = async (req, res) => {
    try {
        const individualId = req.query.individualId ? JSON.parse(req.query.individualId) : null;
        const organizationId = req.query.organizationId ? JSON.parse(req.query.organizationId) : null;
        let match = {};
        if (individualId) match['individualId'] = mongoose.Types.ObjectId(individualId);
        if (organizationId) match['organizationId'] = mongoose.Types.ObjectId(organizationId);

        const lookUps = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'individualId',
                    foreignField: '_id',
                    as: 'individual',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'organizationId',
                    foreignField: '_id',
                    as: 'organization',
                },
            },
        ];
        const membershipProjects = {
            _id: 1,
            individualId: 1,
            organizationId: 1,
            status: 1,
            membershipType: 1,
            requestedBy: 1,
            startTime: 1,
            endTime: 1,
            isCurrent: 1,
            isActive: 1,
            isDeleted: 1,
            createdAt: 1,
        };
        const project = {
            ...membershipProjects,
            individual: { $arrayElemAt: ['$individual', 0] },
            organization: { $arrayElemAt: ['$organization', 0] },
        };
        const projectWind = {
            ...membershipProjects,
            individualFirstName: '$individual.basicInfo.firstName',
            individualLastName: '$individual.basicInfo.lastName',
            individualProfilePicture: '$individual.basicInfo.profilePicture',
            organizationName: '$organization.basicInfo.name',
            organizationProfilePicture: '$organization.basicInfo.profilePicture',
        };

        const aggregateOptions = [];
        aggregateOptions.push({ $match: match }, ...lookUps, { $project: project }, { $project: projectWind });
        const memberships = await Membership.aggregate(aggregateOptions);
        return res.status(200).send({ ...MembershipResponse.Found, memberships });
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};

// ACCEPT ONE
exports.acceptOne = async (req, res) => {
    try {
        const membershipId = req.params.membershipId;

        const updatedMembership = await Membership.findOneAndUpdate(
            { _id: membershipId },
            { $set: { status: 'accepted' } },
            { new: true },
        );
        if (!updatedMembership) return res.status({ ...MembershipResponse.NotUpdated });
        else return res.status(200).send({ ...MembershipResponse.Updated, membership: updatedMembership });
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};

// REJECT ONE
exports.rejectOne = async (req, res) => {
    try {
        const membershipId = req.params.membershipId;
        const updatedMembership = await Membership.findOneAndUpdate(
            { _id: membershipId },
            { $set: { status: 'rejected' } },
            { new: true },
        );
        if (!updatedMembership) return res.status({ ...MembershipResponse.NotUpdated });
        else return res.status(200).send({ ...MembershipResponse.Updated, membership: updatedMembership });
    } catch (error) {
        return res.status(500).send(MembershipResponse.Error(error));
    }
};
