const config = require('../dbconfig');
const sql = require('mssql');


async function getRestaurants() {
    let pool = await sql.connect(config);
    let restaurants = await pool.request().query(" SELECT id, name, location, rate, pictures FROM RESTAURANT where state = 1");
    return restaurants.recordsets;
}

async function getRestaurantById(resid) {
    let pool = await sql.connect(config);
    let res = await pool.request()
        .input('restaurantId', sql.Int, resid)
        .query("SELECT id, name, location, pictures, saterday, sunday, monday, tuesday, wednesday, thersday, friday,Ftime, Ttime, phonenumber, email, facebook, instagram, rate FROM RESTAURANT WHERE ID = @restaurantId");
    return res.recordsets;
}

async function getMeals(resid) {
    let pool = await sql.connect(config);
    let meals = await pool.request()
        .input('resid', sql.Int, resid)
        .query("SELECT id, mealname, price, pictures, Ingredients, rate FROM MEALS WHERE resId = @resid");
    return meals.recordsets;
}

async function sendOrder(orderList) {
    let pool = await sql.connect(config);
    let order = await pool.request()
        .input('mealid', sql.Int, orderList.mealid)
        .input('price', sql.Int, orderList.price)
        .input('count', sql.Int, orderList.count)
        .input('resid', sql.Int, orderList.resid)
        .input('userid', sql.Int, orderList.userid)
        .input('state', sql.Int, 0)
        .query("insert into orderlist (mealid, price, count, resid, userid, state) values (@mealid, @price, @count, @resid, @userid, @state)");
    return order.recordsets;
};

async function getUser(userid) {
    let pool = await sql.connect(config);
    let user = await pool.request()
        .input('userid', sql.Int, userid)
        .query("SELECT id FROM orderusers WHERE ID = @userid");
    return user.recordsets;
};

async function sendUser(user) {
    let pool = await sql.connect(config);
    let userInfo = await pool.request()
        .input('name', sql.VarChar, user.name)
        .input('location', sql.VarChar, user.location ? user.location : null)
        .input('phonenumber', sql.VarChar, user.phonenumber)
        .input('email', sql.VarChar, user.email ? user.email : null)
        .input('numberofseats', sql.Int, user.numberofseats ? user.numberofseats : null)
        .input('resid', sql.Int, user.resid)
        .input('ordertype', sql.VarChar, user.ordertype ? user.ordertype : null)
        .input('ordertime', sql.DateTime2, user.ordertime ? user.ordertime : null)
        .query("insert into orderusers (name, location, phonenumber, email, numberofseats, resid, ordertype, order_time) OUTPUT Inserted.ID values (@name, @location, @phonenumber, @email, @numberofseats, @resid, @ordertype, @ordertime)")
    return userInfo.recordsets;
};

async function addMessages(messege) {
    let pool = await sql.connect(config);
    let msg = await pool.request()
        .input('fn', sql.VarChar, messege.Fname)
        .input('ln', sql.VarChar, messege.Lname)
        .input('email', sql.VarChar, messege.email)
        .input('mass', sql.VarChar, messege.messege)
        .input('isRead', sql.Int, 0)
        .query("insert into MASSEGES values (@fn, @ln, @email, @mass, @isRead) ");
    return msg.recordsets;
};

async function getUserOrder(name, phonenumber) {
    let pool = await sql.connect(config);
    if (name) {
        let userOrder = await pool.request()
            .input('name', sql.VarChar, name)
            .input('phonenumber', sql.VarChar, phonenumber)
            .query("select  orderlist.id ID, orderusers.name Name,orderusers.phonenumber PhoneNumber,orderusers.create_time OrderCreateTime, meals.mealname MealName, restaurant.name RestaurantName, orderusers.ordertype OrderType, orderusers.order_time OrderTime, orderusers.numberofseats NumberOfSeats, orderlist.price Price, orderlist.count Count, orderlist.state State from  (orderlist  join orderusers on (orderlist.userid = orderusers.id)) join restaurant on ( orderlist.resid = restaurant.id) join meals on (orderlist.mealid = meals.id) where  orderusers.name = @name and orderusers.phonenumber = @phonenumber");
        return userOrder.recordsets;
    }
    let userOrder = await pool.request()
        .input('phonenumber', sql.VarChar, phonenumber)
        .query("select  orderlist.id ID, orderusers.name Name,orderusers.phonenumber PhoneNumber,orderusers.create_time OrderCreateTime, meals.mealname MealName, restaurant.name RestaurantName, orderusers.ordertype OrderType, orderusers.order_time OrderTime, orderusers.numberofseats NumberOfSeats, orderlist.price Price, orderlist.count Count, orderlist.state State from  (orderlist  join orderusers on (orderlist.userid = orderusers.id)) join restaurant on ( orderlist.resid = restaurant.id) join meals on (orderlist.mealid = meals.id) where   orderusers.phonenumber = @phonenumber");
    return userOrder.recordsets;
}

async function deleteUserOrder(orderid) {
    let pool = await sql.connect(config);
    let deleteOrder = await pool.request()
        .input('id', sql.Int, orderid)
        .query("  DELETE FROM orderlist OUTPUT Deleted.ID WHERE id = @id and state = 0");
    return deleteOrder.recordsets;
}

async function getRestaurantServices(resid) {
    let pool = await sql.connect(config);
    let services = await pool.request()
        .input('resid', sql.Int, resid)
        .query("  select id, checked from services where resid = @resid order by id");
    return services.recordsets;
};

module.exports = {
    getRestaurants: getRestaurants,
    getRestaurantById: getRestaurantById,
    addMessages: addMessages,
    getMeals: getMeals,
    sendOrder: sendOrder,
    sendUser: sendUser,
    getUser: getUser,
    getUserOrder: getUserOrder,
    deleteUserOrder: deleteUserOrder,
    getRestaurantServices: getRestaurantServices
}