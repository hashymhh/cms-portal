const adminDetails = require('../models/details/admin-details.model');
const Branch = require('../models/branch.model');
const Subject = require('../models/subject.model');
const Faculty = require('../models/details/faculty-details.model');
const Material = require('../models/material.model');
const coordinatorDetails = require('../models/details/coordinator-details.model');

const seedInitialData = async () => {

  try {
    // --- Admin, Branch, Subject, Faculty (original seed) ---
    const existingAdmin = await adminDetails.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      await adminDetails.create({
        employeeId: 123456,
        firstName: 'Sundar',
        middleName: 'R',
        lastName: 'Pichai',
        email: 'admin@gmail.com',
        phone: '1234567890',
        profile: 'Faculty_Profile_123456.jpg',
        address: '123 College Street',
        city: 'College City',
        state: 'State',
        pincode: '123456',
        country: 'India',
        gender: 'male',
        dob: new Date('1990-01-01'),
        designation: 'System Administrator',
        joiningDate: new Date(),
        salary: 50000,
        status: 'active',
        isSuperAdmin: true,
        emergencyContact: { name: 'Emergency Contact', relationship: 'Spouse', phone: '9876543210' },
        bloodGroup: 'O+',
        password: 'admin123',
      });
      console.log('Startup seed: Admin created');
    } else {
      console.log('Startup seed: Admin exists');
    }

    let branch = await Branch.findOne({ name: 'Computer Science' });
    if (!branch) {
      branch = await Branch.create({ branchId: 'CSE', name: 'Computer Science' });
      console.log('Startup seed: Branch created');
    } else {
      console.log('Startup seed: Branch exists');
    }

    let subject = await Subject.findOne({ code: 'CSE101' });
    if (!subject) {
      subject = await Subject.create({
        name: 'Introduction to Programming',
        code: 'CSE101',
        branch: branch._id,
        semester: 1,
        credits: 4,
      });
      console.log('Startup seed: Subject created');
    } else {
      console.log('Startup seed: Subject exists');
    }

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
      console.log('Startup seed: Faculty created');
    } else {
      console.log('Startup seed: Faculty exists');
    }

    // Add two more sample faculty
    let faculty2 = await Faculty.findOne({ email: 'fatima.faculty@example.com' });
    if (!faculty2) {
      faculty2 = await Faculty.create({
        employeeId: 888888,
        firstName: 'Fatima',
        lastName: 'Shah',
        email: 'fatima.faculty@example.com',
        phone: '8888888888',
        profile: 'Faculty_Profile_123456.jpg',
        address: 'Faculty Street',
        city: 'City',
        state: 'State',
        pincode: '123456',
        country: 'Pakistan',
        gender: 'female',
        dob: new Date('1982-05-10'),
        designation: 'Senior Lecturer',
        joiningDate: new Date(),
        salary: 20000,
        status: 'active',
        emergencyContact: { name: 'EC', relationship: 'Spouse', phone: '8888888899' },
        branchId: branch._id,
        password: 'faculty123'
      });
      console.log('Startup seed: Faculty2 created');
    }
    let faculty3 = await Faculty.findOne({ email: 'zeeshan.faculty@example.com' });
    if (!faculty3) {
      faculty3 = await Faculty.create({
        employeeId: 777777,
        firstName: 'Zeeshan',
        lastName: 'Khan',
        email: 'zeeshan.faculty@example.com',
        phone: '7777777777',
        profile: 'Faculty_Profile_123456.jpg',
        address: 'Faculty Avenue',
        city: 'City',
        state: 'State',
        pincode: '123456',
        country: 'Pakistan',
        gender: 'male',
        dob: new Date('1980-09-20'),
        designation: 'Assistant Professor',
        joiningDate: new Date(),
        salary: 25000,
        status: 'active',
        emergencyContact: { name: 'EC', relationship: 'Spouse', phone: '7777777799' },
        branchId: branch._id,
        password: 'faculty123'
      });
      console.log('Startup seed: Faculty3 created');
    }

  // Create sample coordinators
    let coordinator = await coordinatorDetails.findOne({ email: 'coordinator@example.com' });
    if (!coordinator) {
      coordinator = await coordinatorDetails.create({
        employeeId: 555555,
        firstName: 'Ahmed',
        lastName: 'Coordinator',
        email: 'coordinator@example.com',
        phone: '5555555555',
        profile: 'Faculty_Profile_123456.jpg',
        address: '456 Coordinator Street',
        city: 'College City',
        state: 'State',
        pincode: '123456',
        country: 'Pakistan',
        gender: 'male',
        dob: new Date('1985-06-15'),
        designation: 'Academic Coordinator',
        joiningDate: new Date(),
        salary: 35000,
        status: 'active',
        branchId: branch._id,
        coordinatorType: 'academic',
        permissions: {
          canManageTimetables: true,
          canManageExams: true,
          canManageNotices: true,
          canManageMaterials: true,
          canViewReports: true,
        },
        emergencyContact: { name: 'Coordinator Emergency', relationship: 'Spouse', phone: '5555555556' },
        bloodGroup: 'A+',
        password: 'coordinator123',
      });
      console.log('Startup seed: Coordinator created');
    } else {
      console.log('Startup seed: Coordinator exists');
    }

    // Additional coordinators for other types
    const extraCoordinators = [
      {
        employeeId: 555556,
        firstName: 'Sara', lastName: 'Exam',
        email: 'exam.coordinator@example.com', phone: '5555555556',
        coordinatorType: 'exam',
        permissions: {
          canManageTimetables: false,
          canManageExams: true,
          canManageNotices: true,
          canManageMaterials: false,
          canViewReports: true,
        }
      },
      {
        employeeId: 555557,
        firstName: 'Zeeshan', lastName: 'Placement',
        email: 'placement.coordinator@example.com', phone: '5555555557',
        coordinatorType: 'placement',
        permissions: {
          canManageTimetables: false,
          canManageExams: false,
          canManageNotices: true,
          canManageMaterials: true,
          canViewReports: true,
        }
      },
      {
        employeeId: 555558,
        firstName: 'Nadia', lastName: 'Event',
        email: 'event.coordinator@example.com', phone: '5555555558',
        coordinatorType: 'event',
        permissions: {
          canManageTimetables: true,
          canManageExams: false,
          canManageNotices: true,
          canManageMaterials: true,
          canViewReports: false,
        }
      }
    ];
    for (const ec of extraCoordinators) {
      const exists = await coordinatorDetails.findOne({ email: ec.email });
      if (!exists) {
        await coordinatorDetails.create({
          employeeId: ec.employeeId,
          firstName: ec.firstName,
          lastName: ec.lastName,
          email: ec.email,
          phone: ec.phone,
          profile: 'Faculty_Profile_123456.jpg',
          address: '123 College Street', city: 'College City', state: 'State', pincode: '123456', country: 'Pakistan',
          gender: 'female', dob: new Date('1988-01-01'), designation: 'Coordinator', joiningDate: new Date(), salary: 30000,
          status: 'active', branchId: branch._id, coordinatorType: ec.coordinatorType, permissions: ec.permissions,
          emergencyContact: { name: 'EC', relationship: 'Spouse', phone: '5555555599' }, bloodGroup: 'B+', password: 'coordinator123'
        });
      }
    }

    // --- SHOWCASE DATA: Pakistani Students, Timetable, Exams, Marks, Materials, Notices ---
    const Student = require('../models/details/student-details.model');
    const Timetable = require('../models/timetable.model');
    const Exam = require('../models/exam.model');
    const Marks = require('../models/marks.model');
    const Notice = require('../models/notice.model');

    // Remove old showcase students (by email domain)
    await Student.deleteMany({ email: /@pakstudent\.pk$/ });

    // Sample Pakistani student data (with hashed passwords) - EXPANDED
    const bcrypt = require('bcryptjs');
    const pakStudentsRaw = [
      // Semester 1 Students
      {
        enrollmentNo: 2023001,
        firstName: 'Ayesha', middleName: 'Khan', lastName: 'Malik',
        email: 'ayesha.khan@pakstudent.pk', phone: '03001234567',
        semester: 1, branchId: branch._id, gender: 'female',
        dob: new Date('2003-03-15'), address: 'House 12, Gulshan-e-Iqbal', city: 'Karachi', state: 'Sindh', pincode: '75300', country: 'Pakistan',
        profile: '1759557527811.jpg', status: 'active', bloodGroup: 'B+', emergencyContact: { name: 'Fatima Khan', relationship: 'Mother', phone: '03007654321' }, password: 'student123'
      },
      {
        enrollmentNo: 2023002,
        firstName: 'Bilal', middleName: 'Ahmed', lastName: 'Sheikh',
        email: 'bilal.ahmed@pakstudent.pk', phone: '03111234567',
        semester: 1, branchId: branch._id, gender: 'male',
        dob: new Date('2002-11-22'), address: 'Block C, Model Town', city: 'Lahore', state: 'Punjab', pincode: '54000', country: 'Pakistan',
        profile: '1759557616515.jpg', status: 'active', bloodGroup: 'A+', emergencyContact: { name: 'Imran Sheikh', relationship: 'Father', phone: '03117654321' }, password: 'student123'
      },
      {
        enrollmentNo: 2023003,
        firstName: 'Sana', middleName: 'Riaz', lastName: 'Ali',
        email: 'sana.riaz@pakstudent.pk', phone: '03211234567',
        semester: 1, branchId: branch._id, gender: 'female',
        dob: new Date('2003-07-09'), address: 'Street 8, Satellite Town', city: 'Rawalpindi', state: 'Punjab', pincode: '46000', country: 'Pakistan',
        profile: '1759560454545.jpg', status: 'active', bloodGroup: 'O-', emergencyContact: { name: 'Riaz Ali', relationship: 'Father', phone: '03217654321' }, password: 'student123'
      },
      {
        enrollmentNo: 2023004,
        firstName: 'Hassan', middleName: 'Ali', lastName: 'Raza',
        email: 'hassan.raza@pakstudent.pk', phone: '03321234567',
        semester: 1, branchId: branch._id, gender: 'male',
        dob: new Date('2003-01-28'), address: 'Phase 4, DHA', city: 'Islamabad', state: 'ICT', pincode: '44000', country: 'Pakistan',
        profile: '1759597197642.jpg', status: 'active', bloodGroup: 'AB+', emergencyContact: { name: 'Ali Raza', relationship: 'Father', phone: '03327654321' }, password: 'student123'
      },
      {
        enrollmentNo: 2023005,
        firstName: 'Zainab', middleName: 'Fatima', lastName: 'Hussain',
        email: 'zainab.hussain@pakstudent.pk', phone: '03451234567',
        semester: 1, branchId: branch._id, gender: 'female',
        dob: new Date('2003-05-12'), address: 'Nazimabad Block 2', city: 'Karachi', state: 'Sindh', pincode: '74600', country: 'Pakistan',
        profile: '1759597905991.jpg', status: 'active', bloodGroup: 'O+', emergencyContact: { name: 'Hussain Ali', relationship: 'Father', phone: '03457654321' }, password: 'student123'
      },
      // Semester 3 Students
      {
        enrollmentNo: 2022010,
        firstName: 'Omar', middleName: 'Tariq', lastName: 'Khan',
        email: 'omar.khan@pakstudent.pk', phone: '03011234567',
        semester: 3, branchId: branch._id, gender: 'male',
        dob: new Date('2002-08-15'), address: 'University Road', city: 'Peshawar', state: 'KPK', pincode: '25000', country: 'Pakistan',
        profile: '1759599654974.jpg', status: 'active', bloodGroup: 'A-', emergencyContact: { name: 'Tariq Khan', relationship: 'Father', phone: '03017654321' }, password: 'student123'
      },
      {
        enrollmentNo: 2022011,
        firstName: 'Fatima', middleName: 'Noor', lastName: 'Ahmad',
        email: 'fatima.ahmad@pakstudent.pk', phone: '03121234567',
        semester: 3, branchId: branch._id, gender: 'female',
        dob: new Date('2002-04-03'), address: 'Johar Town', city: 'Lahore', state: 'Punjab', pincode: '54000', country: 'Pakistan',
        profile: '1759736468300.jpg', status: 'active', bloodGroup: 'B-', emergencyContact: { name: 'Noor Ahmad', relationship: 'Father', phone: '03127654321' }, password: 'student123'
      },
      // Semester 5 Students
      {
        enrollmentNo: 2021020,
        firstName: 'Ali', middleName: 'Hassan', lastName: 'Butt',
        email: 'ali.butt@pakstudent.pk', phone: '03231234567',
        semester: 5, branchId: branch._id, gender: 'male',
        dob: new Date('2001-12-10'), address: 'Cantt Area', city: 'Multan', state: 'Punjab', pincode: '60000', country: 'Pakistan',
        profile: '1759740397609.jpg', status: 'active', bloodGroup: 'AB-', emergencyContact: { name: 'Hassan Butt', relationship: 'Father', phone: '03237654321' }, password: 'student123'
      }
    ];
    // Hash passwords before insertMany
    const pakStudents = await Promise.all(
      pakStudentsRaw.map(async (s) => ({ ...s, password: await bcrypt.hash(s.password, 10) }))
    );
    const createdStudents = await Student.insertMany(pakStudents);

  // Create Additional Subjects for Different Semesters
    const subjects = [];
    const subjectData = [
      { name: 'Programming Fundamentals', code: 'CSE101', semester: 1, credits: 4 },
      { name: 'Mathematics I', code: 'MATH101', semester: 1, credits: 3 },
      { name: 'Physics', code: 'PHY101', semester: 1, credits: 3 },
      { name: 'English Composition', code: 'ENG101', semester: 1, credits: 2 },
  { name: 'Islamic Studies', code: 'ISL101', semester: 1, credits: 2 },
      
      { name: 'Data Structures', code: 'CSE201', semester: 3, credits: 4 },
      { name: 'Database Systems', code: 'CSE202', semester: 3, credits: 4 },
      { name: 'Web Development', code: 'CSE203', semester: 3, credits: 3 },
      { name: 'Software Engineering', code: 'CSE204', semester: 3, credits: 3 },
      
      { name: 'Algorithms', code: 'CSE301', semester: 5, credits: 4 },
      { name: 'Machine Learning', code: 'CSE302', semester: 5, credits: 4 },
      { name: 'Network Security', code: 'CSE303', semester: 5, credits: 3 },
      { name: 'Mobile App Development', code: 'CSE304', semester: 5, credits: 3 }
    ];

    for (const subData of subjectData) {
      const existingSubject = await Subject.findOne({ code: subData.code });
      if (!existingSubject) {
        const newSubject = await Subject.create({
          ...subData,
          branch: branch._id
        });
        subjects.push(newSubject);
      } else {
        subjects.push(existingSubject);
      }
    }

  // Timetable samples for multiple semesters
    await Timetable.deleteMany({ branch: branch._id });
    const timetables = [
      {
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        branch: branch._id,
        semester: 1
      },
      {
        link: 'https://www.africau.edu/images/default/sample.pdf',
        branch: branch._id,
        semester: 3
      },
      {
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        branch: branch._id,
        semester: 5
      }
    ];
    await Timetable.insertMany(timetables);

    // Multiple Exams for different semesters and types
    await Exam.deleteMany({});
  const exams = [
      // Semester 1 Exams
      {
        name: 'Mid Term Examination - Programming Fundamentals',
        date: new Date('2025-10-15'),
        semester: 1,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 50
      },
      {
        name: 'Final Term Examination - Programming Fundamentals',
        date: new Date('2025-12-15'),
        semester: 1,
        examType: 'end',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 100
      },
      {
        name: 'Mid Term Examination - Mathematics I',
        date: new Date('2025-10-20'),
        semester: 1,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 50
      },
      {
        name: 'Quiz 1 - Physics',
        date: new Date('2025-10-25'),
        semester: 1,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 25
      },
      
      // Semester 3 Exams
      {
        name: 'Mid Term Examination - Data Structures',
        date: new Date('2025-11-01'),
        semester: 3,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 50
      },
      {
        name: 'Final Project - Web Development',
        date: new Date('2025-12-01'),
        semester: 3,
        examType: 'end',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 100
      },
      
      // Semester 5 Exams
      {
        name: 'Mid Term Examination - Machine Learning',
        date: new Date('2025-11-10'),
        semester: 5,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 60
      },
      // Semester 2 Exams
      {
        name: 'Mid Term Examination - Discrete Mathematics',
        date: new Date('2025-10-18'),
        semester: 2,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 50
      },
      {
        name: 'Final Term Examination - Digital Logic Design',
        date: new Date('2025-12-20'),
        semester: 2,
        examType: 'end',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 100
      },
      // Semester 4 Exams
      {
        name: 'Mid Term Examination - Operating Systems',
        date: new Date('2025-11-05'),
        semester: 4,
        examType: 'mid',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 50
      },
      {
        name: 'Final Term Examination - Computer Networks',
        date: new Date('2025-12-12'),
        semester: 4,
        examType: 'end',
        timetableLink: 'https://www.africau.edu/images/default/sample.pdf',
        totalMarks: 100
      }
    ];
    const createdExams = await Exam.insertMany(exams);

    // Comprehensive Marks for all students and subjects
    await Marks.deleteMany({});
    const marksData = [];
    
    for (const student of createdStudents) {
      const studentSemester = student.semester;
      const relevantSubjects = subjects.filter(sub => sub.semester === studentSemester);
      const relevantExams = createdExams.filter(exam => exam.semester === studentSemester);
      
      for (const subject of relevantSubjects) {
        for (const exam of relevantExams) {
          // Generate realistic marks based on exam type
          let marksRange;
          switch(exam.examType) {
            case 'mid': marksRange = { min: 20, max: exam.totalMarks }; break;
            case 'end': marksRange = { min: 40, max: exam.totalMarks }; break;
            default: marksRange = { min: 20, max: exam.totalMarks };
          }
          
          marksData.push({
            studentId: student._id,
            subjectId: subject._id,
            marksObtained: Math.floor(Math.random() * (marksRange.max - marksRange.min)) + marksRange.min,
            semester: studentSemester,
            examId: exam._id
          });
        }
      }
    }
    await Marks.insertMany(marksData);

    // Abundant Materials for all subjects and semesters
    await Material.deleteMany({});
    const materials = [
      // Programming Fundamentals Materials (Multiple per subject)
      {
        title: 'Programming Fundamentals - Complete Lecture Notes',
        subject: subjects.find(s => s.code === 'CSE101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759597197642.jpg'
      },
      {
        title: 'C++ Programming Guide - Reference Book',
        subject: subjects.find(s => s.code === 'CSE101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'other',
        file: '1759597905991.jpg'
      },
      {
        title: 'Programming Assignment 1 - Loops and Functions',
        subject: subjects.find(s => s.code === 'CSE101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'assignment',
        file: '1759560454545.jpg'
      },
      {
        title: 'Programming Fundamentals Course Syllabus',
        subject: subjects.find(s => s.code === 'CSE101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'syllabus',
        file: '1759557527811.jpg'
      },

      // Mathematics I Materials (Multiple per subject)
      {
        title: 'Mathematics I - Calculus and Algebra Notes',
        subject: subjects.find(s => s.code === 'MATH101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759599654974.jpg'
      },
      {
        title: 'Math Assignment - Differential Equations',
        subject: subjects.find(s => s.code === 'MATH101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'assignment',
        file: '1759557616515.jpg'
      },
      {
        title: 'Mathematics I Complete Syllabus',
        subject: subjects.find(s => s.code === 'MATH101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'syllabus',
        file: '1759736468300.jpg'
      },
      {
        title: 'Mathematical Formulas Reference Sheet',
        subject: subjects.find(s => s.code === 'MATH101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },

      // Physics Materials (Multiple per subject)
      {
        title: 'Physics - Mechanics and Thermodynamics Notes',
        subject: subjects.find(s => s.code === 'PHY101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759597197642.jpg'
      },
      {
        title: 'Physics Lab Manual and Experiments',
        subject: subjects.find(s => s.code === 'PHY101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'other',
        file: '1759597905991.jpg'
      },
      {
        title: 'Physics Assignment - Wave Motion',
        subject: subjects.find(s => s.code === 'PHY101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'assignment',
        file: '1759560454545.jpg'
      },
      {
        title: 'Physics Course Syllabus',
        subject: subjects.find(s => s.code === 'PHY101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'syllabus',
        file: '1759557527811.jpg'
      },

      // English Composition Materials (Multiple per subject)
      {
        title: 'English Grammar and Writing Notes',
        subject: subjects.find(s => s.code === 'ENG101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759599654974.jpg'
      },
      {
        title: 'Essay Writing Assignment',
        subject: subjects.find(s => s.code === 'ENG101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'assignment',
        file: '1759557616515.jpg'
      },
      {
        title: 'English Composition Syllabus',
        subject: subjects.find(s => s.code === 'ENG101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'syllabus',
        file: '1759736468300.jpg'
      },
      {
        title: 'Vocabulary Building Guide',
        subject: subjects.find(s => s.code === 'ENG101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },

      // Islamic Studies Materials (Multiple per subject)
      {
        title: 'Islamic Studies - History and Principles',
        subject: subjects.find(s => s.code === 'ISL101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'notes',
        file: '1759597197642.jpg'
      },
      {
        title: 'Islamic Studies Assignment - Comparative Study',
        subject: subjects.find(s => s.code === 'ISL101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'assignment',
        file: '1759597905991.jpg'
      },
      {
        title: 'Islamic Studies Course Syllabus',
        subject: subjects.find(s => s.code === 'ISL101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'syllabus',
        file: '1759560454545.jpg'
      },
      {
        title: 'Islamic Ethics and Morals Reference',
        subject: subjects.find(s => s.code === 'ISL101')?._id,
        faculty: faculty._id,
        semester: 1,
        branch: branch._id,
        type: 'other',
        file: '1759557527811.jpg'
      },
      
      // Data Structures Materials (Semester 3) - Multiple per subject
      {
        title: 'Data Structures - Complete Implementation Guide',
        subject: subjects.find(s => s.code === 'CSE201')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'notes',
        file: '1759557527811.jpg'
      },
      {
        title: 'Data Structures Assignment - Binary Trees',
        subject: subjects.find(s => s.code === 'CSE201')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'assignment',
        file: '1759557616515.jpg'
      },
      {
        title: 'Data Structures Course Syllabus',
        subject: subjects.find(s => s.code === 'CSE201')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'syllabus',
        file: '1759560454545.jpg'
      },
      {
        title: 'Algorithms Complexity Analysis Guide',
        subject: subjects.find(s => s.code === 'CSE201')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'other',
        file: '1759597197642.jpg'
      },

      // Database Systems Materials (Semester 3) - Multiple per subject
      {
        title: 'Database Design and Normalization Notes',
        subject: subjects.find(s => s.code === 'CSE202')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'notes',
        file: '1759597905991.jpg'
      },
      {
        title: 'SQL Query Assignment - Advanced Joins',
        subject: subjects.find(s => s.code === 'CSE202')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'assignment',
        file: '1759599654974.jpg'
      },
      {
        title: 'Database Systems Syllabus',
        subject: subjects.find(s => s.code === 'CSE202')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'syllabus',
        file: '1759736468300.jpg'
      },
      {
        title: 'Database Optimization Techniques',
        subject: subjects.find(s => s.code === 'CSE202')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },

      // Web Development Materials (Semester 3) - Multiple per subject
      {
        title: 'Modern Web Development - React and Node.js',
        subject: subjects.find(s => s.code === 'CSE203')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'notes',
        file: '1759557527811.jpg'
      },
      {
        title: 'Web Development Project - E-commerce Site',
        subject: subjects.find(s => s.code === 'CSE203')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'assignment',
        file: '1759557616515.jpg'
      },
      {
        title: 'Web Development Course Syllabus',
        subject: subjects.find(s => s.code === 'CSE203')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'syllabus',
        file: '1759560454545.jpg'
      },
      {
        title: 'Frontend Frameworks Comparison Guide',
        subject: subjects.find(s => s.code === 'CSE203')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'other',
        file: '1759597197642.jpg'
      },

      // Software Engineering Materials (Semester 3) - Multiple per subject
      {
        title: 'Software Engineering - SDLC and Best Practices',
        subject: subjects.find(s => s.code === 'CSE204')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'notes',
        file: '1759597905991.jpg'
      },
      {
        title: 'Software Design Assignment - UML Diagrams',
        subject: subjects.find(s => s.code === 'CSE204')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'assignment',
        file: '1759599654974.jpg'
      },
      {
        title: 'Software Engineering Syllabus',
        subject: subjects.find(s => s.code === 'CSE204')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'syllabus',
        file: '1759736468300.jpg'
      },
      {
        title: 'Agile Development Methodology Guide',
        subject: subjects.find(s => s.code === 'CSE204')?._id,
        faculty: faculty._id,
        semester: 3,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },
      
      // Advanced Algorithms Materials (Semester 5) - Multiple per subject
      {
        title: 'Advanced Algorithms - Research Papers and Analysis',
        subject: subjects.find(s => s.code === 'CSE301')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'notes',
        file: '1759597905991.jpg'
      },
      {
        title: 'Algorithm Optimization Assignment',
        subject: subjects.find(s => s.code === 'CSE301')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'assignment',
        file: '1759599654974.jpg'
      },
      {
        title: 'Advanced Algorithms Syllabus',
        subject: subjects.find(s => s.code === 'CSE301')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'syllabus',
        file: '1759736468300.jpg'
      },
      {
        title: 'Graph Algorithms Reference Guide',
        subject: subjects.find(s => s.code === 'CSE301')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },

      // Machine Learning Materials (Semester 5) - Multiple per subject
      {
        title: 'Machine Learning with Python - Complete Guide',
        subject: subjects.find(s => s.code === 'CSE302')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'notes',
        file: '1759557527811.jpg'
      },
      {
        title: 'ML Project - Predictive Model Assignment',
        subject: subjects.find(s => s.code === 'CSE
        title: 'Ethical Hacking Guidelines',
        subject: subjects.find(s => s.code === 'CSE303')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'other',
        file: '1759740397609.jpg'
      },

      // Mobile App Development Materials - Multiple per subject
      {
        title: 'Mobile App Development - Android & iOS',
        subject: subjects.find(s => s.code === 'CSE304')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'notes',
        file: '1759557527811.jpg'
      },
      {
        title: 'Mobile App Project - Social Media App',
        subject: subjects.find(s => s.code === 'CSE304')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'assignment',
        file: '1759557616515.jpg'
      },
      {
        title: 'Mobile Development Syllabus',
        subject: subjects.find(s => s.code === 'CSE304')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'syllabus',
        file: '1759560454545.jpg'
      },
      {
        title: 'Cross-Platform Development Guide',
        subject: subjects.find(s => s.code === 'CSE304')?._id,
        faculty: faculty._id,
        semester: 5,
        branch: branch._id,
        type: 'other',
        file: '1759597197642.jpg'
      }
    ];
    await Material.insertMany(materials.filter(m => m.subject)); // Only insert if subject exists

    // Comprehensive Notices for different types and audiences
    await Notice.deleteMany({});
    const notices = [
      {
        title: 'Welcome to New Academic Session 2025',
        description: 'Dear Students, Welcome to the new academic session! Classes will commence from October 10th, 2025. Please ensure you have completed your registration process and obtained your student ID cards. All students are requested to follow the COVID-19 protocols. Best wishes for a successful academic year!',
        type: 'student',
        link: '',
        createdAt: new Date('2025-10-01')
      },
      {
        title: 'Mid-Term Examination Schedule Released',
        description: 'The mid-term examination schedule for all semesters has been uploaded to the student portal. Examinations will begin from October 15th, 2025. Students are advised to prepare accordingly and contact their respective faculty members for any queries.',
        type: 'student',
        link: 'https://www.africau.edu/images/default/sample.pdf',
        createdAt: new Date('2025-10-05')
      },
      {
        title: 'Library Hours Extended During Exam Period',
        description: 'To facilitate students during the examination period, the library hours have been extended. The library will remain open from 8:00 AM to 10:00 PM on weekdays and 10:00 AM to 8:00 PM on weekends. Please maintain silence and follow library rules.',
        type: 'student',
        link: '',
        createdAt: new Date('2025-10-06')
      },
      {
        title: 'Programming Competition 2025',
        description: 'Computer Science Department is organizing an inter-university programming competition on November 15th, 2025. Students from all semesters are encouraged to participate. Registration deadline is November 1st, 2025. Exciting prizes await the winners!',
        type: 'student',
        link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        createdAt: new Date('2025-10-07')
      },
      {
        title: 'Fee Submission Deadline Reminder',
        description: 'This is to remind all students that the fee submission deadline for the current semester is October 25th, 2025. Late fee charges will be applicable after the deadline. Please ensure timely payment to avoid any inconvenience.',
        type: 'student',
        link: '',
        createdAt: new Date('2025-10-07')
      },
      {
        title: 'Faculty Meeting - Curriculum Review',
        description: 'All faculty members are requested to attend the curriculum review meeting scheduled for October 12th, 2025, at 2:00 PM in the main conference hall. We will discuss updates to the syllabus and teaching methodologies.',
        type: 'faculty',
        link: '',
        createdAt: new Date('2025-10-06')
      },
      {
        title: 'Research Grant Applications Open',
        description: 'Faculty members interested in applying for research grants for the fiscal year 2025-26 can now submit their applications. The deadline for submission is November 30th, 2025. Please contact the research office for guidelines.',
        type: 'faculty',
        link: 'https://www.africau.edu/images/default/sample.pdf',
        createdAt: new Date('2025-10-05')
      },
      {
        title: 'System Maintenance Scheduled',
        description: 'The college management system will undergo maintenance on October 14th, 2025, from 2:00 AM to 6:00 AM. The system will be temporarily unavailable during this period. Please plan your activities accordingly.',
        type: 'both',
        link: '',
        createdAt: new Date('2025-10-04')
      },
      {
        title: 'New Course Offerings for Spring 2026',
        description: 'The academic office is pleased to announce new elective courses for Spring 2026 semester including Artificial Intelligence, Blockchain Technology, and Cyber Security. Registration will begin from December 1st, 2025.',
        type: 'student',
        link: '',
        createdAt: new Date('2025-10-03')
      },
      {
        title: 'Student Societies Registration Open',
        description: 'Students interested in joining various societies including Literary Society, Debating Club, Sports Club, and Tech Society can register now. Registration forms are available at the student affairs office. Deadline: October 20th, 2025.',
        type: 'student',
        link: '',
        createdAt: new Date('2025-10-02')
      }
    ];
    await Notice.insertMany(notices);

    // Create detailed timetable data for display in grid format
    const TimeSlot = [
      { day: 'Monday', time: '8:00-9:00', subject: 'Programming Fundamentals', room: 'CS-101', faculty: 'Dr. Ahmad Ali' },
      { day: 'Monday', time: '9:00-10:00', subject: 'Mathematics I', room: 'Math-201', faculty: 'Dr. Fatima Shah' },
      { day: 'Monday', time: '10:00-11:00', subject: 'Physics', room: 'Phy-301', faculty: 'Prof. Hassan Khan' },
      { day: 'Monday', time: '11:00-12:00', subject: 'English Composition', room: 'Eng-101', faculty: 'Ms. Ayesha Malik' },
      
      { day: 'Tuesday', time: '8:00-9:00', subject: 'Programming Fundamentals Lab', room: 'CS-Lab1', faculty: 'Dr. Ahmad Ali' },
      { day: 'Tuesday', time: '9:00-10:00', subject: 'Mathematics I', room: 'Math-201', faculty: 'Dr. Fatima Shah' },
      { day: 'Tuesday', time: '10:00-11:00', subject: 'Islamic Studies', room: 'IS-101', faculty: 'Maulana Tariq' },
      { day: 'Tuesday', time: '11:00-12:00', subject: 'Physics Lab', room: 'Phy-Lab', faculty: 'Prof. Hassan Khan' },
      
      { day: 'Wednesday', time: '8:00-9:00', subject: 'Programming Fundamentals', room: 'CS-101', faculty: 'Dr. Ahmad Ali' },
      { day: 'Wednesday', time: '9:00-10:00', subject: 'English Composition', room: 'Eng-101', faculty: 'Ms. Ayesha Malik' },
      { day: 'Wednesday', time: '10:00-11:00', subject: 'Mathematics I', room: 'Math-201', faculty: 'Dr. Fatima Shah' },
      { day: 'Wednesday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' },
      
      { day: 'Thursday', time: '8:00-9:00', subject: 'Physics', room: 'Phy-301', faculty: 'Prof. Hassan Khan' },
      { day: 'Thursday', time: '9:00-10:00', subject: 'Programming Fundamentals', room: 'CS-101', faculty: 'Dr. Ahmad Ali' },
      { day: 'Thursday', time: '10:00-11:00', subject: 'Islamic Studies', room: 'IS-101', faculty: 'Maulana Tariq' },
      { day: 'Thursday', time: '11:00-12:00', subject: 'Mathematics I', room: 'Math-201', faculty: 'Dr. Fatima Shah' },
      
      { day: 'Friday', time: '8:00-9:00', subject: 'English Composition', room: 'Eng-101', faculty: 'Ms. Ayesha Malik' },
      { day: 'Friday', time: '9:00-10:00', subject: 'Programming Fundamentals Lab', room: 'CS-Lab1', faculty: 'Dr. Ahmad Ali' },
      { day: 'Friday', time: '10:00-11:00', subject: 'Physics', room: 'Phy-301', faculty: 'Prof. Hassan Khan' },
      { day: 'Friday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' }
    ];

    // Store comprehensive timetable data for grid display
    await Timetable.deleteMany({ branch: branch._id });
    
    // Semester 1 Timetable with improved structure
    await Timetable.create({
      link: JSON.stringify(TimeSlot), // Store as JSON string for grid display
      branch: branch._id,
      semester: 1,
      gridData: TimeSlot, // Additional field for structured data
      isGrid: true // Flag to indicate this is grid format
    });

    // Create additional timetables for other semesters
    const TimeSlotSem3 = [
      { day: 'Monday', time: '8:00-9:00', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Zain Abbas' },
      { day: 'Monday', time: '9:00-10:00', subject: 'Database Systems', room: 'CS-202', faculty: 'Dr. Sara Ahmad' },
      { day: 'Monday', time: '10:00-11:00', subject: 'Web Development', room: 'CS-Lab2', faculty: 'Mr. Usman Sheikh' },
      { day: 'Monday', time: '11:00-12:00', subject: 'Software Engineering', room: 'CS-301', faculty: 'Prof. Nasir Khan' },
      
      { day: 'Tuesday', time: '8:00-9:00', subject: 'Data Structures Lab', room: 'CS-Lab1', faculty: 'Dr. Zain Abbas' },
      { day: 'Tuesday', time: '9:00-10:00', subject: 'Database Systems', room: 'CS-202', faculty: 'Dr. Sara Ahmad' },
      { day: 'Tuesday', time: '10:00-11:00', subject: 'Statistics', room: 'Math-301', faculty: 'Dr. Ali Raza' },
      { day: 'Tuesday', time: '11:00-12:00', subject: 'Computer Networks', room: 'CS-401', faculty: 'Dr. Hassan Ali' },
      
      { day: 'Wednesday', time: '8:00-9:00', subject: 'Web Development', room: 'CS-Lab2', faculty: 'Mr. Usman Sheikh' },
      { day: 'Wednesday', time: '9:00-10:00', subject: 'Software Engineering', room: 'CS-301', faculty: 'Prof. Nasir Khan' },
      { day: 'Wednesday', time: '10:00-11:00', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Zain Abbas' },
      { day: 'Wednesday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' },
      
      { day: 'Thursday', time: '8:00-9:00', subject: 'Database Systems', room: 'CS-202', faculty: 'Dr. Sara Ahmad' },
      { day: 'Thursday', time: '9:00-10:00', subject: 'Statistics', room: 'Math-301', faculty: 'Dr. Ali Raza' },
      { day: 'Thursday', time: '10:00-11:00', subject: 'Computer Networks', room: 'CS-401', faculty: 'Dr. Hassan Ali' },
      { day: 'Thursday', time: '11:00-12:00', subject: 'Web Development', room: 'CS-Lab2', faculty: 'Mr. Usman Sheikh' },
      
      { day: 'Friday', time: '8:00-9:00', subject: 'Software Engineering', room: 'CS-301', faculty: 'Prof. Nasir Khan' },
      { day: 'Friday', time: '9:00-10:00', subject: 'Database Lab', room: 'CS-Lab3', faculty: 'Dr. Sara Ahmad' },
      { day: 'Friday', time: '10:00-11:00', subject: 'Data Structures', room: 'CS-201', faculty: 'Dr. Zain Abbas' },
      { day: 'Friday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' }
    ];

    await Timetable.create({
      link: JSON.stringify(TimeSlotSem3),
      branch: branch._id,
      semester: 3,
      gridData: TimeSlotSem3,
      isGrid: true
    });

    const TimeSlotSem5 = [
      { day: 'Monday', time: '8:00-9:00', subject: 'Machine Learning', room: 'CS-501', faculty: 'Dr. Fatima Iqbal' },
      { day: 'Monday', time: '9:00-10:00', subject: 'Human Computer Interaction', room: 'CS-502', faculty: 'Dr. Nadia Malik' },
      { day: 'Monday', time: '10:00-11:00', subject: 'Artificial Intelligence', room: 'CS-503', faculty: 'Prof. Ahmed Hassan' },
      { day: 'Monday', time: '11:00-12:00', subject: 'Cyber Security', room: 'CS-504', faculty: 'Dr. Omar Shah' },
      
      { day: 'Tuesday', time: '8:00-9:00', subject: 'ML Lab', room: 'CS-Lab4', faculty: 'Dr. Fatima Iqbal' },
      { day: 'Tuesday', time: '9:00-10:00', subject: 'Project Management', room: 'Mgmt-201', faculty: 'Mr. Bilal Khan' },
      { day: 'Tuesday', time: '10:00-11:00', subject: 'Artificial Intelligence', room: 'CS-503', faculty: 'Prof. Ahmed Hassan' },
      { day: 'Tuesday', time: '11:00-12:00', subject: 'Cyber Security', room: 'CS-504', faculty: 'Dr. Omar Shah' },
      
      { day: 'Wednesday', time: '8:00-9:00', subject: 'Human Computer Interaction', room: 'CS-502', faculty: 'Dr. Nadia Malik' },
      { day: 'Wednesday', time: '9:00-10:00', subject: 'Machine Learning', room: 'CS-501', faculty: 'Dr. Fatima Iqbal' },
      { day: 'Wednesday', time: '10:00-11:00', subject: 'Project Management', room: 'Mgmt-201', faculty: 'Mr. Bilal Khan' },
      { day: 'Wednesday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' },
      
      { day: 'Thursday', time: '8:00-9:00', subject: 'Artificial Intelligence', room: 'CS-503', faculty: 'Prof. Ahmed Hassan' },
      { day: 'Thursday', time: '9:00-10:00', subject: 'Cyber Security', room: 'CS-504', faculty: 'Dr. Omar Shah' },
      { day: 'Thursday', time: '10:00-11:00', subject: 'Human Computer Interaction', room: 'CS-502', faculty: 'Dr. Nadia Malik' },
      { day: 'Thursday', time: '11:00-12:00', subject: 'Machine Learning', room: 'CS-501', faculty: 'Dr. Fatima Iqbal' },
      
      { day: 'Friday', time: '8:00-9:00', subject: 'AI Lab', room: 'CS-Lab5', faculty: 'Prof. Ahmed Hassan' },
      { day: 'Friday', time: '9:00-10:00', subject: 'Security Lab', room: 'CS-Lab6', faculty: 'Dr. Omar Shah' },
      { day: 'Friday', time: '10:00-11:00', subject: 'Project Work', room: 'CS-501', faculty: 'Mr. Bilal Khan' },
      { day: 'Friday', time: '11:00-12:00', subject: 'Free Period', room: '-', faculty: '-' }
    ];

    await Timetable.create({
      link: JSON.stringify(TimeSlotSem5),
      branch: branch._id,
      semester: 5,
      gridData: TimeSlotSem5,
      isGrid: true
    });

    console.log('Showcase Pakistani student data and related records seeded.');
    console.log('Grid timetable data created for semester 1.');
    console.log('Startup seed: finished');
  } catch (err) {
    console.error('Startup seed error', err);
  }
};

module.exports = seedInitialData;
