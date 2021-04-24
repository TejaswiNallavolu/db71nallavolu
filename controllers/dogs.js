var Dogs = require('../models/dogs');
// List of all dogs
exports.dog_list = async function (req, res) {
    try {
        console.log("sample");
        Mydogs = await Dogs.find();
        console.log("sample");
        res.send(Mydogs);   
    }
    catch (err) {
        res.send(`{"error": ${err}}`)
        res.status(500);
    }
    // res.send('NOT IMPLEMENTED: dog list');
};
//for a specific Costume.
exports.dog_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Dogs.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle dog create on POST.
exports.dog_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Dogs();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}
    document.dogname = req.body.dogname;
    document.place = req.body.place;
    document.family = req.body.family;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.send(err)
        res.status(500);
    }
};

// Handle DOG delete on DELETE.
exports.dog_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await Dogs.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle Costume update form on PUT.
exports.dog_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Dogs.findById( req.params.id)
        // Do updates of properties
        if(req.body.dogname) toUpdate.dogname = req.body.dogname;
        if(req.body.place) toUpdate.place = req.body.place;
        if(req.body.family) toUpdate.family = req.body.family;
        if(req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};



// VIEWS
// Handle a show all view
exports.dog_view_all_Page = async function (req, res) {
    try {
        console.log(req)
        thedogs = await Dogs.find();
        console.log(thedogs)

        res.render('dogs', { title: 'dog Search Results', results: thedogs });
    }
    catch (err) {
        res.send(`{"error": ${err}}`)
        res.status(500);
    }
};
// Handle a show one view with id specified by query
exports.dog_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Dogs.findById( req.query.id)
        res.render('dogdetail', 
{ title: 'Dog Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// Handle building the view for creating a dog.
// No body, no in path parameter, no query.
// Does not need to be async
exports.dog_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('dogcreate', { title: 'dog Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a dog.
// query provides the id
exports.dog_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Dogs.findById(req.query.id)
        res.render('dogupdate', { title: 'Dog Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// Handle a delete one view with id from query
exports.dog_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await Dogs.findById(req.query.id)
        res.render('dogdelete', { title: 'Dog Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


