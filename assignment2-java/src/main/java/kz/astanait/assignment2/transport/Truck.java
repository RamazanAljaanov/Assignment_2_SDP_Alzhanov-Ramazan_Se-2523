package kz.astanait.assignment2.transport;

/**
 * Concrete Product implementing Transport for road logistics.
 */
public class Truck implements Transport {
    @Override
    public void deliver(String cargo, String destination) {
        System.out.println("Truck delivers " + cargo + " to " + destination);
    }
}
