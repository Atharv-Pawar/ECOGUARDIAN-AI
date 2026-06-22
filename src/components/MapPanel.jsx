import React from 'react';
import { MapPin, Navigation, Info, TreePine } from 'lucide-react';

function MapPanel({ currentLocKey, onSelectLocation }) {
  const zones = [
    {
      key: 'suburbs',
      name: 'Green Meadows (Suburbs)',
      x: 120,
      y: 120,
      color: 'hsl(150, 84%, 47%)',
      fill: 'rgba(16, 185, 129, 0.15)',
      stroke: 'rgba(16, 185, 129, 0.4)',
      icon: '🏡',
      desc: 'Residential zone with high green canopy.'
    },
    {
      key: 'downtown',
      name: 'Downtown Office District',
      x: 320,
      y: 150,
      color: 'hsl(35, 92%, 50%)',
      fill: 'rgba(245, 158, 11, 0.15)',
      stroke: 'rgba(245, 158, 11, 0.4)',
      icon: '🏢',
      desc: 'Active construction, heavy traffic flow.'
    },
    {
      key: 'industrial',
      name: 'Industrial Corridor',
      x: 350,
      y: 350,
      color: 'hsl(0, 84%, 60%)',
      fill: 'rgba(239, 68, 68, 0.15)',
      stroke: 'rgba(239, 68, 68, 0.4)',
      icon: '🏭',
      desc: 'Heavy industry, runoff warnings, noise.'
    },
    {
      key: 'coastal',
      name: 'Coastal Breezes Resort',
      x: 150,
      y: 380,
      color: 'hsl(190, 90%, 50%)',
      fill: 'rgba(6, 182, 212, 0.15)',
      stroke: 'rgba(6, 182, 212, 0.4)',
      icon: '🏖️',
      desc: 'Coastal area. Extreme UV & tide alerts.'
    },
    {
      key: 'wildfire',
      name: 'Wildfire Forest Margin',
      x: 80,
      y: 250,
      color: 'hsl(0, 84%, 60%)',
      fill: 'rgba(220, 38, 38, 0.25)',
      stroke: 'rgba(220, 38, 38, 0.5)',
      icon: '🔥',
      desc: 'High heat stress, wildfire ash & dust.'
    }
  ];

  const activeZone = zones.find(z => z.key === currentLocKey) || zones[0];

  return (
    <div className="glass-card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      height: '100%',
      minHeight: '480px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600' }}>EcoCity Interactive Map</h3>
          <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Click on a zone to update your GPS location</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'hsl(var(--primary-light))', background: 'hsl(var(--primary) / 0.1)', padding: '4px 10px', borderRadius: '20px' }}>
          <Navigation size={12} className="pulse-glow" /> GPS Connected
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div style={{ 
        position: 'relative', 
        background: '#0b1329', 
        borderRadius: '12px', 
        border: '1px solid hsl(var(--border-color))',
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Vector Background Grid Gridlines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          
          {/* Simulated Rivers or Trails */}
          <path d="M 0,200 Q 150,180 250,280 T 500,450" fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="8" />
          <path d="M 250,0 Q 200,100 350,220 T 500,300" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="12" />
        </svg>

        {/* Dynamic Zone Boundaries */}
        <svg viewBox="0 0 450 450" style={{ width: '100%', height: '100%', maxWidth: '450px', maxHeight: '450px', zIndex: 1 }}>
          {zones.map((zone) => {
            const isActive = zone.key === currentLocKey;
            return (
              <g 
                key={zone.key} 
                onClick={() => onSelectLocation(zone.key)}
                style={{ cursor: 'pointer' }}
              >
                {/* Zone Area Overlay */}
                <circle 
                  cx={zone.x} 
                  cy={zone.y} 
                  r="65" 
                  fill={zone.fill} 
                  stroke={isActive ? 'hsl(var(--primary-light))' : zone.stroke}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? '4,4' : 'none'}
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                />
                
                {/* Active Glow Ring */}
                {isActive && (
                  <circle 
                    cx={zone.x} 
                    cy={zone.y} 
                    r="75" 
                    fill="none" 
                    stroke="hsl(var(--primary-light))" 
                    strokeWidth="1" 
                    opacity="0.3"
                    className="pulse-glow"
                  />
                )}

                {/* Marker Node */}
                <g transform={`translate(${zone.x - 14}, ${zone.y - 14})`}>
                  <circle 
                    cx="14" 
                    cy="14" 
                    r="14" 
                    fill={isActive ? 'hsl(var(--primary))' : 'hsl(var(--bg-surface))'}
                    stroke={isActive ? '#fff' : 'rgba(255,255,255,0.15)'}
                    strokeWidth="1.5"
                    style={{ filter: isActive ? 'drop-shadow(0 0 6px hsl(var(--primary) / 0.5))' : 'none' }}
                  />
                  <text 
                    x="14" 
                    y="19" 
                    textAnchor="middle" 
                    fontSize="13"
                    style={{ userSelect: 'none' }}
                  >
                    {zone.icon}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Connected Lines showing GPS path */}
          <line 
            x1={zones.find(z => z.key === 'suburbs').x} 
            y1={zones.find(z => z.key === 'suburbs').y} 
            x2={zones.find(z => z.key === 'downtown').x} 
            y2={zones.find(z => z.key === 'downtown').y} 
            stroke="rgba(255,255,255,0.04)" 
            strokeDasharray="5,5" 
          />
          <line 
            x1={zones.find(z => z.key === 'downtown').x} 
            y1={zones.find(z => z.key === 'downtown').y} 
            x2={zones.find(z => z.key === 'industrial').x} 
            y2={zones.find(z => z.key === 'industrial').y} 
            stroke="rgba(255,255,255,0.04)" 
            strokeDasharray="5,5" 
          />
        </svg>

        {/* Floating Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          zIndex: 5
        }}>
          <div style={{ fontSize: '20px' }}>{activeZone.icon}</div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>{activeZone.name}</h4>
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>{activeZone.desc}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid under Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TreePine size={20} color="hsl(var(--primary-light))" />
          <div>
            <div style={{ fontSize: '10px', color: 'hsl(var(--text-muted))' }}>Green Cover</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{currentLocKey === 'wildfire' ? '22% (-18% loss)' : `${activeZone.key === 'suburbs' ? 58 : activeZone.key === 'coastal' ? 40 : activeZone.key === 'downtown' ? 12 : 8}%`}</div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={20} color="hsl(var(--secondary-light))" />
          <div>
            <div style={{ fontSize: '10px', color: 'hsl(var(--text-muted))' }}>Coordinates</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{activeZone.x.toFixed(1)}°N, {activeZone.y.toFixed(1)}°W</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPanel;
