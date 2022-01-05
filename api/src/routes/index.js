const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const {Country, Activity, CountryActivity} = require('../db.js');
const {Op} = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/countries', async (req, res) => {
    const name = req.query.name;

        
        if(name){
            let country = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
                include: {
                    model: Activity
                }
            })

            //ASYNC WAY
            async function awaitCountry() {
                let data = await country;
                return res.send(data)
            }
            await awaitCountry();

            //PROMISE WAY
            
        //     let promisified = () => { 
        //         return new Promise((resolve, reject) => {
        //             resolve(country)
        //     })
        // }
        //     promisified()
        //     .then(response => {
        //         res.json(response);
        //     }, err => {
        //         throw(new Error(err));
        //     });
            
        }
        else{
            let country = await Country.findAll({
                include: {
                    model: Activity
                }
            })
            return res.send(country)
        }  
});


router.get('/countries/:id', async (req, res) => {
    const id = req.params.id;

    let country = await Country.findByPk(id, {
        include: Activity
    });
    res.send(country)
});

router.post('/activity', async (req, res) => {
    const {name, difficulty, duration, season, countries}= req.body;

    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
    });

    countries.forEach(async (country) => {
        let activityCountry = await Country.findOne({
            where: {
                name: country
            }
        })
        return await newActivity.addCountry(activityCountry)
        .then(() => res.send('Activity created succesfully'))
    });

});


module.exports = router;
