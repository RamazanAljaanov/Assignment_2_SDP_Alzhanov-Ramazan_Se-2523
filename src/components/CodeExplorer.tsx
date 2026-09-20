import React, { useState } from 'react';
import { JAVA_FILES, JavaFileItem } from '../data/javaCodebase';
import { FileCode, Copy, Check, Download, FolderGit2, Sparkles, ExternalLink } from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<JavaFileItem>(JAVA_FILES[0]);
  const [copied, setCopied] = useState(false);

  const categories = Array.from(new Set(JAVA_FILES.map(f => f.category)));

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* File Tree Sidebar */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col h-[650px]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Project Files ({JAVA_FILES.length})
            </span>
          </div>
          <a
            href="/assignment2-java.zip"
            download="assignment2-java.zip"
            className="flex items-center space-x-1 text-[11px] bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded font-medium transition-colors"
            title="Download full project with Git history and Maven pom.xml"
          >
            <Download className="w-3 h-3" />
            <span>Download .ZIP</span>
          </a>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {categories.map(category => (
            <div key={category} className="space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-0.5">
                {category}
              </div>
              <div className="space-y-0.5">
                {JAVA_FILES.filter(f => f.category === category).map(file => (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedFile.id === file.id
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-medium'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileCode className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    {file.role && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 shrink-0 ml-1">
                        {file.role}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Viewer Main Area */}
      <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[650px] shadow-sm">
        {/* Header Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-white font-mono">{selectedFile.name}</span>
              {selectedFile.role && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                  {selectedFile.role}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{selectedFile.path}</div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Description Banner */}
        <div className="bg-slate-900/40 px-4 py-2 border-b border-slate-800/80 text-xs text-slate-300 flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{selectedFile.description}</span>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 bg-slate-950">
          <pre className="leading-relaxed whitespace-pre">
            <code>
              {selectedFile.content.split('\n').map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell pr-4 text-right select-none text-slate-600 w-8">
                    {idx + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
