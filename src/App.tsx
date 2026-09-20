/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SimulationRunner } from './components/SimulationRunner';
import { VerificationSuite } from './components/VerificationSuite';
import { CodeExplorer } from './components/CodeExplorer';
import { UmlDiagrams } from './components/UmlDiagrams';
import { DefenseGuide } from './components/DefenseGuide';
import { GitHubSyncPanel } from './components/GitHubSyncPanel';
import {
  Terminal,
  CheckCircle2,
  FileCode,
  Network,
  ShieldCheck,
  GitBranch,
  Download,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'simulator' | 'verification' | 'codebase' | 'diagrams' | 'defense' | 'github'
  >('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm font-mono font-bold text-sm">
              DP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Design Patterns: Factory Method &amp; Abstract Factory
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  JDK 17
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Astana IT University • ShP-2216 Software Design Patterns • Assignment 2
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-blue-400" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="/assignment2-java.zip"
              download="assignment2-java.zip"
              className="flex items-center space-x-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project .ZIP</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-800/60 pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('verification')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'verification'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Rubric Checks (1–6)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('codebase')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'codebase'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Java Source Code (18 Files)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('diagrams')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'diagrams'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>UML Diagrams</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('defense')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'defense'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Oral Defense Guide (50 pts)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'github'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub Sync</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && <SimulationRunner />}
        {activeTab === 'verification' && <VerificationSuite />}
        {activeTab === 'codebase' && <CodeExplorer />}
        {activeTab === 'diagrams' && <UmlDiagrams />}
        {activeTab === 'defense' && <DefenseGuide />}
        {activeTab === 'github' && <GitHubSyncPanel />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Astana IT University • School of Software Engineering • Student: Ramazan Alzhanov • Instructor: Yerassyl Bekenov
      </footer>
    </div>
  );
}
