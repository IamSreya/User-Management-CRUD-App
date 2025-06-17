const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/read", async (req, res) => {
	let users = await userModel.find();
	//console.log(allUsers);
	res.render("read", {users: users});
	// This route fetches all users from the database and renders them in the 'read' view.
	//If i had used the name users instead of allUsers, then at render, i could have used users instead of users:allUsers.
});

app.post("/create", async (req, res) => {
	let{name, email, image} = req.body;

	let createdUser = await userModel.create({
		name,
		email, 
		image
	});
	res.redirect("/read");
});

app.get("/edit/:userid", async (req, res) => {
	let user = await userModel.findOne({_id: req.params.userid});
	res.render("edit", {user: user});
 // This route fetches a user by ID and renders the 'edit' view with that user's data.
});

app.post("/update/:userid", async (req, res) => {
	let{name, email, image} = req.body;
	let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, email, image}, {new: true});
	res.redirect("/read");
 // This route fetches a user by ID and renders the 'edit' view with that user's data.
});

app.get("/delete/:id", async (req, res) => {
	let users = await userModel.findByIdAndDelete({_id: req.params.id});
	res.redirect("/read");
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
