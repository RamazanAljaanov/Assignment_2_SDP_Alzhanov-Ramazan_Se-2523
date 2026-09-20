export interface JavaFileItem {
  id: string;
  name: string;
  path: string;
  category: 'Factory Method' | 'Abstract Factory' | 'Client & Main' | 'Tests' | 'Build & Docs';
  description: string;
  role?: string;
  content: string;
}

export const JAVA_FILES: JavaFileItem[] = [
  {
    id: 'transport-interface',
    name: 'Transport.java',
    path: 'src/main/java/kz/astanait/assignment2/transport/Transport.java',
    category: 'Factory Method',
    role: 'Product Interface',
    description: 'Defines the delivery contract for all transport mechanisms.',
    content: `package kz.astanait.assignment2.transport;

/**
 * Product interface in the Factory Method pattern.
 * Defines the delivery behavior contract for all transport types.
 */
public interface Transport {
    /**
     * Executes the delivery operation for the given cargo to the specified destination.
     *
     * @param cargo       description of the cargo being transported
     * @param destination target delivery destination
     */
    void deliver(String cargo, String destination);
}`
  },
  {
    id: 'truck-class',
    name: 'Truck.java',
    path: 'src/main/java/kz/astanait/assignment2/transport/Truck.java',
    category: 'Factory Method',
    role: 'Concrete Product A',
    description: 'Implements road delivery behavior.',
    content: `package kz.astanait.assignment2.transport;

/**
 * Concrete Product implementing Transport for road logistics.
 */
public class Truck implements Transport {
    @Override
    public void deliver(String cargo, String destination) {
        System.out.println("Truck delivers " + cargo + " to " + destination);
    }
}`
  },
  {
    id: 'ship-class',
    name: 'Ship.java',
    path: 'src/main/java/kz/astanait/assignment2/transport/Ship.java',
    category: 'Factory Method',
    role: 'Concrete Product B',
    description: 'Implements maritime sea delivery behavior.',
    content: `package kz.astanait.assignment2.transport;

/**
 * Concrete Product implementing Transport for sea logistics.
 */
public class Ship implements Transport {
    @Override
    public void deliver(String cargo, String destination) {
        System.out.println("Ship delivers " + cargo + " to " + destination);
    }
}`
  },
  {
    id: 'logistics-class',
    name: 'Logistics.java',
    path: 'src/main/java/kz/astanait/assignment2/logistics/Logistics.java',
    category: 'Factory Method',
    role: 'Abstract Creator',
    description: 'Declares createTransport() factory method and encapsulates shared planDelivery() workflow.',
    content: `package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Transport;

/**
 * Abstract Creator in the Factory Method pattern.
 * Declares the abstract createTransport() factory method and provides
 * the shared planDelivery workflow that relies on the Transport contract.
 */
public abstract class Logistics {

    /**
     * Factory method to create a specific Transport instance.
     * Overridden by concrete creator subclasses.
     *
     * @return concrete Transport implementation
     */
    public abstract Transport createTransport();

    /**
     * Shared delivery workflow.
     * Obtains a Transport instance through the factory method and invokes its delivery behavior.
     * Pass a cargo description and destination into the delivery workflow.
     *
     * @param cargo       cargo description
     * @param destination target delivery destination
     */
    public void planDelivery(String cargo, String destination) {
        Transport transport = createTransport();
        transport.deliver(cargo, destination);
    }
}`
  },
  {
    id: 'road-logistics',
    name: 'RoadLogistics.java',
    path: 'src/main/java/kz/astanait/assignment2/logistics/RoadLogistics.java',
    category: 'Factory Method',
    role: 'Concrete Creator A',
    description: 'Overrides createTransport() to instantiate Truck.',
    content: `package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Transport;
import kz.astanait.assignment2.transport.Truck;

/**
 * Concrete Creator for road logistics.
 * Overrides createTransport() to instantiate a Truck.
 */
public class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}`
  },
  {
    id: 'sea-logistics',
    name: 'SeaLogistics.java',
    path: 'src/main/java/kz/astanait/assignment2/logistics/SeaLogistics.java',
    category: 'Factory Method',
    role: 'Concrete Creator B',
    description: 'Overrides createTransport() to instantiate Ship.',
    content: `package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Ship;
import kz.astanait.assignment2.transport.Transport;

/**
 * Concrete Creator for sea logistics.
 * Overrides createTransport() to instantiate a Ship.
 */
public class SeaLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}`
  },
  {
    id: 'button-interface',
    name: 'Button.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/button/Button.java',
    category: 'Abstract Factory',
    role: 'Abstract Product A',
    description: 'Contract for rendering button components.',
    content: `package kz.astanait.assignment2.ui.button;

/**
 * Abstract Product interface for Button UI components.
 */
public interface Button {
    /**
     * Renders the button component.
     */
    void paint();
}`
  },
  {
    id: 'windows-button',
    name: 'WindowsButton.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/button/WindowsButton.java',
    category: 'Abstract Factory',
    role: 'Concrete Product A1',
    description: 'Renders Windows button widget.',
    content: `package kz.astanait.assignment2.ui.button;

/**
 * Concrete Button for the Windows UI family.
 */
public class WindowsButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering Windows button");
    }
}`
  },
  {
    id: 'macos-button',
    name: 'MacOSButton.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/button/MacOSButton.java',
    category: 'Abstract Factory',
    role: 'Concrete Product A2',
    description: 'Renders macOS button widget.',
    content: `package kz.astanait.assignment2.ui.button;

/**
 * Concrete Button for the macOS UI family.
 */
public class MacOSButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering macOS button");
    }
}`
  },
  {
    id: 'checkbox-interface',
    name: 'Checkbox.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/checkbox/Checkbox.java',
    category: 'Abstract Factory',
    role: 'Abstract Product B',
    description: 'Contract for rendering checkbox components.',
    content: `package kz.astanait.assignment2.ui.checkbox;

/**
 * Abstract Product interface for Checkbox UI components.
 */
public interface Checkbox {
    /**
     * Renders the checkbox component.
     */
    void paint();
}`
  },
  {
    id: 'windows-checkbox',
    name: 'WindowsCheckbox.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/checkbox/WindowsCheckbox.java',
    category: 'Abstract Factory',
    role: 'Concrete Product B1',
    description: 'Renders Windows checkbox widget.',
    content: `package kz.astanait.assignment2.ui.checkbox;

/**
 * Concrete Checkbox for the Windows UI family.
 */
public class WindowsCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering Windows checkbox");
    }
}`
  },
  {
    id: 'macos-checkbox',
    name: 'MacOSCheckbox.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/checkbox/MacOSCheckbox.java',
    category: 'Abstract Factory',
    role: 'Concrete Product B2',
    description: 'Renders macOS checkbox widget.',
    content: `package kz.astanait.assignment2.ui.checkbox;

/**
 * Concrete Checkbox for the macOS UI family.
 */
public class MacOSCheckbox implements Checkbox {
    @Override
    public void paint() {
        System.out.println("Rendering macOS checkbox");
    }
}`
  },
  {
    id: 'gui-factory',
    name: 'GUIFactory.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/factory/GUIFactory.java',
    category: 'Abstract Factory',
    role: 'Abstract Factory',
    description: 'Declares creation methods for cohesive UI component family.',
    content: `package kz.astanait.assignment2.ui.factory;

import kz.astanait.assignment2.ui.button.Button;
import kz.astanait.assignment2.ui.checkbox.Checkbox;

/**
 * Abstract Factory interface for creating families of matching UI components.
 */
public interface GUIFactory {
    /**
     * Creates a Button matching this factory's platform family.
     *
     * @return concrete Button product
     */
    Button createButton();

    /**
     * Creates a Checkbox matching this factory's platform family.
     *
     * @return concrete Checkbox product
     */
    Checkbox createCheckbox();
}`
  },
  {
    id: 'windows-factory',
    name: 'WindowsFactory.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/factory/WindowsFactory.java',
    category: 'Abstract Factory',
    role: 'Concrete Factory 1',
    description: 'Creates Windows UI component family (WindowsButton + WindowsCheckbox).',
    content: `package kz.astanait.assignment2.ui.factory;

import kz.astanait.assignment2.ui.button.Button;
import kz.astanait.assignment2.ui.button.WindowsButton;
import kz.astanait.assignment2.ui.checkbox.Checkbox;
import kz.astanait.assignment2.ui.checkbox.WindowsCheckbox;

/**
 * Concrete Factory creating a matching pair of Windows UI components.
 */
public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}`
  },
  {
    id: 'macos-factory',
    name: 'MacOSFactory.java',
    path: 'src/main/java/kz/astanait/assignment2/ui/factory/MacOSFactory.java',
    category: 'Abstract Factory',
    role: 'Concrete Factory 2',
    description: 'Creates macOS UI component family (MacOSButton + MacOSCheckbox).',
    content: `package kz.astanait.assignment2.ui.factory;

import kz.astanait.assignment2.ui.button.Button;
import kz.astanait.assignment2.ui.button.MacOSButton;
import kz.astanait.assignment2.ui.checkbox.Checkbox;
import kz.astanait.assignment2.ui.checkbox.MacOSCheckbox;

/**
 * Concrete Factory creating a matching pair of macOS UI components.
 */
public class MacOSFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacOSButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacOSCheckbox();
    }
}`
  },
  {
    id: 'delivery-application',
    name: 'DeliveryApplication.java',
    path: 'src/main/java/kz/astanait/assignment2/app/DeliveryApplication.java',
    category: 'Client & Main',
    role: 'Client App',
    description: 'Client decoupled from concrete products; injected with GUIFactory and Logistics.',
    content: `package kz.astanait.assignment2.app;

import kz.astanait.assignment2.logistics.Logistics;
import kz.astanait.assignment2.ui.button.Button;
import kz.astanait.assignment2.ui.checkbox.Checkbox;
import kz.astanait.assignment2.ui.factory.GUIFactory;

import java.util.Objects;

/**
 * Client application orchestrating UI rendering and logistics delivery.
 * Receives GUIFactory and Logistics dependencies through constructor injection.
 * Interacts purely with abstract contracts without depending on concrete classes or casts.
 */
public class DeliveryApplication {

    private final Button button;
    private final Checkbox checkbox;
    private final Logistics logistics;

    /**
     * Constructs DeliveryApplication by obtaining UI components from the injected GUIFactory
     * and binding the injected Logistics creator.
     *
     * @param factory   the abstract GUI factory
     * @param logistics the abstract Logistics creator
     */
    public DeliveryApplication(GUIFactory factory, Logistics logistics) {
        Objects.requireNonNull(factory, "GUIFactory must not be null");
        Objects.requireNonNull(logistics, "Logistics must not be null");

        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
        this.logistics = logistics;
    }

    /**
     * Renders UI components through their product contracts.
     */
    public void renderUI() {
        button.paint();
        checkbox.paint();
    }

    /**
     * Delegates cargo delivery to the shared logistics workflow.
     *
     * @param cargo       description of cargo
     * @param destination destination address/location
     */
    public void planDelivery(String cargo, String destination) {
        logistics.planDelivery(cargo, destination);
    }

    /**
     * Runs the complete sequence: renders UI components, then executes the delivery workflow.
     *
     * @param cargo       description of cargo
     * @param destination destination address/location
     */
    public void run(String cargo, String destination) {
        renderUI();
        planDelivery(cargo, destination);
    }

    public Button getButton() {
        return button;
    }

    public Checkbox getCheckbox() {
        return checkbox;
    }

    public Logistics getLogistics() {
        return logistics;
    }
}`
  },
  {
    id: 'main-entry',
    name: 'Main.java',
    path: 'src/main/java/kz/astanait/assignment2/Main.java',
    category: 'Client & Main',
    role: 'Startup & CLI Configurator',
    description: 'Parses CLI/console inputs, validates options, instantiates concrete creators, and runs client.',
    content: `package kz.astanait.assignment2;

import kz.astanait.assignment2.app.DeliveryApplication;
import kz.astanait.assignment2.logistics.Logistics;
import kz.astanait.assignment2.logistics.RoadLogistics;
import kz.astanait.assignment2.logistics.SeaLogistics;
import kz.astanait.assignment2.ui.factory.GUIFactory;
import kz.astanait.assignment2.ui.factory.MacOSFactory;
import kz.astanait.assignment2.ui.factory.WindowsFactory;

import java.util.Scanner;

/**
 * Main application entry point and startup configurator.
 * Parses and validates delivery mode and UI platform inputs,
 * configures concrete creators and factories, and initiates DeliveryApplication.
 */
public class Main {

    public static final String DEFAULT_CARGO = "laboratory equipment";
    public static final String DEFAULT_DESTINATION = "Aktau warehouse";

    public static void main(String[] args) {
        String deliveryMode;
        String uiPlatform;

        if (args != null && args.length >= 2) {
            deliveryMode = args[0].trim();
            uiPlatform = args[1].trim();
        } else if (args != null && args.length == 1) {
            System.err.println("Error: Missing required UI platform argument.");
            System.err.println("Usage: java kz.astanait.assignment2.Main <ROAD|SEA> <WINDOWS|MACOS>");
            return;
        } else {
            // Interactive console fallback
            Scanner scanner = new Scanner(System.in);
            System.out.println("=== Logistics & UI Configuration ===");
            System.out.print("Enter delivery mode (ROAD or SEA): ");
            if (!scanner.hasNextLine()) {
                System.err.println("Error: No delivery mode input provided.");
                return;
            }
            deliveryMode = scanner.nextLine().trim();

            System.out.print("Enter UI platform (WINDOWS or MACOS): ");
            if (!scanner.hasNextLine()) {
                System.err.println("Error: No UI platform input provided.");
                return;
            }
            uiPlatform = scanner.nextLine().trim();
        }

        if (deliveryMode.isEmpty()) {
            System.err.println("Error: Delivery mode cannot be empty. Allowed values: ROAD, SEA.");
            return;
        }

        if (uiPlatform.isEmpty()) {
            System.err.println("Error: UI platform cannot be empty. Allowed values: WINDOWS, MACOS.");
            return;
        }

        Logistics logistics = configureLogistics(deliveryMode);
        if (logistics == null) {
            System.err.println("Error: Unsupported delivery mode '" + deliveryMode + "'. Valid options are: ROAD, SEA.");
            return;
        }

        GUIFactory guiFactory = configureGUIFactory(uiPlatform);
        if (guiFactory == null) {
            System.err.println("Error: Unsupported UI platform '" + uiPlatform + "'. Valid options are: WINDOWS, MACOS.");
            return;
        }

        // Print configuration header matching specification
        System.out.println("Delivery mode: " + deliveryMode.toUpperCase());
        System.out.println("UI platform: " + uiPlatform.toUpperCase());

        // Instantiate client with abstract dependencies
        DeliveryApplication app = new DeliveryApplication(guiFactory, logistics);
        app.run(DEFAULT_CARGO, DEFAULT_DESTINATION);
    }

    public static Logistics configureLogistics(String mode) {
        if (mode == null) return null;
        return switch (mode.toUpperCase()) {
            case "ROAD" -> new RoadLogistics();
            case "SEA" -> new SeaLogistics();
            default -> null;
        };
    }

    public static GUIFactory configureGUIFactory(String platform) {
        if (platform == null) return null;
        return switch (platform.toUpperCase()) {
            case "WINDOWS" -> new WindowsFactory();
            case "MACOS" -> new MacOSFactory();
            default -> null;
        };
    }
}`
  },
  {
    id: 'test-suite',
    name: 'DeliveryApplicationTest.java',
    path: 'src/test/java/kz/astanait/assignment2/DeliveryApplicationTest.java',
    category: 'Tests',
    role: 'JUnit 5 Verification Suite',
    description: 'Unit tests verifying all 6 required rubric checks and object decoupling.',
    content: `package kz.astanait.assignment2;

import kz.astanait.assignment2.app.DeliveryApplication;
import kz.astanait.assignment2.logistics.Logistics;
import kz.astanait.assignment2.logistics.RoadLogistics;
import kz.astanait.assignment2.logistics.SeaLogistics;
import kz.astanait.assignment2.transport.Ship;
import kz.astanait.assignment2.transport.Transport;
import kz.astanait.assignment2.transport.Truck;
import kz.astanait.assignment2.ui.button.MacOSButton;
import kz.astanait.assignment2.ui.button.WindowsButton;
import kz.astanait.assignment2.ui.checkbox.MacOSCheckbox;
import kz.astanait.assignment2.ui.checkbox.WindowsCheckbox;
import kz.astanait.assignment2.ui.factory.GUIFactory;
import kz.astanait.assignment2.ui.factory.MacOSFactory;
import kz.astanait.assignment2.ui.factory.WindowsFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import static org.junit.jupiter.api.Assertions.*;

public class DeliveryApplicationTest {

    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    private final ByteArrayOutputStream errContent = new ByteArrayOutputStream();
    private final PrintStream originalOut = System.out;
    private final PrintStream originalErr = System.err;

    @BeforeEach
    public void setUpStreams() {
        System.setOut(new PrintStream(outContent));
        System.setErr(new PrintStream(errContent));
    }

    @AfterEach
    public void restoreStreams() {
        System.setOut(originalOut);
        System.setErr(originalErr);
    }

    @Test
    @DisplayName("Check 1: ROAD + WINDOWS -> Truck delivery; Windows button and checkbox")
    public void testCheck1_RoadAndWindows() {
        Main.main(new String[]{"ROAD", "WINDOWS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering Windows button"));
        assertTrue(output.contains("Rendering Windows checkbox"));
        assertTrue(output.contains("Truck delivers laboratory equipment to Aktau warehouse"));
    }

    @Test
    @DisplayName("Check 2: SEA + WINDOWS -> Ship delivery; Windows button and checkbox")
    public void testCheck2_SeaAndWindows() {
        Main.main(new String[]{"SEA", "WINDOWS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering Windows button"));
        assertTrue(output.contains("Rendering Windows checkbox"));
        assertTrue(output.contains("Ship delivers laboratory equipment to Aktau warehouse"));
    }

    @Test
    @DisplayName("Check 3: ROAD + MACOS -> Truck delivery; macOS button and checkbox")
    public void testCheck3_RoadAndMacOS() {
        Main.main(new String[]{"ROAD", "MACOS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering macOS button"));
        assertTrue(output.contains("Rendering macOS checkbox"));
        assertTrue(output.contains("Truck delivers laboratory equipment to Aktau warehouse"));
    }

    @Test
    @DisplayName("Check 4: SEA + MACOS -> Ship delivery; macOS button and checkbox")
    public void testCheck4_SeaAndMacOS() {
        Main.main(new String[]{"SEA", "MACOS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering macOS button"));
        assertTrue(output.contains("Rendering macOS checkbox"));
        assertTrue(output.contains("Ship delivers laboratory equipment to Aktau warehouse"));
    }

    @Test
    @DisplayName("Check 5: Unsupported delivery mode with valid platform -> Clear validation message")
    public void testCheck5_UnsupportedDeliveryMode() {
        Main.main(new String[]{"AIR", "WINDOWS"});
        String errOutput = errContent.toString();
        String stdOutput = outContent.toString();

        assertTrue(errOutput.contains("Unsupported delivery mode 'AIR'"));
        assertFalse(stdOutput.contains("Rendering"));
        assertFalse(stdOutput.contains("delivers"));
    }

    @Test
    @DisplayName("Check 6: Unsupported platform with valid delivery mode -> Clear validation message")
    public void testCheck6_UnsupportedPlatform() {
        Main.main(new String[]{"ROAD", "LINUX"});
        String errOutput = errContent.toString();
        String stdOutput = outContent.toString();

        assertTrue(errOutput.contains("Unsupported UI platform 'LINUX'"));
        assertFalse(stdOutput.contains("Rendering"));
        assertFalse(stdOutput.contains("delivers"));
    }
}`
  },
  {
    id: 'pom-xml',
    name: 'pom.xml',
    path: 'pom.xml',
    category: 'Build & Docs',
    description: 'Maven configuration for JDK 17 with compiler, surefire, and exec plugins.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>kz.astanait</groupId>
    <artifactId>assignment2-patterns</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>Assignment 2: Factory Method and Abstract Factory</name>
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.jupiter.version>5.10.2</junit.jupiter.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>\${junit.jupiter.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`
  },
  {
    id: 'readme-md',
    name: 'README.md',
    path: 'README.md',
    category: 'Build & Docs',
    description: 'Detailed instructions, package tree, prerequisites, execution commands, and sample outputs.',
    content: `# Assignment 2: Factory Method and Abstract Factory
Astana IT University | Software Design Patterns (ShP-2216)
Student: Ramazan Alzhanov

Please refer to assignment2-java/README.md for the full documentation and run instructions.`
  }
];

export interface VerificationCheck {
  id: number;
  title: string;
  deliveryMode: string;
  uiPlatform: string;
  expectedResult: string;
  expectedTransport: string;
  expectedUI: string;
  valid: boolean;
}

export const VERIFICATION_CHECKS: VerificationCheck[] = [
  {
    id: 1,
    title: 'Check 1: ROAD + WINDOWS',
    deliveryMode: 'ROAD',
    uiPlatform: 'WINDOWS',
    expectedResult: 'Truck delivery; Windows button and checkbox.',
    expectedTransport: 'Truck delivers laboratory equipment to Aktau warehouse',
    expectedUI: 'Rendering Windows button & checkbox',
    valid: true
  },
  {
    id: 2,
    title: 'Check 2: SEA + WINDOWS',
    deliveryMode: 'SEA',
    uiPlatform: 'WINDOWS',
    expectedResult: 'Ship delivery; Windows button and checkbox.',
    expectedTransport: 'Ship delivers laboratory equipment to Aktau warehouse',
    expectedUI: 'Rendering Windows button & checkbox',
    valid: true
  },
  {
    id: 3,
    title: 'Check 3: ROAD + MACOS',
    deliveryMode: 'ROAD',
    uiPlatform: 'MACOS',
    expectedResult: 'Truck delivery; macOS button and checkbox.',
    expectedTransport: 'Truck delivers laboratory equipment to Aktau warehouse',
    expectedUI: 'Rendering macOS button & checkbox',
    valid: true
  },
  {
    id: 4,
    title: 'Check 4: SEA + MACOS',
    deliveryMode: 'SEA',
    uiPlatform: 'MACOS',
    expectedResult: 'Ship delivery; macOS button and checkbox.',
    expectedTransport: 'Ship delivers laboratory equipment to Aktau warehouse',
    expectedUI: 'Rendering macOS button & checkbox',
    valid: true
  },
  {
    id: 5,
    title: 'Check 5: Unsupported delivery (AIR + WINDOWS)',
    deliveryMode: 'AIR',
    uiPlatform: 'WINDOWS',
    expectedResult: 'Clear validation message; no delivery with an invalid selection.',
    expectedTransport: 'None (Blocked)',
    expectedUI: 'None (Blocked)',
    valid: false
  },
  {
    id: 6,
    title: 'Check 6: Unsupported platform (ROAD + LINUX)',
    deliveryMode: 'ROAD',
    uiPlatform: 'LINUX',
    expectedResult: 'Clear validation message; no UI construction with an invalid selection.',
    expectedTransport: 'None (Blocked)',
    expectedUI: 'None (Blocked)',
    valid: false
  }
];
