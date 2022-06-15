
const tablesRoutes = (app, fs) => {

    // variables
    const dataPath = './data/tables.json';
    const dataPathOrders = './data/orders.json';

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        console.log(fileData, callback, filePath)
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    const create_res_data = (tables=[]) => {
        let res_data = {};
        let temp_caths = []
        tables.map(table => {
            if (!temp_caths.find(item=>item===table.room)) {
                temp_caths.push(table.room)
                res_data[table.room] = [{...table}];
            } else {
                res_data[table.room] = [...res_data[table.room], {...table}]
            }
        });
        return res_data;
    };


    // READ
    app.get('/free_tables', (req, res) => {
       let date_time = req.params.date_time;
        fs.readFile(
            dataPathOrders, 'utf8',
            (err, data_orders) => {
                if (err) {
                    throw err;
                    return
                }
                fs.readFile(
                    dataPath, 'utf8',
                    (err, data_tables)=>{
                        let orders = JSON.parse(data_orders)
                        orders = Object.values(orders);
                        let tables = JSON.parse(data_tables)
                        tables = Object.values(tables);

                        orders.forEach((order)=>{
                           if(Number(order.date)!==Number(date_time)){
                               tables=tables.filter(table=>table.table_id!==order.table_id)
                           }
                        })

                        res.status(200).send({code: 200, data: JSON.stringify(create_res_data(tables))});
                    }

                    )
            });
    });

    app.get('/del_table', (req, res) => {
        let table_id = req.params.t_id;
                fs.readFile(
                    dataPath, 'utf8',
                    (err, data_tables)=>{
                        let tables = JSON.parse(data_tables)
                        if (tables.hasOwnProperty(table_id)){
                            delete tables[table_id];
                            writeFile(JSON.stringify(tables), () => {
                                res.status(200).send({code: 200, data: JSON.stringify(create_res_data(tables))});
                            });

                        }
                    }

                )
    });
};

module.exports = tablesRoutes;
