// Script untuk fix role admin
// Jalankan dengan: node fix-admin-role.js

const mysql = require('mysql2/promise');

async function fixAdminRole() {
  let connection;
  
  try {
    // Coba connect ke database test (yang berhasil sebelumnya)
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'test'
    });

    console.log('✅ Connected to database: test');

    // Cek apakah tabel users ada
    const [tables] = await connection.execute("SHOW TABLES LIKE 'users'");
    
    if (tables.length === 0) {
      console.log('❌ Table "users" not found in database "test"');
      console.log('💡 Creating users table...');
      
      // Buat tabel users
      await connection.execute(`
        CREATE TABLE users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('user', 'admin') DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      console.log('✅ Table "users" created successfully');
    }

    // Cek semua users dan update yang perlu jadi admin
    const [allUsers] = await connection.execute('SELECT * FROM users');
    console.log('👥 All users in database:');
    console.table(allUsers.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));

    // Update semua admin emails ke role admin
    const adminEmails = ['admin@desa.com', 'newadmin@desa.com'];

    for (const email of adminEmails) {
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length > 0) {
        const [updateResult] = await connection.execute(
          'UPDATE users SET role = ? WHERE email = ?',
          ['admin', email]
        );
        console.log(`✅ Updated ${email} to admin role (${updateResult.affectedRows} row(s))`);
      } else {
        console.log(`⚠️  User ${email} not found`);
      }
    }

    // Tampilkan hasil akhir
    const [finalUsers] = await connection.execute(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );

    console.log('👤 Final users after update:');
    console.table(finalUsers.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Tip: Check MySQL username/password');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Tip: Make sure MySQL server is running');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

fixAdminRole();
