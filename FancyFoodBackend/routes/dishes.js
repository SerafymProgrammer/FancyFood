
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
                dishes = Object.values(dishes);
                let res_data = {};
                let temp_caths = []
                console.log('dishes', dishes.length)
                dishes.map(dish => {
                   if (!temp_caths.find(item=>item===dish.category)) {
                       temp_caths.push(dish.category)
                       res_data[dish.category] = [{...dish}];
                   } else {
                       res_data[dish.category] = [...res_data[dish.category], {...dish}]
                   }
                });
                // console.log( JSON.stringify(res_data))
                res.status(200).send({code: 200, data: res_data});
            });
    });
};

module.exports = dishesRoutes;
