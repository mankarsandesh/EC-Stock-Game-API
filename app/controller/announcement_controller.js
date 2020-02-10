//Announcement Interface Model
const {getAllAnnouncements , storeAnnouncement , getAnnouncementById , updateAnnouncementById} = require('../components/models/announcement.interface');

// helper function for response
const {successResponse, badRequestError, notFoundError, serverError} = require('../utils/utils');

// Portal Provider Controller
const { getPortalProvider } = require('../controller/portalProvider_controller');



// Get all announcements
const allAnnouncements  = async(req,res) => {
    try {
        const announcements = await getAllAnnouncements();
        return res.send(successResponse(announcements));
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// Store Announcement
const announcementStore = async (req,res) => {
    try {        
        const userBody = req.body;
        const providerData = await getPortalProvider(req.body.providerUUID);
        // Portal provider UUID valid check
        if(!providerData){               
            res.status(404).send(notFoundError('providerUUID does not exist.'));
        }
        const announcement = await storeAnnouncement(userBody);
        if(announcement.error) {
            return res.status(400).send(badRequestError(announcement.error));
        }
        return res.send(successResponse(announcement));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
}

// Get announcement by Id
const  announcementById = async (req,res) => {
    try {
        const announcementId = req.params.id;
        console.log(announcementId);
        const announcement = await getAnnouncementById(announcementId);
        return res.send(successResponse(announcement));
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// Update Announcement By Id
const announcementUpdateById  = async (req,res) => {
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
}

module.exports = {
    allAnnouncements,
    announcementStore,
    announcementById,
    announcementUpdateById
}