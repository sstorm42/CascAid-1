const mongoose = require('mongoose');
const basicInfoSchema = require('./basic-info-schema');
const involvementSchema = require('./involvement-schema');
const privacySchema = require('./privacy-schema');
const serviceInfoSchema = require('./service-info-schema');
const internalLinkSchema = require('./internal-link-schema');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, index: true },
        userType: {
            type: String,
            default: 'individual',
            enum: ['individual', 'organization', 'admin'],
        },
        basicInfo: basicInfoSchema,
        involvement: involvementSchema,
        privacy: privacySchema,
        serviceInfo: serviceInfoSchema,
        internalLink: internalLinkSchema,
        stepCompleted: { type: Number, default: 0 },
        hashedPassword: { type: String, required: true },
        salt: { type: String },
        resetPasswordLink: { type: String, default: '' },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random());
    },
};
const User = mongoose.model('User', userSchema);
module.exports = { User };
