const { Language } = require('../models/language-model');
const { Languages } = require('../static_data/seed-data');
const { lineToWordConverter } = require('../utils/library');

exports.seed = async (req, res) => {
    try {
        const initialData = req.body.Languages || Languages;
        for (let i = 0; i < initialData.length; i++) {
            let language = await new Language({
                value: lineToWordConverter(initialData[i]),
                label: initialData[i],
                createdBy: 'admin',
                creatorId: '000000000000000000000000',
            });
            let savedData = await language.save();
            if (!savedData) return res.status(500).send({ success: false, message: initialData[i] + ' Could not be saved on database' });
        }
        res.status(200).send({ success: true, message: 'All languages are created' });
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
};
exports.createMultiple = async (languageArray, userType, userId) => {
    try {
        let resultArray = [];
        for (let i = 0; i < languageArray.length; i++) {
            let language = await new Language({
                value: lineToWordConverter(languageArray[i].label),
                label: languageArray[i].label,
                createdBy: userType,
                creatorId: userId,
            });
            let savedData = await language.save();

            resultArray.push(savedData);
            if (!savedData) return { success: false };
        }
        return { success: true, resultArray };
    } catch (err) {
        return { success: false };
    }
};

exports.getAllGlobal = async (req, res) => {
    const languages = await Language.find({
        createdBy: 'admin',
        isActive: true,
        isDeleted: false,
    });
    res.status(200).send({
        success: true,
        languages,
    });
};

exports.getAllByUser = async (req, res) => {
    const userId = req.params.userId;
    const languages = await Language.find({
        $and: [{ $or: [{ createdBy: 'admin' }, { creatorId: userId }] }, { isActive: true }, { isDeleted: false }],
    });

    res.status(200).send({
        success: true,
        languages,
    });
};
exports.getOne = async (req, res) => {
    const languageId = req.params.languageId;
    const language = await Language.findById(languageId);
    if (!language) return res.status(404).send({ success: false, message: 'No language found.' });
    res.status(200).send({ success: true, language });
};
exports.convertObjectToId = async (userId, userType, languages) => {
    try {
        let newLanguages = [];
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].__isNew__ === true) {
                let language = await new Language({
                    value: lineToWordConverter(languages[i].label),
                    label: languages[i].label,
                    createdBy: userType,
                    creatorId: userId,
                });
                let savedData = await language.save();
                if (!savedData) return { success: false, message: 'Unable to save ' + languages[i].label };
                else newLanguages.push(savedData._id);
            } else {
                newLanguages.push(languages[i]._id);
            }
        }
        return { success: true, newLanguages };
    } catch (err) {
        return { success: false, newLanguages: [] };
    }
};

exports.convertIdToObject = async (userId, userType, languages) => {};
