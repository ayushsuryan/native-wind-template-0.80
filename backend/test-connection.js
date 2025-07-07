require('dotenv').config();
const { connectDB, pool } = require('./config/database');

async function testConnection() {
  console.log('🔍 Testing Supabase connection (Session Mode)...');
  console.log('===============================================');
  
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('💡 Make sure you have a .env file with DATABASE_URL set');
    process.exit(1);
  }
  
  // Parse connection string to show details (without password)
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log('🔗 Connection Details:');
    console.log(`   Host: ${url.hostname}`);
    console.log(`   Port: ${url.port}`);
    console.log(`   Database: ${url.pathname.slice(1)}`);
    console.log(`   Username: ${url.username}`);
    console.log(`   SSL: ${url.searchParams.get('sslmode') || 'enabled'}`);
    
    // Determine connection type
    if (url.port === '5432' && url.hostname.includes('pooler')) {
      console.log('📡 Connection Type: Supavisor Session Mode ✅');
    } else if (url.port === '6543' && url.hostname.includes('pooler')) {
      console.log('📡 Connection Type: Supavisor Transaction Mode');
      console.warn('⚠️  Consider using Session Mode (port 5432) for Node.js apps');
    } else if (url.hostname.includes('supabase.co')) {
      console.log('📡 Connection Type: Direct Connection');
    } else {
      console.log('📡 Connection Type: Unknown');
    }
  } catch (error) {
    console.error('❌ Invalid DATABASE_URL format:', error.message);
    process.exit(1);
  }
  
  console.log('\n🔌 Testing connection...');
  
  try {
    await connectDB();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    console.log('\n📊 Testing query execution...');
    const result = await pool.query('SELECT version(), current_database(), current_user');
    console.log('✅ Query successful!');
    console.log(`   PostgreSQL Version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    console.log(`   Database: ${result.rows[0].current_database}`);
    console.log(`   User: ${result.rows[0].current_user}`);
    
    // Test pool stats
    console.log('\n📈 Connection Pool Stats:');
    console.log(`   Total connections: ${pool.totalCount}`);
    console.log(`   Idle connections: ${pool.idleCount}`);
    console.log(`   Waiting clients: ${pool.waitingCount}`);
    
    console.log('\n🎉 All tests passed! Your Supabase connection is working perfectly.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    
    // Provide specific troubleshooting based on error
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Troubleshooting: Password Authentication Failed');
      console.log('   1. Check your password in the .env file');
      console.log('   2. Verify password in Supabase dashboard');
      console.log('   3. Make sure there are no extra spaces in the connection string');
    } else if (error.message.includes('ENETUNREACH') || error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Troubleshooting: Network Connection Failed');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify the Supabase hostname is correct');
      console.log('   3. Try using a different connection method (transaction mode)');
    } else if (error.message.includes('timeout')) {
      console.log('\n💡 Troubleshooting: Connection Timeout');
      console.log('   1. Check your network stability');
      console.log('   2. Try increasing connectionTimeoutMillis in database.js');
      console.log('   3. Verify your Supabase project is not paused');
    }
    
    console.error('\nFull error details:', error);
    process.exit(1);
  }
}

testConnection();