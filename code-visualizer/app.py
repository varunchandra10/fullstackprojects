from flask import Flask, request, jsonify, render_template
from server.executionLogic import execute_code_step_by_step
import ast

# ========================= FLASK APP INIT =========================
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')
    
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    print(f"Received code:\n{repr(code)}")  # Debugging
    
    execution_states = execute_code_step_by_step(code)
    return jsonify(execution_states)


@app.route('/validate', methods=['POST'])
def validate_code():
    code = request.json.get('code')
    try:
        # Attempt to parse the code to check for syntax errors
        ast.parse(code)
        return jsonify({'valid': True})
    except SyntaxError as e:
        return jsonify({'valid': False, 'error': str(e)})

# ========================= MAIN =========================
if __name__ == '__main__':
    # Run the app in debug mode
    app.run(debug=True)