export function ShipmentTable({ filterBy, handleChange }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <label>
                            <div>
                                Speed
                                <input
                                    type="radio"
                                    name="sortField"
                                    value="speed"
                                    checked={filterBy.sortField === 'speed'}
                                    onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                Vendor
                                <input type="radio" name="sortField" value="vendor" checked={filterBy.sortField === 'vendor'} onChange={handleChange} /* defaultValue={true} */ />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>Owner
                                <input type="radio" name="sortField" value="owner" checked={filterBy.sortField === 'owner'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                    <th>
                        <label>
                            <div>
                                Shipment Id
                                <input type="radio" name="sortField" value="shipmentId" checked={filterBy.sortField === 'shipmentId'} onChange={handleChange} />
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
                                Description
                                <input type="radio" name="sortField" value="description" checked={filterBy.sortField === 'description'} onChange={handleChange} />
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
                                Current ETA
                                <input type="radio" name="sortField" value="current eta" checked={filterBy.sortField === 'current eta'} onChange={handleChange} />
                            </div>
                        </label>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anderssssssssssssssssssgmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </tbody>
        </table>
    )
}
