var express = require('express');
var jwt= require('jsonwebtoken');
const auth = (req , res , next )=>{
  const authHeader = req.headers.authorization;
  if(authHeader){
      const token = authHeader.split(' ')[0];

        jwt.verify(token, 'userKey' , (err, data) => {
           if (err) {
               return res.sendStatus(403);
           }

           req.data = data;
           next();
       });
  }else {
      return res.sendStatus(403);
  }
};

module.exports= auth;
