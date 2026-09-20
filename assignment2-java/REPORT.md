# Assignment 2: Factory Method and Abstract Factory Report

**Course**: ShP-2216 Software Design Patterns | Academic Year 2026-2027  
**Programme**: 6B06102 Software Engineering | Year 2, Trimester 4  
**Student**: Ramazan Alzhanov  
**Group**: SE-230X  
**GitHub Repository**: [https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method](https://github.com/RamazanAljaanov/Assignment_2_SDP_Factory_method_and_Abstract_method)  
**Target Commit**: `feat(docs): finalize README, UML diagrams, and comprehensive report`

---

## 1. Introduction

This assignment demonstrates the practical application and integration of two foundational creational patterns from the Gang of Four (GoF): **Factory Method** and **Abstract Factory**.

### Application Overview
The system models a dual-domain logistics delivery platform accompanied by a cross-platform graphical user interface (GUI) rendering layer:
1. **Logistics Domain**: Manages the routing, planning, and execution of cargo shipments across multiple transit modalities (`ROAD` using `Truck` and `SEA` using `Ship`).
2. **GUI Domain**: Coordinates the visual rendering of themed UI components across distinct operating system platforms (`WINDOWS` and `MACOS`).

### Why Factory Method Fits the Logistics Subsystem
In logistics management, the high-level workflow for planning and initiating a delivery (`planDelivery`) remains identical regardless of the specific vehicle deployed: cargo and destination parameters must be captured, route confirmation logged, and dispatch executed. However, the concrete transport instantiation and operational dispatch mechanisms diverge significantly between road freight and maritime shipping. 
The **Factory Method** pattern decouples the creator (`Logistics`) from concrete transport implementations (`Truck`, `Ship`). By deferring instantiation to concrete creator subclasses (`RoadLogistics`, `SeaLogistics`), the system strictly adheres to the **Open/Closed Principle (OCP)**: new transit modes (e.g., `AirLogistics`) can be introduced without altering existing delivery planning workflows.

### Why Abstract Factory Fits the UI Subsystem
UI platforms require strict visual and functional coherence across multiple distinct widget types. A Windows button paired with a macOS checkbox results in an inconsistent, broken user experience. 
The **Abstract Factory** pattern provides an interface (`GUIFactory`) for creating complete, interdependent families of products (`Button` and `Checkbox`) without specifying their concrete classes. It guarantees that client code (`DeliveryApplication`) consistently works with matching platform widgets (`WindowsButton` + `WindowsCheckbox` or `MacOSButton` + `MacOSCheckbox`), preventing accidental cross-platform mismatches.

---

## 2. UML Class Diagrams

### 2.1 Factory Method Pattern
```
+-------------------------------------------------------------+
|                 <<interface>> Transport                     |
+-------------------------------------------------------------+
| + deliver(cargo: String, destination: String): void         |
+-------------------------------------------------------------+
               ^                               ^
               |                               |
     +---------+---------+           +---------+---------+
     |       Truck       |           |       Ship        |
     +-------------------+           +-------------------+
     | + deliver(...)    |           | + deliver(...)    |
     +-------------------+           +-------------------+
               ^                               ^
               : (creates)                     : (creates)
     +-------------------+           +-------------------+
     |   RoadLogistics   |           |   SeaLogistics    |
     +-------------------+           +-------------------+
     | + createTransport |           | + createTransport |
     +-------------------+           +-------------------+
               |                               |
               +---------------+---------------+
                               |
                               ^
            +------------------------------------+
            |        <<abstract>> Logistics      |
            +------------------------------------+
            | + {abstract} createTransport(): Tr |
            | + planDelivery(cargo, dest): void  |
            +------------------------------------+
```

### 2.2 Abstract Factory Pattern
```
             +-----------------------------------+
             |       <<interface>> Button        |
             +-----------------------------------+
             | + paint(): void                   |
             +-----------------------------------+
                     ^                   ^
                     |                   |
            +--------+-----+       +-----+--------+
            | WindowsButton|       | MacOSButton  |
            +--------------+       +--------------+
            | + paint()    |       | + paint()    |
            +--------------+       +--------------+

             +-----------------------------------+
             |      <<interface>> Checkbox       |
             +-----------------------------------+
             | + paint(): void                   |
             +-----------------------------------+
                     ^                   ^
                     |                   |
            +--------+-----+       +-----+--------+
            |WindowsCheckbox       |MacOSCheckbox |
            +--------------+       +--------------+
            | + paint()    |       | + paint()    |
            +--------------+       +--------------+

            +--------------------------------------+
            |        <<interface>> GUIFactory      |
            +--------------------------------------+
            | + createButton(): Button             |
            | + createCheckbox(): Checkbox         |
            +--------------------------------------+
                     ^                   ^
                     |                   |
            +--------+-----+       +-----+--------+
            |WindowsFactory|       | MacOSFactory |
            +--------------+       +--------------+
            | + createBtn()|       | + createBtn()|
            | + createChk()|       | + createChk()|
            +--------------+       +--------------+
                   ^
                   | (injected)
            +------+-------------------------------+
            |         DeliveryApplication          |
            +--------------------------------------+
            | - button: Button                     |
            | - checkbox: Checkbox                 |
            | - logistics: Logistics               |
            +--------------------------------------+
            | + renderUI(): void                   |
            | + planDelivery(cargo, dest): void    |
            +--------------------------------------+
```

---

## 3. Clean Code Evidence (Section 7)

### Practice 1: Meaningful Names
- **Excerpt**:
  ```java
  public interface GUIFactory {
      Button createButton();
      Checkbox createCheckbox();
  }
  public class WindowsFactory implements GUIFactory { ... }
  ```
- **Explanation & Benefit**: Class and interface names explicitly encode their architectural domain and design pattern role. `GUIFactory` communicates its role as an Abstract Factory; `WindowsFactory` designates its concrete platform scope; `Button` and `Checkbox` represent unambiguous domain products. A developer reading the codebase understands the intent and role without needing to examine the implementation.

### Practice 2: Small Methods (Single Responsibility Principle)
- **Excerpt**:
  ```java
  public static Logistics configureLogistics(String mode) {
      if (mode == null) return null;
      return switch (mode.toUpperCase()) {
          case "ROAD" -> new RoadLogistics();
          case "SEA" -> new SeaLogistics();
          default -> null;
      };
  }
  ```
- **Explanation & Benefit**: In `Main.java`, startup argument parsing, concrete factory configuration, and client execution are segregated into distinct, concise methods. `configureLogistics` does exactly one thing: maps a validated mode token to its corresponding concrete creator. This isolates configuration logic from runtime execution and makes testing trivial.

### Practice 3: Avoid Duplicated Logic (DRY)
- **Excerpt**:
  ```java
  // In abstract class Logistics:
  public void planDelivery(String cargo, String destination) {
      Transport transport = createTransport();
      transport.deliver(cargo, destination);
  }
  ```
- **Explanation & Benefit**: The end-to-end delivery sequence (`createTransport()` followed by `deliver(...)`) is defined once in the abstract `Logistics` base class. Subclasses never duplicate delivery coordination logic; they only supply the concrete product instance.

### Practice 4: Data Abstraction (Clean Code, Chapter 6)
- **Excerpt**:
  ```java
  public class DeliveryApplication {
      private final Button button;
      private final Checkbox checkbox;
      private final Logistics logistics;
      ...
      public void renderUI() {
          button.paint();
          checkbox.paint();
      }
  }
  ```
- **Explanation & Benefit**: Chapter 6 of *Clean Code* emphasizes that abstractions should hide internal structure and expose behavior rather than raw data. `DeliveryApplication` holds references solely through abstract types (`Button`, `Checkbox`, `Logistics`). It does not know or care whether the underlying object is a `WindowsButton` or `MacOSButton`, nor does it interrogate internal object state. It simply invokes behavioral contracts (`paint()`, `planDelivery()`).

### Practice 5: Objects and Encapsulation (Clean Code, Chapter 6)
- **Excerpt**:
  ```java
  public class Truck implements Transport {
      @Override
      public void deliver(String cargo, String destination) {
          System.out.println("Truck delivers " + cargo + " to " + destination);
      }
  }
  ```
- **Explanation & Benefit**: In alignment with *Clean Code* Chapter 6, objects hide their implementation behind behavioral methods. Rather than exposing internal vehicle attributes through getters/setters (such as `getVehicleType()`, `getFuelLevel()`), the object encapsulates its specific business responsibility inside `deliver(...)`. The client tells the object *what to do*, satisfying the Law of Demeter and avoiding feature envy.

---

## 4. Verification Evidence (Section 6 Rubric)

All six required checks were executed and verified through both CLI test runs and automated JUnit 5 assertions.

| Check | Input CLI Arguments | Actual Output / Console Result | Expected Result | Pass / Fail |
|:---:|:---|:---|:---|:---:|
| **1** | `ROAD WINDOWS` | `Delivery mode: ROAD`<br>`UI platform: WINDOWS`<br>`Rendering Windows button`<br>`Rendering Windows checkbox`<br>`Truck delivers laboratory equipment to Aktau warehouse` | Truck delivery; Windows button and checkbox | **PASS** |
| **2** | `SEA WINDOWS` | `Delivery mode: SEA`<br>`UI platform: WINDOWS`<br>`Rendering Windows button`<br>`Rendering Windows checkbox`<br>`Ship delivers laboratory equipment to Aktau warehouse` | Ship delivery; Windows button and checkbox | **PASS** |
| **3** | `ROAD MACOS` | `Delivery mode: ROAD`<br>`UI platform: MACOS`<br>`Rendering macOS button`<br>`Rendering macOS checkbox`<br>`Truck delivers laboratory equipment to Aktau warehouse` | Truck delivery; macOS button and checkbox | **PASS** |
| **4** | `SEA MACOS` | `Delivery mode: SEA`<br>`UI platform: MACOS`<br>`Rendering macOS button`<br>`Rendering macOS checkbox`<br>`Ship delivers laboratory equipment to Aktau warehouse` | Ship delivery; macOS button and checkbox | **PASS** |
| **5** | `AIR WINDOWS` | `Error: Unsupported delivery mode 'AIR'. Valid options are: ROAD, SEA.` *(Process terminates cleanly with no delivery or UI execution)* | Clear validation message; no delivery with invalid selection | **PASS** |
| **6** | `ROAD LINUX` | `Error: Unsupported UI platform 'LINUX'. Valid options are: WINDOWS, MACOS.` *(Process terminates cleanly with no UI construction or delivery)* | Clear validation message; no UI construction with invalid selection | **PASS** |
| **Edge** | `ROAD` *(Missing 2nd arg)* | `Error: Missing required UI platform argument.`<br>`Usage: java kz.astanait.assignment2.Main <ROAD|SEA> <WINDOWS|MACOS>` | Clear validation message for incomplete arguments | **PASS** |

---

## 5. Design Reflection & Extensibility Analysis

### 5.1 Extension 1: Adding a New Transport (`AIR`)
- **What needs to be created**:
  1. Create `Airplane` class implementing `Transport` in `kz.astanait.assignment2.transport`.
  2. Create `AirLogistics` class extending `Logistics` in `kz.astanait.assignment2.logistics`, overriding `createTransport()` to return `new Airplane()`.
- **What needs to be modified**:
  - In `Main.java`, add `"AIR"` case to the `configureLogistics` switch statement to instantiate `AirLogistics`.
- **What remains completely unchanged**:
  - The `Transport` interface remains unchanged.
  - The abstract `Logistics` class and its `planDelivery(...)` workflow remain unchanged.
  - Existing creators (`RoadLogistics`, `SeaLogistics`) and products (`Truck`, `Ship`) remain unchanged.
  - The client `DeliveryApplication` remains completely unchanged.

### 5.2 Extension 2: Adding a New UI Family (`LINUX`)
- **What needs to be created**:
  1. Create `LinuxButton` implementing `Button`.
  2. Create `LinuxCheckbox` implementing `Checkbox`.
  3. Create `LinuxFactory` implementing `GUIFactory`, returning `new LinuxButton()` and `new LinuxCheckbox()`.
- **What needs to be modified**:
  - In `Main.java`, add `"LINUX"` case to `configureGUIFactory` to instantiate `LinuxFactory`.
- **What remains completely unchanged**:
  - Existing widget interfaces (`Button`, `Checkbox`) remain unchanged.
  - The `GUIFactory` interface remains unchanged.
  - Existing concrete factories (`WindowsFactory`, `MacOSFactory`) and widgets remain unchanged.
  - The client `DeliveryApplication` remains completely unchanged.

### 5.3 Extension 3: Adding a New UI Product Type (`TextField`)
- **What needs to be created**:
  1. Define a new product interface `TextField` with `void render()`.
  2. Implement `WindowsTextField` implementing `TextField`.
  3. Implement `MacOSTextField` implementing `TextField`.
- **What needs to be modified**:
  1. Add `TextField createTextField();` method to `GUIFactory` interface.
  2. Implement `createTextField()` in `WindowsFactory` and `MacOSFactory`.
  3. Update `DeliveryApplication` to request and render the new `TextField` component.
- **Comparison Insight**: Adding a new product type is a recognized limitation of Abstract Factory: it requires modifying the factory interface and all existing concrete factory implementations. In contrast, adding a new family is seamless and requires zero edits to existing families.

---

## 6. Comparison of Creational Patterns

| Dimension | Simple Factory | Factory Method | Abstract Factory |
|:---|:---|:---|:---|
| **Primary Intent** | Centralizes instantiation behind a single helper class with conditional logic (`switch`/`if`). | Defines an interface/abstract method for creating a single object, letting subclasses decide which class to instantiate. | Provides an interface for creating families of related or dependent objects without specifying their concrete classes. |
| **Extensibility (OCP)** | Violates OCP: adding a product requires editing the switch statement in the factory class. | Adheres to OCP: adding a product requires creating a new creator subclass; no existing classes are edited. | Adheres to OCP when adding new product families; violates OCP when adding new product types. |
| **Product Scope** | Creates single products from varied families without inheritance guarantees. | Creates one product hierarchy (`Transport`). | Creates a coordinated family of multiple product hierarchies (`Button` + `Checkbox`). |
| **Coupling** | Direct coupling of the helper class to all concrete product types. | Creator class depends only on abstract `Product` contract; concrete creator couples to one product. | Client depends only on abstract factory and abstract products. |

---

## 7. References
1. Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall. Chapter 6: Objects and Data Structures.
3. Freeman, E., & Robson, E. (2020). *Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software* (2nd ed.). O'Reilly Media. Chapter 4: The Factory Pattern.
4. Bekenov, Y. (2026). *Software Design Patterns: Lecture 2 - Creational Patterns & Clean Code*. Astana IT University.
