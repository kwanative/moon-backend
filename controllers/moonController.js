'use strict';

const firebase = require('../db');
const Moon = require('../models/moon');
const firestore = firebase.firestore();

const getMoon = async (req, res, next) => {
    try {
        const id = req.params.id;
        const moon = await firestore.collection('moon').doc(id);
        const data = await moon.get();
        if(!data.exists) {
            res.status(404).send('Moon not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMoon = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const moon =  await firestore.collection('moon').doc(id);
        await moon.update(data);
        res.send('Moon record updated successfully');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getMoon,
    updateMoon
}