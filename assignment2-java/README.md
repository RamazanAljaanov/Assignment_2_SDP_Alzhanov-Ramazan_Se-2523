# Assignment 2: Factory Method and Abstract Factory

**Astana IT University** | School of Software Engineering  
**Course**: ShP-2216 Software Design Patterns | Academic Year 2026-2027  
**Programme**: 6B06102 Software Engineering | Year 2, Trimester 4  
**Student**: Ramazan Alzhanov (Aljanov)  
**Instructor**: Yerassyl Bekenov  
**Repository**: [https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method](https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method)

---

## 1. Project Purpose

This application is a logistics delivery program demonstrating the practical implementation of two fundamental creational design patterns running together:

1. **Factory Method (Part A)**: Decouples logistics planning from concrete transport instantiations. An abstract creator `Logistics` defines a template workflow `planDelivery(...)` that delegates product instantiation to an overridden factory method `createTransport()`. Concrete creators `RoadLogistics` and `SeaLogistics` instantiate `Truck` and `Ship` respectively.
2. **Abstract Factory (Part B)**: Enforces family consistency for cross-platform UI controls. The `GUIFactory` interface declares creation methods for matching pairs of UI components (`Button` and `Checkbox`). Concrete factories `WindowsFactory` and `MacOSFactory` produce cohesive families (`WindowsButton` + `WindowsCheckbox`, or `MacOSButton` + `MacOSCheckbox`).
3. **Decoupled Client (`DeliveryApplication`)**: Injected with abstract dependencies (`GUIFactory` and `Logistics`), operating strictly via behavioral contracts without branching, type casts, or concrete references.

---

## 2. Package Structure

```
assignment2-java/
├── pom.xml                                    # Maven project configuration (JDK 17 + JUnit 5)
├── README.md                                  # Project overview, instructions, verification
├── REPORT.md                                  # Complete academic defense report for Moodle
├── push_to_github.sh                          # One-step automated Git synchronization script
├── diagrams/
│   ├── factory_method.puml                    # PlantUML source for Factory Method
│   └── abstract_factory.puml                  # PlantUML source for Abstract Factory
└── src/
    ├── main/
    │   └── java/
    │       └── kz/
    │           └── astanait/
    │               └── assignment2/
    │                   ├── Main.java          # CLI entry point, argument validation & factory setup
    │                   ├── app/
    │                   │   └── DeliveryApplication.java # Injected client orchestrator
    │                   ├── logistics/
    │                   │   ├── Logistics.java     # Abstract Creator with shared planDelivery()
    │                   │   ├── RoadLogistics.java # Concrete Creator -> Truck
    │                   │   └── SeaLogistics.java  # Concrete Creator -> Ship
    │                   ├── transport/
    │                   │   ├── Transport.java     # Product interface
    │                   │   ├── Truck.java         # Concrete Product (Road delivery)
    │                   │   └── Ship.java          # Concrete Product (Sea delivery)
    │                   └── ui/
    │                       ├── button/
    │                       │   ├── Button.java        # Abstract Product A (paint())
    │                       │   ├── WindowsButton.java # Concrete Product A1
    │                       │   └── MacOSButton.java   # Concrete Product A2
    │                       ├── checkbox/
    │                       │   ├── Checkbox.java      # Abstract Product B (paint())
    │                       │   ├── WindowsCheckbox.java # Concrete Product B1
    │                       │   └── MacOSCheckbox.java # Concrete Product B2
    │                       └── factory/
    │                           ├── GUIFactory.java    # Abstract Factory interface
    │                           ├── WindowsFactory.java# Concrete Factory 1
    │                           └── MacOSFactory.java  # Concrete Factory 2
    └── test/
        └── java/
            └── kz/
                └── astanait/
                    └── assignment2/
                        └── DeliveryApplicationTest.java # Automated JUnit 5 test suite (Checks 1-6)
```

---

## 3. Prerequisites

- **Java Development Kit**: JDK 17 or higher (`java -version` should show 17+)
- **Build Tool**: Apache Maven 3.8+ (`mvn -version`) or standard `javac` command line compiler.

---

## 4. Exact Build and Run Instructions

### Option A: Using Maven (Recommended)

1. **Compile and Package**:
   ```bash
   mvn clean package
   ```

2. **Run with Command-Line Arguments**:
   ```bash
   mvn exec:java -Dexec.args="ROAD WINDOWS"
   mvn exec:java -Dexec.args="SEA MACOS"
   mvn exec:java -Dexec.args="ROAD MACOS"
   mvn exec:java -Dexec.args="SEA WINDOWS"
   ```

3. **Run as Standalone Executable JAR**:
   ```bash
   java -jar target/assignment2-patterns-1.0.0.jar ROAD WINDOWS
   ```

4. **Run Unit Tests (Automated Verification of Checks 1-6)**:
   ```bash
   mvn test
   ```

### Option B: Using Plain `javac` / `java`

1. **Compile**:
   ```bash
   javac -d bin $(find src/main/java -name "*.java")
   ```

2. **Execute**:
   ```bash
   java -cp bin kz.astanait.assignment2.Main ROAD WINDOWS
   java -cp bin kz.astanait.assignment2.Main SEA MACOS
   ```

3. **Interactive Mode**:
   ```bash
   java -cp bin kz.astanait.assignment2.Main
   ```
   *(Prompts for interactive console input)*

---

## 5. Supported Input Values

- **Delivery Mode (Case-Insensitive)**:
  - `ROAD` -> instantiates `RoadLogistics` -> produces `Truck`
  - `SEA` -> instantiates `SeaLogistics` -> produces `Ship`
- **UI Platform (Case-Insensitive)**:
  - `WINDOWS` -> instantiates `WindowsFactory` -> produces `WindowsButton` + `WindowsCheckbox`
  - `MACOS` -> instantiates `MacOSFactory` -> produces `MacOSButton` + `MacOSCheckbox`

---

## 6. Sample Run Output

```bash
$ java -cp bin kz.astanait.assignment2.Main ROAD WINDOWS
Delivery mode: ROAD
UI platform: WINDOWS
Rendering Windows button
Rendering Windows checkbox
Truck delivers laboratory equipment to Aktau warehouse
```

---

## 7. Required Verification Matrix (Section 6 Rubric)

| Check | Input | Expected Output / Behavior | Status |
|---|---|---|---|
| **1** | `ROAD WINDOWS` | Truck delivery; Windows button and checkbox | **PASS** |
| **2** | `SEA WINDOWS` | Ship delivery; Windows button and checkbox | **PASS** |
| **3** | `ROAD MACOS` | Truck delivery; macOS button and checkbox | **PASS** |
| **4** | `SEA MACOS` | Ship delivery; macOS button and checkbox | **PASS** |
| **5** | `AIR WINDOWS` | Clear validation: `Error: Unsupported delivery mode 'AIR'. Valid options are: ROAD, SEA.` No delivery executed. | **PASS** |
| **6** | `ROAD LINUX` | Clear validation: `Error: Unsupported UI platform 'LINUX'. Valid options are: WINDOWS, MACOS.` No UI construction. | **PASS** |
| **Edge** | *(Single arg)* `ROAD` | Clear validation: `Error: Missing required UI platform argument.` | **PASS** |
