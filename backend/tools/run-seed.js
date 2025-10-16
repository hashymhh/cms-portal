const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const connectToMongo = require('../database/db');

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectToMongo();
    console.log('Connected. Running startup seed...');
    const seed = require('./startup-seed');
    await seed();
    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
})();
