// Script untuk mengupdate role admin di database
// Jalankan dengan: node update-admin.js

const mysql = require('mysql2/promise');

async function updateAdminRole() {
  let connection;
  
  try {
    // Konfigurasi database - coba beberapa nama database yang mungkin
    const possibleDatabases = ['test', 'desa_tuntungan', 'desa', 'backend'];

    for (const dbName of possibleDatabases) {
      try {
        connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '', // Kosongkan jika tidak ada password
          database: dbName
        });

        console.log(`✅ Connected to database: ${dbName}`);
        break;
      } catch (error) {
        console.log(`❌ Failed to connect to database: ${dbName}`);
        if (dbName === possibleDatabases[possibleDatabases.length - 1]) {
          throw error;
        }
      }
    }

    console.log('✅ Connected to database');

    // Update role admin
    const [updateResult] = await connection.execute(
      'UPDATE users SET role = ? WHERE email = ?',
      ['admin', 'admin@desa.com']
    );

    console.log(`📝 Updated ${updateResult.affectedRows} row(s)`);

    // Tampilkan hasil
    const [rows] = await connection.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE email = ?',
      ['admin@desa.com']
    );

    console.log('👤 Admin user info:');
    console.table(rows);

    // Tampilkan semua users
    const [allUsers] = await connection.execute(
      'SELECT id, name, email, role FROM users ORDER BY created_at DESC'
    );

    console.log('👥 All users:');
    console.table(allUsers);

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Tip: Check MySQL username/password');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Tip: Make sure MySQL server is running');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Tip: Database "desa_tuntungan" does not exist');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

updateAdminRole();
