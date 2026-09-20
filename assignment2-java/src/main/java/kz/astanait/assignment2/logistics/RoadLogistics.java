package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Transport;
import kz.astanait.assignment2.transport.Truck;

/**
 * Concrete Creator for road logistics.
 * Overrides createTransport() to instantiate a Truck.
 */
public class RoadLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}
