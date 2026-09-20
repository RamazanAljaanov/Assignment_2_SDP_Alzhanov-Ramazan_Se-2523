import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Ship, Play, AlertTriangle, CheckCircle2, RotateCcw, Monitor, Laptop, ArrowRight } from 'lucide-react';

interface SimulationResult {
  stdout: string[];
  stderr: string[];
  success: boolean;
  deliveryMode: string;
  uiPlatform: string;
  creatorUsed?: string;
  productUsed?: string;
  factoryUsed?: string;
  uiComponents?: string[];
}

export const SimulationRunner: React.FC = () => {
  const [deliveryMode, setDeliveryMode] = useState<'ROAD' | 'SEA' | 'CUSTOM'>('ROAD');
  const [customDeliveryMode, setCustomDeliveryMode] = useState<string>('AIR');
  
  const [uiPlatform, setUiPlatform] = useState<'WINDOWS' | 'MACOS' | 'CUSTOM'>('WINDOWS');
  const [customUiPlatform, setCustomUiPlatform] = useState<string>('LINUX');

  const [cargo, setCargo] = useState<string>('laboratory equipment');
  const [destination, setDestination] = useState<string>('Aktau warehouse');

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<SimulationResult | null>(() => runSimulation('ROAD', 'WINDOWS', 'laboratory equipment', 'Aktau warehouse'));

  function getEffectiveDeliveryMode(): string {
    return deliveryMode === 'CUSTOM' ? customDeliveryMode.trim().toUpperCase() : deliveryMode;
  }

  function getEffectivePlatform(): string {
    return uiPlatform === 'CUSTOM' ? customUiPlatform.trim().toUpperCase() : uiPlatform;
  }

  function runSimulation(mode: string, platform: string, cargoDesc: string, dest: string): SimulationResult {
    const stdout: string[] = [];
    const stderr: string[] = [];

    if (!mode) {
      stderr.push('Error: Delivery mode cannot be empty. Allowed values: ROAD, SEA.');
      return { stdout, stderr, success: false, deliveryMode: mode, uiPlatform: platform };
    }

    if (!platform) {
      stderr.push('Error: UI platform cannot be empty. Allowed values: WINDOWS, MACOS.');
      return { stdout, stderr, success: false, deliveryMode: mode, uiPlatform: platform };
    }

    const isRoad = mode === 'ROAD';
    const isSea = mode === 'SEA';
    const isWindows = platform === 'WINDOWS';
    const isMacOS = platform === 'MACOS';

    if (!isRoad && !isSea) {
      stderr.push(`Error: Unsupported delivery mode '${mode}'. Valid options are: ROAD, SEA.`);
      return { stdout, stderr, success: false, deliveryMode: mode, uiPlatform: platform };
    }

    if (!isWindows && !isMacOS) {
      stderr.push(`Error: Unsupported UI platform '${platform}'. Valid options are: WINDOWS, MACOS.`);
      return { stdout, stderr, success: false, deliveryMode: mode, uiPlatform: platform };
    }

    stdout.push(`Delivery mode: ${mode}`);
    stdout.push(`UI platform: ${platform}`);

    if (isWindows) {
      stdout.push('Rendering Windows button');
      stdout.push('Rendering Windows checkbox');
    } else {
      stdout.push('Rendering macOS button');
      stdout.push('Rendering macOS checkbox');
    }

    if (isRoad) {
      stdout.push(`Truck delivers ${cargoDesc} to ${dest}`);
    } else {
      stdout.push(`Ship delivers ${cargoDesc} to ${dest}`);
    }

    return {
      stdout,
      stderr,
      success: true,
      deliveryMode: mode,
      uiPlatform: platform,
      creatorUsed: isRoad ? 'RoadLogistics' : 'SeaLogistics',
      productUsed: isRoad ? 'Truck' : 'Ship',
      factoryUsed: isWindows ? 'WindowsFactory' : 'MacOSFactory',
      uiComponents: isWindows ? ['WindowsButton', 'WindowsCheckbox'] : ['MacOSButton', 'MacOSCheckbox']
    };
  }

  const handleExecute = () => {
    setIsRunning(true);
    setTimeout(() => {
      const effMode = getEffectiveDeliveryMode();
      const effPlatform = getEffectivePlatform();
      const simResult = runSimulation(effMode, effPlatform, cargo, destination);
      setResult(simResult);
      setIsRunning(false);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Controls & Inputs Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base font-semibold text-white tracking-wide">
              Logistics &amp; UI Runtime Simulator
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded">
            JDK 17 Main.java Execution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Delivery Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Part A: Delivery Mode (Factory Method)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryMode('ROAD')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  deliveryMode === 'ROAD'
                    ? 'bg-blue-900/40 border-blue-500 text-blue-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>ROAD</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMode('SEA')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  deliveryMode === 'SEA'
                    ? 'bg-blue-900/40 border-blue-500 text-blue-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Ship className="w-4 h-4" />
                <span>SEA</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMode('CUSTOM')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  deliveryMode === 'CUSTOM'
                    ? 'bg-amber-900/40 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Custom</span>
              </button>
            </div>
            {deliveryMode === 'CUSTOM' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customDeliveryMode}
                  onChange={(e) => setCustomDeliveryMode(e.target.value)}
                  placeholder="e.g. AIR (tests invalid mode)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-amber-200 focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Check 5 test: &quot;AIR&quot; triggers validation message with no delivery.
                </span>
              </div>
            )}
          </div>

          {/* UI Platform Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Part B: UI Platform (Abstract Factory)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUiPlatform('WINDOWS')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  uiPlatform === 'WINDOWS'
                    ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>WINDOWS</span>
              </button>
              <button
                type="button"
                onClick={() => setUiPlatform('MACOS')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  uiPlatform === 'MACOS'
                    ? 'bg-indigo-900/40 border-indigo-500 text-indigo-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>MACOS</span>
              </button>
              <button
                type="button"
                onClick={() => setUiPlatform('CUSTOM')}
                className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                  uiPlatform === 'CUSTOM'
                    ? 'bg-amber-900/40 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Custom</span>
              </button>
            </div>
            {uiPlatform === 'CUSTOM' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={customUiPlatform}
                  onChange={(e) => setCustomUiPlatform(e.target.value)}
                  placeholder="e.g. LINUX (tests invalid platform)"
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-amber-200 focus:outline-none focus:border-amber-500 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Check 6 test: &quot;LINUX&quot; triggers validation message with no UI construction.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Cargo & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/80">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Cargo Description (passed to planDelivery)
            </label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Destination Location
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span>Command:</span>
            <code className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-mono text-[11px]">
              java kz.astanait.assignment2.Main {getEffectiveDeliveryMode()} {getEffectivePlatform()}
            </code>
          </div>
          <button
            type="button"
            onClick={handleExecute}
            disabled={isRunning}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {isRunning ? (
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            <span>Execute Workflow</span>
          </button>
        </div>
      </div>

      {/* Output & Visual Representation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Console Stdout / Stderr output */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs flex flex-col shadow-sm">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 text-[11px] ml-2">Console Terminal Output</span>
            </div>
            <span className="text-[10px] text-slate-500">System.out / System.err</span>
          </div>
          <div className="p-4 flex-1 min-h-[180px] bg-slate-950 text-slate-300 space-y-1.5 overflow-x-auto">
            <div className="text-slate-600 text-[11px] select-none">
              $ java kz.astanait.assignment2.Main {result?.deliveryMode} {result?.uiPlatform}
            </div>
            {result?.stdout.map((line, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-emerald-400">
                <span className="text-slate-600 select-none">&gt;</span>
                <span>{line}</span>
              </div>
            ))}
            {result?.stderr.map((line, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-rose-400 bg-rose-950/20 p-1 rounded">
                <span className="text-rose-500 select-none">!</span>
                <span>{line}</span>
              </div>
            ))}
            {result?.success && (
              <div className="text-slate-500 text-[11px] pt-2 mt-2 border-t border-slate-900 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Process finished with exit code 0 (Clean stop)</span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Component & Transport Preview */}
        <div className="lg:col-span-6 space-y-4">
          {/* Abstract Factory Rendered UI Family */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Abstract Factory: Rendered UI Products
              </span>
              <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-800/40">
                {result?.factoryUsed || 'No Factory'}
              </span>
            </div>

            {result?.success ? (
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-3">
                <div className="text-xs text-slate-400">
                  Client invoked <code className="text-slate-300 font-mono">button.paint()</code> and <code className="text-slate-300 font-mono">checkbox.paint()</code>:
                </div>

                {result.uiPlatform === 'WINDOWS' ? (
                  /* Windows Component Aesthetics */
                  <div className="bg-[#f0f3f8] text-slate-900 p-4 rounded border border-slate-300 space-y-3">
                    <div className="text-[10px] text-slate-500 font-sans uppercase tracking-wider font-semibold">
                      Windows 11 Fluent UI Family
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Windows Button */}
                      <button
                        type="button"
                        className="bg-[#005fb8] hover:bg-[#0067c0] text-white text-xs font-normal px-4 py-1.5 rounded-[4px] border-b-2 border-[#004280] shadow-sm active:translate-y-px transition-all font-sans cursor-pointer"
                      >
                        Windows Button
                      </button>

                      {/* Windows Checkbox */}
                      <label className="flex items-center space-x-2 text-xs text-slate-800 cursor-pointer select-none">
                        <div className="w-4 h-4 rounded-[3px] border border-[#005fb8] bg-[#005fb8] flex items-center justify-center text-white text-[10px]">
                          ✓
                        </div>
                        <span>Windows Checkbox</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  /* macOS Component Aesthetics */
                  <div className="bg-[#242526] text-slate-100 p-4 rounded-xl border border-slate-700/80 space-y-3">
                    <div className="text-[10px] text-slate-400 font-sans uppercase tracking-wider font-medium">
                      macOS Aqua / Sonoma UI Family
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      {/* macOS Button */}
                      <button
                        type="button"
                        className="bg-gradient-to-b from-[#007aff] to-[#0062cc] hover:from-[#1a87ff] text-white text-xs font-medium px-4 py-1.5 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.4)] active:brightness-95 transition-all font-sans cursor-pointer"
                      >
                        macOS Button
                      </button>

                      {/* macOS Checkbox */}
                      <label className="flex items-center space-x-2 text-xs text-slate-200 cursor-pointer select-none">
                        <div className="w-4 h-4 rounded-md bg-[#007aff] flex items-center justify-center text-white text-[11px] shadow-sm">
                          ✓
                        </div>
                        <span>macOS Checkbox</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>UI Construction blocked: Invalid platform provided. No components created.</span>
              </div>
            )}
          </div>

          {/* Factory Method Transport Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Factory Method: Logistics Delivery
              </span>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/40">
                {result?.creatorUsed ? `${result.creatorUsed} -> ${result.productUsed}` : 'No Creator'}
              </span>
            </div>

            {result?.success ? (
              <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white flex items-center space-x-1.5">
                    {result.deliveryMode === 'ROAD' ? (
                      <Truck className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Ship className="w-4 h-4 text-cyan-400" />
                    )}
                    <span>{result.productUsed} Dispatch</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded">
                    Route: Aktau Warehouse
                  </span>
                </div>

                {/* Animated delivery road/sea strip */}
                <div className="relative h-14 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center px-4">
                  {result.deliveryMode === 'ROAD' ? (
                    <>
                      {/* Road markings */}
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dashed border-slate-700" />
                      </div>
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: [0, 200, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                        className="relative z-10 flex items-center space-x-2 bg-blue-600/90 text-white text-[11px] px-2.5 py-1 rounded shadow"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span className="font-medium">Truck (Road)</span>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* Sea waves */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />
                      <motion.div
                        initial={{ x: 0, y: 0 }}
                        animate={{ x: [0, 180, 0], y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                        className="relative z-10 flex items-center space-x-2 bg-cyan-600/90 text-white text-[11px] px-2.5 py-1 rounded shadow"
                      >
                        <Ship className="w-3.5 h-3.5" />
                        <span className="font-medium">Ship (Sea)</span>
                      </motion.div>
                    </>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Cargo: <strong className="text-slate-200">{cargo}</strong></span>
                  <span className="text-emerald-400 font-medium">Delivery Verified ✓</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs text-rose-300 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Delivery Workflow blocked: Invalid mode provided. planDelivery() was not executed.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
