package kz.astanait.assignment2.ui.factory;

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
}
