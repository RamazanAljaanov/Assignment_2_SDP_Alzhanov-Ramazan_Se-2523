import React, { useState } from 'react';
import { Copy, Check, Layers, Network, ArrowRight } from 'lucide-react';

export const UmlDiagrams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'plantuml'>('visual');
  const [copiedFm, setCopiedFm] = useState(false);
  const [copiedAf, setCopiedAf] = useState(false);

  const plantUmlFm = `@startuml
title Factory Method Pattern - Logistics Transport Architecture

package "kz.astanait.assignment2.transport" {
    interface Transport <<Product>> {
        + deliver(cargo: String, destination: String): void
    }

    class Truck <<ConcreteProduct>> {
        + deliver(cargo: String, destination: String): void
    }

    class Ship <<ConcreteProduct>> {
        + deliver(cargo: String, destination: String): void
    }

    Transport <|.. Truck : implements
    Transport <|.. Ship : implements
}

package "kz.astanait.assignment2.logistics" {
    abstract class Logistics <<Creator>> {
        + {abstract} createTransport(): Transport
        + planDelivery(cargo: String, destination: String): void
    }

    class RoadLogistics <<ConcreteCreator>> {
        + createTransport(): Transport
    }

    class SeaLogistics <<ConcreteCreator>> {
        + createTransport(): Transport
    }

    Logistics <|-- RoadLogistics : extends
    Logistics <|-- SeaLogistics : extends
}

RoadLogistics ..> Truck : <<creates>>
SeaLogistics ..> Ship : <<creates>>
Logistics ..> Transport : <<uses>>

note right of Logistics::planDelivery
  Transport t = createTransport();
  t.deliver(cargo, destination);
end note
@enduml`;

  const plantUmlAf = `@startuml
title Abstract Factory Pattern - Cross-Platform UI Component Architecture

package "kz.astanait.assignment2.ui.button" {
    interface Button <<AbstractProductA>> {
        + paint(): void
    }
    class WindowsButton <<ConcreteProductA1>> {
        + paint(): void
    }
    class MacOSButton <<ConcreteProductA2>> {
        + paint(): void
    }
    Button <|.. WindowsButton : implements
    Button <|.. MacOSButton : implements
}

package "kz.astanait.assignment2.ui.checkbox" {
    interface Checkbox <<AbstractProductB>> {
        + paint(): void
    }
    class WindowsCheckbox <<ConcreteProductB1>> {
        + paint(): void
    }
    class MacOSCheckbox <<ConcreteProductB2>> {
        + paint(): void
    }
    Checkbox <|.. WindowsCheckbox : implements
    Checkbox <|.. MacOSCheckbox : implements
}

package "kz.astanait.assignment2.ui.factory" {
    interface GUIFactory <<AbstractFactory>> {
        + createButton(): Button
        + createCheckbox(): Checkbox
    }
    class WindowsFactory <<ConcreteFactory1>> {
        + createButton(): Button
        + createCheckbox(): Checkbox
    }
    class MacOSFactory <<ConcreteFactory2>> {
        + createButton(): Button
        + createCheckbox(): Checkbox
    }
    GUIFactory <|.. WindowsFactory : implements
    GUIFactory <|.. MacOSFactory : implements
}

package "kz.astanait.assignment2.app" {
    class DeliveryApplication <<Client>> {
        - button: Button
        - checkbox: Checkbox
        - logistics: Logistics
        + DeliveryApplication(factory: GUIFactory, logistics: Logistics)
        + renderUI(): void
        + planDelivery(cargo: String, destination: String): void
        + run(cargo: String, destination: String): void
    }
}

WindowsFactory ..> WindowsButton : creates
WindowsFactory ..> WindowsCheckbox : creates
MacOSFactory ..> MacOSButton : creates
MacOSFactory ..> MacOSCheckbox : creates

DeliveryApplication --> GUIFactory : injected dependency
DeliveryApplication --> Button : uses
DeliveryApplication --> Checkbox : uses
@enduml`;

  const copyCode = (code: string, type: 'fm' | 'af') => {
    navigator.clipboard.writeText(code);
    if (type === 'fm') {
      setCopiedFm(true);
      setTimeout(() => setCopiedFm(false), 2000);
    } else {
      setCopiedAf(true);
      setTimeout(() => setCopiedAf(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-white">
            UML Class Diagrams (Rubric Section R1 &amp; CLO 2)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full role mapping, inheritance structures, method signatures, and client decoupling contracts.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('visual')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'visual' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Visual Diagrams
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plantuml')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'plantuml' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            PlantUML Source (.puml)
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Factory Method Diagram Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="text-sm font-semibold text-white">Part A: Factory Method Pattern</h3>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                Logistics Transport Domain
              </span>
            </div>

            {/* Visual Block Diagram */}
            <div className="space-y-4 text-xs font-mono">
              {/* Product Tier */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800/80 pb-1">
                  <span>&lt;&lt;interface&gt;&gt; Transport</span>
                  <span className="text-[10px] font-normal text-slate-500 uppercase tracking-wider">Product</span>
                </div>
                <div className="text-slate-300 text-[11px]">
                  + deliver(cargo: String, destination: String): void
                </div>
              </div>

              {/* Concrete Products */}
              <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-dashed border-blue-800/50">
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-emerald-400 font-semibold text-[11px]">Truck</div>
                  <div className="text-[10px] text-slate-400">implements Transport</div>
                  <div className="text-[10px] text-slate-500 mt-1">Road freight dispatch</div>
                </div>
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-cyan-400 font-semibold text-[11px]">Ship</div>
                  <div className="text-[10px] text-slate-400">implements Transport</div>
                  <div className="text-[10px] text-slate-500 mt-1">Maritime ocean dispatch</div>
                </div>
              </div>

              {/* Creator Tier */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-purple-400 font-bold border-b border-slate-800/80 pb-1">
                  <span>&lt;&lt;abstract&gt;&gt; Logistics</span>
                  <span className="text-[10px] font-normal text-slate-500 uppercase tracking-wider">Creator</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-1">
                  <div className="text-amber-300 font-semibold">+ createTransport(): Transport [abstract]</div>
                  <div className="text-slate-400">+ planDelivery(cargo, destination): void [template]</div>
                </div>
              </div>

              {/* Concrete Creators */}
              <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-dashed border-purple-800/50">
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-emerald-400 font-semibold text-[11px]">RoadLogistics</div>
                  <div className="text-[10px] text-slate-400">extends Logistics</div>
                  <div className="text-[10px] text-emerald-300/80 mt-1">returns new Truck()</div>
                </div>
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-cyan-400 font-semibold text-[11px]">SeaLogistics</div>
                  <div className="text-[10px] text-slate-400">extends Logistics</div>
                  <div className="text-[10px] text-cyan-300/80 mt-1">returns new Ship()</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-200">
              <strong>Runtime Flow:</strong> <code className="text-blue-300">planDelivery()</code> executes by calling <code className="text-blue-300">createTransport()</code>, receiving the concrete Transport and calling <code className="text-blue-300">t.deliver(...)</code> without knowing if it is a Truck or Ship.
            </div>
          </div>

          {/* Abstract Factory Diagram Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h3 className="text-sm font-semibold text-white">Part B: Abstract Factory Pattern</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                Cross-Platform GUI Families
              </span>
            </div>

            {/* Visual Block Diagram */}
            <div className="space-y-4 text-xs font-mono">
              {/* Product Interfaces */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="text-indigo-400 font-bold text-[11px]">&lt;&lt;interface&gt;&gt; Button</div>
                  <div className="text-[10px] text-slate-300 mt-1">+ paint(): void</div>
                  <div className="text-[9px] text-slate-500 mt-1">WindowsButton | MacOSButton</div>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="text-indigo-400 font-bold text-[11px]">&lt;&lt;interface&gt;&gt; Checkbox</div>
                  <div className="text-[10px] text-slate-300 mt-1">+ paint(): void</div>
                  <div className="text-[9px] text-slate-500 mt-1">WindowsCheckbox | MacOSCheckbox</div>
                </div>
              </div>

              {/* Abstract Factory */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800/80 pb-1">
                  <span>&lt;&lt;interface&gt;&gt; GUIFactory</span>
                  <span className="text-[10px] font-normal text-slate-500 uppercase tracking-wider">Abstract Factory</span>
                </div>
                <div className="text-slate-300 text-[11px] space-y-0.5">
                  <div>+ createButton(): Button</div>
                  <div>+ createCheckbox(): Checkbox</div>
                </div>
              </div>

              {/* Concrete Factories */}
              <div className="grid grid-cols-2 gap-3 pl-4 border-l-2 border-dashed border-amber-800/50">
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-blue-400 font-semibold text-[11px]">WindowsFactory</div>
                  <div className="text-[10px] text-slate-400">implements GUIFactory</div>
                  <div className="text-[9px] text-slate-500 mt-1">Creates: WindowsButton &amp; WindowsCheckbox</div>
                </div>
                <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-md">
                  <div className="text-purple-400 font-semibold text-[11px]">MacOSFactory</div>
                  <div className="text-[10px] text-slate-400">implements GUIFactory</div>
                  <div className="text-[9px] text-slate-500 mt-1">Creates: MacOSButton &amp; MacOSCheckbox</div>
                </div>
              </div>

              {/* Client */}
              <div className="p-3 bg-slate-950 border border-indigo-800/60 rounded-lg space-y-1">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>DeliveryApplication</span>
                  <span className="text-[10px] font-normal text-slate-500 uppercase">Client</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Constructor: <code className="text-indigo-300">DeliveryApplication(GUIFactory, Logistics)</code>
                </div>
                <div className="text-[10px] text-slate-400">
                  Holds only abstract product contracts (Button, Checkbox, Logistics). Never branches on OS.
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-indigo-200">
              <strong>Cohesion Guarantee:</strong> The client cannot accidentally mix a Windows button with a macOS checkbox because the injected concrete factory guarantees product family integrity.
            </div>
          </div>
        </div>
      ) : (
        /* PlantUML Code View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs flex flex-col h-[550px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-blue-400 font-semibold">diagrams/factory_method.puml</span>
              <button
                type="button"
                onClick={() => copyCode(plantUmlFm, 'fm')}
                className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] transition-colors"
              >
                {copiedFm ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFm ? 'Copied' : 'Copy PUML'}</span>
              </button>
            </div>
            <pre className="flex-1 overflow-auto text-slate-300 whitespace-pre">
              <code>{plantUmlFm}</code>
            </pre>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs flex flex-col h-[550px]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-indigo-400 font-semibold">diagrams/abstract_factory.puml</span>
              <button
                type="button"
                onClick={() => copyCode(plantUmlAf, 'af')}
                className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] transition-colors"
              >
                {copiedAf ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAf ? 'Copied' : 'Copy PUML'}</span>
              </button>
            </div>
            <pre className="flex-1 overflow-auto text-slate-300 whitespace-pre">
              <code>{plantUmlAf}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
