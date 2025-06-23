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
                        <td>{shipment._id}</td>
                        <td>
                            {shipment.original_eta}
                        </td>
                        <td></td>
                        <td>{shipment.order_ready_to_ship}</td>
                        <td>{shipment.shipment_on_its_way}</td>

                    </tr>))}

            </tbody>
        </table>
    )
}
