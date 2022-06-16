
const ordersRoutes = (app, fs) => {

    // variables
    const dataPathTables= './data/tables.json';
    const dataPathOrders = './data/orders.json';
    const dataPathDishes= './data/dishes.json';
    const dataPathUsers= './data/users.json';

    const writeFile = (fileData, callback, filePath = dataPathOrders, encoding = 'utf8') => {
        console.log(fileData, callback, filePath)
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/orders_all', (req, res) => {
        fs.readFile(
            dataPathOrders, 'utf8',
            (err, data_orders) => {
                if (err) {
                    throw err;
                    return
                }

                let orders = JSON.parse(data_orders)
                orders = Object.values(orders);
                fs.readFile(
                    dataPathDishes, 'utf8',
                    (err, data_dishes) => {
                        if (err) {
                            throw err;
                            return
                        }

                        let dishes = JSON.parse(data_dishes)
                        orders = orders.map(( order)=> {
                            let new_order = {...order};
                            new_order.dishes = new_order.dishes.map(dish_id =>({...dishes[dish_id]}))
                            return  new_order;
                        });
                        fs.readFile(
                            dataPathTables, 'utf8',
                            (verr, data_tables)=>{
                                let tables = JSON.parse(data_tables)

                                orders = orders.map(( order)=> {
                                    let new_order = {...order};
                                    new_order.table = {...tables[new_order.table_id]};
                                    return  new_order;
                                });
                                fs.readFile(
                                    dataPathUsers, 'utf8',(err, users_)=>{
                                        let users = JSON.parse(users_);
                                        orders = orders.map(( order)=> {
                                            let new_order = {...order};
                                            new_order.user_data = {...users[new_order.user_id]};
                                            return  new_order;
                                        });
                                        res.status(200).send({code: 200, data: orders});
                                    })
                            }

                        )
                    });
            });
    })

    app.get('/orders_by_user', (req, res) => {
        let user_id = req.params.user_id;
        fs.readFile(
            dataPathOrders, 'utf8',
            (err, data_orders) => {
                if (err) {
                    throw err;
                    return
                }

                        let orders = JSON.parse(data_orders)
                        orders = Object.values(orders);
                        orders = orders.filter((item)=>item.user_id===user_id);
                fs.readFile(
                    dataPathDishes, 'utf8',
                    (err, data_dishes) => {
                        if (err) {
                            throw err;
                            return
                        }

                        let dishes = JSON.parse(data_dishes)
                        orders = orders.map(( order)=> {
                            let new_order = {...order};
                            new_order.dishes = new_order.dishes.map(dish_id =>({...dishes[dish_id]}))
                            return  new_order;
                        });
                        fs.readFile(
                            dataPathTables, 'utf8',
                            (err, data_tables)=>{
                                let tables = JSON.parse(data_tables)

                                orders = orders.map(( order)=> {
                                    let new_order = {...order};
                                    new_order.table = {...tables[new_order.table_id]};
                                    return  new_order;
                                });
                                res.status(200).send({code: 200, data: JSON.stringify(orders)});
                            }

                        )
                    });
        });
    })

    app.post('/create_order', (req, res) => {
        fs.readFile(
            dataPathOrders, 'utf8',
            (err, data) => {
                if (err) {
                    throw err;
                    return
                }
                let parsed_data = JSON.parse(data);
                const newOrderId = Date.now().toString();

                // add the new user
                parsed_data[newOrderId.toString()] = {...req.body,  order_id: newOrderId.toString()};
                writeFile(JSON.stringify(parsed_data), () => {
                    res.status(200).send({msg:'new order added', code: 200});
                });
            })
    });

    app.get('/del_order', (req, res) => {
        let order_id = req.params.o_id;
        fs.readFile(
            dataPathOrders, 'utf8',
            (err, data_orders)=>{
                let orders = JSON.parse(data_orders)
                if (orders.hasOwnProperty(order_id)){
                    delete orders[order_id];
                    writeFile(JSON.stringify(orders), () => {
                        res.status(200).send({code: 200, msg: 'success'});
                    }, dataPathOrders);

                }
            }

        )
    });
};

module.exports = ordersRoutes;
