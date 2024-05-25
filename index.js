// npm i express cors mongoose axios nodemon vue-router dayjs express-session cookie-parser
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3005;
const session = require('express-session');
const cookieParser = require("cookie-parser");

let corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
    secret: "6iKfU6KQQqPf4GhPkV17",
    saveUninitialized: true,
    resave: true,
    rolling: false,
    cookie: { maxAge: 600000000000 }
}));

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

//Подключение mongoDB

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/FewPlace');

app.get('/', (req, res) => {
    const sessionData = req.session;
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
        max: 2000,
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
    brandImage: String,
    countHas: Number,
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

productSchema.index({'$**': 'text'});

let Product = mongoose.model('product', productSchema);

app.get('/products', async (req, res) => {
    const sortPrice = Number(req.query.sortPrice); // по цене
    const sortData = Number(req.query.sortData); // по дате
    const sPrice = Number(req.query.sPrice); // цена от...
    const dPrice = Number(req.query.dPrice); // цена до...

    const skip = Number(req.query.skip); // пагинация
    
    const asNew = req.query.asNew; // Б\У или новое
    const category = req.query.category; // категория
    const title = req.query.title; // название

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
        search.$text = {$search: title};
    } if (sPrice) {
        search.price = {$gte: sPrice};
    } if (dPrice) {
        search.price = {$lte: dPrice};
    } if(sPrice && dPrice) {
        search.price = {$gte: sPrice, $lte: dPrice};
    }

    let data = await Product.find(search).sort(sorting).limit(10).skip(skip);
    res.send(data).status(200);
});

app.get('/myProducts', async (req, res) => {
    const author = req.query.author;
    let data = await Product.find({author: author});
    if(data) {
        res.send(data).status(200);
    } else {
        res.send('Товаров не найдено').status(200);
    }
})

app.post('/products', async (req, res) => {
    const { title, description, price, category, image, isGood, countHas, brand } = req.body;

    const product = new Product({
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
        isMine: true,
        isGood: isGood,
        countHas: countHas,
        brand: brand,
        author: req.session.username,
    });

    try {
        await product.save();
        res.sendStatus(201);
    } catch {
        res.sendStatus(400);
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


//Вход пользователей и их регистрация

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 24,
    },
    avaImage: String,
    role:{
        type: String,
        require: true,
    },
    reviews: [{
        user: {
            type: Object,
            require: true,
        },
        comment: {
            type: String,
            require: true,
            min: 3,
            max: 500,
        },
        raiting: {
            type: Number,
            require: true,
            min: 1,
            max: 5,
        }
    }],
    cart: [{
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
    }],
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

app.get('/login', async (req, res) => {
    const { login, password } = req.query;
    const data = await User.findOne({login: login});
    if(data) {
        if(data.password == password) {
            req.session.username = login;
            res.send(data).status(200);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(400);
    }
});

app.get('/user', async (req, res) => {
    const login = req.query.login;
    const data = await User.findOne({login: login});
    if(data) {
        res.send(data).status(200);
    } else {
        res.sendStatus(400);
    }
});

app.post('/users', async (req, res) => {
    
    const { login, email, password, role } = req.body;
    
    const newUser = new User({
        login: login,
        email: email,
        password: password,
        avaImage: "https://yt3.googleusercontent.com/ytc/AIf8zZTOqVAj1luCxSiohOyyV5yKwi0DDFy6PruvGoCEeg=s900-c-k-c0x00ffffff-no-rj",
        role: role,
        reviews: [],
        cart: [],
    });
    
    try {
        await newUser.save();
        req.session.username = newUser.login;
        res.sendStatus(201);
    } catch {
        res.sendStatus(400);
    }
});

app.delete('/users', async (req, res) => {
    const login = req.query.login;
    if(req.session.username == login) {
        try {
            await User.deleteOne({login: login});
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(404);
    }
});

app.get('/session', async (req, res) => {
    if(req.session.username) {
        let user = await User.findOne({login: req.session.username});
        if(user) {
            res.send(user).status(200);
        } else {
            res.sendStatus(400);
        }
    }
});

app.get('/check', async (req, res) => {
    if(req.session.username) {
        const login = req.query.login;
        if(req.session.username === login) {
            res.send(true).status(200);
        } else {
            res.send(false).status(200);
        }
    } else {
        res.send(false).status(400);
    }
});

app.get('/logout', async (req, res) => {
    if(req.session.username) {
        req.session.destroy();
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.put('/users', async (req, res) => {
    const { id, login, email, role, avaImage } = req.body;
    
    let user = await User.findOne({_id: id});
    
    user.login = login;
    user.email = email;
    user.role = role;
    if(avaImage) {
        user.avaImage = avaImage;
    }
    
    try {
        await user.save();
        res.sendStatus(201);
    } catch {
        res.sendStatus(400);
    }
});

app.put('/reviews', async (req, res) => {
    const { comment, raiting, login } = req.body;
    
    let userSession = await User.findOne({login: req.session.username});
    
    if(login != req.session.username) {
        let user = await User.findOne({login: login});
        
        user.reviews.push({
            user: {
                login: userSession.login,
                avaImage: userSession.avaImage,
            },
            comment: comment,
            raiting: raiting,
        });
        
        try {
            await user.save();
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
});

app.put('/delete-review', async (req, res) => {
    const { login, id } = req.body;
    
    let userReview = await User.findOne({login: login});
    
    let indexReview = userReview.reviews.findIndex((e) => e._id == id);

    userReview.reviews.splice(indexReview, 1)
    
    try {
        await userReview.save();
        res.sendStatus(201);
    } catch {
        res.sendStatus(400);
    }
});

// Корзина товаров

app.get('/cart', async (req, res) => {
    if(req.session.username) {
        const user = await User.find({login: req.session.username});
        res.send(user).status(200);
        console.log(user);
    } else {
        res.sendStatus(404);
    }
});

app.put('/cart-post', async (req, res) => {
    const { id, title, description, price, category, image, isGood, brand, countHas } = req.body;

    const user = await User.findOne({login: req.session.username});

    let indexReview = user.cart.findIndex((e) => e.idProduct == id);
    let item = user.cart[indexReview];

    if(item) {
        res.sendStatus(400);
    } else {
        user.cart.push({
            idProduct: id,
            title: title,
            description: description,
            price: price,
            category: category,
            image: image,
            isGood: isGood,
            brand: brand,
            countHas: countHas,
        });
        try {
            await user.save();
            res.sendStatus(201);
        } catch {
            res.sendStatus(400);
        }
    }
});

app.put('/cart-delete', async (req, res) => {
    const { login, id } = req.body;
    
    const user = await User.findOne({login: login});
    
    const indexCart = user.cart.findIndex((e) => e._id == id);

    user.cart.splice(indexCart, 1)
    
    try {
        await user.save();
        res.sendStatus(201);
    } catch {
        res.sendStatus(400);
    }
});