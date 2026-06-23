import React, { useState } from 'react';
import { Footprints, Check, Calendar, TrendingUp, Sparkles } from 'lucide-react';

function CarbonCoach({ carbonLogs, setCarbonLogs, ecoPoints, setEcoPoints }) {
  const [commute, setCommute] = useState('drive'); // walk, transit, carpool, drive
  const [unplugged, setUnplugged] = useState(false);
  const [recycled, setRecycled] = useState(false);
  const [diet, setDiet] = useState('meat'); // veg, meat
  const [waterSaved, setWaterSaved] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  // Calculate scores based on inputs
  const calculateTodayStats = () => {
    let score = 30; // base score
    let savings = 0.0;

    if (commute === 'walk') {
      score += 30;
      savings += 3.5;
    } else if (commute === 'transit') {
      score += 20;
      savings += 2.0;
    } else if (commute === 'carpool') {
      score += 10;
      savings += 1.0;
    }

    if (unplugged) {
      score += 15;
      savings += 0.8;
    }
    if (recycled) {
      score += 15;
      savings += 0.6;
    }
    if (diet === 'veg') {
      score += 20;
      savings += 1.6;
    }
    if (waterSaved) {
      score += 10;
      savings += 0.5;
    }

    return { score: Math.min(score, 100), savings: parseFloat(savings.toFixed(1)) };
  };

  const todayStats = calculateTodayStats();

  const handleSaveLog = () => {
    if (loggedToday) return;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayName = days[new Date().getDay()] + ' (Today)';

    // Update carbonLogs: replace last entry with today's real data
    const updatedLogs = [...carbonLogs];
    updatedLogs[updatedLogs.length - 1] = {
      date: todayName,
      score: todayStats.score,
      savings: todayStats.savings
    };

    setCarbonLogs(updatedLogs);
    setLoggedToday(true);

    // Reward points
    const reward = Math.round(todayStats.savings * 10);
    setEcoPoints(prev => prev + reward);
  };

  // Find max savings for SVG bar sizing
  const maxSavings = Math.max(...carbonLogs.map(l => l.savings), 5);
  const totalWeeklySavings = carbonLogs.reduce((acc, curr) => acc + curr.savings, 0).toFixed(1);
  const avgEcoScore = Math.round(carbonLogs.reduce((acc, curr) => acc + curr.score, 0) / carbonLogs.length);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', flexWrap: 'wrap' }} className="coach-grid">
      
      {/* Left Panel: Daily Tracker Input */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
          <div style={{ background: 'hsl(var(--secondary) / 0.1)', padding: '8px', borderRadius: '8px' }}>
            <Footprints size={20} color="hsl(var(--secondary-light))" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Daily Footprint Calculator</h3>
            <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Log today's green choices to calculate score</p>
          </div>
        </div>

        {/* Input Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Commute */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'hsl(var(--text-secondary))', display: 'block', marginBottom: '8px' }}>
              How did you commute today?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                type="button"
                className={`btn ${commute === 'walk' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCommute('walk')}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                🚶 Walk / Bicycle
              </button>
              <button 
                type="button"
                className={`btn ${commute === 'transit' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCommute('transit')}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                🚌 Public Transit
              </button>
              <button 
                type="button"
                className={`btn ${commute === 'carpool' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCommute('carpool')}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                🚗 Carpool
              </button>
              <button 
                type="button"
                className={`btn ${commute === 'drive' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCommute('drive')}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                🚘 Drive Alone
              </button>
            </div>
          </div>

          {/* Diet Selection */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'hsl(var(--text-secondary))', display: 'block', marginBottom: '8px' }}>
              Diet choice today:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button"
                className={`btn ${diet === 'veg' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDiet('veg')}
                style={{ flex: 1, fontSize: '12px', padding: '8px' }}
              >
                🥗 Plant-Based / Veg
              </button>
              <button 
                type="button"
                className={`btn ${diet === 'meat' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDiet('meat')}
                style={{ flex: 1, fontSize: '12px', padding: '8px' }}
              >
                🥩 Meat-inclusive
              </button>
            </div>
          </div>

          {/* Checkbox Utilities */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: 'hsl(var(--text-secondary))' }}>
              Other sustainable actions taken:
            </label>
            
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => setUnplugged(!unplugged)}
            >
              <div style={{ 
                width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid hsl(var(--border-color))',
                background: unplugged ? 'hsl(var(--primary))' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {unplugged && <Check size={12} strokeWidth={3} color="#fff" />}
              </div>
              <span style={{ fontSize: '12px' }}>Unplugged devices on standby / Energy conservation</span>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => setRecycled(!recycled)}
            >
              <div style={{ 
                width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid hsl(var(--border-color))',
                background: recycled ? 'hsl(var(--primary))' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {recycled && <Check size={12} strokeWidth={3} color="#fff" />}
              </div>
              <span style={{ fontSize: '12px' }}>Practiced 3R segregation / Sorted waste for recycling</span>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => setWaterSaved(!waterSaved)}
            >
              <div style={{ 
                width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid hsl(var(--border-color))',
                background: waterSaved ? 'hsl(var(--primary))' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {waterSaved && <Check size={12} strokeWidth={3} color="#fff" />}
              </div>
              <span style={{ fontSize: '12px' }}>Restricted water consumption (e.g. quick shower)</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSaveLog} 
          disabled={loggedToday}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: 'auto', display: 'flex', gap: '8px' }}
        >
          {loggedToday ? 'Saved for Today' : 'Save Habits & Earn Eco Points'} 
          <Sparkles size={16} />
        </button>
        {loggedToday && (
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'hsl(var(--primary-light))', fontWeight: '500' }}>
            🎉 Log saved! +{Math.round(todayStats.savings * 10)} Eco Points added to your profile!
          </p>
        )}
      </div>

      {/* Right Panel: Analytics and Dashboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Statistics Widgets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Today's carbon score circle */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <h4 style={{ fontSize: '13px', color: 'hsl(var(--text-secondary))' }}>Sustainability Score</h4>
            
            {/* SVG circle progress */}
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="hsl(var(--border-color))" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  stroke="hsl(var(--primary-light))" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * todayStats.score) / 100}
                  strokeLinecap="round"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'stroke-dashoffset 0.5s ease'
                  }}
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>{todayStats.score}</span>
                <span style={{ fontSize: '9px', color: 'hsl(var(--text-muted))', marginTop: '-4px' }}>/ 100</span>
              </div>
            </div>
            
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Based on your logged habits</p>
          </div>

          {/* Weekly cumulative CO2 savings */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', paddingLeft: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', display: 'block' }}>WEEKLY SAVINGS</span>
              <span style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--primary-light))' }}>
                {totalWeeklySavings} <span style={{ fontSize: '16px', fontWeight: '500', color: 'hsl(var(--text-secondary))' }}>kg</span>
              </span>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', display: 'block' }}>WEEKLY SCORE AVG</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: 'hsl(var(--text-primary))' }}>
                {avgEcoScore} / 100
              </span>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} color="hsl(var(--primary-light))" /> CO₂ Avoidance (kg)
            </h3>
            <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} /> Last 7 Days
            </span>
          </div>

          {/* Custom SVG Bar Chart */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 10px 0 10px', borderBottom: '1px solid hsl(var(--border-color))' }}>
            {carbonLogs.map((log, index) => {
              const heightPct = (log.savings / maxSavings) * 100;
              const isToday = index === carbonLogs.length - 1;
              return (
                <div key={index} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  width: `${100 / carbonLogs.length - 4}%`,
                  height: '100%'
                }}>
                  {/* Tooltip Label */}
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    color: isToday ? 'hsl(var(--primary-light))' : 'hsl(var(--text-secondary))',
                    marginBottom: '4px'
                  }}>
                    {log.savings}
                  </span>
                  
                  {/* Bar */}
                  <div style={{ 
                    width: '100%', 
                    height: `${heightPct * 0.8}%`, 
                    background: isToday 
                      ? 'linear-gradient(180deg, hsl(var(--primary-light)) 0%, hsl(var(--primary)) 100%)' 
                      : 'linear-gradient(180deg, hsl(var(--bg-surface-hover)) 0%, hsl(var(--border-color)) 100%)',
                    borderRadius: '4px 4px 0 0',
                    marginTop: 'auto',
                    border: isToday ? '1px solid hsl(var(--primary-light))' : '1px solid transparent',
                    cursor: 'pointer',
                    boxShadow: isToday ? '0 0 10px hsl(var(--primary) / 0.3)' : 'none'
                  }}
                  title={`Day: ${log.date}, Score: ${log.score}, Savings: ${log.savings}kg`}
                  ></div>

                  {/* Day Label */}
                  <span style={{ 
                    fontSize: '11px', 
                    color: isToday ? 'hsl(var(--primary-light))' : 'hsl(var(--text-muted))',
                    marginTop: '8px',
                    fontWeight: isToday ? '600' : '400'
                  }}>
                    {log.date.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .coach-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default CarbonCoach;
