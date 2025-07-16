// Test handler berita yang sudah dimodifikasi
// Jalankan dengan: node test-berita-handler.js

const BASE_URL = 'http://localhost:8080';

async function testBeritaHandler() {
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

    // Test 1: GET /lihat/berita (List semua berita)
    console.log('\n📋 Test 1: GET /lihat/berita');
    const listResponse = await fetch(`${BASE_URL}/lihat/berita`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const listResult = await listResponse.json();
    console.log(`   Status: ${listResponse.status}`);
    console.log(`   Count: ${Array.isArray(listResult) ? listResult.length : 'Not array'} berita`);

    // Test 2: POST /tambah/berita (Tambah berita baru)
    console.log('\n➕ Test 2: POST /tambah/berita');
    const newBerita = {
      judul: 'Test Handler Berita Baru',
      konten: 'Ini adalah test untuk handler berita yang sudah dimodifikasi. Konten ini dibuat untuk memastikan handler berfungsi dengan baik.',
      kategori: 'artikel'
    };
    
    const createResponse = await fetch(`${BASE_URL}/tambah/berita`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBerita)
    });
    const createResult = await createResponse.json();
    console.log(`   Status: ${createResponse.status}`);
    console.log(`   Message: ${createResult.message}`);

    // Test 3: GET /lihat/berita lagi untuk lihat berita baru
    console.log('\n📋 Test 3: GET /lihat/berita (after create)');
    const listResponse2 = await fetch(`${BASE_URL}/lihat/berita`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const listResult2 = await listResponse2.json();
    console.log(`   Status: ${listResponse2.status}`);
    console.log(`   Count: ${Array.isArray(listResult2) ? listResult2.length : 'Not array'} berita`);
    
    if (Array.isArray(listResult2) && listResult2.length > 0) {
      const latestBerita = listResult2[0]; // Karena ORDER BY created_at DESC
      console.log(`   Latest: "${latestBerita.judul}" (ID: ${latestBerita.id})`);

      // Test 4: GET /lihat/berita/{id} (Detail berita)
      console.log('\n🔍 Test 4: GET /lihat/berita/{id}');
      const detailResponse = await fetch(`${BASE_URL}/lihat/berita/${latestBerita.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const detailResult = await detailResponse.json();
      console.log(`   Status: ${detailResponse.status}`);
      console.log(`   Title: ${detailResult.judul}`);
      console.log(`   Category: ${detailResult.kategori}`);

      // Test 5: PUT /edit/berita/{id} (Update berita)
      console.log('\n✏️  Test 5: PUT /edit/berita/{id}');
      const updateData = {
        judul: 'Test Handler Berita Baru (Updated)',
        konten: 'Konten ini sudah diupdate untuk testing handler berita.',
        kategori: 'pengumuman'
      };
      
      const updateResponse = await fetch(`${BASE_URL}/edit/berita/${latestBerita.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      const updateResult = await updateResponse.json();
      console.log(`   Status: ${updateResponse.status}`);
      console.log(`   Message: ${updateResult.message}`);

      // Test 6: GET /berita/kategori/{kategori} (Berita by kategori)
      console.log('\n🏷️  Test 6: GET /berita/kategori/pengumuman');
      const kategoriResponse = await fetch(`${BASE_URL}/berita/kategori/pengumuman`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kategoriResult = await kategoriResponse.json();
      console.log(`   Status: ${kategoriResponse.status}`);
      console.log(`   Count: ${Array.isArray(kategoriResult) ? kategoriResult.length : 'Not array'} pengumuman`);

      // Test 7: DELETE /hapus/berita/{id} (Hapus berita)
      console.log('\n🗑️  Test 7: DELETE /hapus/berita/{id}');
      const deleteResponse = await fetch(`${BASE_URL}/hapus/berita/${latestBerita.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const deleteResult = await deleteResponse.json();
      console.log(`   Status: ${deleteResponse.status}`);
      console.log(`   Message: ${deleteResult.message}`);
    }

    // Test 8: Validasi kategori (should fail)
    console.log('\n❌ Test 8: POST /tambah/berita (invalid kategori)');
    const invalidBerita = {
      judul: 'Test Invalid Kategori',
      konten: 'Test konten',
      kategori: 'invalid_kategori'
    };
    
    const invalidResponse = await fetch(`${BASE_URL}/tambah/berita`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invalidBerita)
    });
    const invalidResult = await invalidResponse.json();
    console.log(`   Status: ${invalidResponse.status} (should be 400)`);
    console.log(`   Message: ${invalidResult.message}`);

    console.log('\n✅ All tests completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBeritaHandler();
