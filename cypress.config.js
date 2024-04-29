const { defineConfig } = require("cypress");
const {Client} = require('pg')

module.exports = defineConfig({
  projectId: '8e29bk',
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: "pushingit",
            password:"E6gcqTtuRGliO02Wg3Gs8fqyQNK1fLjE",
            host: "dpg-cngrs0da73kc73c91170-a.oregon-postgres.render.com",
            database:"pushingit_j4z6",
            ssl: true,
            port: 5432
          })
          await client.connect()
          const res = await client.query(query)
          await client.end()
          return res.rows;
        }
      })
    },
    baseUrl: 'https://pushing-it.vercel.app/',
    defaultCommandTimeout:1000,
    fixturesFolder: 'cypress/e2e/',
    
  },

  //Aqui se definen variables de entorno.
  //Aqui podemos dejar credenciales de acceso. Si la pass es sensible podemos dejar vacio y lo pasamos por medio de cmd: npx cypress run --env pass=123456!
  env:{

    user: "pushingit",
    pass: "123456!",
    baseUrlAPI: 'https://pushing-it.onrender.com/api',    
    token: ''

  }


});
