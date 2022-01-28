const config = require('../dbconfig');
const sql = require('mssql');

async function register(body) {
    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('name', sql.NVarChar, body.name)
        .input('location', sql.NVarChar, body.location)
        .input('pictures', sql.VarChar, body.pictures)
        .input('saterday', sql.Int, body.saterday)
        .input('sunday', sql.Int, body.sunday)
        .input('monday', sql.Int, body.monday)
        .input('tuesday', sql.Int, body.tuseday)
        .input('wednesday', sql.Int, body.wednesday)
        .input('thersday', sql.Int, body.thersday)
        .input('friday', sql.Int, body.friday)
        .input('Ftime', sql.DateTime2, body.Ftime)
        .input('Ttime', sql.DateTime2, body.Ttime)
        .input('phonenumber', sql.VarChar, body.phonenumber)
        .input('email', sql.VarChar, body.email)
        .input('facebook', sql.VarChar, body.facebook)
        .input('instagram', sql.VarChar, body.instagram)
        .input('state', sql.Int, body.state)
        .input('mobilenumber', sql.VarChar, body.mobilenumber)
        .input('rate', sql.Float, 4)
        .query('INSERT INTO restaurant (name,location,pictures,saterday,sunday,monday,tuesday,wednesday,thersday,friday,Ftime,Ttime,phonenumber,email,facebook,instagram,state,mobilenumber, rate) VALUES (@name,@location,@pictures,@saterday,@sunday,@monday,@tuesday,@wednesday,@thersday,@friday,@Ftime,@Ttime,@phonenumber,@email,@facebook,@instagram,@state,@mobilenumber, @rate)')
    return restaurant.recordsets
}

async function updateRestaurantData(id, body) {
    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, body.name)
        .input('location', sql.NVarChar, body.location)
        .input('saterday', sql.Int, body.saterday)
        .input('sunday', sql.Int, body.sunday)
        .input('monday', sql.Int, body.monday)
        .input('tuesday', sql.Int, body.tuesday)
        .input('wednesday', sql.Int, body.wednesday)
        .input('thersday', sql.Int, body.thersday)
        .input('friday', sql.Int, body.friday)
        .input('Ftime', sql.DateTime2, body.Ftime)
        .input('Ttime', sql.DateTime2, body.Ttime)
        .input('phonenumber', sql.VarChar, body.phonenumber)
        .input('mobilenumber', sql.VarChar, body.mobilenumber)
        .input('facebook', sql.VarChar, body.facebook)
        .input('instagram', sql.VarChar, body.instagram)
        .query('UPDATE restaurant SET name = @name, location = @location, saterday = @saterday, sunday = @sunday, monday = @monday, tuesday = @tuesday, wednesday = @wednesday, thersday = @thersday, friday = @friday, Ftime = @Ftime, Ttime = @Ttime, phonenumber = @phonenumber, mobilenumber = @mobilenumber, facebook = @facebook, instagram = @instagram WHERE id = @id')
    return restaurant.recordsets
}

async function getResId(body) {
    let pool = await sql.connect(config)
    let id = await pool.request()
        .input('name', sql.NVarChar, body.name)
        .input('email', sql.VarChar, body.email)
        .query('SELECT id FROM restaurant WHERE name = @name AND email = @email')
    return id.recordsets
}

async function addUserOwner(id, body) {
    let pool = await sql.connect(config)
    let owner = await pool.request()
        .input('username', sql.VarChar, body.username)
        .input('password', sql.VarChar, body.password)
        .input('email', sql.VarChar, body.email)
        .input('resid', sql.VarChar, id)
        .query('INSERT INTO users VALUES (@username, @password, @email, 2, @resid)')
    return owner.recordsets
}

async function getOwner(body) {

    let pool = await sql.connect(config)
    let owner = await pool.request()
        .input('username', sql.VarChar, body.username)
        .input('password', sql.VarChar, body.password)
        .query('SELECT resid, state FROM users u , restaurant r WHERE u.username = @username AND u.resid = r.id AND u.password = @password AND u.usertype = 2')

    return owner.recordsets
}

async function updateStateOrder(id, body) {
    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('resid', sql.Int, id)
        .input('listId', sql.Int, body.listId)
        .input('state', sql.Int, body.state)
        .query('UPDATE orderlist SET state = @state WHERE resid = @resid AND id = @listId')

    return meal.recordsets
}

