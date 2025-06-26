import { httpService } from '../http.service'

export const carService = {
    query,
    getById,
    save,
    remove,
    addCarMsg,
    isShipmentAtRisk
}

async function query(filterBy = {}) {
    return httpService.get(`shipment`, filterBy)
}

function getById(carId) {
    return httpService.get(`car/${carId}`)
}

async function remove(carId) {
    return httpService.delete(`car/${carId}`)
}
async function save(car) {
    var savedCar
    if (car._id) {
        savedCar = await httpService.put(`car/${car._id}`, car)
    } else {
        savedCar = await httpService.post('car', car)
    }
    return savedCar
}

async function addCarMsg(carId, txt) {
    const savedMsg = await httpService.post(`car/${carId}/msg`, { txt })
    return savedMsg
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