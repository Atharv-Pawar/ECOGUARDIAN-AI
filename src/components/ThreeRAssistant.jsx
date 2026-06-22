import React, { useState } from 'react';
import { Recycle, ArrowDownToLine, RefreshCw, Trash2, MapPin, ExternalLink } from 'lucide-react';

const recyclingCenters = {
  suburbs: [
    { name: "Suburb Organic Compost Hub", type: "Organic / Green Waste", dist: "0.4 km", hours: "8 AM - 6 PM", address: "44 Meadow Lane", phone: "+1 (555) 234-8901" },
    { name: "Paper & Cardboard Depot", type: "Paper", dist: "1.2 km", hours: "9 AM - 5 PM", address: "102 Pine Street", phone: "+1 (555) 234-8902" },
    { name: "Standard Community Bins", type: "Plastic / Glass / Metal", dist: "0.2 km", hours: "24 / 7 Open", address: "Green Meadows Plaza", phone: "N/A" }
  ],
  downtown: [
    { name: "Downtown E-Waste Recycling", type: "Electronics / Batteries", dist: "0.3 km", hours: "10 AM - 7 PM", address: "300 Broadway Ave", phone: "+1 (555) 890-4321" },
    { name: "Office District Bottle return", type: "Glass / Aluminium", dist: "0.5 km", hours: "8 AM - 8 PM", address: "55 Wall Street", phone: "+1 (555) 890-4322" },
    { name: "Metro Plastic Collection Drive", type: "Plastic Bags / Bottles", dist: "0.1 km", hours: "9 AM - 4 PM", address: "Broadway Metro Station Entrance", phone: "N/A" }
  ],
  industrial: [
    { name: "Heavy Metal Reclamation Yard", type: "Scrap Iron / Copper / Cables", dist: "0.8 km", hours: "7 AM - 4 PM", address: "Factory Road Lane 4", phone: "+1 (555) 456-1122" },
    { name: "Industrial Chemical Safe Disposal", type: "Solvents / Paint / Batteries", dist: "1.1 km", hours: "8 AM - 5 PM", address: "Chemical Ring Road", phone: "+1 (555) 456-1123" }
  ],
  coastal: [
    { name: "Ocean Plastic Clean Hub", type: "Marine Plastic / Fishing nets", dist: "0.1 km", hours: "6 AM - 2 PM", address: "Sandy Beach Patrol Office", phone: "+1 (555) 300-8800" },
    { name: "Coastal Glass Bottle Collector", type: "Glass Bottles / Jars", dist: "0.4 km", hours: "9 AM - 6 PM", address: "Seaside Boardwalk Bvd", phone: "+1 (555) 300-8801" }
  ],
  wildfire: [
    { name: "Forest Restoration Charcoal Site", type: "Dry Timber / Ash residues", dist: "1.5 km", hours: "8 AM - 4 PM", address: "Forest Margin Road", phone: "+1 (555) 777-9900" },
    { name: "Marginal E-Waste Hub", type: "Household Electronics", dist: "2.3 km", hours: "9 AM - 5 PM", address: "Community Hall Center", phone: "+1 (555) 777-9901" }
  ]
};

