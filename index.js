// project on: express cors mongoose axios socket.io socket.io-client nodemon vue-router
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3005;

app.use(cors(`http://localhost:3005`));
app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

//Подключение mongoDB

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/FewPlace');

app.get('/', (req, res) => {
    res.send('Сервер запущен');
    res.sendStatus(200);
});

//Все товары

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        min: 10,
        max: 2000
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 20000000
    },
    category: String,
    image: String,
    isMine: Boolean,
    isGood: Boolean,
    brand: {
        type: String,
        required: true,
    },
    brandImage: {
        type: String,
    },
    countHas: Number,
}, {
    timestamps: true,
});

let Product = mongoose.model('product', productSchema);

app.get('/products', async (req, res) => {
    const sortPrice = Number(req.query.sortPrice); // по цене
    const sortData = Number(req.query.sortData); // по дате
    const sPrice = Number(req.query.sPrice); // цена от...
    const dPrice = Number(req.query.dPrice); // цена до...
    
    const asNew = req.query.asNew; // Б\У или новое
    const title = req.query.title; // название
    const category = req.query.category; // категория

    let sorting = {};
    if(sortPrice) {
        sorting.price = sortPrice;
    } if(sortData) {
        sorting.createdAt = sortData;
    } 

    let search = {};
    if (asNew) {
        search.isGood = asNew;
    } if (category) {
        search.category = category;
    } if (title) {
        search.title = title;
    } if (sPrice) {
        search.price = {$gte: sPrice};
    } if (dPrice) {
        search.price = {$lte: dPrice};
    } if(sPrice && dPrice) {
        search.price = {$gte: sPrice, $lte: dPrice};
    }

    let data = await Product.find(search).sort(sorting).limit(30);
    res.send(data).status(200);
});

app.post('/products', async (req, res) => {
    const { title, description, price, category, image, isGood } = req.body;

    const product = new Product({
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
        isMine: true,
        isGood: isGood,
        countHas: 1,
    }, {
        timestamps: true,
    });

    try {
        await product.save();
        res.sendStatus(201);
    } catch(err) {
        res.send(err).status(400);
    }
});

app.delete('/products', async (req,res) => {
    const id = req.query.id;
    
    try {
        await Product.deleteOne({_id: id});
        res.sendStatus(202);
    } catch {
        res.sendStatus(400);
    }
});

app.put('/products', async (req, res) => {
    const { id, title, description, price, category, image, isGood, countHas } = req.body;
    let product = await Product.findOne({_id: id});

        product.title = title;
        product.description = description;
        product.price = price;
        product.category = category;
        product.image = image;
        product.isGood = isGood;
        product.countHas = countHas;

    try {
        await product.save();
        res.sendStatus(201);
    } catch(err) {
        res.send(err).status(400)
    }
});

//Один товар и доп товар

app.get('/product', async (req, res) => {
    const id = req.query.id;
    const data = await Product.findOne({_id: id});
    res.send(data).status(200);
});


app.get('/productsTitle', async (req, res) => {
    const title = req.query.title;
    let data = await Product.find({"title": title});
    res.send(data).status(200);
});

// Корзина товаров

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 20000000
    },
    category: String,
    image: String,
    isGood: Boolean,
    idProduct: String,
    brand: String,
    countHas: Number,
});

let Cart = mongoose.model('cart', cartSchema);

app.get('/cart', async (req, res) => {
    const data = await Cart.find();
    res.send(data).status(200);
});

app.post('/cart', async (req, res) => {
    const { id, title, description, price, category, image, isGood, brand, countHas } = req.body;

    let cardItem = new Cart({
        idProduct: id,
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
        isGood: isGood,
        brand: brand,
        countHas: countHas
    });

    try {
        await cardItem.save();
        res.sendStatus(201);
    } catch(err) {
        res.sendStatus(400);
    }
});

app.delete('/cart', async (req, res) => {
    let id = req.query.id;

    try {
        await Cart.deleteOne({_id: id});
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(400);
    }
});