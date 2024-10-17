# Statistics

## Vocabulary

### Chinese

dictionary {
  text: string
  pinyin: string
  definition: string
  type: string // word, phrase, sentence
  categories: dictionary_categories
  tags: dictionary_tags
  examples: dictionary_phrases
  image: string
  audio: string
  video: string
  created_at: string
  updated_at: string
}

dictionary_categories {
  category: words_category
  dictionaries: dictionary[]
}

dictionary_tags {
  tag: words_tag
  dictionaries: dictionary[]
}

words_category {
  name: string
  description: string
  dictionaries: dictionary[]
}

words_tag {
  name: string
  dictionaries: dictionary[]
}

dictionary_link {
  entryOne: dictionary
  entryTwo: dictionary
  type: string // synonym, antonym, related, example
}

learning_profile {
  user: user
  day_streak: number
  words_seen: number
  words_studied: number
  words_correct: number
  words_incorrect: number
  words_mature: number
  words_young: number
  words_new: number
}

setting {
  ease_factor: number
  review_intervals: {
    again: number
    hard: number
    good: number
    easy: number
  }
}

vocabulary_profile {
  profile: learning_profile
  vocabulary: dictionary
  seen: number
  correct: number
  wrong: number
  learned: number
  maturity_level: string // new, young, mature
  next_review_date: string
  last_study_date: string
}

categories_profile {
  user: user
  categories: dictionary_categories
  words_seen: number
  words_correct: number
  words_wrong: number
  words_learned: number
}

- seen[word] = number: number of times the word has been seen
- correct[word] = number: number of times the word has been answered correctly
- wrong[word] = number: number of times the word has been answered incorrectly

- categories[cat].words[word].seen
- categories[cat].words[word].correct
- categories[cat].words[word].wrong

- categories[cat].words[word].correct_streak
- categories[cat].level = number: level of efficiency of the category
- categories[cat].words_seen = number: number of words seen in the category
- categories[cat].words_correct = number: number of words answered correctly in the category
- categories[cat].words_wrong = number: number of words answered incorrectly in the category

- notes
+ word can be single or compound

