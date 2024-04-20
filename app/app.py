from flask import Flask, render_template, url_for

app = Flask (__name__)

@app.route('/home')
def index():

    js_file_url = url_for('static', filename='js/firebase.js')
    navbar_url = url_for('login')
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/vinculacion')
def vinculacion():
    return render_template('vinculation.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)