/**
 * 
 * @param {string[]} letters 
 * @param {boolean} requireAll
 * @returns {string[]}
 */
export async function findWords(letters, requireAll, minLength) {
    const letterCounts = getLetterObj(letters.join(''));
    
    const words = (await getWords()).filter(w => w.length >= minLength);
    const matchedWords = [];

    for (const word of words) {
        const testWordLetters = getLetterObj(word);
        const letters = Object.keys(testWordLetters);
        let fail = false;
        for (const testWordLetter of letters) {
            if (!letterCounts[testWordLetter] || testWordLetters[testWordLetter] > letterCounts[testWordLetter]) {
                fail = true;
            }
        }
        // TODO implement requireAll
        if (!fail) {
            matchedWords.push(word)
        }
    }

    return matchedWords
}

async function getWords() {
    const resp = await fetch('/words_dictionary.json')
    const words = await resp.json();
    return Object.keys(words);
}

function getLetterObj(word) {
    return word.split('').reduce((prev, curr) => {
        if (typeof prev[curr] !== 'number') {
            prev[curr] = 1
        } else {
            prev[curr]++
        }
        return prev
    }, {});
}