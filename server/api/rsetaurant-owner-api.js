const dboperations = require('../dboperations/restaurant-owner-operations');
var express = require("express");
var router = express.Router();
const Validator = require('validatorjs');

const fs = require('fs');



router.route('/restaurantowner/restaurants').get((req, res) => {
    dboperations.getRestaurants().then(resulte => {
        res.json(resulte)
    })
        .catch(err => res.status(500));
});


router.route('/restaurantowner/restaurants').post((req, res) => {
    let rule = {
        name: 'required|string',
        username: 'required|string',
        password: 'required|string',
        phonenumber: 'required|string',
        Ftime: 'required',
        Ttime: 'required',
        email: 'email'
    }
    req.body.Ftime = `2022-01-01, ${req.body.Ftime}`
    req.body.Ttime = `2022-01-01, ${req.body.Ttime}`
    for (let i in req.body) {
        if (req.body[i] == 'null' || req.body[i] === '') {
            req.body[i] = null
        }
        else if (req.body[i] == 'true') {
            req.body[i] = 1
        }
        else if (req.body[i] == 'false') {
            req.body[i] = 0
        }
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        console.log(validate.errors.all())
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        if (req.files) {
            let picname = ''
            for (let i in req.files) {
                let pic = req.files[i]
                pic.mv(`../client/public/Images/${req.body.username}${req.files[i].name}`),
                    picname += `${req.body.username}${req.files[i].name},`
            }
            req.body.pictures = picname
        }
        dboperations.register(req.body).then(resulte => {
            dboperations.getResId(req.body).then(result => {
                console.log(result);
                dboperations.addUserOwner(result[0][0].id, req.body).then(reslt => {
                    res.json(reslt[0])
                })
            })
        })
    }
});

router.route('/restaurantowner/restaurant/login').post((req, res) => {
    dboperations.getOwner(req.body).then(resulte => {
        if (resulte[0].length > 0) {
            res.json(resulte[0])
        }
        else {
            res.status(404).send({ msg: `username or password is not exist` })
        }
    })
});

router.route('/restaurantowner/restaurant/:id').get((req, res) => {
    const { id } = req.params
    dboperations.getRestaurant(id).then(resulte => {
        res.json(resulte[0])
    })
});
router.route('/restaurantowner/restaurant/:id').put((req, res) => {
    const { id } = req.params

    let rule = {
        name: 'required|string',
        phonenumber: 'required|string',
        Ftime: 'required',
        Ttime: 'required',
        email: 'email'
    }

    req.body.Ftime = `2022-01-01, ${req.body.Ftime}`
    req.body.Ttime = `2022-01-01, ${req.body.Ttime}`
    for (let i in req.body) {
        if (req.body[i] == 'null' || req.body[i].trim() == '') {
            req.body[i] = null
        }
        else if (req.body[i] == 'true') {
            req.body[i] = 1
        }
        else if (req.body[i] == 'false') {
            req.body[i] = 0
        }
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        console.log(validate.errors.all())
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        dboperations.updateRestaurantData(id, req.body).then(resulte => {
            res.json(resulte[0])
        })
            .catch(err => res.status(404).send('Check Your Data Please'))
    }
});


router.route('/restaurantowner/restaurant/:id').delete((req, res) => {                 /*error*/
    const { id } = req.params
    let pictures = '';
    console.log(id);
    dboperations.getRestaurant(id).then(result => {
        pictures = result[0][0].pictures;
        if (pictures !== null) {
            arr = pictures.split(',')
            arr.map(item => {
                if (item !== '') {
                    fs.unlink(`../client/public/Images/${item}`, (err) => {
                        if (err) {
                            res.status(500)
                        }
                    })
                }
            })
        }
        dboperations.deleteRestaurant(id).then(result => {
            res.json(result[0])
        })
            .catch(err => res.json(500))
    })
});

router.route('/restaurantowner/restaurant/:id/orders').get((req, res) => {
    const { id } = req.params
    dboperations.getOrders(id).then(resulte => {
        res.json(resulte[0])
    })
});

router.route('/restaurantowner/restaurant/:id/orderstate').put((req, res) => {
    const { id } = req.params

    dboperations.updateStateOrder(id, req.body).then(result => {
        res.json(result[0])
    })
        .catch(err => res.state(500))
});


