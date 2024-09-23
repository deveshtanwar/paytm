const userRoutes = require('./user.routes');
const accountRoutes = require('./account.routes');
const { apiPrefix } = require('../default.json');


module.exports = (app) => {
    app.use(`${apiPrefix}/user`, userRoutes);
    app.use(`${apiPrefix}/account`, accountRoutes);
}