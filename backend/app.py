# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS
from analyzer import get_feature_array, score
import os
from dictation import get_10_word_array
from levenshtein import levenshtein
# -------------------- FLASK SERVER --------------------
# Pour voir un message au démarrage
print("🔧 Initialisation du serveur Flask...")

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image sent"}), 400

    img = request.files["image"]
    img_path = "temp.jpg"
    img.save(img_path)

    try:
        feats = get_feature_array(img_path)
        pred  = score(feats)
        return jsonify({
            "features": feats,
            "prediction": pred
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(img_path):
            os.remove(img_path)

# -------------------- DICTATION WORDS --------------------

@app.route("/dictation/words", methods=["GET"])
def generate_words():
    try:
        words = get_10_word_array()
        return jsonify({"words": words})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/dictation/score", methods=["POST"])
def score_dictation():
    try:
        data = request.get_json()
        typed = data.get("typed", [])
        expected = data.get("expected", [])

        expected_text = " ".join(expected)
        typed_text = " ".join(typed)

        score = levenshtein(expected_text, typed_text)
        return jsonify({"levenshtein_score": score})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --------------------------------------------------
# Ce bloc doit être aligné tout à gauche, pas indenté !
# --------------------------------------------------
if __name__ == "__main__":
    # Affiche un message pour confirmer que le serveur démarre
    print("🚀 Démarrage du serveur sur http://127.0.0.1:5000")
    # debug=True pour voir les logs et recharger automatiquement
    app.run(debug=True)