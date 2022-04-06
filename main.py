from flask import Flask, render_template, send_file
app = Flask('app')

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/<int:a>/')
def function_levels(a):
  return render_template('level.html', level=int(a))

@app.route('/<int:a>/images/<string:img>')
def function_images(img):
  return send_file(img, mimetype='static/images')


@app.errorhandler(404)
def page_not_found(e = 1):
  return render_template('404.html'), 404
  
@app.errorhandler(500)
def internal_server_error(e = 1):
 return render_template('500.html'), 500

  
app.run(host='0.0.0.0', port=8080)
