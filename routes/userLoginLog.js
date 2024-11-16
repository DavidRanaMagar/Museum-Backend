const express = require('express');
const router = express.Router();
const { UserLoginLog } = require('../models');
const {Sequelize} = require("sequelize");

// Create a new log entry
router.post('/', async (req, res) => {
    try {
        const { userID } = req.body;
        const currentTime = new Date();  // Get current date and time
        const newLog = await UserLoginLog.create({
            userID,
            loginTime: currentTime
        });
        res.status(201).json(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create login log' });
    }
});

// Get all log entries
router.get('/', async (req, res) => {
    try {
        const logs = await UserLoginLog.findAll();
        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch login logs' });
    }
});

// Get a log entry by primary keys (userID and loginTime)
router.get('/:userID/:loginTime', async (req, res) => {
    try {
        const { userID, loginTime } = req.params;
        const log = await UserLoginLog.findOne({ where: { userID, loginTime } });
        if (log) {
            res.status(200).json(log);
        } else {
            res.status(404).json({ error: 'Log not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch login log' });
    }
});

// Delete a log entry
router.delete('/:userID/:loginTime', async (req, res) => {
    try {
        const { userID, loginTime } = req.params;
        const deleted = await UserLoginLog.destroy({ where: { userID, loginTime } });
        if (deleted) {
            res.status(200).json({ message: 'Login log deleted successfully' });
        } else {
            res.status(404).json({ error: 'Log not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete login log' });
    }
});

module.exports = router;