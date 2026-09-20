package kz.astanait.assignment2.transport;

/**
 * Concrete Product implementing Transport for sea logistics.
 */
public class Ship implements Transport {
    @Override
    public void deliver(String cargo, String destination) {
        System.out.println("Ship delivers " + cargo + " to " + destination);
    }
}
