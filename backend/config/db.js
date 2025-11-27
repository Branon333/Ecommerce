import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[ERROR] MONGODB_URI is not defined. Set it in your .env file.');
    process.exit(1);
  }

  const options = {
    // These are commonly recommended options; mongoose will ignore unknown keys
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    family: 4,
  };

  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('\n[ERROR] Failed to connect to MongoDB:');
    console.error(error && error.message ? error.message : error);

    // Detect common DNS SRV lookup timeout/errors for mongodb+srv URIs
    if ((error && error.message && /queryTxt|SRV|ETIMEDOUT|ETIMEDOUT/i.test(error.message)) ||
        (error && error.code === 'ENOTFOUND') ) {
      console.error('\nPossible causes:');
      console.error('- Network/DNS issues preventing SRV/TXT DNS lookups for the MongoDB Atlas host.');
      console.error('- A corporate firewall or outbound rules blocking DNS (UDP/TCP port 53) or MongoDB traffic.');
      console.error('- Incorrect connection string (check for typos, ensure you used the provided URI from Atlas).');

      console.error('\nQuick troubleshooting steps (PowerShell):');
      console.error('1) Test DNS TXT/SRV resolution:');
      console.error('   Resolve-DnsName -Type TXT _mongodb._tcp.<your-atlas-host>');
      console.error('   Resolve-DnsName -Type SRV _mongodb._tcp.<your-atlas-host>');
      console.error('   Example: Resolve-DnsName -Type TXT _mongodb._tcp.cluster0.lssxkdu.mongodb.net');
      console.error('\n2) Use nslookup (Windows/macOS/Linux):');
      console.error('   nslookup -type=txt _mongodb._tcp.<your-atlas-host>');

      console.error('\nIf DNS lookups fail, check your internet connection, corporate VPN/firewall, or try from a different network.');
      console.error('As a temporary workaround you can use the standard `mongodb://` connection string with hostnames (not +srv),
or run the app from an environment that allows SRV DNS lookups.');
    }

    process.exit(1);
  }
};

export default connectDB;

