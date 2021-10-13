MongoDB and Mongoose | Creating a REST API with Node.js
24.29 : delete
31.47 : bahas tentang update, algoritma js buat cek ada data nya ap engga

Bagusnya buat update & create data, kolom nya disiapin satu-satu biar kalo ada kolom tambahan dari client, ga error, misal :
const product = new Product({
name: req.body.name,
desc: req.body.desc,
slug: slug,
price: req.body.price,
published: req.body.published ? req.body.published : false,
})
