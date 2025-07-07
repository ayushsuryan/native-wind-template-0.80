# Supabase Connection Methods for Node.js

## Current Configuration: Supavisor Session Mode ✅

Your app is now configured to use **Supavisor Session Mode**, which is the optimal choice for Node.js backend applications.

## Connection Methods Comparison

| Method | Port | Use Case | IPv4/IPv6 | Prepared Statements |
|--------|------|----------|-----------|-------------------|
| **Session Mode** ✅ | 5432 | Persistent backends (Node.js apps) | Both | ✅ Yes |
| Transaction Mode | 6543 | Serverless/Edge functions | Both | ❌ No |
| Direct Connection | 5432 | Persistent servers (IPv6 only) | IPv6 only | ✅ Yes |
| Shared Pooler | Varies | General purpose | Both | ✅ Yes |

## Why Session Mode is Best for Node.js:

1. **🔄 Persistent Connections**: Designed for long-running applications like Node.js servers
2. **⚡ Better Performance**: Maintains connection state between queries
3. **🛡️ Prepared Statements**: Supports prepared statements for better security and performance
4. **🌐 Network Flexibility**: Works with both IPv4 and IPv6
5. **💰 Cost Effective**: Free tier included with all Supabase projects

## Your Current Connection String Format:
```
postgresql://postgres.{ref}:[YOUR-PASSWORD]@aws-0-{region}.pooler.supabase.com:5432/postgres
```

## Alternative Connection Methods (if needed):

### For Serverless Functions (Vercel, Netlify, etc.):
```env
# Transaction Mode - Port 6543
DATABASE_URL="postgresql://postgres.bktjhuocucaqondzkfsw:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
```

### For Direct Connection (if you have IPv6 support):
```env
# Direct Connection - Port 5432 (IPv6 only)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.bktjhuocucaqondzkfsw.supabase.co:5432/postgres"
```

## Connection Pool Settings Optimized for Session Mode:

- **max: 20** - Maximum connections in pool
- **min: 2** - Minimum connections maintained
- **SSL: Required** - Always use SSL with Supabase
- **Timeouts: Increased** - Better reliability for session mode

## Testing Your Connection:

Run the test script:
```bash
node test-connection.js
```

## Common Issues & Solutions:

### 1. IPv6 Connectivity Issues
- ✅ **Solved**: Session mode supports both IPv4 and IPv6

### 2. "Connection Refused" 
- Check your password is correct in .env
- Ensure your Supabase project is not paused

### 3. "Authentication Failed"
- Verify password in Supabase dashboard
- Check for special characters in password (URL encode if needed)

### 4. Timeout Issues
- Session mode has longer timeouts configured
- Check your network connectivity to AWS regions