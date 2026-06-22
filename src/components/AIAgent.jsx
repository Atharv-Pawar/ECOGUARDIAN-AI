import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Bell, Info, ShieldAlert, Zap } from 'lucide-react';

function AIAgent({ currentLocation, notifications, ecoPoints, setEcoPoints }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am EcoGuardian, your autonomous environmental intelligence agent. I continuously monitor your surroundings at ${currentLocation.name}. How can I assist you in staying safe or green today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle location update greeting
  useEffect(() => {
    // Add a system update in chat when location changes
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'system',
        text: `GPS Location updated to: ${currentLocation.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: `I've analyzed the environment at ${currentLocation.name}. Today's AQI is ${currentLocation.aqi} (${currentLocation.aqiLabel}) and the weather is ${currentLocation.weather.status} (${currentLocation.weather.temp}°C). ${currentLocation.alerts.length > 0 ? "I've detected some environmental alerts. Ask me for details!" : "Conditions look stable here."}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentLocation.id]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    // Check keywords
    if (q.includes('aqi') || q.includes('air quality') || q.includes('pollution') || q.includes('breathe') || q.includes('pm2.5')) {
      return `At ${currentLocation.name}, the Air Quality Index is currently ${currentLocation.aqi} (${currentLocation.aqiLabel}). 
      - PM2.5: ${currentLocation.pollutants.pm25} µg/m³
      - PM10: ${currentLocation.pollutants.pm10} µg/m³
      - NO₂: ${currentLocation.pollutants.no2} ppb.
      
      Health Advice: ${currentLocation.aqi > 150 ? 'Wear an N95 mask if outdoors, keep windows closed, run an air purifier on high, and avoid vigorous exercise.' : 'AQI is acceptable. Feel free to enjoy outdoor activities.'}`;
    }

    if (q.includes('weather') || q.includes('temperature') || q.includes('hot') || q.includes('cold') || q.includes('heat') || q.includes('rain')) {
      return `Here is the current weather analysis for ${currentLocation.name}:
      - Temp: ${currentLocation.weather.temp}°C
      - Condition: ${currentLocation.weather.status}
      - Humidity: ${currentLocation.weather.humidity}%
      - UV Index: ${currentLocation.weather.uvIndex} (Extreme is 11+)
      - Heat Stress: ${currentLocation.weather.heatStress}.
      
      Recommended preparation: Carry electrolytes, stay hydrated, and wear UV protection if the index is high!`;
    }

    if (q.includes('water') || q.includes('drink') || q.includes('tds') || q.includes('pH')) {
      return `Water quality assessment at ${currentLocation.name}:
      - Status: ${currentLocation.water.status}
      - TDS: ${currentLocation.water.tds} ppm
      - pH level: ${currentLocation.water.pH}
      - Contamination Level: ${currentLocation.water.contaminationLevel}.
      
      Safety Recommendations: ${currentLocation.water.safeToDrink ? 'Standard tap water is safe to drink.' : `Do NOT drink directly. ${currentLocation.water.precautions.join(', ')}.`}`;
    }

    if (q.includes('construction') || q.includes('dust') || q.includes('noise') || q.includes('loud')) {
      if (currentLocation.construction.active) {
        return `Yes, I am monitoring construction within your immediate vicinity:
        - Work site: ${currentLocation.construction.types.join(' and ')}
        - Dust concentration: ${currentLocation.construction.dustLevel}
        - Ambient noise: ${currentLocation.construction.noiseLevel}
        
        Travel Tip: Consider alternate routes to bypass Broadway to avoid inhaling construction dust. Best travel hours to minimize exposure are early morning or post 6 PM.`;
      } else {
        return `There is no active construction or dust advisory recorded within 500 meters of your location. The background noise is currently ${currentLocation.construction.noiseLevel} (Quiet).`;
      }
    }

    if (q.includes('plant') || q.includes('snake plant') || q.includes('neem') || q.includes('tulsi') || q.includes('flora')) {
      return `Based on the environmental characteristics here (${currentLocation.name}), I highly recommend planting:
      1. **Snake Plant** (Indoor): Excellent at filtering particulate matter, absorbs formaldehyde and benzene. Low maintenance.
      2. **Tulsi / Holy Basil** (Outdoor/Balcony): Increases oxygen supply and naturally repels insects.
      3. **Neem Tree** (Outdoor): Great for roadside zones to block dust and absorb SO₂.
      
      Would you like to head to the 'Plant Recommendations' tab to filter specific plant types?`;
    }

    if (q.includes('carbon') || q.includes('co2') || q.includes('sustainability') || q.includes('footprint')) {
      return `Your daily habits are the key to reducing carbon emissions. By logging actions in our Carbon Footprint Coach:
      - Switching drive to walk/bike saves approx. 0.4 kg CO₂ per km.
      - Toggling electricity conservation reduces 0.8 kg CO₂ daily.
      
      Try logging your habits in the Carbon Footprint tab to view your weekly savings and build an active sustainability schedule.`;
    }

    if (q.includes('3r') || q.includes('recycle') || q.includes('reuse') || q.includes('reduce') || q.includes('waste')) {
      return `For the 3Rs (Reduce, Reuse, Recycle):
      - **Reduce**: Carry cotton grocery bags, buy in bulk, refuse plastic straws.
      - **Reuse**: Repurpose plastic containers, donate old tech to local student libraries.
      - **Recycle**: Locate the nearest recycling and E-waste hubs on our Map or Smart 3R Assistant page.
      
      Tell me what items you want to dispose of, and I'll direct you to the correct bin type!`;
    }

    if (q.includes('tree') || q.includes('plantation') || q.includes('campaign') || q.includes('greening')) {
      return `At ${currentLocation.name}, the local canopy cover is ${currentLocation.greenCover}%. 
      ${currentLocation.greenCover < 15 ? 'This is classified as a Critical Urban Heat Island with severe tree canopy depletion.' : 'This zone has moderate green canopy, but further planting is highly beneficial.'}
      
      Actionable Campaign: Join the upcoming "Green Canopy Drive" this Sunday, or plant a Virtual Tree in our Tree Plantation tab to pledge support!`;
    }

    return `I understand you have questions about "${query}". As an environmental intelligence agent, I can provide details on:
    1. Local Air Quality (AQI) and dust alerts.
    2. Tap water safety & TDS.
    3. Climate/heatwave warnings.
    4. Nearby tree plantation drives & carbon coaching.
    
    Please specify one of these topics, or try the quick buttons below!`;
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated network/AI response
    setTimeout(() => {
      setIsTyping(false);
      const botText = generateResponse(text);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Give eco reward for the first question asked in chat
      if (!hasAskedQuestion) {
        setHasAskedQuestion(true);
        setEcoPoints(prev => prev + 15);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 2,
            sender: 'system',
            text: "🎉 Achievement Unlocked: Environmental Scholar! (+15 Eco Points added)",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, 800);
  };

  const suggestedQuestions = [
    "How is the air quality here today?",
    "Is the tap water safe?",
    "Tell me about nearby construction.",
    "Recommend plants for this location."
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', flexWrap: 'wrap', height: 'calc(100vh - 120px)' }} className="agent-container">
      
      {/* Left Column: Proactive Alerts Log */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
          <Bell size={20} color="hsl(var(--primary-light))" className="pulse-glow" />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Autonomous Proactive Logs</h3>
            <p style={{ fontSize: '11px', color: 'hsl(var(--text-muted))' }}>Alerts triggered by GPS location changes</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'hsl(var(--text-muted))', fontStyle: 'italic', fontSize: '13px' }}>
              No alerts logged yet. Try simulating a different GPS location in the top menu to trigger proactive reports!
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'hsl(var(--primary-light))' }}>
                    📍 {notif.locationName}
                  </span>
                  <span style={{ fontSize: '10px', color: 'hsl(var(--text-muted))' }}>{notif.time}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                  "{notif.message}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Chat Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '12px' }}>
          <div style={{ background: 'hsl(var(--primary) / 0.1)', padding: '8px', borderRadius: '8px' }}>
            <Bot size={20} color="hsl(var(--primary-light))" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>AI Assistant Playground</h3>
            <span style={{ fontSize: '11px', color: 'hsl(var(--primary-light))', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={10} fill="currentColor" /> Active Location Context: {currentLocation.name}
            </span>
          </div>
        </div>

        {/* Chat History */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '16px 4px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}>
          {messages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} style={{ 
                  alignSelf: 'center', 
                  background: 'rgba(255,255,255,0.04)', 
                  padding: '4px 12px', 
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: 'hsl(var(--text-muted))',
                  border: '1px dashed rgba(255,255,255,0.1)'
                }}>
                  {msg.text} • {msg.time}
                </div>
              );
            }

            const isBot = msg.sender === 'bot';
            return (
              <div 
                key={msg.id}
                style={{
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                  flexDirection: isBot ? 'row' : 'row-reverse'
                }}
              >
                <div style={{
                  background: isBot ? 'hsl(var(--bg-surface-hover))' : 'hsl(var(--primary) / 0.15)',
                  padding: '6px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isBot ? '1px solid hsl(var(--border-color))' : '1px solid hsl(var(--primary) / 0.3)'
                }}>
                  {isBot ? <Bot size={16} color="hsl(var(--primary-light))" /> : <User size={16} color="hsl(var(--secondary-light))" />}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    background: isBot ? 'hsl(var(--bg-surface))' : 'linear-gradient(135deg, hsl(var(--primary) / 0.2) 0%, hsl(var(--secondary) / 0.2) 100%)',
                    border: isBot ? '1px solid hsl(var(--border-color))' : '1px solid hsl(var(--primary) / 0.3)',
                    padding: '12px 16px',
                    borderRadius: isBot ? '0 16px 16px 16px' : '16px 0 16px 16px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: 'hsl(var(--text-primary))',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '9px', color: 'hsl(var(--text-muted))', marginTop: '4px' }}>{msg.time}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ background: 'hsl(var(--bg-surface-hover))', padding: '6px', borderRadius: '50%', border: '1px solid hsl(var(--border-color))' }}>
                <Bot size={16} color="hsl(var(--primary-light))" />
              </div>
              <div style={{ background: 'hsl(var(--bg-surface))', padding: '10px 16px', borderRadius: '0 16px 16px 16px', border: '1px solid hsl(var(--border-color))', display: 'flex', gap: '4px' }}>
                <span className="dot-blink" style={{ width: '6px', height: '6px', background: 'hsl(var(--text-muted))', borderRadius: '50%' }}></span>
                <span className="dot-blink" style={{ width: '6px', height: '6px', background: 'hsl(var(--text-muted))', borderRadius: '50%', animationDelay: '0.2s' }}></span>
                <span className="dot-blink" style={{ width: '6px', height: '6px', background: 'hsl(var(--text-muted))', borderRadius: '50%', animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '10px 0', borderTop: '1px solid hsl(var(--border-color))' }}>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '8px' }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          style={{ display: 'flex', gap: '8px', paddingTop: '10px' }}
        >
          <input
            type="text"
            placeholder={`Ask about ${currentLocation.name}'s safety...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              background: 'hsl(var(--bg-surface-hover))',
              border: '1px solid hsl(var(--border-color))',
              borderRadius: '10px',
              padding: '12px 16px',
              color: 'hsl(var(--text-primary))',
              outline: 'none',
              fontSize: '13px'
            }}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ padding: '12px', borderRadius: '10px' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0.3; }
        }
        .dot-blink {
          animation: blink 1.2s infinite;
        }
        @media (max-width: 768px) {
          .agent-container {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .agent-container > div {
            height: 400px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AIAgent;
