import React, { useState } from 'react';
import { TreePine, Trophy, Droplet, Sprout, ShieldCheck, Sun } from 'lucide-react';

const neighborhoodData = [
  { rank: 1, name: "Sarah GreenField", trees: 42, points: 680, badge: "Master Canopy Guardian" },
  { rank: 2, name: "David Miller", trees: 28, points: 410, badge: "Forest Protector" },
  { rank: 3, name: "You", trees: 12, points: 120, badge: "Green Seedling", isUser: true },
  { rank: 4, name: "Elena Rostova", trees: 9, points: 95, badge: "Eco Novice" },
  { rank: 5, name: "Marcus Chen", trees: 7, points: 80, badge: "Eco Novice" }
];

const treeCampaigns = {
  suburbs: [
    { name: "Meadow Canopy Expansion Drive", date: "June 28, 2026", organizer: "Green Suburb Council", goal: "Plant 200 Maple saplings" },
    { name: "Home Garden Seed Sharing", date: "July 02, 2026", organizer: "Local Botanical Club", goal: "Distribute 500 organic seeds" }
  ],
  downtown: [
    { name: "Downtown Office Roof-Greening Initiative", date: "July 05, 2026", organizer: "City Municipal Corp", goal: "Sow 100 indoor air-filtering plants" },
    { name: "Broadway Dust-Block Plantation Drive", date: "July 12, 2026", organizer: "EcoShield NGO", goal: "Plant 50 Neem/Ficus trees near metro corridor" }
  ],
  industrial: [
    { name: "Green Buffer Zone Campaign", date: "July 19, 2026", organizer: "Industrial Association", goal: "Plant 300 pollutant-absorbing trees" }
  ],
  coastal: [
    { name: "Beach Dune Stabilization Drive", date: "June 29, 2026", organizer: "Coastal Protection Agency", goal: "Plant 400 mangrove/sand binder shrubs" }
  ],
  wildfire: [
    { name: "Forest Ash Restoration Campaign", date: "July 15, 2026", organizer: "State Forest Department", goal: "Replant 1000 native pine saplings" }
  ]
};

