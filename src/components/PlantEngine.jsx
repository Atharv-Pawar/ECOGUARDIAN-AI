import React, { useState } from 'react';
import { Leaf, Info, Filter, CheckCircle2 } from 'lucide-react';

const plantsData = [
  {
    name: "Snake Plant",
    scientific: "Sansevieria trifasciata",
    emoji: "🪴",
    placement: "indoor",
    benefit: "chemical",
    care: "low",
    why: "Absorbs nitrogen oxides, formaldehyde, and benzene. Releases oxygen at night, making it perfect for office desks or bedrooms.",
    oxygen: 85,
    absorption: 90,
    suitedFor: ["downtown", "industrial"]
  },
  {
    name: "Areca Palm",
    scientific: "Dypsis lutescens",
    emoji: "🌴",
    placement: "indoor",
    benefit: "oxygen",
    care: "moderate",
    why: "Acts as a natural humidifier. Highly efficient at removing general toxins and producing high volumes of oxygen during daylight.",
    oxygen: 95,
    absorption: 75,
    suitedFor: ["downtown", "wildfire"]
  },
  {
    name: "Neem Tree",
    scientific: "Azadirachta indica",
    emoji: "🌳",
    placement: "outdoor",
    benefit: "dust",
    care: "low",
    why: "Filters heavy ambient dust, sulfur dioxide (SO₂), and nitrogen dioxide (NO₂). Perfect for roadside plantation near construction sites.",
    oxygen: 90,
    absorption: 95,
    suitedFor: ["downtown", "industrial"]
  },
  {
    name: "Peepal Tree",
    scientific: "Ficus religiosa",
    emoji: "🌱",
    placement: "outdoor",
    benefit: "oxygen",
    care: "low",
    why: "Performs Crassulacean Acid Metabolism (CAM), releasing oxygen 24 hours a day. Excellent shade provider that reduces urban heat islands.",
    oxygen: 98,
    absorption: 80,
    suitedFor: ["wildfire", "suburbs"]
  },
  {
    name: "Tulsi (Holy Basil)",
    scientific: "Ocimum tenuiflorum",
    emoji: "🌿",
    placement: "both",
    benefit: "chemical",
    care: "moderate",
    why: "Emits oxygen for 20 hours a day and absorbs carbon dioxide, carbon monoxide, and sulfur dioxide. Has natural antibacterial properties.",
    oxygen: 88,
    absorption: 82,
    suitedFor: ["suburbs", "coastal"]
  },
  {
    name: "Bamboo Palm",
    scientific: "Chamaedorea seifrizii",
    emoji: "🎋",
    placement: "indoor",
    benefit: "chemical",
    care: "moderate",
    why: "Superb filter for trichloroethylene and benzene. Excellent for indoor spaces with synthetic carpets or office print rooms.",
    oxygen: 80,
    absorption: 85,
    suitedFor: ["downtown"]
  },
  {
    name: "Aloe Vera",
    scientific: "Aloe barbadensis",
    emoji: "🌵",
    placement: "both",
    benefit: "chemical",
    care: "low",
    why: "Filters formaldehyde and benzene. Its leaves show brown spots when indoor air pollution levels become excessively high, serving as a bio-indicator.",
    oxygen: 75,
    absorption: 78,
    suitedFor: ["coastal", "suburbs"]
  },
  {
    name: "Money Plant",
    scientific: "Epipremnum aureum",
    emoji: "🍀",
    placement: "indoor",
    benefit: "dust",
    care: "low",
    why: "Efficiently absorbs volatile organic compounds (VOCs) and synthetic dust particles from air conditioners and paints.",
    oxygen: 72,
    absorption: 80,
    suitedFor: ["downtown", "industrial"]
  }
];

