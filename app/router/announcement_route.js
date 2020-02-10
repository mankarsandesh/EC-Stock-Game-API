const express = require('express');
const announcementRouter = express.Router();


// all controller here
const  announcementController = require('../controller/announcement_controller');

// validation 
const {validateAnnouncement} = require('../middleware/validators/announcement');
const validate = require('../middleware/validators/validate');


// Get All Announcements
announcementRouter.get('/announcement', announcementController.allAnnouncements );

// Create Announcement
announcementRouter.post('/announcement',validateAnnouncement(),validate, announcementController.announcementStore);

// Get Announcement by id
announcementRouter.get('/announcement/:id', announcementController.announcementById);

// Update Announcement By Id
announcementRouter.put('/announcement/:id', announcementController.announcementUpdateById);

module.exports = announcementRouter;