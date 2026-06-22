import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  MessageSquare, 
  Leaf, 
  Recycle, 
  TreePine, 
  Footprints, 
  Bell, 
  User, 
  Menu, 
  X,
  Compass,
  Award
} from 'lucide-react';
import { locationsData } from './data/locations';
import MapPanel from './components/MapPanel';
import AIAgent from './components/AIAgent';
import CarbonCoach from './components/CarbonCoach';
import PlantEngine from './components/PlantEngine';
import ThreeRAssistant from './components/ThreeRAssistant';
import TreeIntelligence from './components/TreeIntelligence';

function App() {
  const [currentLocKey, setCurrentLocKey] = useState('suburbs');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(120);
  const [carbonLogs, setCarbonLogs] = useState([
    { date: 'Mon', score: 65, savings: 2.4 },
    { date: 'Tue', score: 72, savings: 2.8 },
    { date: 'Wed', score: 80, savings: 3.5 },
    { date: 'Thu', score: 60, savings: 2.1 },
    { date: 'Fri', score: 85, savings: 4.0 },
    { date: 'Sat', score: 90, savings: 4.8 },
    { date: 'Sun', score: 78, savings: 3.2 }
  ]);

  const currentLocation = locationsData[currentLocKey];

  // Trigger proactive alerts when location changes
  useEffect(() => {
    // Pick the first proactive alert as a welcome notification
    const alerts = currentLocation.proactiveAlerts;
    if (alerts && alerts.length > 0) {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      
      const newNotification = {
        id: Date.now(),
        locationName: currentLocation.name,
        message: randomAlert,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: true
      };

      setNotifications(prev => [newNotification, ...prev]);
      setShowToast(newNotification);

      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentLocKey]);

  const handleNotificationClick = () => {
    setActiveTab('chat');
    // Mark all as read
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getBadgeTitle = (points) => {
    if (points >= 300) return "Master Canopy Guardian";
    if (points >= 200) return "Forest Protector";
    if (points >= 100) return "Green Seedling";
    return "Eco Novice";
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {showToast && (
        <div 
          className="glass-card animate-slide-in pulse-glow" 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            maxWidth: '380px',
            borderLeft: '4px solid hsl(var(--primary))',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            cursor: 'pointer'
          }}
          onClick={handleNotificationClick}
        >
          <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '8px', borderRadius: '8px' }}>
            <Compass size={20} color="hsl(var(--primary-light))" />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '4px', color: 'hsl(var(--primary-light))' }}>
              Proactive Agent Alert • {showToast.locationName}
            </h4>
            <p style={{ fontSize: '13px', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
              "{showToast.message}"
            </p>
          </div>
          <button 
            style={{ background: 'none', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(null);
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{
        transform: isSidebarOpen ? 'translateX(0)' : undefined
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 0 15px hsl(var(--primary) / 0.3)'
          }}>
            <ShieldAlert size={24} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }} className="logo-text">EcoGuardian <span style={{ color: 'hsl(var(--primary-light))' }}>AI</span></h2>
            <span style={{ fontSize: '10px', color: 'hsl(var(--text-muted))', letterSpacing: '0.05em' }} className="logo-text">ENVIRONMENTAL INTELLIGENCE</span>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'hsl(var(--text-muted))', padding: '0 12px 10px', letterSpacing: '0.1em' }} className="nav-text">
            Navigation
          </div>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
            <Compass size={18} />
            <span className="nav-text">Dashboard & Map</span>
          </div>
          <div className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => { setActiveTab('chat'); setIsSidebarOpen(false); }}>
            <MessageSquare size={18} />
            <span className="nav-text">AI Assistant Chat</span>
          </div>
          <div className={`nav-item ${activeTab === 'coach' ? 'active' : ''}`} onClick={() => { setActiveTab('coach'); setIsSidebarOpen(false); }}>
            <Footprints size={18} />
            <span className="nav-text">Carbon Footprint Coach</span>
          </div>
          <div className={`nav-item ${activeTab === 'plants' ? 'active' : ''}`} onClick={() => { setActiveTab('plants'); setIsSidebarOpen(false); }}>
            <Leaf size={18} />
            <span className="nav-text">Plant Recommendations</span>
          </div>
          <div className={`nav-item ${activeTab === '3rs' ? 'active' : ''}`} onClick={() => { setActiveTab('3rs'); setIsSidebarOpen(false); }}>
            <Recycle size={18} />
            <span className="nav-text">Smart 3R Assistant</span>
          </div>
          <div className={`nav-item ${activeTab === 'tree' ? 'active' : ''}`} onClick={() => { setActiveTab('tree'); setIsSidebarOpen(false); }}>
            <TreePine size={18} />
            <span className="nav-text">Tree Plantation Intel</span>
          </div>
        </nav>

        {/* User Card / Gamification Indicator */}
        <div className="glass-card sidebar-footer" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', marginTop: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '6px', borderRadius: '8px' }}>
              <Award size={18} color="hsl(var(--primary-light))" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Badge Level</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'hsl(var(--text-primary))' }}>
                {getBadgeTitle(ecoPoints)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: 'hsl(var(--text-secondary))' }}>Eco Points</span>
              <span style={{ fontWeight: 'bold', color: 'hsl(var(--primary-light))' }}>{ecoPoints} / 300</span>
            </div>
            <div style={{ height: '6px', background: 'hsl(var(--bg-base))', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.min((ecoPoints / 300) * 100, 100)}%`, 
                background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                borderRadius: '3px'
              }}></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          paddingBottom: '16px',
          borderBottom: '1px solid hsl(var(--border-color))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn btn-secondary" 
              style={{ display: 'none', padding: '8px' }} // Toggled on smaller screens
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} color="hsl(var(--primary-light))" /> Current GPS Location
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '700' }}>{currentLocation.name}</h1>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Quick Switch GPS preset */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))' }}>Simulate GPS:</span>
              <select 
                value={currentLocKey} 
                onChange={(e) => setCurrentLocKey(e.target.value)}
                style={{
                  background: 'hsl(var(--bg-surface-hover))',
                  border: '1px solid hsl(var(--border-color))',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  color: 'hsl(var(--text-primary))',
                  outline: 'none',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <option value="suburbs">🏠 Green Meadows (Suburbs)</option>
                <option value="downtown">🏢 Downtown Office (High Pollution)</option>
                <option value="industrial">🏭 Industrial Corridor (Chemical Danger)</option>
                <option value="coastal">🏖️ Coastal Breezes Resort (UV & Tide)</option>
                <option value="wildfire">🔥 Wildfire-Adjacent (Smoke & Heat)</option>
              </select>
            </div>

            {/* Notification Bell */}
            <div 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={handleNotificationClick}
            >
              <div style={{ 
                background: 'hsl(var(--bg-surface-hover))', 
                padding: '10px', 
                borderRadius: '10px',
                border: '1px solid hsl(var(--border-color))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bell size={18} />
              </div>
              {notifications.filter(n => n.unread).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'hsl(var(--danger))',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid hsl(var(--bg-base))'
                }}>
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Alerts Display */}
            {currentLocation.alerts.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentLocation.alerts.map(alert => (
                  <div 
                    key={alert.id}
                    className="glass-card animate-slide-in"
                    style={{
                      padding: '16px 20px',
                      borderLeft: `4px solid ${alert.type === 'danger' ? 'hsl(var(--danger))' : 'hsl(var(--warning))'}`,
                      background: alert.type === 'danger' ? 'hsl(var(--danger) / 0.05)' : 'hsl(var(--warning) / 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <ShieldAlert size={20} color={alert.type === 'danger' ? 'hsl(var(--danger-light))' : 'hsl(var(--warning-light))'} />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{alert.message}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Overview Cards & Interactive Map */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px', flexWrap: 'wrap' }} className="dashboard-grid">
              {/* Left Column: Key Parameters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Weather & AQI Double Card */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* AQI Panel */}
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))' }}>Air Quality Index</h3>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '11px', 
                        fontWeight: 'bold',
                        background: currentLocation.aqi > 150 ? 'hsl(var(--danger) / 0.15)' : currentLocation.aqi > 100 ? 'hsl(var(--warning) / 0.15)' : 'hsl(var(--primary) / 0.15)',
                        color: currentLocation.aqi > 150 ? 'hsl(var(--danger-light))' : currentLocation.aqi > 100 ? 'hsl(var(--warning-light))' : 'hsl(var(--primary-light))',
                        border: `1px solid ${currentLocation.aqi > 150 ? 'hsl(var(--danger) / 0.3)' : currentLocation.aqi > 100 ? 'hsl(var(--warning) / 0.3)' : 'hsl(var(--primary) / 0.3)'}`
                      }}>
                        {currentLocation.aqiLabel}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>
                        {currentLocation.aqi}
                      </span>
                      <span style={{ color: 'hsl(var(--text-muted))', fontSize: '14px' }}>AQI US</span>
                    </div>

                    {/* Pollutant Breakdown bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px', color: 'hsl(var(--text-secondary))' }}>
                        <span>PM2.5 (Fine Dust)</span>
                        <span style={{ fontWeight: 'bold' }}>{currentLocation.pollutants.pm25} µg/m³</span>
                      </div>
                      <div style={{ height: '6px', background: 'hsl(var(--bg-base))', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${Math.min((currentLocation.pollutants.pm25 / 150) * 100, 100)}%`, 
                          background: currentLocation.pollutants.pm25 > 100 ? 'hsl(var(--danger))' : currentLocation.pollutants.pm25 > 35 ? 'hsl(var(--warning))' : 'hsl(var(--primary))'
                        }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '11px', marginTop: '4px', borderTop: '1px solid hsl(var(--border-color))', paddingTop: '12px' }}>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>PM10</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.pollutants.pm10} µg/m³</div>
                      </div>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>CO</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.pollutants.co} ppm</div>
                      </div>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>NO₂</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.pollutants.no2} ppb</div>
                      </div>
                    </div>
                  </div>

                  {/* Weather Panel */}
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))' }}>Weather Status</h3>
                      <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '12px' }}>
                        {currentLocation.weather.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>
                        {currentLocation.weather.temp}
                      </span>
                      <span style={{ fontSize: '24px', fontWeight: '500', color: 'hsl(var(--text-secondary))' }}>°C</span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'hsl(var(--warning-light))', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ⚠️ {currentLocation.weather.heatStress}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '11px', marginTop: 'auto', borderTop: '1px solid hsl(var(--border-color))', paddingTop: '12px' }}>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>Humidity</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.weather.humidity}%</div>
                      </div>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>UV Index</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.weather.uvIndex}</div>
                      </div>
                      <div>
                        <div style={{ color: 'hsl(var(--text-muted))' }}>Wind</div>
                        <div style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.weather.windSpeed} km/h</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Construction & Water Panel Double Card */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Construction Card */}
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '8px' }}>
                      Construction & Dust Activity
                    </h3>
                    {currentLocation.construction.active ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span style={{ color: 'hsl(var(--warning-light))', fontWeight: 'bold' }}>Active:</span>
                          <span style={{ color: 'hsl(var(--text-primary))' }}>{currentLocation.construction.types.join(', ')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'hsl(var(--text-muted))' }}>Dust Level:</span>
                          <span style={{ fontWeight: '600', color: 'hsl(var(--danger-light))' }}>{currentLocation.construction.dustLevel}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'hsl(var(--text-muted))' }}>Noise Level:</span>
                          <span style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>{currentLocation.construction.noiseLevel}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'hsl(var(--text-muted))' }}>Duration:</span>
                          <span style={{ fontStyle: 'italic', color: 'hsl(var(--text-secondary))' }}>{currentLocation.construction.duration}</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'hsl(var(--text-muted))', fontStyle: 'italic', fontSize: '13px', margin: 'auto 0' }}>
                        No construction detected within 500 meters. Clean local surroundings.
                      </div>
                    )}
                  </div>

                  {/* Water Quality Card */}
                  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '8px' }}>
                      Water Quality Monitoring
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'hsl(var(--text-muted))' }}>Local Status:</span>
                        <span style={{ 
                          fontWeight: 'bold', 
                          color: currentLocation.water.safeToDrink ? 'hsl(var(--primary-light))' : 'hsl(var(--danger-light))' 
                        }}>
                          {currentLocation.water.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'hsl(var(--text-muted))' }}>TDS:</span>
                        <span>{currentLocation.water.tds} ppm</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'hsl(var(--text-muted))' }}>pH Value:</span>
                        <span>{currentLocation.water.pH}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px dashed hsl(var(--border-color))', paddingTop: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Precautions:</span>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {currentLocation.water.precautions.map((prec, i) => (
                            <span key={i} style={{ 
                              background: 'rgba(255,255,255,0.05)', 
                              padding: '2px 8px', 
                              borderRadius: '4px', 
                              fontSize: '11px', 
                              color: 'hsl(var(--text-secondary))' 
                            }}>
                              {prec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Map */}
              <div style={{ height: '100%' }}>
                <MapPanel 
                  currentLocKey={currentLocKey} 
                  onSelectLocation={setCurrentLocKey} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <AIAgent 
            currentLocation={currentLocation} 
            notifications={notifications}
            ecoPoints={ecoPoints}
            setEcoPoints={setEcoPoints}
          />
        )}

        {activeTab === 'coach' && (
          <CarbonCoach 
            carbonLogs={carbonLogs} 
            setCarbonLogs={setCarbonLogs}
            ecoPoints={ecoPoints}
            setEcoPoints={setEcoPoints}
          />
        )}

        {activeTab === 'plants' && (
          <PlantEngine 
            currentLocation={currentLocation} 
          />
        )}

        {activeTab === '3rs' && (
          <ThreeRAssistant 
            currentLocation={currentLocation} 
          />
        )}

        {activeTab === 'tree' && (
          <TreeIntelligence 
            currentLocation={currentLocation}
            ecoPoints={ecoPoints}
            setEcoPoints={setEcoPoints}
          />
        )}
      </main>

      {/* CSS overrides for responsive layout */}
      <style>{`
        @media (max-width: 1024px) {
          .sidebar.open {
            transform: translateX(0) !important;
          }
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .main-content {
            margin-left: 0 !important;
          }
          header .btn-secondary {
            display: inline-flex !important;
          }
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 500px) {
          header {
            flex-direction: column;
            align-items: flex-start !important;
          }
          header div {
            width: 100%;
          }
          header select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
