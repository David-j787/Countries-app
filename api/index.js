//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require ('axios');
const {Country} = require ('./src/db.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    
    const countries = await axios.get('https://restcountries.com/v3/all');
    
    
    countries.data.forEach(async (country) =>{
      try {
        await Country.create({
          name: country.name.common,
          id: country.cca3,
          flagImg: country.flags[0],
          continent: country.continents[0],
          capital: country.capital[0],
          subregion: country.subregion,
          population: country.population
        })
      } catch (error) {
        console.log(error);
      }
    })
    
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
