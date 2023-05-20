const FREE = {
    'MUSIC': {
        price: 0,
        month: 1,
    },

    'VIDEO': {
        price: 0,
        month: 1,
    },

    'PODCAST': {
        price: 0,
        month: 1,
    },
}

const PERSONAL = {
    'MUSIC': {
        price: 100,
        month: 1,
    },

    'VIDEO': {
        price: 100,
        month: 1,
    },

    'PODCAST': {
        price: 100,
        month: 1,
    },
}

const PREMIUM = {
    'MUSIC': {
        price: 250,
        month: 3,
    },

    'VIDEO': {
        price: 500,
        month: 3,
    },

    'PODCAST': {
        price: 300,
        month: 3,
    },
}

const ADD_TOPUP = {
    'FOUR_DEVICE': {
        price: 50,
        month: 1
    },
    'TEN_DEVICE': {
        price: 100,
        month: 1
    }
}

const STORE = {
    FREE,
    PERSONAL,
    PREMIUM,
    ADD_TOPUP
}

module.exports = STORE