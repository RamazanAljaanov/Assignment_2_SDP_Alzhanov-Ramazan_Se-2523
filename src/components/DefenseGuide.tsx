import React, { useState } from 'react';
import { ShieldCheck, BookOpen, GitBranch, Layers, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const DefenseGuide: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string>('clean-code');

  const toggle = (id: string) => {
    setExpandedSection(prev => (prev === id ? '' : id));
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Individual Oral Defense Preparation Guide (50 Points)
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Structured answers, annotated excerpts, and architectural justifications required by Instructor Yerassyl Bekenov (Sections 7, 9, D1–D6).
        </p>
      </div>

      {/* Accordion 1: Clean Code 5 Practices (Rubric Section 7 & D6) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggle('clean-code')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 rounded-full bg-blue-900/60 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-800">
              1
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">
                5 Clean Code Practices (with Chapter 6 Justifications)
              </h3>
              <p className="text-xs text-slate-400">
                Meaningful names, small methods, DRY workflow, data abstraction, and objects/encapsulation.
              </p>
            </div>
          </div>
          {expandedSection === 'clean-code' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {expandedSection === 'clean-code' && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
            {/* Practice 1 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-blue-300">1. Meaningful Names (Domain &amp; Pattern Roles)</div>
              <p className="text-slate-300">
                Names strictly distinguish products (<code className="font-mono text-emerald-300">Button</code>, <code className="font-mono text-emerald-300">Transport</code>), creators (<code className="font-mono text-purple-300">Logistics</code>), factories (<code className="font-mono text-amber-300">WindowsFactory</code>), and client (<code className="font-mono text-cyan-300">DeliveryApplication</code>).
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-slate-900 p-2 rounded">
                Benefit: Eliminates mental translation and communicates pattern roles directly to reviewers.
              </div>
            </div>

            {/* Practice 2 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-blue-300">2. Small Methods (Single Responsibility Principle)</div>
              <p className="text-slate-300">
                In <code className="font-mono text-slate-200">Main.java</code>, argument parsing, logistics configuration (<code className="font-mono text-purple-300">configureLogistics</code>), factory configuration (<code className="font-mono text-amber-300">configureGUIFactory</code>), and client invocation each live in dedicated methods under 15 lines.
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-slate-900 p-2 rounded">
                Benefit: Each function does exactly one thing, isolating validation from runtime orchestration.
              </div>
            </div>

            {/* Practice 3 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-blue-300">3. Avoid Duplicated Logic (DRY Template Method in Logistics)</div>
              <p className="text-slate-300">
                The delivery workflow is implemented once in <code className="font-mono text-purple-300">Logistics.planDelivery(cargo, destination)</code>. Subclasses only provide <code className="font-mono text-purple-300">createTransport()</code> and never re-implement delivery steps.
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-slate-900 p-2 rounded">
                Benefit: Centralizes core business flow; changes to delivery logging or steps happen in one file.
              </div>
            </div>

            {/* Practice 4 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-emerald-400">
                4. Data Abstraction (Clean Code, Chapter 6) ★ Required
              </div>
              <p className="text-slate-300">
                <code className="font-mono text-cyan-300">DeliveryApplication</code> interacts exclusively with abstract contracts (<code className="font-mono text-slate-200">Button</code>, <code className="font-mono text-slate-200">Checkbox</code>, <code className="font-mono text-slate-200">Logistics</code>). It does not know concrete data representations or platform types.
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-slate-900 p-2 rounded">
                Chapter 6 connection: Hiding implementation details behind behavioral abstractions rather than exposing raw variables.
              </div>
            </div>

            {/* Practice 5 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-emerald-400">
                5. Objects and Encapsulation (Clean Code, Chapter 6) ★ Required
              </div>
              <p className="text-slate-300">
                Classes express behavior (<code className="font-mono text-slate-200">paint()</code>, <code className="font-mono text-slate-200">deliver(...)</code>) rather than leaking internal state through getters and setters. Vehicle data is kept private and utilized internally.
              </p>
              <div className="text-[11px] text-slate-500 font-mono bg-slate-900 p-2 rounded">
                Chapter 6 connection: &quot;Objects hide their data behind abstractions and expose operations that operate on that data.&quot; Satisfies Law of Demeter.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Accordion 2: Three Design Reflection Extensions (Rubric Section 7 & D3) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggle('extensions')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 rounded-full bg-purple-900/60 text-purple-400 font-bold text-xs flex items-center justify-center border border-purple-800">
              2
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Design Reflection: 3 Hypothetical Extensions (Section 7)
              </h3>
              <p className="text-xs text-slate-400">
                Exact changes needed for a new transport, a new UI family, and a new UI product type.
              </p>
            </div>
          </div>
          {expandedSection === 'extensions' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {expandedSection === 'extensions' && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
            {/* Extension 1 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-purple-300">Extension A: Adding a New Transport (e.g. AIR)</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li><strong>Create:</strong> <code className="font-mono text-emerald-300">Airplane implements Transport</code> and <code className="font-mono text-purple-300">AirLogistics extends Logistics</code>.</li>
                <li><strong>Update:</strong> Add <code className="font-mono text-amber-300">&quot;AIR&quot; -&gt; new AirLogistics()</code> to <code className="font-mono text-slate-200">Main.configureLogistics</code>.</li>
                <li><strong>Unchanged:</strong> <code className="font-mono text-slate-400">Transport</code> interface, <code className="font-mono text-slate-400">Logistics</code> base class, existing creators (<code className="font-mono text-slate-400">RoadLogistics</code>, <code className="font-mono text-slate-400">SeaLogistics</code>), and client <code className="font-mono text-slate-400">DeliveryApplication</code> remain 100% untouched. (Strict OCP compliance).</li>
              </ul>
            </div>

            {/* Extension 2 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-purple-300">Extension B: Adding a New UI Family (e.g. LINUX)</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li><strong>Create:</strong> <code className="font-mono text-emerald-300">LinuxButton implements Button</code>, <code className="font-mono text-emerald-300">LinuxCheckbox implements Checkbox</code>, and <code className="font-mono text-amber-300">LinuxFactory implements GUIFactory</code>.</li>
                <li><strong>Update:</strong> Add <code className="font-mono text-amber-300">&quot;LINUX&quot; -&gt; new LinuxFactory()</code> to <code className="font-mono text-slate-200">Main.configureGUIFactory</code>.</li>
                <li><strong>Unchanged:</strong> Product interfaces (<code className="font-mono text-slate-400">Button</code>, <code className="font-mono text-slate-400">Checkbox</code>), factory contract (<code className="font-mono text-slate-400">GUIFactory</code>), and client <code className="font-mono text-slate-400">DeliveryApplication</code> remain 100% untouched.</li>
              </ul>
            </div>

            {/* Extension 3 */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <div className="font-semibold text-purple-300">Extension C: Adding a New Product Type (e.g. TextField)</div>
              <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
                <li><strong>Create:</strong> <code className="font-mono text-emerald-300">interface TextField</code>, <code className="font-mono text-emerald-300">WindowsTextField</code>, and <code className="font-mono text-emerald-300">MacOSTextField</code>.</li>
                <li><strong>Update:</strong> Must modify the <code className="font-mono text-amber-300">GUIFactory</code> interface to add <code className="font-mono text-amber-300">TextField createTextField()</code>, and implement it in <em>both</em> <code className="font-mono text-slate-300">WindowsFactory</code> and <code className="font-mono text-slate-300">MacOSFactory</code>! Also update <code className="font-mono text-cyan-300">DeliveryApplication</code> to paint the new field.</li>
                <li><strong>Architectural insight:</strong> This illustrates the classic trade-off in Abstract Factory: adding new families is easy (Open/Closed), but adding new product types is hard because the factory interface must expand.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Accordion 3: Pattern Comparison Matrix (Rubric D3) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => toggle('comparison')}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-800">
              3
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Pattern Comparisons: Simple Factory vs Factory Method vs Abstract Factory
              </h3>
              <p className="text-xs text-slate-400">
                Core differences, why startup switch is permitted, and GoF trade-offs.
              </p>
            </div>
          </div>
          {expandedSection === 'comparison' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {expandedSection === 'comparison' && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 pr-3">Feature</th>
                    <th className="py-2 px-3">Simple Factory</th>
                    <th className="py-2 px-3">Factory Method</th>
                    <th className="py-2 pl-3">Abstract Factory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-slate-200">Structure</td>
                    <td className="py-2.5 px-3">Single class with static/conditional method</td>
                    <td className="py-2.5 px-3">Creator hierarchy with overridden method</td>
                    <td className="py-2.5 pl-3">Factory interface declaring multiple creation methods</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-slate-200">Open/Closed Principle</td>
                    <td className="py-2.5 px-3 text-rose-400">Violated (modifies switch on every new product)</td>
                    <td className="py-2.5 px-3 text-emerald-400">Preserved (add creator subclass)</td>
                    <td className="py-2.5 pl-3 text-emerald-400">Preserved for new families</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-slate-200">Scope</td>
                    <td className="py-2.5 px-3">Single standalone product</td>
                    <td className="py-2.5 px-3">Single product hierarchy (Transport)</td>
                    <td className="py-2.5 pl-3">Family of interdependent products (Button + Checkbox)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-semibold text-slate-200">Startup Switch Question</td>
                    <td className="py-2.5 px-3" colSpan={3}>
                      <em>&quot;Why is a switch allowed in Main?&quot;</em> — Rubric Section 5 explicitly allows startup conditional selection to bootstrap dependencies. The business logic inside <code className="font-mono text-cyan-300">DeliveryApplication</code> operates 100% polymorphically without any `if`, `switch`, `instanceof`, or casts.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
