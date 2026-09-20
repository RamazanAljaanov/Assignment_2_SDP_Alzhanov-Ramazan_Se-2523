package kz.astanait.assignment2.transport;

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
}
