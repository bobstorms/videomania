const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

// Genres object
let genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" }
];

// GET all genres
app.get("/api/genres", (req, res) => {
    res.send(genres);
});

// GET genre with ID
app.get("/api/genres/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send("The genre with the given ID was not found!");
    }
    res.send(genre);
});

// POST genre
app.post("/api/genres", (req, res) => {
    // Validate user input
    const result = validateGenre(req.body);
    if(result.error) {
        return res.status(400).send("Please enter a valid genre name, with a minimum of 3 characters.");
    }

    // Make new genre object
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    // Add genre object to genres array
    genres.push(genre);
    res.send(genre);
});

// PUT (update) genre with ID
app.put("/api/genres/:id", (req, res) => {
    // Check if genre with ID exists
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send("The genre with the given ID was not found!");
    }

    // Validate user input
    const result = validateGenre(req.body);
    if(result.error) {
        return res.status(400).send("Please enter a valid genre name, with a minimum of 3 characters.")
    }

    // Update genre object
    genre.name = req.body.name;
    res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
    // Check if genre with ID exists
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send("The genrer with the given ID was not found!");
    }

    // Find index of genre
    const index = genres.indexOf(genre);
    // Remove genre frorm array
    genres.splice(index, 1);

    res.send(genre);
});

// Function to validate the input name of a genre
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

// Listen to port
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port} ...`);
});