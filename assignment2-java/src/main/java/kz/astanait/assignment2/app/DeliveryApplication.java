package kz.astanait.assignment2.app;

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

    // Accessors for unit testing verification if needed
    public Button getButton() {
        return button;
    }

    public Checkbox getCheckbox() {
        return checkbox;
    }

    public Logistics getLogistics() {
        return logistics;
    }
}
