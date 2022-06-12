// const {hash_string} = require("../utils/utils");
var sha1 = require('sha1');


const authRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.post('/auth', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
                return
            }
            console.log(req.body)
            let users = JSON.parse(data)
            users = Object.values(users);
            let req_user = users.find(user=>user.login===req.body.login);
            console.log(req_user)
            if (!req_user) {
                res.status(404).send({msg:'user does not exist', code: 404});
                return
            }
            if (req_user.password !== req.body.password) {
                res.status(500).send({code: 500, msg:'password is wrong'});
                return
            }
            res.status(200).send({code: 200, token: sha1(JSON.stringify(req_user))
            });
        });
    });

    // CREATE
    app.post('/register', (req, res) => {

        readFile(data => {
                // Note: this isn't ideal for production use.
                // ideally, use something like a UUID or other GUID for a unique ID value
                const newUserId = Date.now().toString();

                // add the new user
                data[newUserId.toString()] = {...req.body, isAdmin: 0, user_id: newUserId.toString()};

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new user added');
                });
            },
            true);
    });
};

module.exports = authRoutes;
