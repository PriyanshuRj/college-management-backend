
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/index.js','./router/RegestrationRouter.js', './router/ResultRouter.js','./router/SubjectRouter.js']

swaggerAutogen(outputFile, endpointsFiles)