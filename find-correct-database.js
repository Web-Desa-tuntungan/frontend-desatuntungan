// Script untuk mencari database yang benar
// Jalankan dengan: node find-correct-database.js

const mysql = require('mysql2/promise');

async function findCorrectDatabase() {
  let connection;
  
  try {
    // Connect tanpa specify database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    console.log('✅ Connected to MySQL server');

    // List semua database
    const [databases] = await connection.execute('SHOW DATABASES');
    console.log('\n📋 Available databases:');
    databases.forEach(db => console.log(`   - ${db.Database}`));

    // Cek setiap database untuk tabel users
    console.log('\n🔍 Checking for users table in each database:');
    
    for (const db of databases) {
      const dbName = db.Database;
      
      // Skip system databases
      if (['information_schema', 'performance_schema', 'mysql', 'sys'].includes(dbName)) {
        continue;
      }

      try {
        await connection.execute(`USE ${dbName}`);
        const [tables] = await connection.execute("SHOW TABLES LIKE 'users'");
        
        if (tables.length > 0) {
          console.log(`\n✅ Found users table in database: ${dbName}`);
          
          // Cek isi tabel users
          const [users] = await connection.execute('SELECT id, name, email, role FROM users');
          console.log(`   Users in ${dbName}:`);
          console.table(users);
          
          // Cek apakah ada admin emails
          const adminEmails = ['admin@desa.com', 'newadmin@desa.com'];
          for (const email of adminEmails) {
            const [adminUsers] = await connection.execute(
              'SELECT * FROM users WHERE email = ?',
              [email]
            );
            
            if (adminUsers.length > 0) {
              console.log(`\n🎯 Found ${email} in database: ${dbName}`);
              console.log(`   Current role: ${adminUsers[0].role}`);
              
              if (adminUsers[0].role !== 'admin') {
                console.log(`   💡 Need to update role to admin`);
                
                // Update role
                const [updateResult] = await connection.execute(
                  'UPDATE users SET role = ? WHERE email = ?',
                  ['admin', email]
                );
                
                console.log(`   ✅ Updated ${email} to admin role`);
              } else {
                console.log(`   ✅ Already admin`);
              }
            }
          }
        } else {
          console.log(`   ❌ No users table in ${dbName}`);
        }
      } catch (error) {
        console.log(`   ❌ Error checking ${dbName}: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

findCorrectDatabase();
