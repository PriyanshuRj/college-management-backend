const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const router = require("./router/index")
dotenv.config({path : "./.env"});
const db = require("./config/database");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const { default: helmet } = require('helmet');

require("./auth/passport")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
// app.use(express.urlencoded());
app.use("/api/v1", router);

app.listen(process.env.PORT, () =>{
    console.log("Backend server started at Port", process.env.PORT);
})