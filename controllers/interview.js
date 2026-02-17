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


const FetchData = async(req,res) => {
    try {
        const con = await Connection();

        const { page, limit } = req.query;

        const currentPage = Number(page) || 1;
        const limitpage = Number(limit) || 3;
        const offset = ( currentPage - 1 ) * limitpage;

        const sql = `
            select * from product limit ${limitpage} offset ${offset}
        `;        

        const [result] = await con.execute(sql,[
            page,
            limit
        ]);

        const [total] = await con.execute("select * from product");

        return res.json({ message: "data fetch", status: true, data: result, totalpage: Math.ceil(total.length / limit) });
    } catch (error) {
        return res.json({message:"server error",status:false});
    }
}


const editData = async(req,res) => {
    try {
        const con = await Connection();

        const { product, price, stock } = req.body.ProductData;
        const { editid } = req.body;

        const sql = `
            update product set product = ?, price = ?, stock = ? where id = ? 
        `;

        const [result] = await con.execute(sql,[
            product,
            price,
            stock,
            editid
        ]);

        return res.json({ message: "Update Successfully!", status: true });
    } catch (error) {
        return res.json({ message: error.message, status: false });
    }
}

const deleteData = async(req,res) => {
    try {
        const con = await Connection();

        const { id } = req.body;

        const sql = `
            delete from product where id = ?
        `;

        const [result] = await con.execute(sql,[
            id
        ]);

        return res.json({ message: "deleted successfully!", status: true });
    } catch (error) {
        return res.json({ message: error.message, status: false });
    }
}

module.exports = {
    insertData, FetchData, editData, deleteData
}