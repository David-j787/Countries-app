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

router.get('/activity', async (req,res) => {
    try {
        let activities = await Activity.findAll()
        res.status(200).send(activities)
    } catch (errors) {
        res.status(500).send('Error')
    }
})


router.post('/activity', async (req, res, next) => {
    try{
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
        await newActivity.addCountry(activityCountry)
    });
    res.status(200).send('La actividad se creo exitosamente')


    }catch(error){
        console.log(error)
        res.status(500).send('No se pudo crear la actividad')
    }
});


module.exports = router;
