import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadCars, addCar, updateCar, removeCar, addCarMsg } from '../store/actions/car.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { carService } from '../services/car/'
import { userService } from '../services/user'

import { CarList } from '../cmps/CarList'
import { CarFilter } from '../cmps/CarFilter'
import { ShipmentTable } from '../cmps/ShipmentTable'


export function CarIndex() {

    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const shipments = useSelector(storeState => storeState.carModule.cars)
    // const statusesCalc = shipments.map(shipmet => {
    //     carService.isShipmentAtRisk(shipmet) ? 'At Risk' : 'On Time'
    // })
    const [statuses, setStatuses] = useState([])
    useEffect(() => {
        loadCars(filterBy)

    }, [filterBy])

    useEffect(() => {
        setStatuses(shipments.map(shipment => {
            return { id: shipment._id, stat: carService.isShipmentAtRisk(shipment) ? 'At Risk' : 'On Time' }

        }))

    }, [shipments])

    async function onRemoveCar(carId) {
        try {
            await removeCar(carId)
            showSuccessMsg('Car removed')
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = carService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }
    }

    async function onUpdateCar(car) {
        const speed = +prompt('New speed?', car.speed)
        if (speed === 0 || speed === car.speed) return

        const carToSave = { ...car, speed }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new speed: ${savedCar.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }
    }
    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterBy.sortDir) filterBy.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterBy({ ...filterBy, [field]: value })
    }

    return (
        <main className="car-index">
            {/* <header>
                <h2>Cars</h2>
                {userService.getLoggedinUser() && <button onClick={onAddCar}>Add a Car</button>}
            </header> */}
            {/* <CarFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <ShipmentTable filterBy={filterBy} handleChange={handleChange} shipments={shipments} statuses={statuses} />
            {/* <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
                onUpdateCar={onUpdateCar} /> */}
        </main>
    )
}