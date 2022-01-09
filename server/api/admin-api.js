const dboperations = require('../dboperations/admin-operaations');
var express = require("express");
var router = express.Router();
const Validator = require('validatorjs');

const fs = require('fs');

router.route('/admins').get((req, res) => {
    dboperations.getAdmins().then(resulte => {
        res.json(resulte[0])
    })
});

router.route('/admins').post((req, res) => {

    let rule = {
        username: 'required|string|min:4',
        password: 'required|string|min:6',
        email: 'required|email'
    }
    let validate = new Validator(req.body, rule)
    if (validate.fails()) {
        res.status(404).send('You Should Fill All Of Inputs')
    }
    else {
        dboperations.addAdmin(req.body).then((resulte) => {
            res.json(resulte[0]);
        })
            .catch(err => res.status(500))
    }
});


router.route('/admin/login').post((req, res) => {
    dboperations.getAdmin(req.body).then(result => {
        console.log(result);
        if (result[0].length > 0) {
            res.json(result[0])
        }
        else {
            res.status(404).send({ msg: `username or password is not exist` })
        }
    })
});



router.route('/admin/:id/password').put((req, res) => {
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
        dboperations.getAdminPass(id).then(result => {
            if (req.body.oldPassword === result[0].password) {
                dboperations.chngAdminPass(id, req.body.newPassword).then(resulte => {
                    res.json(resulte)
                })
                    .catch(err => ser.json(500))
            }
            else {
                res.status(401).send('old password is not correct')
            }
        })
            .catch(err => res.status(404))
    }
});


router.route('/admin/pending').get((req, res) => {
    console.log('yes')
    dboperations.getPending().then(resulte => {
        res.json(resulte)
    })
});


router.route('/admin/resDisactive/:id').put((req, res) => {
    const { id } = req.params
    dboperations.disactiveRes(id).then(result => {
        res.json(result[0])
    })
        .catch(err => res.status(500))
});


router.route('/admin/resActive/:id').put((req, res) => {
    const { id } = req.params
    dboperations.activeRes(id).then(result => {
        res.json(result[0])
    })
        .catch(err => res.status(500))
});


router.route("/admin/messages").get((req, res) => {
    dboperations.getMessages().then(resulte => {
        res.json(resulte[0]);
    });
});



router.route("/admin/messages/:id").put((req, res) => {
    const { id } = req.params;
    dboperations.activeMessages(id, req.body).then((resulte) => {
        res.json(resulte);
    });
});

router.route("/admin/messages/:id").delete((req, res) => {
    const { id } = req.params;
    dboperations.deleteMessages(id).then((resulte) => {
        res.json(resulte[0]);
    });
});



router.route('/admin/pending/:id').put((req, res) => {
    const { id } = req.params
    dboperations.activeRes(id).then(resulte => {
        res.json(resulte[0])
    })
        .catch(err => res.status(500))
});

router.route('/restaurantowner/restaurant/:id').delete((req, res) => {                 /*error*/
    const { id } = req.params
    let pictures = '';
    dboperations.getRestaurant(id).then(result => {
        pictures = result[0][0].pictures;
        if (pictures !== null) {
            arr = pictures.split(',')
            arr.map(item => { if (item !== '') { fs.unlinkSync(`../client/public/Images/${item}`) } })
        }
        dboperations.deleteRestaurant(id).then(result => {
            res.json(result[0])
        })
        .catch(err => res.json(500))
    })
});


router.route('/admin/restaurants/numbers').get((req, res) => {
    let result = []
    dboperations.getRestaurantsNum('*').then(resulte => {
        result[0] = { id: 1, name: 'Restaurants', count: resulte[0][0][''], background: 'var(--primary)' }
        dboperations.getRestaurantsNum(0).then(resulte => {
            result[1] = { id: 2, name: 'Pending', count: resulte[0][0][''], background: '#5af' }
            dboperations.getRestaurantsNum(2).then(resulte => {
                result[2] = { id: 3, name: 'Disactive', count: resulte[0][0][''], background: '#f66' }
                dboperations.getRestaurantsNum(1).then(resulte => {
                    result[3] = { id: 4, name: 'Active', count: resulte[0][0][''], background: '#5a5' }
                    res.json(result)
                })
            })
        })
    })
});

module.exports = router;
