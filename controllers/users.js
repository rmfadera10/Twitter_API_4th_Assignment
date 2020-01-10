const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET_KEY = 'secret_key';
const knex= require('knex');
const config=require('../knexfile');
const dbConnection=knex(config);

const tableName="users";


function notAuthenticated(res) {
    res.json({
        status: 'fail',
        message: 'You are not authenticate user',
        code: 404
    });
}

function authenticate(token) { //token -> 123123789127389213
    if (!token) {
        return false;
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return true;
        // use payload if required
    } catch (error) {
        console.log(error)
        return false
    }
}

async function signUp(req, res) {
    const password = req.body.password;
    console.log(password);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        bio: req.body.bio,
        filename: req.body.filename
    }
    const CheckEmail = await dbConnection.table(tableName).select().where({'email':req.body.email});
    if (CheckEmail.length!=0){
        console.log("email exit")
        res.json({
            status: false,
            message: 'Email already exit'
        })
    }else{
        try {
            await dbConnection.table(tableName).insert(data);
            res.json({
                status: true,
                message: 'User sucessfully register'

            })

        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'Fail to register '
            })
        }
    }
}


async function login(req, res) {
    const password = req.body.password;
    console.log(password)
    try {
        const data = await dbConnection.table(tableName).select().where({'email':req.body.email});
        console.log(data)
        if (data.length != 0) {
            const passwordFromDB = data[0].password;
            const id = data[0].userId;
            console.log(id)
            const isMatchPassword = bcrypt.compareSync(password, passwordFromDB);
            if (isMatchPassword) {
                res.json({
                    status: true,
                    accessToken: jwt.sign({ userEmail: req.body.email }, SECRET_KEY),
                    message: "Login Sucess",
                    id:id

                })
            } else {
                res.json({
                    status: false,
                    message: "Password do not match"
                })
            }
        } else {
            res.json({
                status: false,
                message: "Email do not match"
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Fail to login"
        })
    }

}
async function getUserById(req, res) {
    
    try {
        const result = await dbConnection.table(tableName).select().where({'userId':req.params.id});
      const data={
          username: result[0].name,
          userId: result[0].userId,
          email: result[0].email,
          filename: result[0].filename,
          bio: result[0].bio,
          password: result[0].password 
      }
      
        res.json(data);

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Fail to rettrive data By Company name"
        })
    }
}


module.exports = {
    login: login,
    signUp: signUp,
    getUserById,getUserById
}


