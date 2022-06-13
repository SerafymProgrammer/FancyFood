
const dishesRoutes = (app, fs) => {

    // variables
    const dataPath = './data/dishes.json';

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
    app.get('/dishes', (req, res) => {
        console.log('haha')
        fs.readFile(
            dataPath, 'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                    return
                }
                let dishes = JSON.parse(data)
                dishes = Object.values(users);
                let res_data = {};
                let temp_caths = []
                dishes.map(dish => {
                   if (!temp_caths.find(item=>item===dish.cathegory)) {
                       temp_caths.push(dish.cathegory)
                       res_data[dish.cathegory] = [{...dish}];
                   } else {
                       res_data[dish.cathegory] = [...res_data[dish.cathegory], {...dish}]
                   }
                });
                res.status(200).send({code: 200, data: JSON.stringify(res_data)});
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

module.exports = dishesRoutes;