async function getOrders(id) {
    let pool = await sql.connect(config)
    let orders = await pool.request()
        .input('resid', sql.Int, id)
        .query('select orderlist.id, orderusers.name, orderusers.location,orderusers.phonenumber,orderusers.email, orderusers.create_time, meals.mealname, orderusers.ordertype, orderusers.order_time, orderusers.numberofseats, orderlist.price, orderlist.count, orderlist.state from  (orderlist  join orderusers on (orderlist.userid = orderusers.id)) join restaurant on ( orderlist.resid = restaurant.id) join meals on (orderlist.mealid = meals.id) where restaurant.id = @resid')
    return orders.recordsets
}

async function getOrdersNum(state, id) {
    if (typeof state == 'number') {
        let pool = await sql.connect(config)
        let number = await pool.request()
            .input('state', sql.Int, state)
            .input('id', sql.Int, id)
            .query('SELECT count(*) from orderlist WHERE state = @state AND resid = @id')
        return number.recordsets
    }
    else {
        let pool = await sql.connect(config)
        let number = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT count(*) from orderlist WHERE resid = @id')
        return number.recordsets
    }

}

async function getRestaurantsNum(state) {
    if (typeof state == 'number') {
        let pool = await sql.connect(config)
        let number = await pool.request()
            .input('state', sql.Int, state)
            .query('SELECT count(*) from restaurant WHERE state = @state')
        return number.recordsets
    }
    else {
        let pool = await sql.connect(config)
        let number = await pool.request()
            .query('SELECT count(*) from restaurant')
        return number.recordsets
    }
}



// Meals

async function addMeal(body, picName) {

    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('mealname', sql.NVarChar, body.mealname)
        .input('price', sql.Int, body.price)
        .input('pictures', sql.VarChar, picName)
        .input('ingredints', sql.VarChar, body.Ingredints)
        .input('resId', sql.Int, body.resId)
        .query("INSERT INTO meals VALUES (@mealname,@price,@pictures,@ingredints,@resId, 4)")

    return meal.recordsets
}

async function getMeals(id) {

    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('resId', sql.Int, id)
        .query('SELECT * FROM meals WHERE resId = @resId')

    return meal.recordsets
}

async function getMeal(resId, mealId) {

    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('resId', sql.Int, resId)
        .input('mealId', sql.Int, mealId)
        .query('SELECT * FROM meals WHERE resId = @resId AND id = @mealId')

    return meal.recordsets

}

async function deleteMeal(resId, mealId) {

    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('resId', sql.Int, resId)
        .input('mealId', sql.Int, mealId)
        .query('DELETE FROM meals WHERE resId = @resId AND id = @mealId')

    return meal.recordsets

}

async function deleteOrderslist(resId, mealId) {

    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('resid', sql.Int, resId)
        .input('mealid', sql.Int, mealId)
        .query('DELETE FROM orderlist WHERE resid = @resid AND mealid = @mealid')
    return orders.recordsets
}
async function deleteOrdersuser(resId, mealId) {

    let pool = await sql.connect(config);
    let orders = await pool.request()
        .input('resid', sql.Int, resId)
        .input('mealid', sql.Int, mealId)
        .query('DELETE FROM orderusers WHERE resid = @resid')
    return orders.recordsets
}

async function editMeal(body, picName) {
    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('id', sql.Int, body.id)
        .input('mealname', sql.VarChar, body.mealname)
        .input('price', sql.Int, body.price)
        .input('pictures', sql.VarChar, picName)
        .input('ingredints', sql.VarChar, body.Ingredints)
        .input('resId', sql.Int, body.resId)
        .query("UPDATE meals SET mealname = @mealname, price = @price, pictures = @pictures, Ingredients = @ingredints,  resId = @resId WHERE resId = @resId AND id = @id")

    return meal.recordsets
}

async function getRestaurant(id) {
    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM restaurant WHERE id = @id')

    return restaurant.recordsets
}
async function getRestaurants() {
    let pool = await sql.connect(config)
    let restaurant = await pool.request().query('SELECT * FROM restaurant WHERE state > 0')
    return restaurant.recordsets
}

async function getRestaurantUser(id) {
    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM users WHERE resId = @id')

    return restaurant.recordsets
}

async function chngPassResturant(resid, password) {
    let pool = await sql.connect(config)
    let meal = await pool.request()
        .input('id', sql.Int, resid)
        .input('password', sql.VarChar, password)
        .query('UPDATE users SET password = @password WHERE resId = @id AND usertype = 2')

    return meal.recordsets
}

async function getServices(id) {

    let pool = await sql.connect(config)
    let services = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM services WHERE resid = @id')

    return services.recordsets
}

