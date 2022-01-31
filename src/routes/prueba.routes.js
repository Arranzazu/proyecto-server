const { Router } = require("express");
// const { models } = require("mongoose");
// const controllers = require("../controllers");
// const middleware = require("../middleware");
const models = require("../models");

const router = Router();
//obtengo todos los productos asignados a los diferentes carritos
router.get("/", async (req, res) => {
const events = await models.event.find()
const data = [] 
for (const event of events){
    // data.push({})
    const obj = {   
    }
    const cars = await models.carrito.find({evento: event}) 
    const products = [] 
    for ( const car of cars){
        const product = await models.asignado.find({carrito: car}) 
        products.push(product)
    }
    obj.event = { 
        name: event.name,
        id: event._id,
        products: products,
    }
    data.push(obj)
}

    return res.json({data});

})


//obtengo un producto concreto en 1 evento concreto
router.post("/cantidad", async (req, res) => {
const{productId, eventId} = req.body
const event = await models.event.findById(eventId) 

// validar que exista
const products = []
 const cars = await models.carrito.find({evento: event}) 
    
    for ( const car of cars){
        const product = await models.asignado.find({carrito: car, producto: productId}).populate('producto').populate('carrito')
        products.push({product})   
   
    }
    return res.json({products});


})

//obtengo suma de un producto concreto en 1 evento concreto
router.post("/suma", async (req, res) => {
    const{productId, eventId} = req.body
    const event = await models.event.findById(eventId) 
    const product = await models.asignado.findById(productId) 
    // validar que exista
    const products = []
     const cars = await models.carrito.find({evento: event})     
     const unidades= await models.asignado.find({unidades: product}) 
        
        for ( const car of cars){
            const product= await models.asignado.find({carrito: car, producto: productId, unidades: unidades}) 
            products.push({product})
            
            // let total=0,numeros = await models.asignado.find({carrito: car, producto: productId, unidades: unidades}) 
            let total=0,numeros = [unidades] 
            for(let i of numeros) total+=i;
            console.log(total);
    
        }
        return res.json({products});      
    })




module.exports = router;
