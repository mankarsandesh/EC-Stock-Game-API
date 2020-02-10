const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');
const announcementModel = require('../../models/announcement');


const getAllAnnouncements = async () => {
    try {
        const announcements = await announcementModel.findAll({ raw: true });
        return announcements;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

const storeAnnouncement = async (data, res) => {
    try {
        const announcement = await announcementModel.create(data, { raw: true });
        return announcement;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeUniqueConstraintError') {      // If the announcement already exists
            return { error: 'Announcement already exists' }
        } else if (error.name == 'SequelizeValidationError') {     // If the invalid data is passed
            return { error: error.errors[0].message }
        }
        else {
            console.log(error);
            throw new Error();
        }
    }
}

const getAnnouncementById = async (announcementId) => {
    try {
        const announcement = await announcementModel.findOne({
            where: {
                PID: announcementId
            },
            raw: true
        });
        return announcement;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// Update Announcement By Id
const updateAnnouncementById  = async (data, announcementId) => {
    try {
        const updated = await announcementModel.update(data, {
            where: {
                PID: announcementId
            },
            raw: true
        });
        return updated;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}



module.exports = {
    getAllAnnouncements,
    storeAnnouncement,
    getAnnouncementById,
    updateAnnouncementById
}