async function setServices(serv) {
    console.log(serv, "This is for test **************************");
    let pool = await sql.connect(config)
    let service = await pool.request()
        .input('id1', sql.Int, serv[0].id)
        .input('resid1', sql.Int, serv[0].resid)
        .input('checked1', sql.Int, serv[0].checked)
        .input('id2', sql.Int, serv[1].id)
        .input('resid2', sql.Int, serv[1].resid)
        .input('checked2', sql.Int, serv[1].checked)
        .input('id3', sql.Int, serv[2].id)
        .input('resid3', sql.Int, serv[2].resid)
        .input('checked3', sql.Int, serv[2].checked)
        .input('id4', sql.Int, serv[3].id)
        .input('resid4', sql.Int, serv[3].resid)
        .input('checked4', sql.Int, serv[3].checked)
        .input('id5', sql.Int, serv[4].id)
        .input('resid5', sql.Int, serv[4].resid)
        .input('checked5', sql.Int, serv[4].checked)
        .input('id6', sql.Int, serv[5].id)
        .input('resid6', sql.Int, serv[5].resid)
        .input('checked6', sql.Int, serv[5].checked)
        .query('INSERT INTO services  VALUES (@id1,@resid1,@checked1), (@id2,@resid2,@checked2), (@id3,@resid3,@checked3), (@id4,@resid4,@checked4), (@id5,@resid5,@checked5), (@id6,@resid6,@checked6)')

    return service.recordsets
}

async function updateServices(serv) {

    let pool = await sql.connect(config)
    let service = await pool.request()
        .input('id1', sql.Int, serv[0].id)
        .input('resid1', sql.Int, serv[0].resid)
        .input('checked1', sql.Int, serv[0].checked)
        .input('id2', sql.Int, serv[1].id)
        .input('resid2', sql.Int, serv[1].resid)
        .input('checked2', sql.Int, serv[1].checked)
        .input('id3', sql.Int, serv[2].id)
        .input('resid3', sql.Int, serv[2].resid)
        .input('checked3', sql.Int, serv[2].checked)
        .input('id4', sql.Int, serv[3].id)
        .input('resid4', sql.Int, serv[3].resid)
        .input('checked4', sql.Int, serv[3].checked)
        .input('id5', sql.Int, serv[4].id)
        .input('resid5', sql.Int, serv[4].resid)
        .input('checked5', sql.Int, serv[4].checked)
        .input('id6', sql.Int, serv[5].id)
        .input('resid6', sql.Int, serv[5].resid)
        .input('checked6', sql.Int, serv[5].checked)
        .query('UPDATE services SET checked = @checked1 WHERE resid = @resid1 AND id = @id1; UPDATE services SET checked = @checked2 WHERE resid = @resid2 AND id = @id2; UPDATE services SET checked = @checked3 WHERE resid = @resid3 AND id = @id3; UPDATE services SET checked = @checked4 WHERE resid = @resid4 AND id = @id4; UPDATE services SET checked = @checked5 WHERE resid = @resid5 AND id = @id5; UPDATE services SET checked = @checked6 WHERE resid = @resid6 AND id = @id6;')

    return service.recordsets
}


async function getRestaurants() {
    let pool = await sql.connect(config)
    let restaurant = await pool.request().query('SELECT * FROM restaurant WHERE state > 0')
    return restaurant.recordsets;
}



async function deleteRestaurant(id) {

    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM orderlist WHERE resid = @id;DELETE FROM orderusers WHERE resid = @id;DELETE FROM meals WHERE resid = @id;DELETE FROM users WHERE resid = @id;DELETE FROM services WHERE resid = @id;DELETE FROM restaurant WHERE id = @id;')
    return restaurant.recordsets;

}

module.exports = {
    register: register,
    updateRestaurantData: updateRestaurantData,
    getResId: getResId,
    addUserOwner: addUserOwner,
    getOwner: getOwner,
    getOrders: getOrders,
    getOrdersNum: getOrdersNum,
    addMeal: addMeal,
    getMeals: getMeals,
    deleteMeal: deleteMeal,
    deleteOrderslist: deleteOrderslist,
    deleteOrdersuser: deleteOrdersuser,
    getMeal: getMeal,
    editMeal: editMeal,
    getRestaurant: getRestaurant,
    getRestaurants: getRestaurants,
    getRestaurantUser: getRestaurantUser,
    chngPassResturant: chngPassResturant,
    getServices: getServices,
    setServices: setServices,
    updateServices: updateServices,
    updateStateOrder: updateStateOrder,
    getRestaurants: getRestaurants,
    deleteRestaurant: deleteRestaurant,
}
