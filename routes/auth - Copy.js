const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


//for protected routing

router.get('/protected',requireLogin, (req, res) => {
res.send("i m safe")
})

const transporter = nodemailer.createTransport(sendgridTransport({
	auth:{
		api_key:"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"
	}
}))

router.post('/signup', (req, res) => {
    console.log(req.body)
    const { name, email, password,pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    //  else{
    //     res.json({message:"successfully signup"})
    //  }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exit" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        email,
                        password:hashedpassword,
						pic
                    })

                    user.save()
                        .then(user => {
							transporter.sendMail({
								to:user.email,
								from:"admin@skyfillconsulting.com",
								subject:"signup successfully with Let's Mingle",
								html:`<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">


		<tbody><tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
					<tbody><tr>
						<td align="center" valign="top" background="https://designmodo.com/demo/emailtemplate/images/header-background.jpg" style="background-size:cover; background-position:top;height=" 400""="">
							<table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0" cellspacing="0">

								<tbody>
								
			

								<tr>
									<td align="center" style="font-family: 'Raleway', sans-serif; font-size:31px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
										Welcome to Let's Mingle</span>
									</td>
								</tr>





								<tr>
							</tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>



		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
					<tbody><tr>
						<td height="35"></td>
					</tr>


					<tr>
						<td height="10"></td>
					</tr>


					<tr>
						<td align="center" style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
						You are successfully signup with Let's Mingle,<br>
							We are very happy to have you with us. Here is a little more information<br> about who we are, and a few links about our story and success cases.<br> We hope you find good friends in our social networking site what you are looking for. 
						</td>
					</tr>

				</tbody></table>
			</td>
		</tr>


		<tr>
			<td align="center">
				<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-left:20px; margin-right:20px;">

		<tbody>

		<tr>
			<td align="center">
				<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
					<tbody><tr>
						<td height="50"></td>
					</tr>
					<tr>
						<td align="center" bgcolor="#34495e" background="https://designmodo.com/demo/emailtemplate/images/footer.jpg" height="185">
							<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
								<tbody><tr>
									<td height="25"></td>
								</tr>

									<tr>
									<td align="center" style="font-family: 'Raleway',  sans-serif; font-size:26px; font-weight: 500; color:#f1c40f;">Follow us for some cool stuffs</td>
									</tr>


								<tr>
									<td height="25"></td>
								</tr>



								</tbody></table><table align="center" width="35%" border="0" cellspacing="0" cellpadding="0">
								<tbody><tr>
									<td align="center" width="30%" style="vertical-align: top;">
											<a href="https://www.facebook.com/maccabi.haifa.54" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-fb.png"> </a>
									</td>

									<td align="center" class="margin" width="30%" style="vertical-align: top;">
										 <a href="https://www.facebook.com/maccabi.haifa.54" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-twitter.png"> </a>
									</td>

									<td align="center" width="30%" style="vertical-align: top;">
											<a href="https://www.facebook.com/maccabi.haifa.54" target="_blank"> <img src="https://designmodo.com/demo/emailtemplate/images/icon-googleplus.png"> </a>
									</td>
								</tr>
								</tbody></table>



							</td></tr></tbody></table>
						</td>
					</tr>
				</tbody></table>
			</td>
		</tr>

				</tbody></table>`
								
							})
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                 //res.json({message:"successfully signed in"})
                  const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
				  const {_id,name,email,followers,following,pic} = savedUser
                  res.json({token,user:{_id,name,email,followers,following,pic}})
            //    const {_id,name,email,followers,following,pic} = savedUser
            //    res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/reset-password',(req,res)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		
		if(err){
			console.log(err)
		}
		const token = buffer.toString("hex")
		User.findOne({email:req.body.email})
		.then(user=>{
			if(!user){
				return res.status(422).json({error:"user dont exit with that email"})
			}
			user.resetToken = token
			user.expireToken = Date.now() + 3600000
			user.save().then((result)=>{
				transporter.sendMail({
								to:user.email,
								from:"admin@skyfillconsulting.com",
								subject:"Reset Your Password",
								html:`<h5>reset your password</h5>
								<p>click to this <a href="http://localhost:3000/reset-password/${token}"> click here </a> to reset your password</p>
								`
								
							})
							res.json({message:"check your email"})
			})
		})
		
	})
})


router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router