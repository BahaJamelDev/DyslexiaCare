import pandas as pd
import random

def get_10_word_array():
    voc = pd.read_csv("data/intermediate_voc.csv")  # ← même fichier que dans Streamlit
    words = voc.squeeze().tolist()
    return random.sample(words, 10)
