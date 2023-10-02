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
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Submit</button>
                        </div>
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