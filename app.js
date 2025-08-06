const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Hardcoded user ID
const HARDCODED_USER_ID = "Alex1203";

// Simulated flag store: level => flag string
const FLAG_STORE = {
    1: "FLAG{easy_flag_1}",
    2: "FLAG{level2_flag}",
    3: "FLAG{third_flag}",
    4: "FLAG{fourth_flag}",
    5: "FLAG{fifth_flag}",
    6: "FLAG{sixth_flag}",
    7: "FLAG{seventh_flag}",
    8: "FLAG{eighth_flag}",
    9: "FLAG{ninth_flag}",
    10: "FLAG{final_flag_10}"
};

// Simulated user progress: userId => currentLevel
const userProgress = {};
userProgress[HARDCODED_USER_ID] = 1;

// Get user's current level (always HARDCODED_USER_ID)
app.get('/getLevel', (req, res) => {
    const userId = HARDCODED_USER_ID;
    const level = userProgress[userId] || 1;
    res.json({ level });
});

// Submit a flag and level up (always HARDCODED_USER_ID)
app.post('/checkFlag', (req, res) => {
    const { flag } = req.body;
    const userId = HARDCODED_USER_ID;
    if (!flag) return res.status(400).json({ error: "flag required" });

    const currentLevel = userProgress[userId] || 1;
    const expectedFlag = FLAG_STORE[currentLevel];

    if (flag === expectedFlag) {
        userProgress[userId] = currentLevel + 1;
        return res.json({ correct: true, newLevel: userProgress[userId] });
    } else {
        return res.json({ correct: false, newLevel: currentLevel });
    }
});

// Optional: reset user (for testing, always HARDCODED_USER_ID)
app.post('/resetUser', (req, res) => {
    const userId = HARDCODED_USER_ID;
    userProgress[userId] = 1;
    res.json({ reset: true });
});

// Optional: register user (for testing, always HARDCODED_USER_ID)
app.post('/register', (req, res) => {
    const userId = HARDCODED_USER_ID;
    if (!userProgress[userId]) userProgress[userId] = 1;
    res.json({ registered: true, userId, level: 1 });
});

// Health check
app.get('/', (req, res) => {
    res.send("CTF Flag Checker Backend Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CTF backend running on port ${PORT}`);
});