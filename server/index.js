import express from "express";
import cors from "cors";
//Initialize express
const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

//Create some animals
import Chance from "chance";
const chance = new Chance();

const animals =[...Array(250).keys()].map(id => {
    return{
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
})

app.get('', (req, res) => {
    const q = req.query.q?.toLowerCase() || '';
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));

    res.send(results);
})

app.listen(5000, () =>{
    console.log('Listening on port http://localhost:5000');
})  