package kz.astanait.assignment2.ui.factory;

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
}
