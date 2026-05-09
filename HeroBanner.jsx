function HeroBanner() {
  return (
    <div style={{
      backgroundColor: '#002b5e', 
      backgroundImage: 'linear-gradient(90deg, #002b5e 0%, #004b93 100%)', // Nice MIU blue gradient
      padding: '40px 60px',
      color: 'white', // <-- THIS FIXES THE INVISIBLE TEXT
      fontFamily: 'sans-serif'
    }}>
      <div style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#cbd5e1' }}>
        🏠 {'>'} University Portal {'>'} My courses
      </div>
      <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
        My courses
      </h1>
    </div>
  );
}

export default HeroBanner;