function PlantEngine({ currentLocation }) {
  const [placementFilter, setPlacementFilter] = useState('all'); // all, indoor, outdoor
  const [benefitFilter, setBenefitFilter] = useState('all'); // all, dust, chemical, oxygen
  const [careFilter, setCareFilter] = useState('all'); // all, low, moderate

  const filteredPlants = plantsData.filter(plant => {
    const matchesPlacement = placementFilter === 'all' 
      || plant.placement === placementFilter 
      || plant.placement === 'both';
    const matchesBenefit = benefitFilter === 'all' || plant.benefit === benefitFilter;
    const matchesCare = careFilter === 'all' || plant.care === careFilter;
    return matchesPlacement && matchesBenefit && matchesCare;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Description Header */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '10px', borderRadius: '12px' }}>
            <Leaf size={24} color="hsl(var(--primary-light))" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Plant Recommendation Engine</h2>
            <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Discover plants that reduce air pollution and heat stress at your location</p>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed hsl(var(--border-color))', padding: '8px 16px', borderRadius: '10px', fontSize: '13px' }}>
          📍 Suited for current zone: <strong style={{ color: 'hsl(var(--primary-light))' }}>{currentLocation.name}</strong>
        </div>
      </div>

      {/* Filters Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={16} color="hsl(var(--secondary-light))" /> Filter Recommendations
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', flexWrap: 'wrap' }} className="filter-grid">
          {/* Placement */}
          <div>
            <label style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', display: 'block', marginBottom: '8px' }}>Placement</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                type="button"
                className={`btn ${placementFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPlacementFilter('all')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                All
              </button>
              <button 
                type="button"
                className={`btn ${placementFilter === 'indoor' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPlacementFilter('indoor')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                Indoor
              </button>
              <button 
                type="button"
                className={`btn ${placementFilter === 'outdoor' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPlacementFilter('outdoor')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                Outdoor
              </button>
            </div>
          </div>

          {/* Benefit Focus */}
          <div>
            <label style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', display: 'block', marginBottom: '8px' }}>Primary Benefit</label>
            <select
              value={benefitFilter}
              onChange={(e) => setBenefitFilter(e.target.value)}
              style={{
                width: '100%',
                background: 'hsl(var(--bg-surface-hover))',
                border: '1px solid hsl(var(--border-color))',
                padding: '8px 12px',
                borderRadius: '8px',
                color: 'hsl(var(--text-primary))',
                outline: 'none',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <option value="all">🌿 All Benefits</option>
              <option value="dust">🌪️ Dust & PM Filter</option>
              <option value="chemical">🧪 Toxin / Chemical Absorber</option>
              <option value="oxygen">💨 Maximum Oxygen Yield</option>
            </select>
          </div>

          {/* Care Level */}
          <div>
            <label style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', display: 'block', marginBottom: '8px' }}>Care Level</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                type="button"
                className={`btn ${careFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCareFilter('all')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                All
              </button>
              <button 
                type="button"
                className={`btn ${careFilter === 'low' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCareFilter('low')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                Low Care
              </button>
              <button 
                type="button"
                className={`btn ${careFilter === 'moderate' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCareFilter('moderate')}
                style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
              >
                Moderate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Plants */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredPlants.map((plant, index) => {
          const isSuited = plant.suitedFor.includes(currentLocation.id);
          
          return (
            <div 
              key={index} 
              className={`glass-card ${isSuited ? 'pulse-glow' : ''}`}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '14px',
                border: isSuited ? '1px solid hsl(var(--primary) / 0.4)' : undefined,
                position: 'relative'
              }}
            >
              {/* Suited Tag */}
              {isSuited && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-10px', 
                  left: '16px', 
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                  padding: '2px 10px',
                  borderRadius: '10px',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  LOCATION RECOMMENDED
                </span>
              )}

              {/* Plant Identity */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '32px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {plant.emoji}
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{plant.name}</h4>
                  <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', fontStyle: 'italic' }}>{plant.scientific}</span>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.04)', color: 'hsl(var(--text-secondary))', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', textTransform: 'capitalize' }}>
                  📂 {plant.placement}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.04)', color: 'hsl(var(--text-secondary))', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>
                  🛠️ Care: {plant.care}
                </span>
                <span style={{ 
                  background: plant.benefit === 'dust' ? 'hsl(var(--warning) / 0.1)' : plant.benefit === 'chemical' ? 'hsl(var(--danger) / 0.1)' : 'hsl(var(--primary) / 0.1)', 
                  color: plant.benefit === 'dust' ? 'hsl(var(--warning-light))' : plant.benefit === 'chemical' ? 'hsl(var(--danger-light))' : 'hsl(var(--primary-light))', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {plant.benefit === 'dust' ? '🌪️ Dust Filter' : plant.benefit === 'chemical' ? '🧪 Toxin Filter' : '💨 High Oxygen'}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                {plant.why}
              </p>

              {/* Progress bars for benefits */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid hsl(var(--border-color))', paddingTop: '12px', marginTop: 'auto' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', color: 'hsl(var(--text-secondary))' }}>
                    <span>Oxygen Output</span>
                    <span style={{ fontWeight: 'bold' }}>{plant.oxygen}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'hsl(var(--bg-base))', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${plant.oxygen}%`, background: 'hsl(var(--primary-light))' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px', color: 'hsl(var(--text-secondary))' }}>
                    <span>Pollution Absorption</span>
                    <span style={{ fontWeight: 'bold' }}>{plant.absorption}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'hsl(var(--bg-base))', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${plant.absorption}%`, background: 'hsl(var(--secondary-light))' }}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PlantEngine;
