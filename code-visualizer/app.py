from flask import Flask, request, jsonify, render_template
import subprocess
import ast

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')
    try:
        result = subprocess.run(
            ['python', '-c', code],
            capture_output=True,
            text=True,
            timeout=5  # Limit execution time to prevent infinite loops
        )
        return jsonify({
            'output': result.stdout,
            'error': result.stderr
        })
    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 400

@app.route('/validate', methods=['POST'])
def validate_code():
    code = request.json.get('code')
    try:
        ast.parse(code)  # Attempt to parse the code
        return jsonify({'valid': True})
    except SyntaxError as e:
        return jsonify({'valid': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)