const { default: axios } = require('axios');
const Connection = require('../connection');
const { generateJwtToken } = require('../utills/jwt')

const RegisterUser = async(req,res) => {
    try {
        const con = await Connection();

        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: "Name, Email And Password Required", status: false });
        }

        const [existingUser] = await con.execute(
            "select * from users where email = ?",
            [email]
        );

        if(existingUser.length > 0){
            return res.status(409).json({
                message: "Email already registered",
                status: false,
            })
        }

        const sql = `
            insert into users (name, email, password) values (?, ?, ?)
        `

        const result = await con.execute(sql,[
            name, email, password
        ]);

        await axios.post("https://navinchaudhary.app.n8n.cloud/webhook/user_register",{
            name:name,
            email:email,
            event:`Hyy ${email} you are successfully register to website`,
        })

        return res.status(201).json({message: "User Register", status: true});
    } catch (error) {
        return res.json({message: "server error", status: false});
    }
}


const LoginUser = async(req,res) => {
    try {
        const con = await Connection();

        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).json({ message:"Email And Password Required..", status: false });
        }

        const sql = `
            select * from users where email = ? and password = ?
        `;

        const [row] = await con.execute(sql,[
            email, password
        ]);

        if(row.length === 0){
            return res.status(401).json({ message: "Invalid email or password", status: false });
        }

        const user = row[0];
        const token = await generateJwtToken(user);

        res.cookie('token',token, {
            httpOnly: true,
            secure: false
        });

        return res.json({ message:"User Login Successfully !", status: true, token: token });

    } catch (error) {
        return res.json({ message:"server error", status: false });
    }
}


const GenearteImage = async(req,res) => {
    try {
        const con = await Connection();

        const { prompt } = req.body;

        const response = await axios.post("https://navinchaudhary.app.n8n.cloud/webhook-test/image",{
            prompt
        },{
            timeout: 30000
        });

        console.log("n8n Response:", response.data);

        const ImageUrl = response.data.image;

        return res.status(200).json({ status: true, image: ImageUrl });


    } catch (error) {
        // આ લાઈન તમને બતાવશે કે ભૂલ n8n માં છે કે કનેક્શનમાં
        console.error("Error Detail:", error.response ? error.response.data : error.message);
        
        return res.status(500).json({ 
            message: "server error", 
            status: false,
            detail: error.message 
        });
    }
}

module.exports = {
    RegisterUser, LoginUser, GenearteImage
}


