from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from celery_worker import make_celery
from celery.result import AsyncResult
import time

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

db = SQLAlchemy(app)

app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = make_celery(app)

@celery.task()
def add_together(a, b):
    time.sleep(5)
    return a + b

@celery.task()
def generate_csv():
    time.sleep(5)
# importing the csv module
    import csv

    # field names
    fields = ['Name', 'Branch', 'Year', 'CGPA']

    # data rows of csv file
    rows = [ ['Nikhil', 'COE', '2', '9.0'],
            ['Sanchit', 'COE', '2', '9.1'],
            ['Aditya', 'IT', '2', '9.3'],
            ['Sagar', 'SE', '1', '9.5'],
            ['Prateek', 'MCE', '3', '7.8'],
            ['Sahil', 'EP', '2', '9.1']]

    # name of csv file
    filename = "static/data.csv"

    # writing to csv file
    with open(filename, 'w') as csvfile:
        # creating a csv writer object
        csvwriter = csv.writer(csvfile)
        
        # writing the fields
        csvwriter.writerow(fields)
        
        # writing the data rows
        csvwriter.writerows(rows)

    return "CSV generation started..."





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

#/edit_post/${id}
@app.route('/edit_post/<int:id>', methods=['GET', 'POST'])
def edit_post(id):
    data = request.get_json()
    print("Post Title:", data.get("title"),
          "Post Description:", data.get("content"))
    blog = Blog.query.get(id)
    blog.title = data.get("title")
    blog.content = data.get("content")
    db.session.commit()
    return jsonify("Post successfully updated")




@app.route('/delete_post/<int:id>')
def delete_post(id):
    post = Blog.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'success'})

@app.route('/trigger_celery_job')
def trigger_celery_job():
    a = generate_csv.delay()
    return jsonify({"task_id": a.id, "status": a.status, "result": a.get(), "State": a.state })

@app.route("/status/<task_id>")
def check_status(task_id):
    task = AsyncResult(task_id)
    return jsonify({"task_id": task.id, "status": task.status, "result": task.get(), "State": task.state })

@app.route("/download_csv")
def download_file():
    path = "static/data.csv"
    return send_file(path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)

