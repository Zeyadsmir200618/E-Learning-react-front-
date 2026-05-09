import { useState } from 'react';

// Notice we added 'onProfileClick' here!
function Navbar({ purchasedCount = 0, onProfileClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', fontFamily: 'sans-serif', position: 'relative' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#8b0000', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>MIU</div>
        <h2 style={{ margin: 0, color: '#1f2937', fontSize: '1.5rem', letterSpacing: '-0.5px' }}>E-Learn Pro</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px', color: '#4b5563' }}>
        
        {/* DROPDOWN MENU */}
        <div style={{ position: 'relative' }} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
          <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px' }}>
            My courses 
            <span style={{ background: '#0056b3', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{purchasedCount}</span>
            <span style={{ fontSize: '0.8rem', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
          </div>

          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: 'white', width: '200px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '8px', border: '1px solid #e5e7eb', zIndex: 100, overflow: 'hidden' }}>
              <div style={{ padding: '12px 15px', borderBottom: '1px solid #eee', cursor: 'pointer', backgroundColor: '#f8f9fa' }}>In Progress ({purchasedCount})</div>
              <div style={{ padding: '12px 15px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>Completed (0)</div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s', padding: '5px' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <span style={{ fontSize: '1.4rem' }}>🔔</span>
          <span style={{ position: 'absolute', top: '-2px', right: '-5px', background: '#dc3545', color: 'white', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '10px', fontWeight: 'bold', border: '2px solid white' }}>60</span>
        </div>

        <div style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s', padding: '5px' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <span style={{ fontSize: '1.4rem' }}>💬</span>
          <span style={{ position: 'absolute', top: '-2px', right: '-5px', background: '#dc3545', color: 'white', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '10px', fontWeight: 'bold', border: '2px solid white' }}>8</span>
        </div>

        <div style={{ cursor: 'pointer', fontSize: '1.4rem', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>🔍</div>
        
        {/* PROFILE CIRCLE: Added onClick={onProfileClick} */}
        <div onClick={onProfileClick} style={{ width: '40px', height: '40px', backgroundColor: '#0f766e', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          Z
        </div>

      </div>
    </nav>
  );
}

export default Navbar;