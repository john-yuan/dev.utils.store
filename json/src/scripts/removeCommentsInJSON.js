define([], function () {
    /**
     * Remove all comments in the json
     *
     * @param {string} rawJSONText
     * @return {string}
     */
    return function removeCommentsInJSON(rawJSONText) {
        var type = 0;
        var char = '';
        var index = 0;
        var length = rawJSONText.length;
        var charList = [];

        while (index < length) {
            char = rawJSONText[index];
            index += 1;

            if (type === 0) {
                if (char === '"') {
                    type = 1;
                    charList.push(char);
                } else if (char === '/') {
                    type = 2;
                } else {
                    charList.push(char);
                }
            } else if (type === 1) {
                charList.push(char);
                if (char === '"') {
                    type = 0;
                }
            } else if (type === 2) {
                if (char === '/') {
                    type = 3;
                } else if (char === '*') {
                    type = 4;
                } else {
                    charList.push(char);
                }
            } else if (type === 3) {
                if (char === '\r' || char === '\n') {
                    charList.push(char);
                    type = 0;
                }
            } else if (type === 4) {
                if (char === '*') {
                    type = 5;
                }
            } else if (type === 5) {
                if (char === '/') {
                    type = 0;
                } else if (char === '*') {
                    type = 5;
                } else {
                    type = 4;
                }
            }
        }
        return charList.join('');
    }
});
