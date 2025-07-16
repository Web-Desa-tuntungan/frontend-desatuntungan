// Script untuk test semua endpoint backend
// Jalankan dengan: node test-backend-endpoints.js

const BASE_URL = 'http://localhost:8080';

async function testEndpoint(method, path, data = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    console.log(`\n🔍 Testing: ${method} ${path}`);
    
    const response = await fetch(`${BASE_URL}${path}`, options);
    const responseText = await response.text();
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${responseText.substring(0, 100)}${responseText.length > 100 ? '...' : ''}`);
    
    return { status: response.status, data: responseText };
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { error: error.message };
  }
}

async function testBackend() {
  console.log('🚀 Testing Backend Endpoints');
  console.log('=' .repeat(50));

  // Test basic connectivity
  await testEndpoint('GET', '/');

  // Test auth endpoints
  await testEndpoint('POST', '/auth/register', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123'
  });

  await testEndpoint('POST', '/auth/login', {
    email: 'test@example.com',
    password: 'test123'
  });

  // Test alternative auth endpoints (tanpa /auth prefix)
  await testEndpoint('POST', '/register', {
    name: 'Test User 2',
    email: 'test2@example.com',
    password: 'test123'
  });

  await testEndpoint('POST', '/login', {
    email: 'test2@example.com',
    password: 'test123'
  });

  // Test layanan endpoints (tanpa token dulu)
  await testEndpoint('GET', '/lihat/layanan');
  await testEndpoint('GET', '/layanan/user');
  await testEndpoint('POST', '/tambah/layanan', {
    jenis: 'surat',
    isi: 'Test permohonan'
  });

  // Test berita endpoints
  await testEndpoint('GET', '/lihat/berita');
  await testEndpoint('POST', '/tambah/berita', {
    judul: 'Test Berita',
    konten: 'Konten test',
    kategori: 'artikel'
  });

  console.log('\n✅ Testing completed!');
  console.log('\n💡 Tips:');
  console.log('- Jika semua endpoint return 404, routes belum terdaftar');
  console.log('- Jika auth endpoints tidak ada, tambahkan routes auth');
  console.log('- Jika JWT error, pastikan .env sudah di-load');
}

testBackend();
