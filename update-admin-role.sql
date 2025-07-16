-- Script untuk mengupdate role admin di database
-- Jalankan dengan: mysql -u root -p desa_tuntungan < update-admin-role.sql

USE desa_tuntungan;

-- Update role admin untuk user dengan email admin@desa.com
UPDATE users SET role = 'admin' WHERE email = 'admin@desa.com';

-- Tampilkan hasil update
SELECT id, name, email, role, created_at FROM users WHERE email = 'admin@desa.com';

-- Tampilkan semua users untuk verifikasi
SELECT id, name, email, role FROM users ORDER BY created_at DESC;
