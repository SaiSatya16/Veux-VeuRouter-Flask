from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

db = SQLAlchemy(app)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_allposts')
def get_allposts():
    posts = Blog.query.all()
    data = []
    for post in posts:
        data.append({'id': post.id, 'title': post.title, 'content': post.content})
    return data
    # return render_template('allposts.html', posts=posts)

@app.route('/add_post', methods=['GET', 'POST'])
def add_post():
    if request.method == 'POST':
        data = request.get_json()
        print(data.get('title')), print(data.get('content'))
        blog = Blog(title=data.get('title', None), content=data.get('content', None))
        db.session.add(blog)
        db.session.commit()
        return  jsonify({'message': 'success'})
    #     title = request.form['title']
    #     content = request.form['content']

    #     post = Blog(title=title, content=content)
    #     db.session.add(post)
    #     db.session.commit()
    #     return redirect(url_for('get_allposts'))
    # return render_template('add_post.html')

#route to delete a post

#/edit_post/${id}
@app.route('/edit_post/<int:id>', methods=['GET', 'POST'])
def edit_post(id):
    if request.method == 'POST':
        data = request.get_json()
        a = (data.get('title'))
        b = (data.get('content'))
        post = Blog.query.filter_by(id=id)
        post.update({'title' : a}, {'content':b})
        db.session.commit()
        return  jsonify({'message': 'success'})




@app.route('/delete_post/<int:id>')
def delete_post(id):
    post = Blog.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'success'})

    


if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)

