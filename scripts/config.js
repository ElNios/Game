const CONFIG = {
    PLAYER: {
        BASE_HEALTH: 500,
        MOVE_SPEED: 5,
        BASE_EXP_REQUIRED: 10,
        EXP_MULTIPLIER: 1.5
    },
    ENEMIES: {
        SPAWN_INTERVAL: 2000, // 2 seconds
        SPAWN_INCREASE_INTERVAL: 20000, // 20 seconds
        MAX_SPAWN_RATE: 10, // per second
        BASE_MOVE_SPEED: 2,
        DAMAGE_INTERVAL: 500, // 0.5 seconds
        BASE_DAMAGE: 5
    },
    GACHA: {
        CAPSULE_COST: 50,
        PROBABILITIES: {
            EQUIPMENT: 0.333,
            SKILL: 0.334,
            CARD_PACK: 0.333
        },
        CARD_PACK_PROBABILITIES: {
            SKILL: 0.95,
            DESTINY_CARD: 0.05
        }
    }
};