import json
import re
import random
from collections import Counter

# --- TRANSLATION SECTION ---

# Load the translation dictionary once
with open('translation_dict.json', 'r', encoding='utf-8') as f:
    translation_dict = json.load(f)

def translate_paragraph_simple(french_paragraph):
    words = french_paragraph.lower().split()
    translated_words = [translation_dict.get(word, word) for word in words]
    return ' '.join(translated_words)

def translate(paragraph):
    paragraphs = paragraph.strip().split('\n')
    translated_paragraphs = [translate_paragraph_simple(p) for p in paragraphs]
    return '\n'.join(translated_paragraphs)


# --- SUMMARIZATION SECTION ---

def summarize(paragraph):
    sentences = re.split(r'(?<=[.!?])\s+', paragraph.strip())
    if len(sentences) <= 2:
        return paragraph.strip()

    first = sentences[0]
    last = sentences[-1]
    middle_sentences = sentences[1:-1]

    words = re.findall(r'\b\w+\b', paragraph.lower())

    stopwords = set([
        'the', 'a', 'an', 'and', 'is', 'was', 'are', 'were', 'of', 'to', 'in',
        'on', 'at', 'by', 'with', 'for', 'as', 'from', 'that', 'this', 'it',
        'but', 'be', 'have', 'has', 'had', 'i', 'you', 'he', 'she', 'they', 'we'
    ])
    content_words = [w for w in words if w not in stopwords]
    common_words = set(w for w, _ in Counter(content_words).most_common(5))

    scored_middle = []
    for sent in middle_sentences:
        sent_words = set(re.findall(r'\b\w+\b', sent.lower()))
        score = len(sent_words & common_words)
        scored_middle.append((score, sent))

    scored_middle.sort(reverse=True)
    num_keep = len(middle_sentences) // 2
    selected_middle = [s for _, s in scored_middle[:num_keep]]

    summary = [first] + selected_middle + [last]
    return ' '.join(summary)


# --- QUIZIFY SECTION ---

def clean_leading_phrases(sentence):
    leading_phrases = [
        'suddenly', 'nearby', 'later', 'then', 'afterward', 'however', 'moreover', 'therefore',
        'meanwhile', 'consequently', 'first', 'second', 'third', 'finally', 'next', 'in addition',
        'besides', 'furthermore', 'hence', 'thus', 'accordingly', 'nonetheless', 'still', 'otherwise',
        'alternatively', 'subsequently', 'eventually', 'overall', 'additionally', 'incidentally',
        'as', 'since'
    ]
    pattern = r'^(?:' + '|'.join(re.escape(phrase) for phrase in leading_phrases) + r')[, ]+\s*'
    return re.sub(pattern, '', sentence.strip(), flags=re.IGNORECASE)

def make_interrogative(sentence):
    sentence = clean_leading_phrases(sentence)
    words = sentence.split()
    if len(words) < 2:
        return sentence

    # Look for auxiliary verbs within the first 4 words (common auxiliaries)
    auxiliaries = ['is', 'are', 'was', 'were', 'can', 'could', 'will', 'would', 'should', 'has', 'have', 'had', 'does', 'do', 'did']
    aux_index = -1
    for i in range(min(4, len(words))):
        if words[i].lower() in auxiliaries:
            aux_index = i
            break

    if aux_index != -1:
        # Move auxiliary verb to front, capitalize it
        aux = words[aux_index].capitalize()
        # Remove the auxiliary from original place
        rest = words[:aux_index] + words[aux_index+1:]
        return f"{aux} {' '.join(rest)}?"

    # No auxiliary found - check if second word ends with 'ed' (simple past tense)
    if len(words) > 1 and words[1].lower().endswith('ed'):
        # Try to convert to base form by removing 'ed'
        base_verb = words[1][:-2]  # crude heuristic
        # Special cases where 'ied' changes to 'y' (e.g., 'studied' -> 'study')
        if words[1].lower().endswith('ied'):
            base_verb = words[1][:-3] + 'y'
        subject = words[0]
        rest = words[2:]
        return f"Did {subject} {base_verb} {' '.join(rest)}?".replace('  ', ' ').strip()

    # If subject is he/she/it -> Does, else Do
    subject = words[0].lower()
    if subject in ['he', 'she', 'it']:
        aux = 'Does'
    else:
        aux = 'Do'
    rest = words[1:]
    return f"{aux} {subject} {' '.join(rest)}?".replace('  ', ' ').strip()

def quizify(paragraph, n=3):
    sentences = [s.strip() for s in re.split(r'[.!?]', paragraph) if s.strip()]
    sampled = random.sample(sentences, min(n, len(sentences)))
    return [make_interrogative(s) for s in sampled]
