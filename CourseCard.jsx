import './CourseCard.css';

function CourseCard(props) {
  return (
    <div className="course-card">
      {/* We use a colorful box as a placeholder for a real image */}
      <div className="course-image" style={{ backgroundColor: props.bgColor }}></div>
      
      <div className="course-content">
        <span className="category">{props.category}</span>
        <h3>{props.title}</h3>
        <p className="instructor">By {props.instructor}</p>
        
        <div className="course-footer">
          <span className="price">{props.price}</span>
          <button className="enroll-btn">Enroll</button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;