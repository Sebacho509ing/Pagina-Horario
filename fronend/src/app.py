import Flask from flask 

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"