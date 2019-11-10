'use strict';

const { binaryToID, idToBinary } = require('./Util');

let EPOCH = 0;
let INCREMENT = 0;

/**
 * An AuthoRealm's snowflake generator
 * @param epoch Epoch time used for the snowflake
 */
class SnowflakeGenerator {
    constructor(epoch) {
        if (!epoch) throw new Error(`"epoch" param was not passed.`)
        EPOCH = epoch;
        this.epoch = EPOCH;
        this.util = { binaryToID, idToBinary }
    }

    /**
     * Generates an AuthoRealm snowflake.
     * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
     * @param {number|Date} [timestamp=Date.now()] Timestamp or date of the snowflake to generate
     * @returns {Snowflake} The generated snowflake
     */
    generate(timestamp = Date.now()) {
        if (timestamp instanceof Date) timestamp = timestamp.getTime();
        if (typeof timestamp !== 'number' || isNaN(timestamp)) {
            throw new TypeError(
                `"timestamp" argument must be a number (received ${isNaN(timestamp) ? 'NaN' : typeof timestamp})`
            );
        }
        if (INCREMENT >= 4095) INCREMENT = 0;
        const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, '0')}0000100000${(INCREMENT++).toString(2).padStart(12, '0')}`;
        return binaryToID(BINARY);
    }

    /**
     * Deconstructs an AuthoRealm snowflake.
     * @param {Snowflake} snowflake Snowflake to deconstruct
     * @returns {DeconstructedSnowflake} Deconstructed snowflake
     */
    deconstruct(snowflake) {
        const BINARY = idToBinary(snowflake).toString(2).padStart(64, '0');
        const res = {
            timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
            workerID: parseInt(BINARY.substring(42, 47), 2),
            processID: parseInt(BINARY.substring(47, 52), 2),
            increment: parseInt(BINARY.substring(52, 64), 2),
            binary: BINARY,
        };
        Object.defineProperty(res, 'date', {
            get: function get() {
                return new Date(this.timestamp);
            },
            enumerable: true,
        });
        return res;
    }
};

module.exports = SnowflakeGenerator;
