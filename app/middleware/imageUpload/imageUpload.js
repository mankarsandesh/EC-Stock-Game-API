const sharp = require('sharp');
const fs = require('fs');
const uuid4 = require('uuid/v4');
const User = require('../../models/user');
const {getPortalProvider} = require('../../controller/portalProvider_controller');
const {getUsersMatch} = require('../../controller/user_controller');
const {notFoundError, badRequestError, serverError} = require('../../utils/utils');


const uploadImage = async (req, res, next) => {
    try {
        const validUpdates = ['portalProviderUUID', 'userUUID', 'email', 'firstName', 'middleName', 'lastName'];
        const isValidUpdate = Object.keys(req.body).every((update) => validUpdates.includes(update));
        if(!isValidUpdate) {
            res.status(400).send(badRequestError('Bad Request'));
        }
        const portalProviderUUID = req.body.portalProviderUUID;
        const userUUID = req.body.userUUID;
        const provider = await getPortalProvider(portalProviderUUID);
        if(!provider) {
            return res.status(404).send(notFoundError('Portal provider does not exist'));
        }
        const user = await getUsersMatch(userUUID);
        if(!user) {
            return res.status(404).send('User does not exist');
        }
        if(req.fileError) {
            return res.status(400).send(badRequestError(req.fileError));
        }
        if(!req.file) {
            return next();
        }
        const buffer = await sharp(req.file.buffer).resize({ height: 480, width: 360 }).png().toBuffer();
        const pictureId = uuid4();
        if(user.profileImage) {
            fs.unlink(`${process.env.PROFILE_PIC_PATH}/${user.profileImage}`, (err) => {
                if(err) {
                    console.log(err);
                }
            });
            fs.writeFile(`${process.env.PROFILE_PIC_PATH}/${pictureId}.png`, buffer, async (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).send(serverError(false, 500, 'Profile picture not saved successfully'));
                }
                const updated = await User.update({
                    profileImage: `${pictureId}.png`
                }, {
                    where: {
                        UUID: user.UUID
                    },
                    raw: true
                });
                if(updated) {
                    return next();
                } else {
                    res.status(500).send(serverError(false, 500, 'Profile picture not updated'));
                }
            });
        } else {
            fs.writeFile(`${process.env.PROFILE_PIC_PATH}/${pictureId}.png`, buffer, async (err) => {
                if(err) {
                    console.log(err);
                    res.status(500).send(serverError(false, 500, 'Profile picture not saved successfully'));
                }
                const updated = await User.update({
                    profileImage: `${pictureId}.png`
                }, {
                    where: {
                        UUID: user.UUID
                    },
                    raw: true
                });
                if(updated) {
                    return next();
                } else {
                    res.status(500).send(serverError(false, 500, 'Profile picture not updated'));
                }
            });
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = uploadImage;