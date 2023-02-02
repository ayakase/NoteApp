const express = require("express");
const app = express();
const con = require("./connect")
app.set('view engine', 'ejs');
app.use(express.static('public'))


con.connect(function (err) {
    console.log("Connected");

})
const bodyParser = require("body-parser")


/* con.query("SELECT * FROM notes", function (err, notes, fields) {
    if (err) throw err;
    console.log(notes);
}) 
 */
app.get("/", function (req, res) {
    /* res.send("<b>Welcome</b>"); */
    con.query("SELECT * FROM notes", function (err, notes, fields) {
        if (err) throw err;
        for (var i = 0; i < notes.length; i++) {
            /* console.log("title: " + notes[i].title + " " + "content: " + notes[i].content); */
        }
        res.render("index.ejs", { result: notes })
    })
    /* res.sendFile(__dirname + "/index.html"); */
});
app.get("/delete-note", function (req, res) {
    con.query(`DELETE FROM notes;`, function (err, result) {
        if (err) throw err;
        console.log("deleted");
    });
});
app.get("/trash/:id", function (req, res) {
    con.query(`DELETE FROM notes WHERE id='${req.params.id}';`, function (err, result) {
        if (err) throw err;
        console.log("deleted-one");
    })
})
app.get("/edit/:id", function (req, res) {
    console.log(req.params.id);
    res.redirect("/");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("Server is running on localhost:3000");
});

app.post('/', function (req, res) {
    var title = req.body.title
    var content = req.body.content
    console.log("added: " + title + " " + content)
    con.connect(function () {
        var sql = "INSERT INTO `notes`(title, content) VALUES ('" + title + "', '" + content + "')"
        con.query(sql, function (err, result) {
            if (err) throw err
        })
    })
})




/* var sql = "INSERT INTO notes (title, content) VALUES (10, 'somethingasasad')";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
}); */