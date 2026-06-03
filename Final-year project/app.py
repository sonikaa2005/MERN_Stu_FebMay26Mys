from flask import Flask, render_template, request, redirect, url_for, jsonify
import subprocess
import os

app = Flask(__name__)

# Folder where your codes exist: Dynamo/codes/graph_output/
CODES_FOLDER = os.path.join(app.root_path, "codes", "graph_output")


# -------------------------
# LOGIN SYSTEM
# -------------------------
@app.route("/")
def home():
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        if request.form.get("username") == "admin" and request.form.get("password") == "1234":
            return redirect(url_for("dashboard"))
        return render_template("login.html", error="Invalid Credentials")
    return render_template("login.html")


@app.route("/logout")
def logout():
    return redirect(url_for("login"))


# -------------------------
# DASHBOARD
# -------------------------
@app.route("/dashboard")
def dashboard():
    files = ["graph_main.py", "main.py", "vanet_ml.py"]
    return render_template("dashboard.html", files=files)


# -------------------------
# RUN CODE IN BROWSER
# -------------------------
@app.route("/run_web/<filename>")
def run_web(filename):
    script_path = os.path.join(CODES_FOLDER, filename)

    if not os.path.exists(script_path):
        return render_template("output.html",
                               output=f"ERROR: File '{script_path}' not found.")

    try:
        result = subprocess.run(
            ["python", script_path],
            capture_output=True,
            text=True
        )
        output = result.stdout + result.stderr
        return render_template("output.html", output=output)

    except Exception as e:
        return render_template("output.html", output=str(e))


# -------------------------
# RUN CODE IN VS CODE
# -------------------------
@app.route("/run_vs/<filename>")
def run_vs(filename):

    script_path = os.path.join(CODES_FOLDER, filename)

    if not os.path.exists(script_path):
        return jsonify({"error": f"File not found: {script_path}"}), 404

    try:
        vscode_path = r"C:\Users\DELL\AppData\Local\Programs\Microsoft VS Code\Code.exe"

        # Open file directly in VS Code
        subprocess.Popen([vscode_path, script_path])

        return "", 204  # Success, no page needed

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------
# VIEW GRAPH IMAGE
# -------------------------
@app.route("/view_graph/<graph>")
def view_graph(graph):
    return render_template("view_graph.html", graph=graph)


# -------------------------
# RUN FLASK
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)
