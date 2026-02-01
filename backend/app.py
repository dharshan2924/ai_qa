from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"answer": "No question provided"}), 400

    try:
        response = model.generate_content(question)
        return jsonify({"answer": response.text})
    except Exception as e:
        return jsonify({"answer": "Error generating response"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
