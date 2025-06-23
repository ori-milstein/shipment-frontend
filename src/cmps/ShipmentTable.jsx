export function ShipmentTable({ filterBy, handleChange, shipments }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <label>
                            <div>
                                Shipment Id
                                <input type="radio" name="sortField" value="_id" checked={filterBy.sortField === '_id'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                Original ETA
                                <input type="radio" name="sortField" value="original eta" checked={filterBy.sortField === 'original eta'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                Status
                                <input type="radio" name="sortField" value="status" checked={filterBy.sortField === 'status'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                order ready to ship
                                <input type="radio" name="sortField" value="order ready to ship" checked={filterBy.sortField === 'order ready to ship'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                shipment on its way
                                <input type="radio" name="sortField" value="shipment on its way" checked={filterBy.sortField === 'shipment on its way'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                </tr>
            </thead>
            <tbody>
                {shipments.map(shipment => (
                    <tr key={shipment._id}>
                        <td>{shipment._id.slice(shipment._id.length - 2)}</td>
                        <td>
                            {`${shipment.original_eta.slice(8, 10)}/${shipment.original_eta.slice(5, 7)}/${shipment.original_eta.slice(0, 4)} ${shipment.original_eta.slice(-9, -4)}`}
                        </td>
                        <td></td>
                        <td>
                            {shipment.order_ready_to_ship ?
                                `${shipment.order_ready_to_ship.slice(8, 10)}/${shipment.order_ready_to_ship.slice(5, 7)}/${shipment.order_ready_to_ship.slice(0, 4)} ${shipment.order_ready_to_ship.slice(-9, -4)}`
                                : 'No'}

                        </td>
                        <td>
                            {shipment.shipment_on_its_way ?
                                `${shipment.shipment_on_its_way.slice(8, 10)}/${shipment.shipment_on_its_way.slice(5, 7)}/${shipment.shipment_on_its_way.slice(0, 4)} ${shipment.shipment_on_its_way.slice(-9, -4)}`
                                : 'No'}
                        </td>

                    </tr>))}

            </tbody>
        </table>
    )
}
