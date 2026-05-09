import { useState } from 'react';
import './App.css';
import CourseCard from './components/CourseCard';
import CourseOverview from './components/CourseOverview';
import Navbar from './components/Navbar';         
import HeroBanner from './components/HeroBanner';   

function App() {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const [userRole, setUserRole] = useState('student');

  const currentUser = {
    name: "Zeyad Mohamed",
    email: "zeyad.m@miuegypt.edu.eg",
    studentId: "202301999",
    major: "Software Engineering"
  };

  const courses = [
    { id: 1, bgColor: "#FF6B6B", category: "Design", title: "UI/UX Masterclass", instructor: "Myriam Hamam", price: "$49.99" },
    { id: 2, bgColor: "#4ECDC4", category: "Development", title: "React for Beginners", instructor: "Zeyad Mohamed", price: "$59.99" },
    { id: 3, bgColor: "#9b59b6", category: "Engineering", title: "System Analysis", instructor: "Dr. Ahmed", price: "$69.99" },
    { id: 4, bgColor: "#3498db", category: "Engineering", title: "Principles of SW", instructor: "Dr. Sarah", price: "$79.99" },
  ];

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogin = (e, role = 'student') => {
    e.preventDefault(); 
    setUserRole(role);
    if (role === 'instructor') {
      setCurrentPage('instructor-dashboard');
    } else {
      setCurrentPage('catalog'); 
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration successful! Please login.");
    setCurrentPage('login');
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    if (purchasedCourses.includes(course.id)) {
      setCurrentPage('course-content'); 
    } else {
      setCurrentPage('overview'); 
    }
  };

  const handleSuccessfulPayment = () => {
    setPurchasedCourses([...purchasedCourses, selectedCourse.id]);
    alert(`Success! You are now enrolled in ${selectedCourse.title}`);
    setCurrentPage('catalog'); 
  };

  if (currentPage === 'login') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '3rem', color: '#002b5e' }}>MIU Portal</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>Please login to access your university courses.</p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '320px', background: 'white', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <input type="email" placeholder="University Email" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <input type="password" placeholder="Password" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem' }} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={(e) => handleLogin(e, 'student')} style={{ flex: 1, padding: '12px', background: '#002b5e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>Student</button>
            <button onClick={(e) => handleLogin(e, 'instructor')} style={{ flex: 1, padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>Instructor</button>
          </div>
        </form>
        <p style={{ marginTop: '20px', color: '#666' }}>
          Don't have an account? <span onClick={() => setCurrentPage('register')} style={{ color: '#002b5e', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>Register here</span>
        </p>
      </div>
    );
  }

  // NEW: Registration Screen
  if (currentPage === 'register') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#002b5e' }}>Create an Account</h1>
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '350px', background: 'white', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <input type="text" placeholder="Full Name" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="email" placeholder="University Email" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Password" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <select required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}>
            <option value="">Select Role...</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <button type="submit" style={{ padding: '12px', background: '#002b5e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', cursor: 'pointer', color: '#666', marginTop: '10px' }} onClick={() => setCurrentPage('login')}>← Back to Login</p>
        </form>
      </div>
    );
  }

  if (currentPage === 'overview') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} /> 
        <CourseOverview course={selectedCourse} onBack={() => setCurrentPage('catalog')} onPayClick={() => setCurrentPage('payment')} />
      </div>
    );
  }

  if (currentPage === 'payment') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} />
        <div style={{ padding: '40px', maxWidth: '600px', margin: '50px auto', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#002b5e' }}>Secure Checkout</h2>
          <p>You are purchasing: <strong>{selectedCourse.title}</strong></p>
          <h3 style={{ color: '#10b981' }}>Total: {selectedCourse.price}</h3>
          <button onClick={handleSuccessfulPayment} style={{ width: '100%', padding: '15px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', marginTop: '30px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Confirm & Pay Now
          </button>
          <button onClick={() => setCurrentPage('overview')} style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: '#6b7280', marginTop: '10px', cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    );
  }

  if (currentPage === 'course-content') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} />
        <HeroBanner />
        
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <button onClick={() => setCurrentPage('catalog')} style={{ marginBottom: '20px', padding: '10px 15px', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', color: '#002b5e', fontWeight: 'bold' }}>← Back to Dashboard</button>
          
          {/* Main Course Layout container */}
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            
            {/* LEFT COLUMN: Main Video & Details Area */}
            <div style={{ flex: '1', minWidth: '600px' }}>
              <h1 style={{ color: selectedCourse.bgColor, marginTop: 0 }}>{selectedCourse.title}</h1>
              
              {/* Fake Video Player Placeholder */}
              <div style={{ width: '100%', height: '400px', backgroundColor: '#1f2937', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {/* Play Button Icon */}
                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <div style={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '25px solid white', marginLeft: '5px' }}></div>
                </div>
                <span style={{ position: 'absolute', bottom: '15px', left: '20px', color: 'white', fontWeight: 'bold' }}>Lecture 1: Introduction to {selectedCourse.category}</span>
              </div>

              {/* Course Navigation Tabs (Visual only) */}
              <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold', color: '#002b5e', borderBottom: '2px solid #002b5e', paddingBottom: '5px', cursor: 'pointer' }}>Overview</div>
                <div style={{ color: '#6b7280', cursor: 'pointer' }}>Q&A</div>
                <div style={{ color: '#6b7280', cursor: 'pointer' }}>Notes</div>
                <div style={{ color: '#6b7280', cursor: 'pointer' }}>Announcements</div>
              </div>

              <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '1.1rem' }}>
                Welcome to the first module of <strong>{selectedCourse.title}</strong> with {selectedCourse.instructor}. 
                In this session, we will cover the foundational concepts you need to succeed in this course. 
                Make sure to download the attached resources before proceeding to the first assignment.
              </p>
            </div>

            {/* RIGHT COLUMN: Course Syllabus / Sidebar */}
            <div style={{ width: '350px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Course Content</h3>
              
              {/* Module 1: Lectures */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Section 1: Lectures</span>
                  <span>▼</span>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '5px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#0056b3', cursor: 'pointer', fontWeight: 'bold' }}>
                    <span>▶️</span> <span>1. Welcome & Setup</span> <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'normal' }}>10:25</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#4b5563', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = '#0056b3'} onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}>
                    <span>▶️</span> <span>2. Core Concepts</span> <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#6b7280' }}>15:40</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#4b5563', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = '#0056b3'} onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}>
                    <span>📄</span> <span>Reading Material (PDF)</span>
                  </div>
                </div>
              </div>

              {/* Module 2: Assignments */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Section 2: Assignments</span>
                  <span>▼</span>
                </div>
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '5px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#1f2937', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = '#0056b3'} onMouseOut={(e) => e.currentTarget.style.color = '#1f2937'}>
                    <span>📝</span> <span>Assignment 1: Basics</span> <span style={{ marginLeft: 'auto', fontSize: '0.75rem', backgroundColor: '#dc3545', padding: '2px 6px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>Due Friday</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#10b981', cursor: 'pointer' }}>
                    <span>✅</span> <span style={{ textDecoration: 'line-through', color: '#6b7280' }}>Quiz: Initial Assessment</span> <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>10/10</span>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'profile') {
    const myEnrolledCourses = courses.filter(c => purchasedCourses.includes(c.id));

    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} />
        <div style={{ backgroundColor: '#002b5e', padding: '40px 60px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>Student Profile</h1>
        </div>
        <div style={{ padding: '40px 60px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
            <button onClick={() => setCurrentPage('catalog')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', color: '#002b5e', fontWeight: 'bold' }}>← Back to Dashboard</button>
            <button onClick={() => setCurrentPage('student-analytics')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#10b981', border: 'none', borderRadius: '5px', color: 'white', fontWeight: 'bold' }}>View Analytics</button>
          </div>
          
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
            <div style={{ width: '90px', height: '90px', backgroundColor: '#0f766e', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', fontWeight: 'bold' }}>Z</div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', color: '#1f2937' }}>{currentUser.name}</h2>
              <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '1.1rem' }}>{currentUser.email} | Student ID: {currentUser.studentId}</p>
              <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{currentUser.major}</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>My Active Enrollments ({myEnrolledCourses.length})</h3>
          
          {myEnrolledCourses.length === 0 ? (
            <p style={{ color: '#666', fontSize: '1.1rem', backgroundColor: 'white', padding: '30px', borderRadius: '8px', border: '1px dashed #ccc', textAlign: 'center' }}>You haven't enrolled in any courses yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {myEnrolledCourses.map(course => (
                <div key={course.id} onClick={() => handleCourseClick(course)} style={{ background: 'white', padding: '20px 30px', borderRadius: '8px', border: '1px solid #e5e7eb', borderLeft: `6px solid ${course.bgColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1f2937' }}>{course.title}</h4>
                    <p style={{ margin: 0, color: '#6b7280' }}>Instructor: {course.instructor}</p>
                  </div>
                  <button style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '5px', color: '#002b5e', fontWeight: 'bold', cursor: 'pointer' }}>Go to Class →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // NEW: Instructor Dashboard
  if (currentPage === 'instructor-dashboard') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={0} onProfileClick={() => setCurrentPage('login')} />
        <div style={{ backgroundColor: '#10b981', padding: '40px 60px', color: 'white' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Instructor Dashboard</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '1.2rem' }}>Welcome back, Prof. Hamam</p>
        </div>
        
        <div style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* Quick Actions */}
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button onClick={() => setCurrentPage('create-course')} style={{ padding: '20px', background: 'white', border: '2px dashed #10b981', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', color: '#10b981', fontWeight: 'bold' }}>+ Create New Course</button>
            <button onClick={() => setCurrentPage('create-quiz')} style={{ padding: '20px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', color: '#333' }}>📝 Create Quiz</button>
            <button onClick={() => setCurrentPage('grade-quiz')} style={{ padding: '20px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', color: '#333' }}>✅ Grade Submissions (3 Pending)</button>
            <button onClick={() => setCurrentPage('login')} style={{ padding: '20px', background: 'white', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', color: '#dc3545' }}>Logout</button>
          </div>
          
          {/* Active Courses List */}
          <div style={{ flex: '2', minWidth: '500px', background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ marginTop: 0, color: '#1f2937' }}>My Active Courses</h2>
            <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '1.2rem', color: '#002b5e' }}>UI/UX Masterclass</strong> 
              <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>42 Students Enrolled</span>
            </div>
            <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '1.2rem', color: '#002b5e' }}>Advanced Design Systems</strong> 
              <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>18 Students Enrolled</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // NEW: Course Creation UI
  if (currentPage === 'create-course') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setCurrentPage('instructor-dashboard')} style={{ marginBottom: '20px', background: 'transparent', border: 'none', color: '#002b5e', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
          <h2 style={{ color: '#002b5e', marginTop: 0 }}>Create a New Course</h2>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert('Course Created successfully!'); setCurrentPage('instructor-dashboard'); }}>
            <div>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Course Title</label>
              <input type="text" required placeholder="e.g. Introduction to React" style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Category</label>
              <input type="text" placeholder="e.g. Engineering" style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Upload Thumbnail</label>
              <input type="file" style={{ width: '100%', padding: '12px', marginTop: '8px', border: '1px dashed #ccc', borderRadius: '5px', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <label style={{ fontWeight: 'bold', color: '#333' }}>Course Syllabus</label>
              <textarea rows="5" placeholder="Enter week-by-week syllabus here..." style={{ width: '100%', padding: '12px', marginTop: '8px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}></textarea>
            </div>
            <button type="submit" style={{ padding: '15px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Publish Course</button>
          </form>
        </div>
      </div>
    );
  }

  // NEW: Quiz Creation UI
  if (currentPage === 'create-quiz') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setCurrentPage('instructor-dashboard')} style={{ marginBottom: '20px', background: 'transparent', border: 'none', color: '#002b5e', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
            <h2 style={{ marginTop: 0, color: '#002b5e' }}>Quiz Builder</h2>
            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9fafb' }}>
              <input type="text" placeholder="Question 1 (e.g., What is React?)" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}/>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <input type="text" placeholder="Option A" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}/>
                <input type="text" placeholder="Option B" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}/>
              </div>
              <select style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <option>Select Correct Answer...</option>
                <option>Option A</option>
                <option>Option B</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '12px 20px', background: '#f3f4f6', color: '#333', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Question</button>
              <button onClick={() => { alert('Quiz Saved Successfully!'); setCurrentPage('instructor-dashboard'); }} style={{ padding: '12px 20px', background: '#002b5e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Save & Publish Quiz</button>
            </div>
         </div>
      </div>
    );
  }

  // NEW: Grading UI
  if (currentPage === 'grade-quiz') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setCurrentPage('instructor-dashboard')} style={{ marginBottom: '20px', background: 'transparent', border: 'none', color: '#002b5e', cursor: 'pointer', fontWeight: 'bold' }}>← Back to Dashboard</button>
            <h2 style={{ marginTop: 0, color: '#002b5e' }}>Pending Submissions</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', color: '#6b7280' }}>
                  <th style={{ paddingBottom: '10px' }}>Student Name</th>
                  <th style={{ paddingBottom: '10px' }}>Assignment</th>
                  <th style={{ paddingBottom: '10px' }}>Grade / 100</th>
                  <th style={{ paddingBottom: '10px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee', height: '60px' }}>
                  <td>Zeyad Mohamed</td>
                  <td>UI/UX Quiz 1</td>
                  <td><input type="number" placeholder="--" style={{ width: '60px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}/></td>
                  <td><button onClick={() => alert('Grade Submitted!')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Submit</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee', height: '60px' }}>
                  <td>Ahmed Ali</td>
                  <td>React Midterm</td>
                  <td><input type="number" placeholder="--" style={{ width: '60px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}/></td>
                  <td><button onClick={() => alert('Grade Submitted!')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Submit</button></td>
                </tr>
              </tbody>
            </table>
         </div>
      </div>
    );
  }

  // NEW: Student Analytics Dashboard
  if (currentPage === 'student-analytics') {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} />
        <div style={{ padding: '40px 60px', maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={() => setCurrentPage('profile')} style={{ marginBottom: '20px', background: 'white', padding: '10px 15px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', color: '#002b5e', fontWeight: 'bold' }}>← Back to Profile</button>
          <h2 style={{ color: '#002b5e', fontSize: '2rem' }}>My Learning Analytics</h2>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <h3 style={{ color: '#6b7280', margin: 0 }}>Overall GPA</h3>
              <p style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#002b5e', margin: '10px 0' }}>3.8</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px', background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <h3 style={{ color: '#6b7280', margin: 0 }}>Courses Completed</h3>
              <p style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#10b981', margin: '10px 0' }}>4</p>
            </div>
          </div>

          <div style={{ background: 'white', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ marginTop: 0, color: '#1f2937', marginBottom: '25px' }}>Course Progress</h3>
            
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#4b5563' }}>UI/UX Masterclass</span>
                <span style={{ fontWeight: 'bold', color: '#4f46e5' }}>75%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#4f46e5', borderRadius: '6px' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#4b5563' }}>React for Beginners</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>30%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', background: '#10b981', borderRadius: '6px' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  /* SCREEN: CATALOG (Main View) */
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Navbar purchasedCount={purchasedCourses.length} onProfileClick={() => setCurrentPage('profile')} />
      <HeroBanner />
      
      <div style={{ padding: '30px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '20px' }}>Course overview</h2>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <select style={{ padding: '10px 15px', borderRadius: '5px', border: '1px solid #ced4da', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}>
            <option>All</option>
            <option>In Progress</option>
          </select>
          
          <input type="text" placeholder="Search by course or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '10px 15px', borderRadius: '5px', border: '1px solid #ced4da', flex: '1', minWidth: '200px', outline: 'none' }} />
          
          <select style={{ padding: '10px 15px', borderRadius: '5px', border: '1px solid #ced4da', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }}>
            <option>Sort by course name</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
          {filteredCourses.length === 0 ? (
            <p style={{ color: '#666', fontSize: '1.2rem', padding: '20px' }}>No courses found for "{searchQuery}".</p>
          ) : (
            filteredCourses.map((course) => {
              const isBought = purchasedCourses.includes(course.id);
              return (
                <div 
                  key={course.id} 
                  onClick={() => handleCourseClick(course)} 
                  style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <CourseCard bgColor={course.bgColor} category={course.category} title={course.title} instructor={course.instructor} price={isBought ? "Purchased ✅" : course.price} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;