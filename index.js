const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const expressValidator=require('express-validator');
let app=express();

let users=[{
    'name':'Aleks',
    'email':'aleks@gmail.com',
    'age':32
},
{
    'name':'mark',
    'email':'mark@gmail.com',
    'age':22
},
{
    'name':'jake',
    'email':'jake@gmail.com',
    'age':24
}
];
// routes
app.get('/',function(req,res){
    // res.json(people);
    res.render('index',{
        'title':'home',
        'header':'welcome to my first express js app',
        'users':users
    });
});

app.post('/users/add',function(req,res){
    // let newuser={
    //     name:req.body.names,
    //     age:req.body.age,
    //     email:req.body.email
    // }
    console.log(req.body.age);
});

/*
 *middle ware
 */
// let logger=function(req,res,next){
//     console.log('logging...');
//     next();
// }
//express valodator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// app.use(logger);

//body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//get static path
app.use(express.static(path.join(__dirname, 'public')));
app.listen(5555,function() {
    console.log('server started on port 5555')
});