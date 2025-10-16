const connectToMongo = require("../database/db");
const Admin = require("../models/details/admin-details.model");
const Student = require("../models/details/student-details.model");
const Faculty = require("../models/details/faculty-details.model");
const Coordinator = require("../models/details/coordinator-details.model");

const listUsers = async () => {
  try {
    await connectToMongo();
    console.log("\n=== ADMIN USERS ===");
    const admins = await Admin.find({}).select("email employeeId firstName lastName");
    admins.forEach(a => console.log(`Email: ${a.email}, Employee ID: ${a.employeeId}, Name: ${a.firstName} ${a.lastName}`));

    console.log("\n=== STUDENT USERS ===");
    const students = await Student.find({}).select("email enrollmentNo firstName lastName semester");
    students.forEach(s => console.log(`Email: ${s.email}, Enrollment: ${s.enrollmentNo}, Name: ${s.firstName} ${s.lastName}, Semester: ${s.semester}`));

    console.log("\n=== FACULTY USERS ===");
    const faculty = await Faculty.find({}).select("email employeeId firstName lastName");
    faculty.forEach(f => console.log(`Email: ${f.email}, Employee ID: ${f.employeeId}, Name: ${f.firstName} ${f.lastName}`));

    console.log("\n=== COORDINATOR USERS ===");
    const coordinators = await Coordinator.find({}).select("email employeeId firstName lastName");
    coordinators.forEach(c => console.log(`Email: ${c.email}, Employee ID: ${c.employeeId}, Name: ${c.firstName} ${c.lastName}`));

    console.log("\n=== SUMMARY ===");
    console.log(`Total Admins: ${admins.length}`);
    console.log(`Total Students: ${students.length}`);
    console.log(`Total Faculty: ${faculty.length}`);
    console.log(`Total Coordinators: ${coordinators.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

listUsers();
