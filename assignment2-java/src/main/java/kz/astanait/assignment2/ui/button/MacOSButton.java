package kz.astanait.assignment2.ui.button;

/**
 * Concrete Button for the macOS UI family.
 */
public class MacOSButton implements Button {
    @Override
    public void paint() {
        System.out.println("Rendering macOS button");
    }
}
