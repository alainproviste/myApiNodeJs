const Product = require('../models/product.model');

exports.create = (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img
    });

    product.save()
    .then((data) => {
        res.send({
            product: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating product"
        })
    })

}

exports.getAll = (req, res) => {
    Product.find().then(
        (data) => {
          res.status(200).json(data);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
}


exports.getOne = (req, res) => {
    var id = req.params.id;
    Product.findById(id)
    .then((data) => {
        res.send(data);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({
                delete: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
  }

exports.update = (req, res) => {
    var product = Product.findById(req.params.id)
    Product.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            img: req.body.img
        }
    )
    .then(() => {
        product
            .then((data) => {
                res.send({
                    product: data,
                    update: true,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    error: 500,
                    message: err.message || "NULL"
                })
            })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message || "NULL"
        })
    })
}