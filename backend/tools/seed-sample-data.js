// Sample data seeder for all roles and sections
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/details/admin-details.model');
const Coordinator = require('../models/details/coordinator-details.model');
const Faculty = require('../models/details/faculty-details.model');
const Student = require('../models/details/student-details.model');
const Timetable = require('../models/timetable.model');
const Notice = require('../models/notice.model');
const Material = require('../models/material.model');
const Exam = require('../models/exam.model');
const Marks = require('../models/marks.model');
const Branch = require('../models/branch.model');
const Subject = require('../models/subject.model');

async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/College-Management-System', { useNewUrlParser: true, useUnifiedTopology: true });

  // Clear existing data
  await Promise.all([
    Admin.deleteMany({}), Coordinator.deleteMany({}), Faculty.deleteMany({}), Student.deleteMany({}),
    Timetable.deleteMany({}), Notice.deleteMany({}), Material.deleteMany({}), Exam.deleteMany({}),
    Marks.deleteMany({}), Branch.deleteMany({}), Subject.deleteMany({})
  ]);

  // Branches
  let branch, subject, admin, coordinator, faculty, student, exam;
  try {
    branch = await Branch.create({ name: 'Computer Science', code: 'CS', description: 'CS Branch' });
    console.log('Branch seeded');
  } catch (err) { console.error('Branch error:', err); }

  try {
    subject = await Subject.create({ name: 'Mathematics', code: 'MATH101', branch: branch._id, semester: 1 });
    console.log('Subject seeded');
  } catch (err) { console.error('Subject error:', err); }

  try {
    admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@demo.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      status: 'active'
    });
    console.log('Admin seeded');
  } catch (err) { console.error('Admin error:', err); }

  try {
    coordinator = await Coordinator.create({
      employeeId: 1001,
      firstName: 'Coord',
      lastName: 'Demo',
      email: 'coord@demo.com',
      phone: '9999999999',
      address: 'Demo Address',
      city: 'Demo City',
      state: 'Demo State',
      pincode: '123456',
      country: 'Demo Country',
      gender: 'male',
      dob: new Date('1990-01-01'),
      designation: 'Branch Coordinator',
      joiningDate: new Date('2020-01-01'),
      salary: 50000,
      status: 'active',
      branchId: branch._id,
      coordinatorType: 'academic',
      permissions: {
        canManageTimetables: true,
        canManageExams: true,
        canManageNotices: true,
        canManageMaterials: true,
        canViewReports: true
      },
      password: await bcrypt.hash('coord123', 10)
    });
    console.log('Coordinator seeded');
  } catch (err) { console.error('Coordinator error:', err); }

  try {
    faculty = await Faculty.create({
      employeeId: 2001,
      firstName: 'Fac',
      lastName: 'Demo',
      email: 'fac@demo.com',
      phone: '8888888888',
      address: 'Demo Address',
      city: 'Demo City',
      state: 'Demo State',
      pincode: '654321',
      country: 'Demo Country',
      gender: 'female',
      dob: new Date('1985-05-05'),
      designation: 'Professor',
      joiningDate: new Date('2015-05-05'),
      salary: 60000,
      status: 'active',
      branchId: branch._id,
      password: await bcrypt.hash('fac123', 10)
    });
    console.log('Faculty seeded');
  } catch (err) { console.error('Faculty error:', err); }

  try {
    student = await Student.create({
      enrollmentNo: 3001,
      firstName: 'Stu',
      middleName: 'Demo',
      lastName: 'Demo',
      email: 'stu@demo.com',
      phone: '7777777777',
      semester: 1,
      branchId: branch._id,
      gender: 'other',
      dob: new Date('2002-02-02'),
      address: 'Demo Address',
      city: 'Demo City',
      state: 'Demo State',
      pincode: '111111',
      country: 'Demo Country',
      status: 'active',
      password: await bcrypt.hash('stu123', 10)
    });
    console.log('Student seeded');
  } catch (err) { console.error('Student error:', err); }

  // Timetable
  try {
    await Timetable.create({
      semester: 1,
      branch: branch._id,
      gridData: [{ day: 'Monday', time: '9:00-10:00', subject: subject._id, faculty: faculty._id, room: '101' }],
      isGrid: true
    });
    console.log('Timetable seeded');
  } catch (err) { console.error('Timetable error:', err); }

  // Notice
  try {
    await Notice.create({
      title: 'Welcome Notice',
      description: 'Welcome to the portal!',
      type: 'student',
      branch: branch._id,
      createdBy: admin._id
    });
    console.log('Notice seeded');
  } catch (err) { console.error('Notice error:', err); }

  // Material
  try {
    await Material.create({
      title: 'Math Notes',
      subject: subject._id,
      faculty: faculty._id,
      file: 'math_notes.pdf',
      semester: 1,
      branch: branch._id,
      type: 'notes'
    });
    console.log('Material seeded');
  } catch (err) { console.error('Material error:', err); }

  // Exam
  try {
    exam = await Exam.create({
      name: 'Midterm',
      date: new Date(),
      semester: 1,
      examType: 'mid',
      timetableLink: 'http://localhost:3000/timetable',
      totalMarks: 100
    });
    console.log('Exam seeded');
  } catch (err) { console.error('Exam error:', err); }

  // Marks
  try {
    await Marks.create({
      studentId: student._id,
      subjectId: subject._id,
      marksObtained: 85,
      semester: 1,
      examId: exam._id
    });
    console.log('Marks seeded');
  } catch (err) { console.error('Marks error:', err); }

  console.log('Sample data seeded!');
  mongoose.disconnect();
}

seed();