from flask import Flask, request, jsonify, render_template
import ast
import sys
import traceback
import io
import contextlib

# ========================= FLASK APP INIT =========================
app = Flask(__name__)

# ========================= HELPER FUNCTION =========================
def execute_code_step_by_step(code):
    """
    Executes the provided Python code line by line and returns
    a list of execution states, including variable states, outputs, and errors.
    """
    try:
        # Parse the code into an AST (Abstract Syntax Tree)
        tree = ast.parse(code)
        execution_states = []  # To store intermediate states
        variables = {}  # To track variable states

        # Prepare to capture the output of print statements
        output_buffer = io.StringIO()
        local_vars = {}  # Dictionary to store local variables

        # Execute each block (AST node) step by step
        for node in tree.body:
            try:
                block_code = ast.unparse(node)  # Convert the node back to code

                # Redirect stdout to capture print output
                with contextlib.redirect_stdout(output_buffer):
                    exec(block_code, globals(), local_vars)  # Execute the code block

                # Filter out non-serializable objects from local_vars
                serializable_vars = {
                    k: v for k, v in local_vars.items()
                    if isinstance(v, (str, int, float, list, dict, bool, type(None)))  # Only keep serializable types
                }

                # Update the variables and capture the output after each block
                variables.update(serializable_vars)
                execution_states.append({
                    'block': block_code,
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue(),
                    'error': None
                })

            except Exception as e:
                # Capture errors and stop execution
                error_message = traceback.format_exc()
                execution_states.append({
                    'block': ast.unparse(node),
                    'variables': variables.copy(),
                    'line_number': getattr(node, 'lineno', -1),
                    'output': output_buffer.getvalue(),
                    'error': error_message
                })
                break

        return execution_states

    except Exception as e:
        return [{'error': f"An unexpected error occurred: {str(e)}"}]

# ========================= ROUTES =========================

@app.route('/')
def index():
    """
    Render the main page with the code editor.
    """
    return render_template('index.html')

@app.route('/execute', methods=['POST'])
def execute_code():
    """
    Endpoint to execute the provided Python code step by step.
    """
    code = request.json.get('code')
    execution_states = execute_code_step_by_step(code)
    return jsonify(execution_states)

@app.route('/validate', methods=['POST'])
def validate_code():
    """
    Endpoint to validate the syntax of the provided Python code.
    """
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
