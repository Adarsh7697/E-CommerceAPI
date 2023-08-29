const Product = require("../models/product");

//function to create a new product
module.exports.products = async function(req, res) {
    try {
        const foundProducts = await Product.find({});
        res.send(foundProducts);
    } catch (err) {
        console.log("Product give err");
        res.status(500).send(err.message);
    }
}

//function to create a products quantity
module.exports.create = async function(req, res) {
    try {
        const newProduct = new Product({
            name: req.body.name,
            quantity: req.body.quantity
        });

        await newProduct.save();

        res.send('New product added successfully.');
    } catch (err) {
        res.status(500).send(err.message);
    }
}



// function to delete a product using it's ID
module.exports.delete = async function(req, res) {
    try {
        await Product.deleteOne({ _id: req.params.productID });
        res.send({ message: "Product deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
}


// function to update a product's quantity
module.exports.updateQuantity = async function(req, res) {
    try {
        const ID = req.params.productID;
        
        // Find the product using id
        const found = await Product.findById(ID);

        if (!found) {
            return res.status(404).send({ message: 'Product not found' });
        }

        // Calculate the new quantity
        const newQty = parseInt(found.quantity) + parseInt(req.query.number);

        // Update the product's quantity
        const updatedProduct = await Product.findByIdAndUpdate(
            ID,
            { quantity: newQty },
            { new: true } // This option returns the updated document
        );

        updatedProduct.quantity = newQty;
        res.send({
            product: updatedProduct,
            message: 'Updated successfully'
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}