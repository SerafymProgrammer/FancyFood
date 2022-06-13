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
        console.log(fileData, callback, filePath)
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.post('/auth', (req, res) => {
        console.log('haha')
        fs.readFile(
            dataPath, 'utf8',
            (err, data) => {
            if (err) {
                throw err;
                return
            }
            let users = JSON.parse(data)
            users = Object.values(users);
            let req_user = users.find(user=>user.login===req.body.login);
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
        fs.readFile(
            dataPath, 'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                    return
                }
                let parsed_data = JSON.parse(data);
                let users = Object.values(parsed_data);

                let req_user = users.find(user=>user.login===req.body.login);
                if (req_user) {
                    res.status(500).send({msg:'user already exist', code: 500});
                    return
                }
                const newUserId = Date.now().toString();

                // add the new user
                parsed_data[newUserId.toString()] = {...req.body, isAdmin: 0, user_id: newUserId.toString()};
                console.log(parsed_data)
                writeFile(JSON.stringify(parsed_data), () => {
                    res.status(200).send({msg:'new user added', code: 200});
                });
            });
        readFile(data => {

            },
            true);
    });
};

module.exports = authRoutes;
