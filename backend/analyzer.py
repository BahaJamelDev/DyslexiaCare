from textblob import TextBlob
import language_tool_python
from abydos.phonetic import Soundex, Metaphone, Caverphone, NYSIIS
from azure_ocr import extract_text_from_image

tool = language_tool_python.LanguageTool('en-US')

def levenshtein(s1: str, s2: str) -> int:
    if len(s1) < len(s2): return levenshtein(s2, s1)
    if not s2: return len(s1)
    prev = list(range(len(s2) + 1))
    for i, c1 in enumerate(s1):
        curr = [i + 1]
        for j, c2 in enumerate(s2):
            ins = prev[j+1] + 1
            rem = curr[j]   + 1
            sub = prev[j] + (c1 != c2)
            curr.append(min(ins, rem, sub))
        prev = curr
    return prev[-1]

def spelling_accuracy(text: str) -> float:
    corr = str(TextBlob(text).correct())
    return ((len(text) - levenshtein(text, corr)) / (len(text) + 1)) * 100

def grammatical_accuracy(text: str) -> float:
    matches = tool.check(text)
    return (1 - len(matches) / (len(text.split()) + 1)) * 100

def percentage_of_corrections(text: str) -> float:
    matches = tool.check(text)
    return len(matches) / (len(text.split()) + 1) * 100

def percentage_of_phonetic_accuraccy(text: str) -> float:
    corr_words = str(TextBlob(text).correct()).split()
    orig_words = text.split()
    encoders = [Caverphone(), Soundex(), Metaphone(), NYSIIS()]
    weights  = [0.5, 0.2, 0.2, 0.1]

    def encode_list(enc, words): return " ".join(enc.encode(w) for w in words)
    def score(e1, e2): return (len(e1) - levenshtein(e1, e2)) / (len(e1) + 1)

    scores = []
    for enc in encoders:
        s1 = encode_list(enc, orig_words)
        s2 = encode_list(enc, corr_words)
        scores.append(score(s1, s2))
    return sum(w*s for w,s in zip(weights, scores)) * 100

def get_feature_array(image_path: str) -> list:
    text = extract_text_from_image(image_path)
    return [
        spelling_accuracy(text),
        grammatical_accuracy(text),
        percentage_of_corrections(text),
        percentage_of_phonetic_accuraccy(text)
    ]

def score(input_feats: list) -> list:
    if input_feats[0] <= 96.13:
        return [0.0, 1.0]
    if input_feats[2] <= 2.39:
        return [0.0, 1.0]
    if input_feats[0] <= 97.46:
        return [1.0, 0.0]
    return [1.0, 0.0]