const Connection = require('../connection');

const insertData = async(req,res) => {
    try {
        const con = await Connection();

        const { product, price, stock } = req.body;

        const sql = `
            insert into product( product, price, stock )values(?, ?, ?)
        `;

        const [result] = await con.execute(sql,[
            product,
            price,
            stock
        ]);

        return res.json({ message: "Product Insert", status: true, output: result });
    } catch (error) {
        return res.json({ message: "server error",status: false });
    }
}

module.exports = {
    insertData
}