function TreeIntelligence({ currentLocation, ecoPoints, setEcoPoints }) {
  const [treeStage, setTreeStage] = useState(0); // 0: seed, 1: sprouted, 2: sapling, 3: tree
  const [growthPoints, setGrowthPoints] = useState(0); // 0 to 100
  const [plantedCount, setPlantedCount] = useState(12);

  const activeCampaigns = treeCampaigns[currentLocation.id] || [];

  const handleNurture = (type) => {
    if (treeStage === 3) return;

    let increment = 0;
    if (type === 'water') increment = 25;
    if (type === 'sun') increment = 35;
    if (type === 'soil') increment = 40;

    const nextPoints = growthPoints + increment;
    if (nextPoints >= 100) {
      if (treeStage < 2) {
        setTreeStage(prev => prev + 1);
        setGrowthPoints(nextPoints - 100);
      } else {
        // Complete mature tree
        setTreeStage(3);
        setGrowthPoints(100);
        setPlantedCount(prev => prev + 1);
        setEcoPoints(prev => prev + 30);
      }
    } else {
      setGrowthPoints(nextPoints);
    }
  };

  const handleResetTree = () => {
    setTreeStage(0);
    setGrowthPoints(0);
  };

  const getTreeVisual = () => {
    switch (treeStage) {
      case 0:
        return { emoji: "🟤", label: "Seed in Soil", size: "32px", color: "#78350f" };
      case 1:
        return { emoji: "🌱", label: "Sprout", size: "48px", color: "#10b981" };
      case 2:
        return { emoji: "🌿", label: "Young Sapling", size: "64px", color: "#059669" };
      case 3:
        return { emoji: "🌳", label: "Mature Protector Tree", size: "84px", color: "#047857" };
      default:
        return { emoji: "🟤", label: "Seed", size: "32px", color: "#78350f" };
    }
  };

  const treeVisual = getTreeVisual();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', flexWrap: 'wrap' }} className="tree-intel-grid">
      
      {/* Left Column: Canopy Stats & Virtual Planting */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Canopy Assessment Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
            <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '6px', borderRadius: '8px' }}>
              <TreePine size={18} color="hsl(var(--primary-light))" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Local Green Canopy intelligence</h3>
              <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Satellite analysis for your current GPS location</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '10px', color: 'hsl(var(--text-muted))' }}>CANOPY INDEX</span>
              <span style={{ fontSize: '36px', fontWeight: '800', fontFamily: 'Outfit, sans-serif', color: currentLocation.greenCover < 15 ? 'hsl(var(--danger-light))' : 'hsl(var(--primary-light))' }}>
                {currentLocation.greenCover}%
              </span>
              <span style={{ fontSize: '11px', fontWeight: '500', color: currentLocation.greenCover < 15 ? 'hsl(var(--danger-light))' : 'hsl(var(--primary-light))' }}>
                {currentLocation.greenCover < 15 ? 'Critical (Heat Island)' : 'Moderate Coverage'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', fontSize: '12px' }}>
              <div>🌲 <strong>Best Species:</strong> {currentLocation.id === 'coastal' ? 'Mangroves, Palms, Salt-bush' : currentLocation.id === 'industrial' ? 'Neem, Ashoka, Banyan (heavy filtering)' : 'Neem, Peepal, Tulsi'}</div>
              <div>📅 <strong>Best Season:</strong> Monsoon / Early Spring</div>
              <div>⚡ <strong>Heat mitigation potential:</strong> {currentLocation.greenCover < 15 ? 'High (Sowing trees reduces local temperatures by up to 3°C)' : 'Moderate'}</div>
            </div>
          </div>
        </div>

        {/* Virtual Tree Gamification */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
          <div style={{ textAlign: 'center', borderBottom: '1px solid hsl(var(--border-color))', width: '100%', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>🌱 Plant a Virtual Tree</h3>
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Nurture your seedling to maturity and earn +30 Eco Points!</p>
          </div>

          {/* Growing Plant Showcase */}
          <div style={{ 
            height: '140px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            width: '100%'
          }}>
            {/* Background rays or glows */}
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }} />

            <div style={{ 
              fontSize: treeVisual.size,
              transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'scale(1)',
              filter: `drop-shadow(0 0 10px ${treeVisual.color}40)`,
              zIndex: 2
            }}>
              {treeVisual.emoji}
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>
              <span>Tree Stage: <strong>{treeVisual.label}</strong></span>
              <span>{growthPoints}% Grown</span>
            </div>
            <div style={{ height: '6px', background: 'hsl(var(--bg-base))', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${treeStage === 3 ? 100 : growthPoints}%`, 
                background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                transition: 'width 0.4s ease'
              }}></div>
            </div>
          </div>

          {treeStage < 3 ? (
            <div style={{ display: 'flex', gap: '10px', width: '100%', padding: '0 20px' }}>
              <button 
                onClick={() => handleNurture('water')}
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '11px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <Droplet size={14} color="hsl(var(--secondary-light))" /> Water (+25)
              </button>
              <button 
                onClick={() => handleNurture('sun')}
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '11px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <Sun size={14} color="hsl(var(--warning-light))" /> Sunshine (+35)
              </button>
              <button 
                onClick={() => handleNurture('soil')}
                className="btn btn-secondary" 
                style={{ flex: 1, fontSize: '11px', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
              >
                <Sprout size={14} color="hsl(var(--primary-light))" /> Fertilize (+40)
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%', padding: '0 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--primary-light))', fontSize: '13px', fontWeight: 'bold' }}>
                <ShieldCheck size={18} /> Tree Fully Grown & Dedicated! (+30 Eco Points Earned)
              </div>
              <button 
                onClick={handleResetTree}
                className="btn btn-primary"
                style={{ fontSize: '12px', padding: '8px 16px' }}
              >
                Plant Another Seedling
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Leaderboard & Community Campaigns */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Neighborhood Leaderboard */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
            <Trophy size={18} color="hsl(var(--warning-light))" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Guardian Leaderboard</h3>
              <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Top environmental protectors in this region</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {neighborhoodData.map((user) => {
              const displayPoints = user.isUser ? ecoPoints : user.points;
              const displayTrees = user.isUser ? plantedCount : user.trees;
              return (
                <div 
                  key={user.rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: user.isUser ? 'hsl(var(--primary) / 0.1)' : 'rgba(255,255,255,0.01)',
                    border: user.isUser ? '1px solid hsl(var(--primary) / 0.3)' : '1px solid rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: user.rank === 1 ? 'hsl(var(--warning) / 0.2)' : user.rank === 2 ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: user.rank === 1 ? 'hsl(var(--warning-light))' : '#fff',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {user.rank}
                    </span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                        {user.name} {user.isUser && " (You)"}
                      </div>
                      <div style={{ fontSize: '9px', color: 'hsl(var(--text-muted))' }}>{user.badge}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'hsl(var(--primary-light))' }}>
                      🌳 {displayTrees} Trees
                    </div>
                    <div style={{ fontSize: '10px', color: 'hsl(var(--text-muted))' }}>{displayPoints} pts</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Campaigns list */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '8px' }}>
            📅 Nearby Greening Campaigns
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeCampaigns.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', fontStyle: 'italic', padding: '10px 0' }}>
                No active drives cataloged for this location yet. Check back during monsoon!
              </div>
            ) : (
              activeCampaigns.map((camp, i) => (
                <div 
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'hsl(var(--text-primary))' }}>{camp.name}</h4>
                  </div>
                  <div style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div>📅 Date: <strong style={{ color: 'hsl(var(--secondary-light))' }}>{camp.date}</strong></div>
                    <div>🏢 Organizer: {camp.organizer}</div>
                    <div>🎯 Goal: {camp.goal}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tree-intel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default TreeIntelligence;