router.route('/restaurantowner/restaurant/:id/orders/numbers').get((req, res) => {
    const { id } = req.params
    let result = []
    dboperations.getOrdersNum('*', id).then(resulte => {
        result[0] = { id: 1, name: 'Orders', count: resulte[0][0][''], background: 'var(--primary)' }
        dboperations.getOrdersNum(0, id).then(resulte => {
            result[1] = { id: 2, name: 'Waiting', count: resulte[0][0][''], background: '#f66' }
            dboperations.getOrdersNum(1, id).then(resulte => {
                result[2] = { id: 3, name: 'Preparing', count: resulte[0][0][''], background: '#fa5' }
                dboperations.getOrdersNum(2, id).then(resulte => {
                    result[3] = { id: 4, name: 'Finished', count: resulte[0][0][''], background: '#5af' }
                    dboperations.getOrdersNum(3, id).then(resulte => {
                        result[4] = { id: 5, name: 'Done', count: resulte[0][0][''], background: '#5a5' }
                        res.json(result)
                    })
                })
            })
        })
    })
});

router.route('/restaurantowner/restaurant/:id/password').put((req, res) => {
    const { id } = req.params
    let rule = {
        oldPassword: 'required|string|min:6',
        newPassword: 'required|string|min:6',
        confirm: 'required|string|min:6',
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        console.log(validate.errors.all())
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        dboperations.getRestaurantUser(id).then(resulte => {
            if (resulte[0][0].password == req.body.oldPassword) {
                dboperations.chngPassResturant(id, req.body.newPassword).then(result => {
                    res.json(result[0])
                })
            }
            else {
                res.json({ msg: 'Error Yor Old Password is not correct' })
            }
        })
    }
});

router.route('/restaurantowner/restaurant/:id/services').get((req, res) => {
    const { id } = req.params

    dboperations.getServices(id).then(resulte => {
        resulte[0] = resulte[0].map(serv => {
            if (serv.checked == 1) {
                return {
                    id: serv.id,
                    resid: id,
                    checked: true
                }
            }
            else {
                return {
                    id: serv.id,
                    resid: id,
                    checked: false
                }
            }
        })
        res.json(resulte[0])
    })
});
router.route('/restaurantowner/restaurant/:id/services').post((req, res) => {
    const { id } = req.params;
    console.log(req.body, 'This is body *************************');
    dboperations.getServices(id).then(resulte => {
        console.log(resulte)
        if (resulte[0].length == 0) {
            dboperations.setServices(req.body).then(result => {
                res.json(result[0])
            })
        }
        else {
            dboperations.updateServices(req.body).then(result => {
                res.json(result[0])
            })
        }
    })
});

router.route('/restaurantowner/restaurant/:id/meals').get((req, res) => {
    const { id } = req.params
    dboperations.getMeals(id).then(resulte => {
        res.json(resulte[0])
    })
});
router.route('/restaurantowner/restaurant/:id/meals').post(async (req, res) => {

    let rule = {
        mealname: 'required|string|min:3',
        price: 'required'
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        console.log(validate.errors.all())
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        const mp = req.files.pictures
        mp.mv(`../client/public/Images/res${req.body.resId}${mp.name}`, (err) => {
            if (err)
                console.log('error')
            else
                dboperations.addMeal(req.body, `res${req.body.resId}${mp.name}`).then(resulte => {
                    res.json(resulte[0])
                })
        })
    }
});

router.route('/restaurantowner/restaurant/:id/meal/:mealId').get((req, res) => {
    const { id, mealId } = req.params
    dboperations.getMeal(id, mealId).then(result => {
        res.json(result[0])
    })
});
router.route('/restaurantowner/restaurant/:id/meal/:mealId').delete((req, res) => {
    const { id, mealId } = req.params;
    let path;
    dboperations.getMeal(id, mealId).then(resulte => {
        path = `../client/public/Images/${resulte[0][0].pictures}`
        dboperations.deleteOrderslist(id, mealId).then(result => {
            dboperations.deleteMeal(id, mealId).then(resulte => {
                fs.unlinkSync(path)
                res.json(resulte[0])
            })
        })
            .catch(err => res.status('404').send())
    })
        .catch(err => res.status('404').send())
});

router.route('/restaurantowner/restaurant/:id/meal/:mealId').put((req, res) => {
    let rule = {
        mealname: 'required|string|min:3',
        price: 'required'
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        console.log(validate.errors.all())
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        let pic = '';
        let mp;
        if (req.files !== null) {
            fs.unlinkSync(`../client/src/images/${req.body.pictures}`)
            mp = req.files.newpictures
            pic = `res${req.body.resId}${mp.name}`;
            mp.mv(`../client/src/images/${pic}`, (err) => {
                if (err)
                    console.log('error')
                else {
                    dboperations.editMeal(req.body, pic).then(resulte => {
                        res.json(resulte[0])
                    })
                }
            })
        }
        else {
            pic = req.body.pictures;
            dboperations.editMeal(req.body, pic).then(resulte => {
                res.json(resulte[0])
            })
        }
    }
});

module.exports = router;
