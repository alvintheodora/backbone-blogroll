import $ from 'jquery';
import bootstrap from 'bootstrap';
import _ from 'underscore';
import backbone from 'backbone';

import 'bootstrap/dist/css/bootstrap.min.css';

Backbone.Model.prototype.idAttribute = '_id';

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

var Blogs = Backbone.Collection.extend({
    url: 'http://localhost:3000/api/blogs'
});

//instantiate Blog
// var blog1 = new Blog({
//     author: 'Alvin',
//     title: 'Alvin\'s Blog',
//     url: 'http://alvintheodora.github.io/ng5'
// });

// var blog2 = new Blog({
//     author: 'Theodora',
//     title: 'Theodora\'s Blog',
//     url: 'http://kopigenik.com'
// });

//instantiate Collection
var blogs = new Blogs();

//Backbone Views
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function(){
        this.template = _.template($('.blog-list-template').html());
    },    
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events:{
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel-blog': 'cancel',
        'click .delete-blog': 'delete'
    },
    edit: function(){
        $('.edit-blog, .delete-blog').hide();
        this.$('.update-blog, .cancel-blog').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input class="form-control author-update" type="text" value="' + author + '">');
        this.$('.title').html('<input class="form-control title-update" type="text" value="' + title + '">');
        this.$('.url').html('<input class="form-control url-update" type="text" value="' + url + '">');
    },
    update: function(){       
        this.model.set({
            'author': $('.author-update').val(),
            'title': $('.title-update').val(),
            'url': $('.url-update').val()
        });
        this.model.save(/*null, {
            success: function(response){
                console.log('succss update with _id: '+ response.toJSON()._id);
            },
            error: function(){
                console.log('NAHHHH,, failed to update blog ');
            }
        }*/);
    },
    cancel: function (){ 
        new BlogsView().render();
    },
    delete: function(){
        this.model.destroy(/*{
            success: function(response){
                console.log('succss DELETE with _id: '+ response.toJSON()._id);
            },
            error: function(){
                console.log('failed to DELETE blog ');
            }
        }*/);
    }
});

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.component'),
    initialize: function(){
        this.model.on('add',this.render,this);
        this.model.on('change',this.render,this);
        this.model.on('destroy',this.render,this);
        this.model.fetch(/*{
            success: function(response){
                _.each(response.toJSON(), function(item) {
					console.log('Successfully GOT blog with _id: ' + item._id);
				})
            },
            error: function(){
                console.log('failed to GET blog ');
            }
        }*/);
        this.render();
    },
    render: function(){
        var self = this;
        this.$el.html(_.template($('.blogs-list-template').html()));
        _.each(this.model.toArray(), function(blog){
            self.$el.find('.blogs-list').append((new BlogView({model: blog})).render().$el);
        });
        //this.$el.append('<a href="/#page2">Go to Second Page</a>');
        return this;
    }
});

var SecondView = Backbone.View.extend({
    el: $('.component'),    
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(_.template($('.second-view').html()));
    }
});

var ThirdView = Backbone.View.extend({
    el: $('.component'),    
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html(_.template($('.third-view').html()));
    }
});

// var blogsView = new BlogsView();

///////////////////ROUTER/////////////////////////////
var Router = Backbone.Router.extend({
    
    routes: {
        '': 'mainView',
        'index': 'mainView',
        'page2': 'view2',
        'page3': 'view3'
    },
    initialize: function() {
        Backbone.history.start();
    },
    mainView: () => {
        new BlogsView();
    },
    view2: () => {
        new SecondView();
    },
    view3: () => {
        new ThirdView();
    }
});
var router = new Router();



///////////////////jquery DOM ready///////////////////
$(document).ready(function(){
    $('.add-blog').click(function(){
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });
        
        $('.author-input, .title-input, .url-input').val('');
        blogs.add(blog);
        
        blog.save();
    });
});

// $(document.body).on('click', 'a', function(e){
//     e.preventDefault();
//     Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
//   });

export function testnih(){
    var nums = [
        '1',
        '12',
        '323',
        '42322'
      ];
      
    $(document).ready(function(){
        //alert('testnih: ' + nums.map(material => material));
    });
    
}

export {$, bootstrap, _, backbone};