function ThreeRAssistant({ currentLocation }) {
  const [reduceTasks, setReduceTasks] = useState([
    { id: 1, text: "Avoided single-use plastics (water bottles, straws, carrier bags)", done: false },
    { id: 2, text: "Reduced electricity usage (shut off lights/AC in empty rooms)", done: false },
    { id: 3, text: "Reduced paper waste (requested e-bills, printed double-sided)", done: false }
  ]);

  const [reuseTasks, setReuseTasks] = useState([
    { id: 1, text: "Donated old electronics/cables to educational bootcamps", done: false },
    { id: 2, text: "Reused food containers/glass jars for storage", done: false },
    { id: 3, text: "Carried and refilled a personal steel water bottle", done: false }
  ]);

  const [simulatedDirections, setSimulatedDirections] = useState(null);

  const toggleReduce = (id) => {
    setReduceTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const toggleReuse = (id) => {
    setReuseTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleGetDirections = (centerName) => {
    setSimulatedDirections(`Simulating GPS route to: "${centerName}". Turn right on Main St in 200m...`);
    setTimeout(() => {
      setSimulatedDirections(null);
    }, 4000);
  };

  const activeCenters = recyclingCenters[currentLocation.id] || [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', flexWrap: 'wrap' }} className="assistant-3r-grid">
      
      {/* Left Panel: Reduce & Reuse Checklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Reduce Section */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '10px' }}>
            <div style={{ background: 'hsl(var(--danger) / 0.1)', padding: '6px', borderRadius: '8px' }}>
              <ArrowDownToLine size={18} color="hsl(var(--danger-light))" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>1. Reduce Action List</h3>
              <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Avoid producing garbage at the source</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reduceTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => toggleReduce(task.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  cursor: 'pointer', 
                  background: 'rgba(255,255,255,0.02)', 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  border: '1px solid rgba(255,255,255,0.04)' 
                }}
              >
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid hsl(var(--border-color))',
                  background: task.done ? 'hsl(var(--danger))' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {task.done && <CheckCircle2 size={12} color="#fff" />}
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? 'hsl(var(--text-muted))' : 'hsl(var(--text-primary))'
                }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reuse Section */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '10px' }}>
            <div style={{ background: 'hsl(var(--secondary) / 0.1)', padding: '6px', borderRadius: '8px' }}>
              <RefreshCw size={18} color="hsl(var(--secondary-light))" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>2. Reuse Action List</h3>
              <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Extend the life cycle of products</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reuseTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => toggleReuse(task.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  cursor: 'pointer', 
                  background: 'rgba(255,255,255,0.02)', 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  border: '1px solid rgba(255,255,255,0.04)' 
                }}
              >
                <div style={{ 
                  width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid hsl(var(--border-color))',
                  background: task.done ? 'hsl(var(--secondary))' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {task.done && <CheckCircle2 size={12} color="#fff" />}
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? 'hsl(var(--text-muted))' : 'hsl(var(--text-primary))'
                }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Recycle Centers directory */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
          <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '6px', borderRadius: '8px' }}>
            <Recycle size={18} color="hsl(var(--primary-light))" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>3. Locate Recycle Hubs</h3>
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Nearby facilities based on GPS location</p>
          </div>
        </div>

        {simulatedDirections && (
          <div style={{ background: 'hsl(var(--primary) / 0.08)', border: '1px solid hsl(var(--primary) / 0.3)', color: 'hsl(var(--primary-light))', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', animation: 'slideIn 0.2s ease' }}>
            {simulatedDirections}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          {activeCenters.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'hsl(var(--text-muted))', fontStyle: 'italic', fontSize: '13px', margin: 'auto' }}>
              No recycling facilities tracked in this zone.
            </div>
          ) : (
            activeCenters.map((center, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: '10px', 
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{center.name}</h4>
                    <span style={{ fontSize: '10px', color: 'hsl(var(--primary-light))', background: 'hsl(var(--primary) / 0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                      {center.type}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'hsl(var(--secondary-light))', whiteSpace: 'nowrap' }}>
                    📍 {center.dist}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px', color: 'hsl(var(--text-muted))', marginTop: '4px' }}>
                  <div>🕒 Hours: {center.hours}</div>
                  <div>🏠 Address: {center.address}</div>
                  {center.phone !== 'N/A' && <div>📞 Phone: {center.phone}</div>}
                </div>

                <button 
                  onClick={() => handleGetDirections(center.name)}
                  className="btn btn-secondary" 
                  style={{ 
                    marginTop: '8px', 
                    padding: '6px 10px', 
                    fontSize: '11px', 
                    alignSelf: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Get Route <ExternalLink size={10} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .assistant-3r-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ThreeRAssistant;
