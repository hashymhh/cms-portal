const connectToMongo = require("../database/db");
const Admin = require("../models/details/admin-details.model");
const bcrypt = require("bcryptjs");

const testLogin = async () => {
  try {
    await connectToMongo();
    
    const testEmail = "admin@gmail.com";
    const testPassword = "admin123";
    
    console.log(`\n=== Testing Login for ${testEmail} ===`);
    
    const user = await Admin.findOne({ email: testEmail });
    
    if (!user) {
      console.log("❌ User not found in database");
      process.exit(1);
    }
    
    console.log(`✅ User found: ${user.firstName} ${user.lastName}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Stored password hash: ${user.password.substring(0, 20)}...`);
    
    // Test password comparison
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    
    if (isPasswordValid) {
      console.log(`✅ Password verification: SUCCESS`);
      console.log(`✅ Login should work with: email="${testEmail}", password="${testPassword}"`);
    } else {
      console.log(`❌ Password verification: FAILED`);
      console.log(`❌ Stored hash does not match password "${testPassword}"`);
      
      // Try to check if password is plain text
      if (user.password === testPassword) {
        console.log(`⚠️  Password is stored as PLAIN TEXT - this is a security issue!`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

testLogin();
