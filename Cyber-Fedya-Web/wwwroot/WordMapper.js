mapWord = function(word, vocabulary) {
    var dictinary = {};

    switch (word) {
        case "<Существительное>":
            dictinary = vocabulary.nouns;
            break;
        case "<Персонаж>":
            dictinary = vocabulary.characters;
            break;
        case "<Прилагательное>":
            dictinary = vocabulary.adjectives;
            break;
        case "<Глагол>":
            dictinary = vocabulary.verbs;
            break;
        case "<Место>":
            dictinary = vocabulary.places;
            break;

        default:
           return word;
    }

    var index = Math.floor(Math.random() * dictinary.length);
    return dictinary[index];
}