package kz.astanait.assignment2.logistics;

import kz.astanait.assignment2.transport.Ship;
import kz.astanait.assignment2.transport.Transport;

/**
 * Concrete Creator for sea logistics.
 * Overrides createTransport() to instantiate a Ship.
 */
public class SeaLogistics extends Logistics {
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}
