package kz.astanait.assignment2;

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

/**
 * Automated test suite covering the 6 required rubric verification checks (Section 6)
 * plus edge cases and Clean Code behavioral contracts.
 */
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

        assertTrue(output.contains("Rendering Windows button"), "Must render Windows button");
        assertTrue(output.contains("Rendering Windows checkbox"), "Must render Windows checkbox");
        assertTrue(output.contains("Truck delivers laboratory equipment to Aktau warehouse"), "Must perform Truck delivery");
    }

    @Test
    @DisplayName("Check 2: SEA + WINDOWS -> Ship delivery; Windows button and checkbox")
    public void testCheck2_SeaAndWindows() {
        Main.main(new String[]{"SEA", "WINDOWS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering Windows button"), "Must render Windows button");
        assertTrue(output.contains("Rendering Windows checkbox"), "Must render Windows checkbox");
        assertTrue(output.contains("Ship delivers laboratory equipment to Aktau warehouse"), "Must perform Ship delivery");
    }

    @Test
    @DisplayName("Check 3: ROAD + MACOS -> Truck delivery; macOS button and checkbox")
    public void testCheck3_RoadAndMacOS() {
        Main.main(new String[]{"ROAD", "MACOS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering macOS button"), "Must render macOS button");
        assertTrue(output.contains("Rendering macOS checkbox"), "Must render macOS checkbox");
        assertTrue(output.contains("Truck delivers laboratory equipment to Aktau warehouse"), "Must perform Truck delivery");
    }

    @Test
    @DisplayName("Check 4: SEA + MACOS -> Ship delivery; macOS button and checkbox")
    public void testCheck4_SeaAndMacOS() {
        Main.main(new String[]{"SEA", "MACOS"});
        String output = outContent.toString();

        assertTrue(output.contains("Rendering macOS button"), "Must render macOS button");
        assertTrue(output.contains("Rendering macOS checkbox"), "Must render macOS checkbox");
        assertTrue(output.contains("Ship delivers laboratory equipment to Aktau warehouse"), "Must perform Ship delivery");
    }

    @Test
    @DisplayName("Check 5: Unsupported delivery mode with valid platform -> Clear validation message; no delivery")
    public void testCheck5_UnsupportedDeliveryMode() {
        Main.main(new String[]{"AIR", "WINDOWS"});
        String errOutput = errContent.toString();
        String stdOutput = outContent.toString();

        assertTrue(errOutput.contains("Unsupported delivery mode 'AIR'"), "Must display clear error message for invalid delivery");
        assertFalse(stdOutput.contains("Rendering"), "Must not render UI when configuration fails");
        assertFalse(stdOutput.contains("delivers"), "Must not trigger delivery execution");
    }

    @Test
    @DisplayName("Check 6: Unsupported platform with valid delivery mode -> Clear validation message; no UI construction")
    public void testCheck6_UnsupportedPlatform() {
        Main.main(new String[]{"ROAD", "LINUX"});
        String errOutput = errContent.toString();
        String stdOutput = outContent.toString();

        assertTrue(errOutput.contains("Unsupported UI platform 'LINUX'"), "Must display clear error message for invalid UI platform");
        assertFalse(stdOutput.contains("Rendering"), "Must not construct or render UI components");
        assertFalse(stdOutput.contains("delivers"), "Must not execute delivery");
    }

    @Test
    @DisplayName("Missing arguments check: Only 1 argument provided -> Clear validation message")
    public void testMissingArgument_SingleArg() {
        Main.main(new String[]{"ROAD"});
        String errOutput = errContent.toString();

        assertTrue(errOutput.contains("Missing required UI platform argument"), "Must report missing argument cleanly");
    }

    @Test
    @DisplayName("Factory Method Structural Check: Subclasses create correct Transport products")
    public void testFactoryMethodCreation() {
        Logistics roadLogistics = new RoadLogistics();
        Transport roadTransport = roadLogistics.createTransport();
        assertInstanceOf(Truck.class, roadTransport, "RoadLogistics must produce Truck instance");

        Logistics seaLogistics = new SeaLogistics();
        Transport seaTransport = seaLogistics.createTransport();
        assertInstanceOf(Ship.class, seaTransport, "SeaLogistics must produce Ship instance");
    }

    @Test
    @DisplayName("Abstract Factory Structural Check: Factories produce matching family products")
    public void testAbstractFactoryFamilies() {
        GUIFactory winFactory = new WindowsFactory();
        assertInstanceOf(WindowsButton.class, winFactory.createButton(), "WindowsFactory must produce WindowsButton");
        assertInstanceOf(WindowsCheckbox.class, winFactory.createCheckbox(), "WindowsFactory must produce WindowsCheckbox");

        GUIFactory macFactory = new MacOSFactory();
        assertInstanceOf(MacOSButton.class, macFactory.createButton(), "MacOSFactory must produce MacOSButton");
        assertInstanceOf(MacOSCheckbox.class, macFactory.createCheckbox(), "MacOSFactory must produce MacOSCheckbox");
    }

    @Test
    @DisplayName("DeliveryApplication Client Decoupling: Injected interfaces are maintained")
    public void testClientDecoupling() {
        GUIFactory factory = new WindowsFactory();
        Logistics logistics = new RoadLogistics();
        DeliveryApplication app = new DeliveryApplication(factory, logistics);

        assertNotNull(app.getButton());
        assertNotNull(app.getCheckbox());
        assertNotNull(app.getLogistics());
    }
}
