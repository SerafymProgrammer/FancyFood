let tables =  [

    {
        table_id: 'tb_b_1',
        title: 'Wonderful table for a banket',
        room: 'banket',
        image: './images/banket1.jpeg',
    },
    {
        table_id: 'tb_b_2',
        room: 'banket',
        title: 'Very warm place for a soulful feast',
        image: './images/banket2.jpeg',
    },

    {
        table_id: 'tb_h_1',
        room: 'hall',
        title: 'Romantic table for',
        image: './images/hall1.jpg',
    },
    {
        table_id: 'tb_h_2',
        room: 'hall',
        title: 'Very warm place for a soulful feast',
        image: './images/hall2.jpg',
    },
    {
        table_id: 'tb_h_3',
        room: 'hall',
        title: 'Romantic table for',
        image: './images/hall3.jpg',
    },
    {
        table_id: 'tb_h_4',
        room: 'hall',
        title: 'Very warm place for a soulful feast',
        image:'./images/hall4.jpg',
    },

]


let dishes = [
    {
        title: 'Spinach cream soup with mozzarella',
        category: 'soups',
        description: '',
        image: './images/soup1.jpg'
    },
    {
        category: 'soups',
        title: 'Cream soup with grated mushrooms "Mushmules"',
        description: '',
        image: './images/soup2.jpg'
    },
    {
        category: 'soups',
        title: 'Lilac cream soup',
        description: '',
        image: './images/soup3.jpg'
    },
    {
        category: 'salads',
        title: 'Salad with Seleroy',
        description: '',
        image: './images/salad1.jpg'
    },
    {
        category: 'salads',
        title: 'Tuluzsky',
        description: '',
        image: './images/salad2.jpg'
    },
    {
        category: 'salads',
        title: 'Lilac salad',
        description: '',
        image: './images/salad3.jpg'

    },
    {
        category: 'deserts',
        title: 'La Monde',
        description: '',
        image: './images/desert1.jpg'

    },
    {
        category: 'deserts',
        title: 'Consomme',
        description: '',
        image: './images/desert2.jpg'

        },
    {
        category: 'deserts',
        title: 'Maron Claire',
        description: '',
        image: './images/desert3.jpg'
    },
]
const tables_migrations = (app, fs) => {

    // variables
    const dataPath = './data/tables.json';

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    const do_migration = async () => {
        fs.readFile(
            dataPath, 'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                    return
                }
                let new_data = {};
                tables.map(async (item) => {
                    let path = item.image;
                    let buff = fs.readFileSync(path);
                    let base64data = buff.toString('base64');
                    let img_to_frontend = 'data:image/png;base64, '+base64data;
                    const newId = Date.now().toString();
                    new_data[newId.toString()] = {...item, table_id: newId, image: img_to_frontend};

                })
                writeFile(JSON.stringify(new_data), () => {
                });
            }
        )
    }
    do_migration()
};
const dishes_migrations = (app, fs) => {

    // variables
    const dataPath = './data/dishes.json';

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    const do_migration = async () => {
        fs.readFile(
            dataPath, 'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                    return
                }
                let new_data = {};
                dishes.map(async (item) => {
                    let path = item.image;
                    let buff = fs.readFileSync(path);
                    let base64data = buff.toString('base64');
                    let img_to_frontend = 'data:image/png;base64, '+base64data;
                    const newId = Date.now().toString();
                    new_data[newId.toString()] = {...item, dish_id: newId, image: img_to_frontend};

                })
                writeFile(JSON.stringify(new_data), () => {
                });
            }
        )
    }
    do_migration()
};
module.exports = dishes_migrations;
