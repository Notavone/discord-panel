const router = require('express').Router();

let callCount = 0;

router.use('/', (req, res, next) => {
    console.log(`Call to ${req.originalUrl} (${callCount++})`);
    next()
});

const guildsRoutes = require('./routes/guilds.js');
const channelsRoutes = require('./routes/channels.js');
const usersRoutes = require('./routes/users.js');
const rolesRoutes = require('./routes/roles.js');
const emojisRoutes = require('./routes/emojis.js');
router.use('/guilds', guildsRoutes);
router.use('/channels', channelsRoutes);
router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/emojis', emojisRoutes);

module.exports = router;