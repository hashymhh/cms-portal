const connectToMongo = require("../database/db");
const Admin = require("../models/details/admin-details.model");
const Student = require("../models/details/student-details.model");
const Faculty = require("../models/details/faculty-details.model");
const Coordinator = require("../models/details/coordinator-details.model");
const Branch = require("../models/branch.model");
const Subject = require("../models/subject.model");
const Timetable = require("../models/timetable.model");
const Material = require("../models/material.model");
const Notice = require("../models/notice.model");
const Exam = require("../models/exam.model");
const Marks = require("../models/marks.model");

const verifyData = async () => {
  try {
    await connectToMongo();
    console.log("\n========================================");
    console.log("   COMPREHENSIVE DATA VERIFICATION");
    console.log("========================================\n");

    // Count all data
    const adminCount = await Admin.countDocuments();
    const studentCount = await Student.countDocuments();
    const facultyCount = await Faculty.countDocuments();
    const coordinatorCount = await Coordinator.countDocuments();
    const branchCount = await Branch.countDocuments();
    const subjectCount = await Subject.countDocuments();
    const timetableCount = await Timetable.countDocuments();
    const materialCount = await Material.countDocuments();
    const noticeCount = await Notice.countDocuments();
    const examCount = await Exam.countDocuments();
    const marksCount = await Marks.countDocuments();

    console.log("📊 USER ACCOUNTS:");
    console.log(`   ✅ Admins: ${adminCount}`);
    console.log(`   ✅ Students: ${studentCount}`);
    console.log(`   ✅ Faculty: ${facultyCount}`);
    console.log(`   ✅ Coordinators: ${coordinatorCount}`);
    
    console.log("\n📚 ACADEMIC DATA:");
    console.log(`   ✅ Branches: ${branchCount}`);
    console.log(`   ✅ Subjects: ${subjectCount}`);
    console.log(`   ✅ Timetables: ${timetableCount}`);
    console.log(`   ✅ Materials: ${materialCount}`);
    console.log(`   ✅ Notices: ${noticeCount}`);
    console.log(`   ✅ Exams: ${examCount}`);
    console.log(`   ✅ Marks: ${marksCount}`);

    // Detailed breakdown
    console.log("\n📖 MATERIALS BREAKDOWN:");
    const materialsByType = await Material.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    materialsByType.forEach(m => {
      console.log(`   • ${m._id}: ${m.count}`);
    });

    console.log("\n📋 MATERIALS BY SEMESTER:");
    const materialsBySemester = await Material.aggregate([
      { $group: { _id: "$semester", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    materialsBySemester.forEach(m => {
      console.log(`   • Semester ${m._id}: ${m.count} materials`);
    });

    console.log("\n📢 NOTICES BREAKDOWN:");
    const noticesByType = await Notice.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);
    noticesByType.forEach(n => {
      console.log(`   • ${n._id}: ${n.count}`);
    });

    console.log("\n📝 EXAMS BY SEMESTER:");
    const examsBySemester = await Exam.aggregate([
      { $group: { _id: "$semester", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    examsBySemester.forEach(e => {
      console.log(`   • Semester ${e._id}: ${e.count} exams`);
    });

    console.log("\n👥 STUDENTS BY SEMESTER:");
    const studentsBySemester = await Student.aggregate([
      { $group: { _id: "$semester", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    studentsBySemester.forEach(s => {
      console.log(`   • Semester ${s._id}: ${s.count} students`);
    });

    console.log("\n📊 MARKS STATISTICS:");
    const marksStats = await Marks.aggregate([
      {
        $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          avgMarks: { $avg: "$marksObtained" },
          maxMarks: { $max: "$marksObtained" },
          minMarks: { $min: "$marksObtained" }
        }
      }
    ]);
    if (marksStats.length > 0) {
      console.log(`   • Total Entries: ${marksStats[0].totalEntries}`);
      console.log(`   • Average Marks: ${marksStats[0].avgMarks.toFixed(2)}`);
      console.log(`   • Highest Marks: ${marksStats[0].maxMarks}`);
      console.log(`   • Lowest Marks: ${marksStats[0].minMarks}`);
    }

    console.log("\n🎯 SUBJECTS BY SEMESTER:");
    const subjectsBySemester = await Subject.aggregate([
      { $group: { _id: "$semester", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    subjectsBySemester.forEach(s => {
      console.log(`   • Semester ${s._id}: ${s.count} subjects`);
    });

    // Check for empty sections
    console.log("\n⚠️  EMPTY SECTIONS CHECK:");
    let hasEmptySections = false;

    if (studentCount === 0) {
      console.log("   ❌ No students found!");
      hasEmptySections = true;
    }
    if (materialCount === 0) {
      console.log("   ❌ No materials found!");
      hasEmptySections = true;
    }
    if (noticeCount === 0) {
      console.log("   ❌ No notices found!");
      hasEmptySections = true;
    }
    if (examCount === 0) {
      console.log("   ❌ No exams found!");
      hasEmptySections = true;
    }
    if (marksCount === 0) {
      console.log("   ❌ No marks found!");
      hasEmptySections = true;
    }
    if (timetableCount === 0) {
      console.log("   ❌ No timetables found!");
      hasEmptySections = true;
    }

    if (!hasEmptySections) {
      console.log("   ✅ All sections have data!");
    }

    console.log("\n========================================");
    console.log("   VERIFICATION COMPLETE");
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

verifyData();
