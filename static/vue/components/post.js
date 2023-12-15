const Posts = Vue.component('posts', {
    template: `<div>
    <h1>Post</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Create Post
    </button>
    <button @click = "trigger_celery_job" > Trigger a celery task </button>
    <div class="row">
       <div class="card my-4 mx-4 col-4" v-for="post in posts_data" style="width: 18rem;">
          <div class="card-body">
             <h5 class="card-title">{{post.title}}</h5>
             <h6 class="card-subtitle mb-2 text-body-secondary">Post Id: {{post.id}}</h6>
             <p class="card-text">{{post.content}}</p>
             <button @click="delete_blog(post.id)" class="card-link">delete post</button>
             <button type="button" class="card-link" :data-bs-target="'#editModal' + post.id" data-bs-toggle="modal">
             Edit post
             </button>
             <!-- Create Post Modal -->
             <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                   <div class="modal-content">
                      <div class="modal-header">
                         <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                         <div class="my-3">
                            <label for="title">Enter Post Title</label>
                            <input v-model="title" type="text" id="title" class="form-control" placeholder="Title">
                         </div>
                         <div class="my-3">
                            <label for="Content">Enter Post Content</label>
                            <input v-model="content" type="text" id="Content" class="form-control" placeholder="Content">
                         </div>
                      </div>
                      <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         <button type="button" @click="addblog" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                      </div>
                   </div>
                </div>
             </div>
             <!-- Edit Post Modal -->
             <div class="modal fade" :id="'editModal' + post.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'editModalLabel' + post.id" aria-hidden="true">
                <div class="modal-dialog">
                   <div class="modal-content">
                      <div class="modal-header">
                         <h1 class="modal-title fs-5" :id="'editModal' + post.id">Edit Post</h1>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                         <div class="my-3">
                            <label for="title">Enter Post Title</label>
                            <input v-model="title" type="text" id="title" class="form-control" :placeholder= "post.title">
                         </div>
                         <div class="my-3">
                            <label for="Content">Enter Post Content</label>
                            <input v-model="content" type="text" id="Content" class="form-control" :placeholder= "post.content">
                         </div>
                      </div>
                      <div class="modal-footer">
                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         <button type="button" @click="editblog(post.id)" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </div>
`,
data: function() {
    return {
        posts_data: [],
        title: "",
        content: ""
    };
},
methods: {
    addblog: function() {
        fetch("/add_post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: this.title,
                content: this.content,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            fetch("/get_allposts")
              .then((response) => response.json())
              .then((data) => {
                console.log("Data returned from the backend:", data);
                this.posts_data = data;
              });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    delete_blog: function(id) {
        fetch(`/delete_post/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
            fetch("/get_allposts")
                .then((response) => response.json())
                .then((data) => {
                  console.log("Data returned from the backend:", data);
                  this.posts_data = data;
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },
    editblog: function(id) {
        const data = { title: this.title, content: this.content };
        fetch(`/edit_post/${id}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              fetch("/get_allposts")
                .then((response) => response.json())
                .then((data) => {
                  console.log("Data returned from the backend:", data);
                  this.posts_data = data;
                });
              // this.$router.go(0)
              // this.$router.push("/posts")
            })
            .catch((error) => {
              console.error("Error:", error);
            });
    },
    trigger_celery_job: function() {
        fetch("/trigger_celery_job")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
            window.location.href = "/download_csv"
            })
        .catch(error => {
            console.error('Error:', error);
        });
    }
},
mounted: function() {
    document.title = "Posts";
    fetch("/get_allposts")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        this.posts_data = data;
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
},
});

export default Posts;