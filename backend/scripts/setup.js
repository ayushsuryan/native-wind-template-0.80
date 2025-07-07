#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Backend API Setup Script');
console.log('=====================================\n');

const setupEnvironment = async () => {
  try {
    console.log('Let\'s configure your environment variables:\n');

    // Check if .env already exists
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env file already exists. Backing up as .env.backup');
      fs.copyFileSync(envPath, envPath + '.backup');
    }

    const questions = [
      {
        key: 'DATABASE_URL',
        question: 'Enter your Supabase PostgreSQL URL: ',
        default: 'postgresql://username:password@hostname:port/database'
      },
      {
        key: 'JWT_SECRET',
        question: 'Enter a secure JWT secret (or press Enter for auto-generated): ',
        default: () => require('crypto').randomBytes(64).toString('hex')
      },
      {
        key: 'PORT',
        question: 'Enter server port (default 5000): ',
        default: '5000'
      },
      {
        key: 'CLIENT_URL',
        question: 'Enter your frontend URL (default http://localhost:3000): ',
        default: 'http://localhost:3000'
      }
    ];

    const config = {
      NODE_ENV: 'development',
      JWT_EXPIRES_IN: '7d'
    };

    for (const q of questions) {
      const answer = await askQuestion(q.question);
      config[q.key] = answer.trim() || (typeof q.default === 'function' ? q.default() : q.default);
    }

    // Write .env file
    const envContent = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log('📄 Configuration saved to .env');

    console.log('\n🔧 Next steps:');
    console.log('1. Make sure your PostgreSQL database is accessible');
    console.log('2. Run: npm run dev');
    console.log('3. Test the API at: http://localhost:' + config.PORT + '/health');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
};

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

// Run setup if called directly
if (require.main === module) {
  setupEnvironment();
}

module.exports = { setupEnvironment };