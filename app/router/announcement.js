const express = require('express');
const announcementRouter = express.Router();
const {getAllAnnouncements, storeAnnouncement, getAnnouncementById, updateAnnouncementById} = require('../controller/announcement');
const {successResponse, badRequestError, notFoundError, serverError} = require('../utils/utils');

// Get All Announcements
announcementRouter.get('/announcement', async (req, res) => {
    try {
        const announcements = await getAllAnnouncements();
        return res.send(successResponse(announcements));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

// Create Announcement
announcementRouter.post('/announcement', async (req, res) => {
    try {
        const announcement = await storeAnnouncement(req.body);
        if(announcement.error) {
            return res.status(400).send(badRequestError(announcement.error));
        }
        return res.send(successResponse(announcement));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

// Get Announcement by id
announcementRouter.get('/announcement/:id', async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcement = await getAnnouncementById(announcementId);
        if(!announcement) {
            return res.status(404).send(notFoundError('No announcement found'));
        }
        return res.send(successResponse(announcement));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

// Update Announcement By Id
announcementRouter.put('/announcement/:id', async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcement = await getAnnouncementById(announcementId);
        if(!announcement) {
            return res.status(404).send(notFoundError('No announcement found'));
        }
        const updated = await updateAnnouncementById(req.body, announcementId);
        if(updated) {
            const updatedAnnouncement = await getAnnouncementById(announcementId);
            return res.send(successResponse(updatedAnnouncement));
        } else {
            res.status(400).send(badRequestError('Announcement not updated'));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = announcementRouter;