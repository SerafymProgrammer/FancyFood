const userRoutes = require('./users');
const authRoutes = require("./auth");
const migrations = require("./migrations");
const dishesRoutes = require("./dishes");
const ordersRoutes = require("./orders");
const tablesRoutes = require("./tables");


let success_migration = false;
const appRouter = (app, fs) => {
    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    const set_status_migration = (status) => {
        success_migration=status;
    }
    // run our user route module here to complete the wire up
    userRoutes(app, fs);
    authRoutes(app, fs);
    dishesRoutes(app, fs)
    ordersRoutes(app, fs)
    tablesRoutes(app, fs)
    if (!success_migration) {
        // migrations(app, fs, set_status_migration)
    }

};

// this line is unchanged
module.exports = appRouter;
