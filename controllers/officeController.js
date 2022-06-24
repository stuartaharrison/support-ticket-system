const Office = require('../models/officeModel');
const { applyPatch } = require('fast-json-patch');

const createOffice = async (req, res) => {
    const office = await Office.create(req.body);
    res.status(200).json(office);
};

const fetchOffices = async (req, res) => {
    const offices = await Office.find({}).sort({ officeName: 1 });
    res.status(200).json(offices);
};

const getOffice = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(404).json({ message: 'OfficeId cannot be found.' });
        return;
    }

    const office = await Office.findById(id);
    if (!office) {
        res.status(404).json({ message: `Office with ID: ${id} could not be found.` });
        return;
    }

    res.status(200).json(office);
};

const updateOffice = async (req, res) => {
    let office = await Office.findById(req.params.id);
    if (!office) {
        res.status(404).json({ message: `Office with ID: ${id} could not be found` });
        return;
    }

    office = applyPatch(office, req.body).newDocument;
    const updatedOffice = await Office.findByIdAndUpdate(req.params.id, office, {
        new: true
    });

    res.status(200).json(updateOffice);
};

module.exports = {
    createOffice,
    fetchOffices,
    getOffice,
    updateOffice
};