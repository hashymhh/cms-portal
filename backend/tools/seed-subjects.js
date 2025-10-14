const connectToMongo = require('../database/db');
const Branch = require('../models/branch.model');
const Subject = require('../models/subject.model');
const Material = require('../models/material.model');

(async () => {
  try {
    await connectToMongo();
    console.log('Connected to DB for seeding');

    // Create branch
    let branch = await Branch.findOne({ name: 'Computer Science' });
    if (!branch) {
      branch = await Branch.create({ branchId: 'CSE', name: 'Computer Science' });
      console.log('Branch created:', branch._id);
    } else {
      console.log('Branch exists:', branch._id);
    }

    // Create subject
    let subject = await Subject.findOne({ code: 'CSE101' });
    if (!subject) {
      subject = await Subject.create({
        name: 'Introduction to Programming',
        code: 'CSE101',
        branch: branch._id,
        semester: 1,
        credits: 4,
      });
      console.log('Subject created:', subject._id);
    } else {
      console.log('Subject exists:', subject._id);
    }

    // Create a temporary faculty so material can reference it
    const Faculty = require('../models/details/faculty-details.model');
    let faculty = await Faculty.findOne({ email: 'tempfaculty@example.com' });
    if (!faculty) {
      faculty = await Faculty.create({
        employeeId: 999999,
        firstName: 'Temp',
        lastName: 'Faculty',
        email: 'tempfaculty@example.com',
        phone: '9999999999',
        profile: 'Faculty_Profile_123456.jpg',
        address: 'Address',
        city: 'City',
        state: 'State',
        pincode: '123456',
        country: 'Country',
        gender: 'male',
        dob: new Date(),
        designation: 'Lecturer',
        joiningDate: new Date(),
        salary: 1000,
        status: 'active',
        emergencyContact: { name: 'EC', relationship: 'Spouse', phone: '9999999999' },
        branchId: branch._id,
        password: 'faculty123',
      });
      console.log('Faculty created:', faculty._id);
    } else {
      console.log('Faculty exists:', faculty._id);
    }

    // Create a dummy material record referencing the faculty
    let material = await Material.findOne({ title: 'Intro Notes' });
    if (!material) {
      material = await Material.create({
        title: 'Intro Notes',
        subject: subject._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759557527811.jpg',
      });
      console.log('Material created:', material._id);
    } else {
      console.log('Material exists:', material._id);
    }

    console.log('Seeding finished');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
})();
