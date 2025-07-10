const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://neondb_owner:npg_De4n9bMudxLU@ep-royal-cherry-a8fkwz17-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected successfully!");
    await client.end();
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

testConnection();