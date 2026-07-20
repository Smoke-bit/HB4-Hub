const db = require("../database/init");

// ================= CREATE PRODUCT =================

const createProduct = (req, res) => {

    const {

        seller_id,
        title,
        description,
        category,
        price,
        imageUrl

    } = req.body;

    if (
        !seller_id ||
        !title ||
        !description ||
        !category ||
        !price ||
        !imageUrl
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });

    }

    db.run(

        `INSERT INTO products
        (seller_id,title,description,category,price,imageUrl)
        VALUES(?,?,?,?,?,?)`,

        [
            seller_id,
            title,
            description,
            category,
            price,
            imageUrl
        ],

        function(err){

            if(err){

                console.error(err);

                return res.status(500).json({

                    success:false,

                    message:"Database Error"

                });

            }

            return res.status(201).json({

                success:true,

                message:"Product Listed Successfully",

                productId:this.lastID

            });

        }

    );

};

module.exports = {

    createProduct

};