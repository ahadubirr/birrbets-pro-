const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/birrbets', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const gameSchema = new mongoose.Schema({
    league: String,
    sport: { type: String, default: 'football' },
    homeTeam: String,
    awayTeam: String,
    startTime: Date,
    status: { type: String, default: 'upcoming' },
    odds: { home: Number, draw: Number, away: Number },
    score: { home: { type: Number, default: 0 }, away: { type: Number, default: 0 } },
    isLive: { type: Boolean, default: false }
});

const Game = mongoose.model('Game', gameSchema);

async function seed() {
    try {
        await Game.deleteMany({});
        console.log('✅ Cleared old games');

        const ethiopianTeams = [
            'Saint George', 'Ethiopian Coffee', 'Defence Force', 'Fasil Kenema',
            'Sidama Coffee', 'Wolkite City', 'Hawassa City', 'Bahir Dar City',
            'Adama City', 'Dire Dawa City', 'Jimma Aba Jifar', 'Welayta Dicha'
        ];

        const games = [];

        for (let i = 0; i < ethiopianTeams.length; i += 2) {
            games.push({
                league: 'Ethiopian Premier League',
                homeTeam: ethiopianTeams[i],
                awayTeam: ethiopianTeams[i + 1],
                startTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
                odds: {
                    home: parseFloat((1.5 + Math.random() * 3).toFixed(2)),
                    draw: parseFloat((2.5 + Math.random() * 2).toFixed(2)),
                    away: parseFloat((1.8 + Math.random() * 3).toFixed(2))
                }
            });
        }

        // Add live games
        for (let i = 0; i < 3; i++) {
            games.push({
                league: 'Ethiopian Premier League',
                homeTeam: ethiopianTeams[i * 2],
                awayTeam: ethiopianTeams[i * 2 + 1],
                startTime: new Date(Date.now() - 60 * 60 * 1000),
                status: 'live',
                isLive: true,
                odds: { home: 1.85, draw: 3.20, away: 4.50 },
                score: { home: Math.floor(Math.random() * 3), away: Math.floor(Math.random() * 3) }
            });
        }

        await Game.insertMany(games);
        console.log(`✅ Seeded ${games.length} games`);
        console.log('✅ Done!');
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error:', error);
        mongoose.connection.close();
    }
}

seed();