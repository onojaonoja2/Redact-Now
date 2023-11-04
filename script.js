// script.js
function redactText() {
    const startTime = new Date();
    const inputText = document.getElementById("inputText").value;
    const redactWords = document.getElementById("redactWords").value.split(',');
    const replacementWords = document.getElementById("replacementWords").value.split(',');
    let redactedText = inputText;

    let wordsScanned = 0;
    let wordsMatched = 0;
    let charactersScrambled = 0;

    if (redactWords.length === replacementWords.length) {
        for (let i = 0; i < redactWords.length; i++) {
            const wordRegex = new RegExp("\\b" + redactWords[i] + "\\b", "gi");
            redactedText = redactedText.replace(wordRegex, match => {
                wordsMatched++;
                charactersScrambled += match.length;
                return replacementWords[i];
            });
        }

        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // in seconds

        document.getElementById("redactedText").value = redactedText;
        document.getElementById("copyButton").disabled = false;

        const stats = `Words Scanned: ${wordsScanned}\nWords Matched: ${wordsMatched}\nCharacters Scrambled: ${charactersScrambled}\nTime Taken: ${timeTaken.toFixed(2)} seconds`;
        document.getElementById("statistics").textContent = stats;
    } else {
        alert("Please provide an equal number of redact and replacement words.");
    }
}

function resetText() {
    document.getElementById("inputText").value = "";
    document.getElementById("redactWords").value = "";
    document.getElementById("replacementWords").value = "";
    document.getElementById("redactedText").value = "";
    document.getElementById("copyButton").disabled = true;
    document.getElementById("statistics").textContent = "";
}

function copyText() {
    const redactedText = document.getElementById("redactedText");
    redactedText.select();
    document.execCommand("copy");
    alert("Redacted text copied to the clipboard.");
}
