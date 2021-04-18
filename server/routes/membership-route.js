const membership = require('express').Router();
const MembershipController = require('../controllers/membership-controller');
const { allowIfLoggedIn } = require('../middlewares/access-control');
const validate = require('../middlewares/validators/validate');

// CREATE ONE
membership.post('/', allowIfLoggedIn, MembershipController.createOne);

// UPDATE ONE
membership.put('/:membershipId', allowIfLoggedIn, MembershipController.updateOne);

// DELETE ONE
membership.delete('/:membershipId', allowIfLoggedIn, MembershipController.deleteOne);

// GET ALL
membership.get('/', MembershipController.getAll);

// ACCEPT ONE
membership.put('/:membershipId/accept', allowIfLoggedIn, MembershipController.acceptOne);

// REJECT ONE
membership.put('/:membershipId/reject', allowIfLoggedIn, MembershipController.rejectOne);

module.exports = membership;
