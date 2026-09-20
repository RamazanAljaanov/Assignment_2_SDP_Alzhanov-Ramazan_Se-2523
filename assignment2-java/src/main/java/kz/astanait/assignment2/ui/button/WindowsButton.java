package kz.astanait.assignment2.ui.button;

/**
 * Concrete Button for the Windows UI family.
 */
public class WindowsButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering Windows button");
    }
}
