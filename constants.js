module.exports = {
    // Game Types
    GAME_TYPES: {
        FOOTBALL: 'football',
        BASKETBALL: 'basketball',
        TENNIS: 'tennis',
        VIRTUAL: 'virtual',
        CASINO: 'casino'
    },

    // Bet Types
    BET_TYPES: {
        SINGLE: 'single',
        MULTIPLE: 'multiple',
        SYSTEM: 'system'
    },

    // Bet Status
    BET_STATUS: {
        PENDING: 'pending',
        WON: 'won',
        LOST: 'lost',
        CASHED_OUT: 'cashed_out',
        VOID: 'void'
    },

    // Transaction Types
    TRANSACTION_TYPES: {
        DEPOSIT: 'deposit',
        WITHDRAWAL: 'withdrawal',
        BET: 'bet',
        WINNING: 'winning',
        REFUND: 'refund',
        BONUS: 'bonus'
    },

    // Ethiopian Teams
    ETHIOPIAN_TEAMS: [
        'Saint George', 'Ethiopian Coffee', 'Defence Force', 'Fasil Kenema',
        'Sidama Coffee', 'Wolkite City', 'Hawassa City', 'Bahir Dar City',
        'Adama City', 'Dire Dawa City', 'Jimma Aba Jifar', 'Welayta Dicha',
        'Arba Minch City', 'Hadiya Hossana', 'Sebeta City', 'Shire Endaselassie'
    ],

    // Leagues
    LEAGUES: [
        'Ethiopian Premier League',
        'Ethiopian Higher League',
        'English Premier League',
        'La Liga',
        'Serie A',
        'Bundesliga',
        'Champions League',
        'World Cup'
    ],

    // Telebirr
    TELEBIRR: {
        PHONE: '0972375899',
        SHORT_CODE: '972375',
        MIN_DEPOSIT: 50,
        MAX_DEPOSIT: 50000,
        MIN_WITHDRAWAL: 100,
        MAX_WITHDRAWAL: 25000
    },

    // Limits
    LIMITS: {
        MIN_BET: 10,
        MAX_BET: 100000,
        MIN_DEPOSIT: 50,
        MAX_DEPOSIT: 50000,
        MIN_WITHDRAWAL: 100,
        MAX_WITHDRAWAL: 25000
    }
};