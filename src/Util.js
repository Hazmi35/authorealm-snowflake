'use strict';

module.exports = {
    binaryToID: function binaryToID(num) {
        let dec = '';

        while (num.length > 50) {
            const high = parseInt(num.slice(0, -32), 2);
            const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

            dec = (low % 10).toString() + dec;
            num = Math.floor(high / 10).toString(2) + Math.floor(low / 10).toString(2).padStart(32, '0');
        }

        num = parseInt(num, 2);
        while (num > 0) {
            dec = (num % 10).toString() + dec;
            num = Math.floor(num / 10);
        }

        return dec;
    },

    idToBinary: function idToBinary(num) {
        let bin = '';
        let high = parseInt(num.slice(0, -10)) || 0;
        let low = parseInt(num.slice(-10));
        while (low > 0 || high > 0) {
            bin = String(low & 1) + bin;
            low = Math.floor(low / 2);
            if (high > 0) {
                low += 5000000000 * (high % 2);
                high = Math.floor(high / 2);
            }
        }
        return bin;
    }

};
