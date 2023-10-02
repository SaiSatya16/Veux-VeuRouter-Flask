const Post = Vue.component('post', {
    template: `<div>
            <h1>Post</h1>
                <div class = "row">
                    <div class="card my-4 mx-4 col-4" style="width: 18rem;" v-for=" post in posts">
                        <div class="card-body">
                        <h5 class="card-title">{{post.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Post Id: {{post.id}}</h6>
                        <p class="card-text">{{post.content}}</p>
                        <button @click="delete_blog(post.id)" class="card-link">delete post</button>
                        </div>
                </div>
            </div>
            <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Create Post
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class= "my-3">
                                <label for="title"> Enter Post Title</label>
                                <input v-model = "title" type="text" id="title" class="form-control" placeholder="Title">
                            
                            </div>
                            <div class="my-3">

                                <label for="Content"> Enter Post Content</label>
                                <input v-model = "content" type="text" id="Content" class="form-control" placeholder="Content">
                                
                            
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" @click="addblog" class="btn btn-primary" data-bs-dismiss="modal" >Submit</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>`,
        data: function() {
            return {
                posts: [],
                title: "",
                content: "",

            }
        },
        methods: {
            addblog: function(){
                console.log(this.title);
                console.log(this.content);
                fetch("/add_post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: this.title,
                        content: this.content,
                    }),
                }).then(response => response.json()).then(data => {
                    console.log(data);
                    fetch("/get_allposts").then(response => response.json()).then(data => {
                        console.log(data);
                        this.posts = data;
                    })

                    // this.posts.push(data);
                    // this.title = "";
                    // this.content = "";
                    // // this.$router.go(0);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            },
            delete_blog : function(id){
                fetch(`/delete_post/${id}`).then(r => r.json()).then(d => {
                    console.log(d);
                    fetch("/get_allposts").then(response => response.json()).then(data => {
                        console.log(data);
                        this.posts = data;
                    })
                
                });
            }

        },
        mounted : function(){
        document.title = "Post";
        fetch("/get_allposts").then(response => response.json()).then(data => {
            console.log(data);
            this.posts = data;
        });
    
    },
});

export default Post;