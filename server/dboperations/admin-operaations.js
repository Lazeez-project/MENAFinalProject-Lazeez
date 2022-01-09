const config = require('../dbconfig');
const sql = require('mssql');

async function getAdmins() {

    let pool = await sql.connect(config)
    let admins = await pool.request().query("SELECT * FROM users WHERE usertype = 1")

    return admins.recordsets

}

async function getAdmin(body) {
    let pool = await sql.connect(config)
    let admins = await pool.request()
        .input('username', sql.VarChar, body.username)
        .input('password', sql.VarChar, body.password)
        .query("SELECT * FROM users WHERE username = @username AND password = @password  AND usertype = 1")

    return admins.recordsets
}

async function addAdmin(body) {

    let pool = await sql.connect(config)
    let admin = await pool.request()
        .input('username', sql.VarChar, body.username)
        .input('password', sql.VarChar, body.password)
        .input('email', sql.VarChar, body.email)
        .query("INSERT INTO users VALUES (@username,@password,@email,1,null)")

    return admin.recordsets

}

async function getAdminPass(id) {
    let pool = await sql.connect(config)
    let admin = await pool.request().input('id', sql.Int, id).query('SELECT password FROM users WHERE id = @id AND usertype = 1')
    return admin.recordset
}
async function chngAdminPass(id, pass) {
    let pool = await sql.connect(config)
    let admin = await pool.request().input('id', sql.Int, id).input('password', sql.VarChar, pass).query('UPDATE users SET password = @password WHERE id = @id AND usertype = 1')
    return admin.recordset
}

async function getPending() {
    let pool = await sql.connect(config);
    let pend = await pool.request()
        .query("SELECT * FROM restaurant WHERE state = 0 ");

    return pend.recordset;
}

async function getMessages() {
    let pool = await sql.connect(config);
    let message = await pool.request().query(
        "SELECT * FROM masseges"
    );
    return message.recordsets;
}

async function activeRes(id) {
    let pool = await sql.connect(config);
    let pend = await pool.request()
        .input('id', sql.Int, id)
        .query("UPDATE restaurant SET state = 1 WHERE id = @id ");

    return pend.recordset;
}
async function disactiveRes(id) {
    let pool = await sql.connect(config);
    let pend = await pool.request()
        .input('id', sql.Int, id)
        .query("UPDATE restaurant SET state = 2 WHERE id = @id ");

    return pend.recordset;
}


async function updateRestaurantData(id, body) {
    let pool = await sql.connect(config)
    let restaurant = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.VarChar, body.name)
        .input('location', sql.VarChar, body.location)
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


async function getRestaurants() {
    let pool = await sql.connect(config)
    let restaurant = await pool.request().query('SELECT * FROM restaurant WHERE state > 0')

    return restaurant.recordsets
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




async function deleteMessages(id) {
    let pool = await sql.connect(config);
    let pend = await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM masseges WHERE id = @id ");
    return pend.recordset;
}
async function activeMessages(id, isread) {
    let pool = await sql.connect(config);
    let pend = await pool.request()
        .input("id", sql.Int, id)
        .input('isread', sql.Int, isread.isread)
        .query("UPDATE masseges SET isread = @isread WHERE id = @id ");
    return pend.recordset;
}


async function deleteRestaurant(id){

    let pool = await sql.connect(config)
    let restaurant = await pool.request()
                            .input('id', sql.Int , id)
                            .query('DELETE FROM orderlist WHERE resid = @id;DELETE FROM orderusers WHERE resid = @id;DELETE FROM meals WHERE resid = @id;DELETE FROM users WHERE resid = @id;DELETE FROM services WHERE resid = @id;DELETE FROM restaurant WHERE id = @id;')
    return restaurant.recordsets;

}


module.exports = {
    getAdmins: getAdmins,
    getAdmin: getAdmin,
    addAdmin: addAdmin,
    getMessages: getMessages,
    getAdminPass: getAdminPass,
    chngAdminPass: chngAdminPass,
    updateRestaurantData: updateRestaurantData,
    getPending: getPending,
    activeRes: activeRes,
    disactiveRes: disactiveRes,
    getRestaurants: getRestaurants,
    deleteMessages: deleteMessages,
    activeMessages: activeMessages,
    getRestaurantsNum: getRestaurantsNum,
    deleteRestaurant: deleteRestaurant,
}