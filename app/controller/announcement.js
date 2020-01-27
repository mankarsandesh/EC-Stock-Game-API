const Announcement = require('../models/announcement');

async function getAllAnnouncements () {
    try {
        const announcements = await Announcement.findAll({ raw: true });
        return announcements;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllAnnouncements
}