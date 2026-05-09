function CourseOverview(props) {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', marginTop: '40px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      
      <button onClick={props.onBack} style={{ marginBottom: '20px', padding: '10px 15px', cursor: 'pointer', backgroundColor: '#e0e7ff', border: 'none', borderRadius: '8px', color: '#4f46e5', fontWeight: 'bold' }}>
        ← Back to Courses
      </button>
      
      <h1>{props.course.title}</h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem' }}>Instructor: {props.course.instructor}</p>
      
      <div style={{ height: '250px', backgroundColor: props.course.bgColor, borderRadius: '10px', marginTop: '20px' }}></div>
      
      <h2 style={{ marginTop: '30px' }}>Course Overview</h2>
      <p>This course will take you from beginner to advanced. You will learn the core concepts, complete real-world projects, and gain the skills needed to succeed.</p>
      
      <h2>What you will learn:</h2>
      <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        <li>Understand the fundamentals of {props.course.title}.</li>
        <li>Apply industry best practices and methodologies.</li>
        <li>Complete interactive quizzes and hands-on assignments.</li>
      </ul>
      
      {/* Changed to a Pay Button */}
      <button onClick={props.onPayClick} style={{ padding: '15px 30px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.2rem', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold', width: '100%' }}>
        Pay to Enroll - {props.course.price}
      </button>
    </div>
  );
}

export default CourseOverview;