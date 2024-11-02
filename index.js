const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//routes
// app.use('/api/products', productRoute)


app.get('/', (req, res) => {
    res.send("this is from node update..!!")
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.find(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//update a product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Delete Product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Product Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

mongoose.connect('mongodb+srv://adisonsalauddin:vE9RQsu12SgeddGW@nodeapi.waicl.mongodb.net/?retryWrites=true&w=majority&appName=NodeApi')
    .then(() => {
        console.log('Connected! to db');
        app.listen(3000, () => {
            console.log("server running 3000");
        });

    }).catch(() => { console.log("Connection failed !!!"); });

//adisonsalauddin
//vE9RQsu12SgeddGW
//47.187.250.134
//mongodb+srv://adisonsalauddin:vE9RQsu12SgeddGW@nodeapi.waicl.mongodb.net/?retryWrites=true&w=majority&appName=NodeApi
//mongodb+srv://admin:abcd1234@backenddb.z7fbd.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB   == this is for Node api previous one 
