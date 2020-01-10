const Express = require('express');
const port = process.env.PORT || 8001;
const userRoutes = require('./routes/users');
const imageUpload = require('./routes/imageUpload')


const app = new Express();
const path = require('path');

app.use(userRoutes);
app.use(imageUpload);
app.use(Express.static(path.join(__dirname, './images')));
// Handeling routes Error
app.use((req, res, next) => {
    const error = new Error("URL not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, function () {
    console.log("Listening on port: ", port);
});


