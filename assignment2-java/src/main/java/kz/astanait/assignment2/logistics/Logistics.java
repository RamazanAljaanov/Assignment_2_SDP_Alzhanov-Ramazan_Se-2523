package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Transport;

/**
 * Abstract Creator in the Factory Method pattern.
 * Declares the abstract createTransport() factory method and provides
 * the shared planDelivery workflow that relies on the Transport contract.
 */
public abstract class Logistics {

    /**
     * Factory method to create a specific Transport instance.
     * Overridden by concrete creator subclasses.
     *
     * @return concrete Transport implementation
     */
    public abstract Transport createTransport();

    /**
     * Shared delivery workflow.
     * Obtains a Transport instance through the factory method and invokes its delivery behavior.
     * Pass a cargo description and destination into the delivery workflow.
     *
     * @param cargo       cargo description
     * @param destination target delivery destination
     */
    public void planDelivery(String cargo, String destination) {
        Transport transport = createTransport();
        transport.deliver(cargo, destination);
    }
}
