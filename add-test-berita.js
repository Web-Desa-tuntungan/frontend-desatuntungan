// Script untuk menambah berita test
// Jalankan dengan: node add-test-berita.js

const BASE_URL = 'http://localhost:8080';

async function addTestBerita() {
  try {
    // Login sebagai admin
    console.log('🔑 Logging in as admin...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newadmin@desa.com',
        password: 'admin123'
      })
    });
    
    const loginResult = await loginResponse.json();
    const token = loginResult.token;
    console.log('✅ Login successful');

    // Tambah berita test
    const testBerita = [
      {
        judul: 'Pengumuman Penting Desa Tuntungan',
        konten: 'Ini adalah pengumuman penting untuk seluruh warga Desa Tuntungan. Harap semua warga memperhatikan informasi ini dengan baik.',
        kategori: 'pengumuman'
      },
      {
        judul: 'Agenda Gotong Royong Minggu Depan',
        konten: 'Akan diadakan gotong royong bersama pada hari Minggu depan. Semua warga diharapkan dapat berpartisipasi.',
        kategori: 'agenda'
      },
      {
        judul: 'Artikel Tentang Pembangunan Desa',
        konten: 'Pembangunan infrastruktur desa terus berjalan dengan baik. Berikut adalah update terbaru mengenai progress pembangunan.',
        kategori: 'artikel'
      }
    ];

    for (const berita of testBerita) {
      console.log(`\n📝 Adding berita: ${berita.judul}`);
      
      const addResponse = await fetch(`${BASE_URL}/tambah/berita`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(berita)
      });
      
      const addResult = await addResponse.json();
      console.log(`   Status: ${addResponse.status}`);
      console.log(`   Response: ${addResult.message}`);
    }

    // Lihat hasil
    console.log('\n📰 Final berita list:');
    const beritaResponse = await fetch(`${BASE_URL}/lihat/berita`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const beritaResult = await beritaResponse.json();
    
    beritaResult.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.judul}`);
      console.log(`   Kategori: ${item.kategori}`);
      console.log(`   Tanggal: ${new Date(item.created_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      })}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addTestBerita();
