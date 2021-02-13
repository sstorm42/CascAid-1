const path = require('path');
const { v1: uuidv1 } = require('uuid');
const { v4: uuidv4 } = require('uuid');
const base64ToImage = require('base64-to-image');
const fs = require('fs');
const moment = require('moment');

exports.saveImagesOnServer = (imageArray) => {
    const appDir = `http://localhost:3001/uploaded-images/`;
    const path2 = './uploaded_images/';
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
