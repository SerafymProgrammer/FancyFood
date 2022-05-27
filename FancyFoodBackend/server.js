var db = require('./db.json');

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3355;
server.use(jsonServer.bodyParser);
server.use(middlewares);


server.use(jsonServer.rewriter({
    '/api/templates': '/templates'
}));

server.post('/post/template', (req, res) => {
    if (req.method === 'POST') {
        let tempId = req.body['temp_id'];
        if (tempId != null && tempId >= 0) {
            let result = db.users.find(temp => {
                return temp.id == tempId;
            })

            if (result) {
                let {id, ...temp} = result;
                res.status(200).jsonp(temp);
            } else {
                res.status(400).jsonp({
                    error: "Bad userId"
                });
            }
        } else {
            res.status(400).jsonp({
                error: "No valid userId"
            });
        }
    }
});

server.get('/get/user_templates', (req, res) => {
    if (req.method === 'GET') {

        let tempId = req.query['temp_id'];

        if (tempId) {
            let result = db.user_templates.find(temp => {

                return temp.id == tempId;
            })
            console.log('result', result)
            if (result) {
                let {id, ...temp} = result;
                res.status(200).jsonp(temp);
            } else {
                res.status(400).jsonp({
                    error: "Bad userId"
                });
            }
        } else {
            let return_arr = db.user_templates.map(item=>{
                let temp_item  = {...item};
                delete temp_item.description;
                delete temp_item.description_json;
                return temp_item
            })

            console.log(return_arr)
            //
            // res.status(200).jsonp(JSON.stringify(return_arr));

            res.status(200).jsonp(return_arr);
            // res.status(400).jsonp({
            //     error: "No valid userId"
            // });
        }
    }

});

server.get('/get/system_templates', (req, res) => {
    if (req.method === 'GET') {

        let tempId = req.query['temp_id'];

        if (tempId) {
            let result = db.system_templates.find(temp => {
                return temp.id == tempId;
            })
            console.log('result', result)
            if (result) {
                let {id, ...temp} = result;
                res.status(200).jsonp(temp);
            } else {
                res.status(400).jsonp({
                    error: "Bad userId"
                });
            }
        } else {
            let return_arr = db.system_templates.map(item=>{
                let temp_item  = {...item};
                delete temp_item.description;
                delete temp_item.description_json;
                return temp_item
            })

            console.log(return_arr)
            //
            // res.status(200).jsonp(JSON.stringify(return_arr));

            res.status(200).jsonp(return_arr);
            // res.status(400).jsonp({
            //     error: "No valid userId"
            // });
        }
    }

});


server.use(router);
server.listen(port);