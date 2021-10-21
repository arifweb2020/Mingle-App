const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { SENDGRID_API, EMAIL } = require('../config/keys')

//for protected routing

router.get('/protected', requireLogin, (req, res) => {
  res.send("i m safe")
})

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: SENDGRID_API
  }
}))

router.post('/signup', (req, res) => {
  console.log(req.body)
  const { name, email, password, pic } = req.body
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
            password: hashedpassword,
            pic
          })

          user.save()
            .then(user => {
              transporter.sendMail({
                to: user.email,
                from: "letsmingle@admissioncares.com",
                subject: "signup successfully with Let's Mingle",
                html: `<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
  <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
  <title>Mingle App | Signup Successfully</title>

  <style type="text/css">
body {
  margin: 0;
  padding: 0;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

table {
  border-spacing: 0;
}

table td {
  border-collapse: collapse;
}

.ExternalClass {
  width: 100%;
}

.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
  line-height: 100%;
}

.ReadMsgBody {
  width: 100%;
  background-color: #ebebeb;
}

table {
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}

img {
  -ms-interpolation-mode: bicubic;
}

.yshortcuts a {
  border-bottom: none !important;
}

@media only screen and (max-width: 600px) {
  *[class="gmail-fix"] {
    display: none !important;
  }
}
@media screen and (max-width: 599px) {
  table[class="force-row"],
  table[class="container"] {
    width: 100% !important;
    max-width: 100% !important;
  }
  
  table[class="force-row two"] {
    width: 50% !important;
    max-width: 50% !important;
  }
}
@media screen and (max-width: 400px) {
  td[class*="container-padding"] {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
.ios-footer a {
  color: #aaaaaa !important;
  text-decoration: underline;
}

@media screen and (max-width: 599px) {
  td[class="col"] {
    width: 50% !important;
    text-align: center;
  }

  td[class="cols-wrapper"] {
    padding-top: 18px;
  }
  
  img[class="image"] {
    padding-bottom: 10px;
  }

  /*
img[class="image"] {
    float: right;
    max-width: 40% !important;
    height: auto !important;
    margin-left: 12px;
  }
*/

  div[class="subtitle"] {
    margin-top: 0 !important;
  }
}
@media screen and (max-width: 400px) {
  td[class="cols-wrapper"] {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  td[class="content-wrapper"] {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
}
</style>

</head>
<body style="margin:0; padding:0;" bgcolor="#e1e1e1" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<!-- 100% background wrapper (grey background) -->
<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#e1e1e1">
  <tr>
    <td align="center" valign="top" bgcolor="#e1e1e1" style="background-color: #e1e1e1;">

      <br>

      <!-- 600px container (white background) -->
      <table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">
        <tr class="gmail-fix">
          <td>
            <table cellpadding="0" cellspacing="0" border="0" align="center" width="600">
              <tr>
                <td cellpadding="0" cellspacing="0" border="0" height="1"; style="line-height: 1px; min-width: 600px;">
                  <img src="http://coloredge.com/newsletters/2015/06/images/spacer.gif" width="600" height="1" style="display: block; max-height: 1px; min-height: 1px; min-width: 600px; width: 600px;"/>
                  </td>
                </tr>
            </table>
          </td>
        </tr>
        
        <tr>
          <td class="content" align="left" style="background-color:#ffffff">

<table width="600" border="0" cellpadding="0" cellspacing="0" class="force-row" style="width: 600px;">
  <tr>
    <td>
      <a href="https://mingleapps.herokuapp.com/signin" title="Coloredge">
        <img style="width:100%;" src="https://thefacevalue.in/img/mingle.png">
      </a>
    </td>
  </tr>
  <tr>
    <td class="content-wrapper" style="padding-left:24px;padding-right:24px;text-align: center;">
      <p style="text-transform:uppercase;font-family:sans-serif;font-size: 24px !important;margin-top: 15px; margin-bottom: 15px;">Welcome to Let's Mingle</p> 
      <p style="font-family:sans-serif;font-size: 14px !important;margin-top: 15px; margin-bottom: 15px;line-height: 1.4 !important;">You are successfully signup with Let's Mingle,</p> 
      <p style="font-family:sans-serif;font-size: 14px !important;margin-top: 15px; line-height: 1.4;">We are very happy to have you with us. Here is a little more information<br> about who we are, and a few links about our story and success cases.<br> We hope you find good friends in our social networking site what you are looking for.</p><br>
      
    </td>
  </tr>
 
  <tr>
    <td class="content-wrapper" style="padding-left:24px;padding-right:24px;text-align: center;" align="center">
      <hr style="border-bottom: solid 1px #000; border-top: 0;">
      <br>
      <p style="text-transform:uppercase;font-family:sans-serif;font-size: 14px !important;margin-top:0; margin-bottom: 15px;text-align: center;">for any query send us email.</p>
      <div>
        <!--[if mso]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:marketing@coloredge.com" style="height:47px;v-text-anchor:middle;width:124px;" stroke="f" fillcolor="#f4791f">
            <w:anchorlock/>
            <center>
          <![endif]-->
              <a href="mailto:arifhussainb2019@gmail.com"
        style="background-color:#051a65;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:47px;text-align:center;text-decoration:none;width:124px;-webkit-text-size-adjust:none;">EMAIL US</a>
          <!--[if mso]>
            </center>
          </v:rect>
        <![endif]-->
      </div>
    </td>
  </tr>
  <tr>
    <td style="background:#fff;text-align:center;width:100%;height:25px;"></td>  
  </tr>
  <!--
<tr>
    <td bgcolor="#282727">
      <div style="font-family:Helvetica, Arial, sans-serif;font-size:14px !important;color:#ffffff;margin-top:18px;margin-bottom:18px;text-align: center;text-transform: uppercase">Questions? <a href="mailto:marketing@coloredge.com" style="color:#f0782d;text-decoration: none;">Contact us</a>
      </div>
    </td>
  </tr>
-->
 
  
</table>

          </td>
        </tr>
        
        
      </table><br><br><br><br>
<!--/600px container -->


    </td>
  </tr>
</table>
<!--/100% background wrapper-->

</body>
</html>

`

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


router.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" })
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password" })
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            //res.json({message:"successfully signed in"})
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
            const { _id, name, email, followers, following, pic } = savedUser
            res.json({ token, user: { _id, name, email, followers, following, pic } })
            //    const {_id,name,email,followers,following,pic} = savedUser
            //    res.json({token,user:{_id,name,email,followers,following,pic}})
          }
          else {
            return res.status(422).json({ error: "Invalid Email or password" })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
})

router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {

    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "user dont exit with that email" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "letsmingle@admissioncares.com",
            subject: "Reset Your Password",
            html: `<h2>Reset your LetsMingle password</h2>
								<p>click to this <a href="${EMAIL}/reset-password/${token}"> click here </a> to reset your password</p>
								`

          })
          res.json({ message: "check your email" })
        })
      })

  })
})


router.post('/new-password', (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" })
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser) => {
          res.json({ message: "password updated successfully" })
        })
      })
    }).catch(err => {
      console.log(err)
    })
})

module.exports = router