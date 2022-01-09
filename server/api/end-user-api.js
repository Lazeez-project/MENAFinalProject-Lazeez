const dboperations = require('../dboperations/end-user-operations');
var express = require("express");
var router = express.Router();
const Validator = require('validatorjs');
const { route } = require('express/lib/application');



/*get all restaurants*/
router.route('/restaurants').get((req, res) => {
    dboperations.getRestaurants().then(result => {
        res.json(result[0]);
    })
        .catch(err => {
            res.status(400).send(err.originalError.info.message);
        })
});

/*get specific restaurant data*/
router.route('/restaurants/:resid').get((req, res) => {
    dboperations.getRestaurantById(req.params.resid).then(result => {
        if (result[0]) {
            res.json(result[0]);
        } else {
            res.status(404).json({
                msg: "Not found!",
            });
        }
    })
        .catch(err => {
            res.status(400).send(err.originalError.info.message);
        })
});

/*get meals for specific restaurant*/
router.route('/restaurants/:resid/meals').get((req, res) => {
    const resId = req.params.resid;
    dboperations.getMeals(resId).then(result => {
        /*if (result[0].length !== 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({
                msg: "Not found!",
            });
        }*/
        res.json(result[0]);

    })
        .catch(err => {
            res.status(400).send(err.originalError.info.message);
        })
});

/*send order List to database*/
router.route('/restaurants/:resid/orderlist').post((req, res) => {
    const resId = req.params.resid;
    const orderList = { ...req.body };
    /*const findUser = dboperations.getUser(orderList.userid); /*Check if user exist or not*/
    const rules = {
        "mealid": "required|min:1",
        "price": "required|min:1",
        "count": "required|min:1",
        "resid": "required|min:1",
        "userid": "required|min:1",
    }
    const validation = new Validator(orderList, rules);
    if (validation.fails()) {
        res.status(403).send({
            success: false,
            messege: 'Validation failed',
            data: validation.errors
        });
    } else if (resId != orderList.resid) {
        res.status(412).send("Precondition Failed!");
    } else {
        dboperations.sendOrder(orderList).then(result => {
            res.status(200).json(result[0]);
        })
            .catch(err => {
                res.status(400).send(err.originalError.info);
            })
    }
});

router.route('/restaurants/:resid/orderusers').post((req, res) => {
    const resId = req.params.resid;
    const user = { ...req.body };
    const rules = {
        "name": "required|string",
        "location": "string",
        "phonenumber": "required|string",
        "email": "email",
        "numberofseate": "min:1",
        "resid": "required|min:1",
        "ordertype": "string",
        "ordertime": "date"
    };
    const validation = new Validator(user, rules);
    if (validation.fails()) {
        res.status(403).send({
            success: false,
            messege: 'Validation failed',
            data: validation.errors
        });
    } else if (resId != user.resid) {
        res.status(412).send("Precondition Failed!");
    } else {
        dboperations.sendUser(user).then(result => {
            res.json(result[0][0].ID);
        })
            .catch(err => {
                res.status(400).send(err);
            })
    };

});

/* send messeges footer to datebase */
router.route('/admin/msg').post((req, res) => {
    const messege = { ...req.body }
    const rules = {
        "Fname": 'required|string',
        "Lname": 'required|string',
        "email": 'required|email',
        "messege": 'required|string'
    };
    const validation = new Validator(messege, rules);
    if (validation.fails()) {
        res.status(403).send({
            success: false,
            messege: 'Validation failed',
            data: validation.errors
        });
    } else {
        dboperations.addMessages(messege).then(result => {
            res.status(200).json(result[0]);
        })
            .catch(err => {
                res.status(400).send(err.originalError.info.message);
            })
    }
});

router.route('/userorder').get((req, res) => {
    const { name, phonenumber } = req.query;
    if (phonenumber == undefined) {
        res.status(400).send("Bad Request!");
    };
    dboperations.getUserOrder(name, phonenumber).then(result => {
        res.json(result[0]);
    })
        .catch(err => {
            res.status(400).send(err);
        })
});

router.route('/userorder/:orderid').delete((req, res) => {
    const orderid = req.params.orderid;
    dboperations.deleteUserOrder(orderid).then(result => {
        res.json(result[0]);
    })
        .catch(err => {
            res.status(400).send(err);
        })
});

router.route('/restaurants/:resid/services').get((req, res) => {
    dboperations.getRestaurantServices(req.params.resid).then(result => {
        res.json(result[0]);
    })
        .catch(err => {
            res.status(400).send(err.originalError.info.message);
        })
});


module.exports = router;



