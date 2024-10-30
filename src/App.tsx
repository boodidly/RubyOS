import React, { useState } from 'react';
import { Terminal, Settings, ChevronUp, Gem } from 'lucide-react';
import ScriptButton from './components/ScriptButton';
import AddScriptModal from './components/AddScriptModal';
import ColorPicker from './components/ColorPicker';
import TerminalProfileModal from './components/TerminalProfileModal';
import SettingsPanel from './components/SettingsPanel';
import RubyChat from './components/RubyChat';
import { type TerminalProfile, defaultProfiles } from './types/terminal';

function App() {
  const [scripts, setScripts] = useState([
    { id: 1, name: 'Check Mail', command: 'mail -e' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('Ruby OS v1.0.0\nType \'help\' for available commands\n\n$ _');
  const [isEditing, setIsEditing] = useState(false);
  const [accentColor, setAccentColor] = useState('#B63163');
  const [panelColor, setPanelColor] = useState('#2A2A2A');
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<TerminalProfile>(defaultProfiles[0]);

  const handleAddScript = (script) => {
    setScripts([...scripts, { ...script, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleDeleteScript = (id) => {
    setScripts(scripts.filter(script => script.id !== id));
  };

  const executeCommand = (command) => {
    setTerminalOutput(prev => `${prev}\n$ ${command}\nExecuting: ${command}...\n`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex h-screen bg-[#1A1A1A] text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1A1A] flex flex-col border-r border-[#2A2A2A]">
        {/* Scripts area */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Gem className="w-6 h-6" style={{ color: accentColor }} />
            <h1 className="text-xl font-bold">Ruby OS</h1>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2">
            {scripts.map((script) => (
              <ScriptButton
                key={script.id}
                script={script}
                onExecute={executeCommand}
                onDelete={handleDeleteScript}
                isEditing={isEditing}
              />
            ))}
          </div>
        </div>

        {/* Ruby AI Chat */}
        <div className="px-4 pb-4">
          <RubyChat accentColor={accentColor} />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between p-4 border-t border-[#2A2A2A] bg-[#1A1A1A]">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 hover:bg-[#2A2A2A] rounded-full"
          >
            <span className="text-2xl">+</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-[#2A2A2A] rounded-full"
          >
            <Settings className="w-5 h-5" style={{ color: accentColor }} />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-[#2A2A2A] rounded-full"
          >
            <span className="text-xl">🗑</span>
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute bottom-16 left-4 w-72 bg-[#2A2A2A] rounded-lg shadow-lg border border-[#3A3A3A] p-4 space-y-4">
            <ColorPicker
              label="Accent Color"
              currentColor={accentColor}
              onColorChange={setAccentColor}
            />
            <ColorPicker
              label="Panel Color"
              currentColor={panelColor}
              onColorChange={setPanelColor}
            />
          </div>
        )}
      </div>

      {/* Terminal Area */}
      <div className="flex-1 p-4 bg-[#1A1A1A]">
        <div 
          onClick={toggleFullscreen}
          className="h-full rounded-lg overflow-hidden cursor-pointer"
          style={{
            backgroundColor: currentProfile.backgroundColor,
            border: `1px solid ${accentColor}20`,
            boxShadow: `0 0 0 1px ${accentColor}20, 0 0 20px ${accentColor}10`,
          }}
        >
          <div
            className="h-full p-4 font-mono text-sm overflow-auto"
            style={{
              color: currentProfile.foregroundColor,
              fontSize: `${currentProfile.fontSize}px`,
              fontFamily: currentProfile.fontFamily,
              opacity: currentProfile.opacity,
              backgroundColor: panelColor,
            }}
          >
            <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <AddScriptModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddScript}
          accentColor={accentColor}
        />
      )}
    </div>
  );
}

export default App;