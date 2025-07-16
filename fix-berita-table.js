// Script untuk fix tabel berita
// Jalankan dengan: node fix-berita-table.js

const mysql = require('mysql2/promise');

async function fixBeritaTable() {
  let connection;
  
  try {
    // Connect ke database desa_app (yang sudah kita temukan)
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'desa_app'
    });

    console.log('✅ Connected to database: desa_app');

    // Cek struktur tabel berita
    console.log('\n🔍 Checking berita table structure...');
    const [columns] = await connection.execute('DESCRIBE berita');
    
    console.log('📋 Current berita table columns:');
    console.table(columns.map(col => ({ 
      Field: col.Field, 
      Type: col.Type, 
      Null: col.Null, 
      Default: col.Default 
    })));

    // Cek apakah kolom created_at ada
    const hasCreatedAt = columns.some(col => col.Field === 'created_at');
    
    if (!hasCreatedAt) {
      console.log('\n❌ Column created_at not found');
      console.log('🔧 Adding created_at column...');
      
      await connection.execute(`
        ALTER TABLE berita 
        ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);
      
      console.log('✅ Added created_at column');
    } else {
      console.log('\n✅ Column created_at already exists');
    }

    // Update existing records yang created_at-nya NULL
    console.log('\n🔧 Updating NULL created_at values...');
    const [updateResult] = await connection.execute(`
      UPDATE berita 
      SET created_at = NOW() 
      WHERE created_at IS NULL
    `);
    
    console.log(`✅ Updated ${updateResult.affectedRows} records`);

    // Tampilkan data berita
    console.log('\n📋 Current berita data:');
    const [berita] = await connection.execute('SELECT id, judul, kategori, created_at FROM berita ORDER BY created_at DESC');
    
    if (berita.length > 0) {
      console.table(berita.map(b => ({
        id: b.id,
        judul: b.judul.substring(0, 30) + (b.judul.length > 30 ? '...' : ''),
        kategori: b.kategori,
        created_at: b.created_at
      })));
    } else {
      console.log('   No berita found');
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

fixBeritaTable();
