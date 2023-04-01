
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/index.js']

swaggerAutogen(outputFile, endpointsFiles)