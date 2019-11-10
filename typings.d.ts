declare module "authorealm-snowflake" {
    class SnowflakeGenerator {
        constructor(epoch: Epoch)
        generate(timestamp: number|Date): Snowflake
        deconstruct(snowflake: Snowflake): DeconstructedSnowflake
    }

    export type Epoch = number
    export type Snowflake = number
    export type DeconstructedSnowflake = {
        get(): Date
        enumerable: boolean
    }
    export default SnowflakeGenerator
}
