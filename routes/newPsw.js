const express = require('express');
const newPswRouter = express.Router();
const nodemailer = require('nodemailer');

console.log('from newPsw');
module.exports = newPswRouter;
const transport = {
  // all of the configuration for making a site send an email.

  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.THE_EMAIL,
    pass: process.env.THE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
}
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    // if error happened code ends here
    console.error(error);
  } else {
    // this means success
    console.log('users ready to mail myself');
  }
});

newPswRouter.post('/', (req, res, next) => {
  // make mailable object
  const mail = {
    from: `${req.body.email}`,
    to: process.env.THE_EMAIL,
    subject: "Réinitialisation du mot de passe",
    html:`<h2>Réinitialisation du mot de passe</h2>
      <p>Bonjour ${req.body.firstname} ${req.body.name} </p>
      <p>Voici le lien pour réinitialiser ton mot de passe : <a href="http://localhost:4200/new-mdp/${req.body.id}">clique ici</a></p>`,
  };
  transporter.sendMail(mail, (err,data) => {
    if(err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
});