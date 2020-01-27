const Announcement = require('../models/announcement');

// Get all announcements
async function getAllAnnouncements () {
    try {
        const announcements = await Announcement.findAll({ raw: true });
        return announcements;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// Store Announcement
async function storeAnnouncement (data) {
    try {
        const announcement = await Announcement.create(data, { raw: true });
        return announcement;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeUniqueConstraintError') {      // If the announcement already exists
            return {error: 'Announcement already exists'}
        } else if(error.name == 'SequelizeValidationError') {     // If the invalid data is passed
            return {error: error.errors[0].message}
        } 
        else {
            console.log(error);
            throw new Error();
        }
    }
}

module.exports = {
    getAllAnnouncements,
    storeAnnouncement
}