package kz.astanait.assignment2.ui.factory;

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
}
