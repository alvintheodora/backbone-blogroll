var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var blogSchema = new Schema({   
    author: String,
    title:  String,
    url:   String   
});

var Blog = mongoose.model('Blog',blogSchema);

// var blog = new Blog({
//     author: 'Michael',
//     title: 'Michael\'s Blog',
//     url: 'http://google.com'
// });

//blog.save();

var app = express();

//app.get('/', (req,res)=>res.send("hello world?"));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// app.use('/js', express.static(__dirname + '/node_modules/underscore'));
// app.use('/js', express.static(__dirname + '/node_modules/backbone'));
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/api/blogs', function(req,res){
    Blog.find(function(err,docs){       
        res.send(docs);
    });
});

app.post('/api/blogs', function(req,res){
    var blog = new Blog(req.body); 
    /*console.log('reeived a post req');
    for ( var key in req.body ){
        console.log(key + ': ' + req.body[key]);
    }*/
    blog.save(function(err,doc){        
        res.send(doc);// have to send this res, otherwise ERROR (add then update), IDK why
    });    
});

app.put('/api/blogs/:id', function(req,res){
    Blog.update({_id: req.params.id}, req.body, function(err){//have to include callback, IDK why
        //res.send({_id: req.params.id});
    });      
});

app.delete('/api/blogs/:id', function(req,res){
    Blog.remove({_id: req.params.id}, function(err){//have to include callback, IDK why
        //res.send({_id: req.params.id});
    });            
});

app.get('/page2', function(req,res){      
    res.send('hello world')
});

app.listen(3000, ()=>console.log('server on 3000'));
