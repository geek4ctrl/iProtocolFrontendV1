#!/usr/bin/env node

/**
 * Environment Variables Checker
 * Run this script to verify your .env.local setup
 * 
 * Usage: node check-env.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Environment Configuration...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file NOT FOUND');
    console.log('📝 Creating .env.local from .env.example...\n');
    
    if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ .env.local created!');
        console.log('⚠️  Please edit .env.local and add your Supabase credentials\n');
    } else {
        console.log('❌ .env.example not found either!');
        console.log('Creating a basic .env.local file...\n');
        
        const basicEnv = `# Supabase Configuration
# Get these values from https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
`;
        fs.writeFileSync(envPath, basicEnv);
        console.log('✅ Basic .env.local created!');
        console.log('⚠️  Please edit .env.local and add your Supabase credentials\n');
    }
} else {
    console.log('✅ .env.local file exists\n');
    
    // Read and parse the file
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    let hasUrl = false;
    let hasKey = false;
    let urlValue = '';
    let keyValue = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            if (trimmed.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
                hasUrl = true;
                urlValue = trimmed.split('=')[1];
            }
            if (trimmed.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
                hasKey = true;
                keyValue = trimmed.split('=')[1];
            }
        }
    });
    
    console.log('Environment Variables Status:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Check URL
    if (hasUrl) {
        if (urlValue && urlValue !== 'your-project-url.supabase.co' && urlValue.includes('.supabase.co')) {
            console.log('✅ NEXT_PUBLIC_SUPABASE_URL: Set correctly');
            console.log(`   ${urlValue}`);
        } else {
            console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL: Set but needs updating');
            console.log(`   Current value: ${urlValue}`);
            console.log('   Expected format: https://xxxxx.supabase.co');
        }
    } else {
        console.log('❌ NEXT_PUBLIC_SUPABASE_URL: NOT SET');
    }
    
    console.log('');
    
    // Check Key
    if (hasKey) {
        if (keyValue && keyValue !== 'your-anon-key-here' && keyValue.length > 50) {
            console.log('✅ NEXT_PUBLIC_SUPABASE_ANON_KEY: Set correctly');
            console.log(`   ${keyValue.substring(0, 20)}...`);
        } else {
            console.log('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY: Set but needs updating');
            console.log('   Expected: A long string (100+ characters)');
        }
    } else {
        console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY: NOT SET');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    if (!hasUrl || !hasKey || urlValue.includes('your-project') || keyValue.includes('your-anon')) {
        console.log('📋 How to get your credentials:');
        console.log('1. Go to https://app.supabase.com');
        console.log('2. Select your project');
        console.log('3. Go to Settings → API');
        console.log('4. Copy the Project URL and anon/public key');
        console.log('5. Update .env.local with these values\n');
        console.log('⚠️  Remember to restart your dev server after updating!\n');
    } else {
        console.log('🎉 All environment variables are set!\n');
        console.log('Next steps:');
        console.log('1. Run: npm run dev');
        console.log('2. Visit: http://localhost:3000/debug');
        console.log('3. Check if database tables exist\n');
    }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('For more help, see: DATABASE_SETUP.md');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
