module.exports = {
    create: (options) => {
        //   options.passLength 8 <= x <= 128
        //   options.upper      true/false
        //   options.lower      true/false
        //   options.numbers    true/false
        //   options.special    true/false

        const charOptions = [];
        let arrayCount = 0;

        // If the Uppercase option selected
        if (options.upper) {
            const charArray = [];
            for (let i = 65; i <= 89; i++) {
                charArray.push(i);
            }
            charOptions.push(charArray);
            arrayCount++;
        }

        // If the Lowercase checkbox is selected
        if (options.lower) {
            charOptions.lower = [];
            const charArray = [];
            for (let i = 97; i <= 122; i++) {
                charArray.push(i);
            }
            charOptions.push(charArray);
            arrayCount++;
        }

        // If the Numbers checkbox is selected
        if (options.numbers) {
            charOptions.numbers = [];
            const charArray = [];
            for (let i = 48; i <= 57; i++) {
                charArray.push(i);
            }
            charOptions.push(charArray);
            arrayCount++;
        }

        // If the Special Characters checkbox is selected
        if (options.special) {
            charOptions.special = [];
            const charArray = [];
            for (let i = 32; i <= 47; i++) {
                charArray.push(i);
            }
            for (let i = 58; i <= 64; i++) {
                charArray.push(i);
            }
            for (let i = 91; i <= 96; i++) {
                charArray.push(i);
            }
            for (let i = 123; i <= 126; i++) {
                charArray.push(i);
            }
            charOptions.push(charArray);
            arrayCount++;
        }

        // If no options are selected
        if (arrayCount === 0) {
            return null;
        }

        // Picks a random array index, and then a random character from that array
        let finalString = '';
        let arrayChoice = [];
        let arraySelect = 0;
        let charSelect = 0;
        for (let i = 0; i < options.passLength; i++) {
            arraySelect = Math.floor(Math.random() * arrayCount);
            arrayChoice = charOptions[arraySelect];
            charSelect = Math.floor(Math.random() * arrayChoice.length);
            finalString = finalString.concat(
                String.fromCharCode(arrayChoice[charSelect])
            );
        }

        // Returns the string back to the calling function
        return finalString;
    },
};
