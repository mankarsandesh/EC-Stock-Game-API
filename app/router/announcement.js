const express = require('express');
const announcementRouter = express.Router();
const {getAllAnnouncements, storeAnnouncement, getAnnouncementById, updateAnnouncementById} = require('../controller/announcement');
const {responseHandler, errorHandler} = require('../utils/utils');

// Get All Announcements
announcementRouter.get('/announcement', async (req, res) => {
    try {
        const announcements = await getAllAnnouncements();
        return res.send(responseHandler(true, 200, 'Success', announcements));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

// Create Announcement
announcementRouter.post('/announcement', async (req, res) => {
    try {
        const announcement = await storeAnnouncement(req.body);
        if(announcement.error) {
            return res.status(400).send(errorHandler(false, 400, 'Failed', announcement.error));
        }
        return res.send(responseHandler(true, 200, 'Success', announcement));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

// Get Announcement by id
announcementRouter.get('/announcement/:id', async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcement = await getAnnouncementById(announcementId);
        if(!announcement) {
            return res.status(404).send(errorHandler(false, 404, 'Failed', 'No announcement found'));
        }
        return res.send(responseHandler(true, 200, 'Success', announcement));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

// Update Announcement By Id
announcementRouter.put('/announcement/:id', async (req, res) => {
    try {
        const announcementId = req.params.id;
        const announcement = await getAnnouncementById(announcementId);
        if(!announcement) {
            return res.status(404).send(errorHandler(false, 404, 'Failed', 'No announcement found'));
        }
        const updated = await updateAnnouncementById(req.body, announcementId);
        if(updated) {
            const updatedAnnouncement = await getAnnouncementById(announcementId);
            return res.send(responseHandler(true, 200, 'Success', updatedAnnouncement));
        } else {
            res.status(400).send(errorHandler(false, 400, 'Failed', 'Announcement not updated'));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

module.exports = announcementRouter;