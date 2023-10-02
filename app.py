from flask import Flask, render_template, request, redirect, url_for, flash
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

if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)

