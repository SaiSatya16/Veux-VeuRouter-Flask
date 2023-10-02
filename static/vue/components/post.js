const Post = Vue.component('post', {
    template: `<div>
            <h1>Post</h1>
                <div class = "row">
                    <div class="card my-3 mx-3 col-3" style="width: 18rem;" v-for=" post in posts">
                        <div class="card-body">
                        <h5 class="card-title">{{post.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Post Id: {{post.id}}</h6>
                        <p class="card-text">{{post.content}}</p>
                        <a href="#" class="card-link">delete post</a>
                        </div>
                </div>
            </div>
            </div>`,
        data: function() {
            return {
                posts: [],
            }
        },
        mounted : function(){
        document.title = "Post";
        fetch("/get_allposts").then(response => response.json()).then(data => {
            console.log(data);
            this.posts = data;
        })
    }
});

export default Post;