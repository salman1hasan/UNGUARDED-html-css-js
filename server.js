const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
const JWT_SECRET = 'ljbhvgcxdzszdxfcgvhbkjnlkjbhvgcufxyds'


mongoose.connect('mongodb+srv://Salman8:Salman8@cluster0.amhzj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express() 
    app.use('/', express.static(path.join(__dirname, 'static')))
    app.use(bodyParser.json())

    app.post('/api/change-password', async (req,res) => {
        const { token, newpassword: plainTextPassword } = req.body

        if(!plainTextPassword || typeof plainTextPassword !== 'string'){
            return res.json({ status: 'error ', error: 'Invalid password'})
        }
     
        
        if(plainTextPassword.length< 5){
            return res.json({ 
                status: 'error ', 
                error: 'Password too small. Should be atleast 6 characters'
            })
        }

        try {
            const user = jwt.verify(token, JWT_SECRET)
            const _id= user.id
            const password = await bcrypt.hash(plainTextPassword, 10)
            await User.updateOne(
                { _id }, 
                {
                $set: { password }
            }
            )
            res.json({ status: 'ok' })
        } catch(error) {
            console.log(error)
            res.json({ status: 'error', error: ';))'})
        }
    })

    app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/api/register', async (req, res) => {
    const {name ,email, phone, address, dateofbirth, username, password: plainTextPassword } = req.body

    if(!name || typeof name !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if(!email || typeof name !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if(!phone|| typeof name !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }
    
    if(!address || typeof name !== 'string'){
        return res.json({ status: 'error', error: 'Invalid address'})
    }
    
    if(!username || typeof username !== 'string'){
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if(username.length< 5){
        return res.json({ 
            status: 'error ', 
            error: 'Username too small. Should be atleast 6 characters'
        })
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({ status: 'error ', error: 'Invalid password'})
    }
 
    
    if(plainTextPassword.length< 5){
        return res.json({ 
            status: 'error ', 
            error: 'Password too small. Should be atleast 6 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword,10)
    //console.log(await bcrypt.hash(password, 10))
    //Hashing the passwords
    try {
       const res = await User.create({
            name,
            email,
            phone,
            address,
            dateofbirth,
            username,
            password
        })
        console.log('User created succesfully: ', response )
    }catch(error){
        if(error.code === 11000 ) {
            return res.json({ status: 'error', error: 'Username/Email already in use' })
        } 
        throw error
    }
   
    res.json({ status: 'ok' })
})


app.listen(9999,() => {
    console.log('Server up at 9999')
})