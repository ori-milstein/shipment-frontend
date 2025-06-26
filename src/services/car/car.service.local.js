
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'car'

export const carService = {
    query,
    getById,
    save,
    remove,
    addCarMsg,
    isShipmentAtRisk,
}
window.cs = carService


async function query(filterBy = { txt: '', price: 0 }) {
    var cars = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        cars = cars.filter(car => regex.test(car.vendor) || regex.test(car.description))
    }
    if (minSpeed) {
        cars = cars.filter(car => car.speed >= minSpeed)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        cars.sort((car1, car2) =>
            car1[sortField].localeCompare(car2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        cars.sort((car1, car2) =>
            (car1[sortField] - car2[sortField]) * +sortDir)
    }

    cars = cars.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return cars
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
    var savedCar
    if (car._id) {
        const carToSave = {
            _id: car._id,
            price: car.price,
            speed: car.speed,
        }
        savedCar = await storageService.put(STORAGE_KEY, carToSave)
    } else {
        const carToSave = {
            vendor: car.vendor,
            price: car.price,
            speed: car.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedCar = await storageService.post(STORAGE_KEY, carToSave)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    // Later, this is all done by the backend
    const car = await getById(carId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    car.msgs.push(msg)
    await storageService.put(STORAGE_KEY, car)

    return msg
}



function isShipmentAtRisk(shipmentData) {
    const currentTime = new Date().getTime()

    const transportHasntBegun = !shipmentData.shipment_on_its_way
    const timeForTransportToBegin = calculateTimeForTransportToBegin(shipmentData)
    const transportShouldBegin = currentTime >= timeForTransportToBegin

    const orderNotReady = !shipmentData.order_ready_to_ship
    const timeForOrderToBeReady = calculateTimeForOrderToBeReady(shipmentData)
    const orderShouldBeReady = currentTime >= timeForOrderToBeReady

    console.log('shipmentData._id', shipmentData._id)
    console.log('timeForOrderToBeReady', new Date(timeForOrderToBeReady))
    console.log('timeForTransportToBegin', new Date(timeForTransportToBegin))
    console.log('transportHasntBegun', transportHasntBegun)
    console.log('transportShouldBegin', transportShouldBegin)
    console.log('orderNotReady', orderNotReady)
    console.log('orderShouldBeReady', orderShouldBeReady)

    if (transportHasntBegun && transportShouldBegin) {
        console.log('true')
        return true
    } else if (orderNotReady && orderShouldBeReady) {
        console.log('true')
        return true
    } else {
        console.log('false')
        return false
    }

}

function calculateTimeForOrderToBeReady(shipmentData) {
    const timeForTransportToBegin = calculateTimeForTransportToBegin(shipmentData)
    const timeForOrderToBeReady = timeForTransportToBegin - timeFromReadyToTransport(shipmentData)

    return timeForOrderToBeReady
}

function timeFromReadyToTransport(shipmentData) {
    switch (shipmentData.company) {
        case "Acme Corp":
            return 12 * 60 * 60 * 1000 // 12 hours in milliseconds
            break;
        case "Beta Industries":
            return 8 * 60 * 60 * 1000 // 8 hours in milliseconds
            break;
        case "Gamma Supplies":
            return 6 * 60 * 60 * 1000 // 6 hours in milliseconds
            break;
        default: 18 * 60 * 60 * 1000
            break;
    }
}

function calculateTimeForTransportToBegin(shipmentData) {
    const originalEtaTimestamp = new Date(shipmentData.original_eta).getTime()
    const estTravelTimeInMillisecs = shipmentData.estimated_travel_time_in_hours * 60 * 60 * 1000

    return originalEtaTimestamp - estTravelTimeInMillisecs
}