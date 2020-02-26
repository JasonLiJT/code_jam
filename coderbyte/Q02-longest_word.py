def LongestWord(sen):
  filtered_words = []
  for word in sen.split():
    filtered_word = []
    for c in word:
      if c.isalpha() or c.isdigit():
        filtered_word.append(c)
    filtered_words.append(''.join(filtered_word))

  # print(filtered_words)
  return max(filtered_words, key=lambda w: len(w))

# keep this function call here 
print(LongestWord(input()))