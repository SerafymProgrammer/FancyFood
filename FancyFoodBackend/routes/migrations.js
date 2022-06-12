let tables =  [

    {
        id: 'tb_b_1',
        title: 'Wonderful table for a banket',
        room: 'banket',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/banket1.jpeg'),
    },
    {
        id: 'tb_b_2',
        room: 'banket',
        title: 'Very warm place for a soulful feast',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/banket2.jpeg'),
    },

    {
        id: 'tb_h_1',
        room: 'hall',
        title: 'Romantic table for',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/hall1.jpg'),
    },
    {
        id: 'tb_h_2',
        room: 'hall',
        title: 'Very warm place for a soulful feast',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/hall2.jpg'),
    },
    {
        id: 'tb_h_3',
        room: 'hall',
        title: 'Romantic table for',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/hall3.jpg'),
    },
    {
        id: 'tb_h_4',
        room: 'hall',
        title: 'Very warm place for a soulful feast',
        time: null,
        date: null,
        status: 'free',
        food: [],
        comment: '',
        call_admin: false,
        image: require('./images/hall4.jpg'),
    },

]
const imageToBase64 = require('image-to-base64');

const tables_migrations = (app, fs) => {

    // variables
    const dataPath = './data/tables.json';

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

    const do_migration = async () => {
        let new_arr = tables.map(async (item) => {
            imageToBase64("URL") // insert image url here.
                .then((response) => {
                        console.log(response);  // the response will be the string base64.
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
        })
        readFile(data => {
            // Note: this isn't ideal for production use.
            // ideally, use something like a UUID or other GUID for a unique ID value
            const newUserId = Date.now().toString();

            // add the new user
            data[newUserId.toString()] = {...req.body, isAdmin: 0, reserves: []};

            writeFile(JSON.stringify(data, null, 2), () => {
                // res.status(200).send('new user added');
            });
        }, false)
    }

};

module.exports = userRoutes;
