let express = require('express'),
  cors = require('cors'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  database = require('./database')


// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true); //kommt von auth , brauchen wir das?
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const speiseAPI = require('./routes/speise.route')
const userAPI=require ('./routes/user.route')
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use(morgan("dev")); //kommt von auth

// API
app.use('/api', speiseAPI);
app.use('/UserAPI', userAPI);


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});