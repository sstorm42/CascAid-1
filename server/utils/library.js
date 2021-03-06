const path = require('path');
const { v1: uuidv1 } = require('uuid');
const { v4: uuidv4 } = require('uuid');
const base64ToImage = require('base64-to-image');
const fs = require('fs');
const moment = require('moment');
const randomstring = require('randomstring');

// const appDir = `http://cascaid.sky4242.com/uploaded-images/`;
const appDir = `http://localhost:3001/uploaded-images/`;
const path2 = './uploaded_images/';

exports.saveImagesOnServer = (imageArray) => {
    let i = 1;
    let newSavedImageArray = [];
    if (imageArray.length > 0) {
        imageArray.map((item) => {
            if (item.length >= 200) {
                const base64Str = item;
                const imageFileName = uuidv1() + uuidv4() + i.toString();
                const imageType = item.match(/[^:/]\w+(?=;|,)/)[0];
                const optionalObj = { fileName: imageFileName, type: imageType };

                base64ToImage(base64Str, path2, optionalObj);
                newSavedImageArray.push(appDir + imageFileName + '.' + imageType);

                i++;
            } else {
                newSavedImageArray.push(item);
            }
        });
    }

    return newSavedImageArray;
};
exports.saveAttachmentsOnServer = (attachments) => {
    let i = 1;
    let newSavedAttachments = [];
    if (attachments.length > 0) {
        attachments.map((file) => {
            if (file && file.data) {
                const base64Str = file.data;
                const attachmentFileName = uuidv1() + uuidv4() + i.toString();
                const attachmentType = file.extension;
                const optionalObj = { fileName: attachmentFileName, type: attachmentType };

                base64ToImage(base64Str, path2, optionalObj);
                newSavedAttachments.push({ ...file, data: appDir + attachmentFileName + '.' + attachmentType });

                i++;
            } else {
                newSavedAttachments.push(file);
            }
        });
    }

    return newSavedAttachments;
};

exports.saveImageSchemaOnServer = (imageArray) => {
    let i = 1;
    let newSavedImageArray = [];
    if (imageArray.length > 0) {
        imageArray.map((item) => {
            if (item.path.length >= 200) {
                const base64Str = item.path;
                const imageFileName = uuidv1() + uuidv4() + i.toString();
                const imageType = item.path.match(/[^:/]\w+(?=;|,)/)[0];
                const optionalObj = { fileName: imageFileName, type: imageType };

                base64ToImage(base64Str, path2, optionalObj);
                newSavedImageArray.push({
                    path: appDir + imageFileName + '.' + imageType,
                    description: item.description,
                });

                i++;
            } else {
                newSavedImageArray.push(item);
            }
        });
    }

    return newSavedImageArray;
};

exports.deleteImagesFromServer = (imageArray) => {
    if (imageArray && imageArray.length > 0) {
        for (let i = 0; i < imageArray.length; i++) {
            let filePath = '.' + imageArray[i];
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    }
};
exports.createValidationErrorMessage = (errors) => {
    let errorMessage = [];
    for (let err = 0; err < errors.length; err++) {
        errorMessage.push(errors[err].param + ' -> ' + errors[err].msg);
    }
    return errorMessage;
};

exports.lineToWordConverter = (line) => {
    let lineArray = line.split(' ');
    let word = '';
    for (let i = 0; i < lineArray.length; i++) {
        if (i) word += '-';
        word += lineArray[i].toLocaleLowerCase();
    }
    return word;
};

exports.writeLocalJsonFile = (object, fileName) => {
    fs.writeFileSync(path.resolve(__dirname, fileName + '.json'), JSON.stringify(object));
};
exports.getRandomPassword = () => {
    return randomstring.generate(7);
};
