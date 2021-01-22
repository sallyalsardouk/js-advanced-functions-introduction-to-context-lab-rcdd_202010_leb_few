function createEmployeeRecord(array) {
    return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployees(array) {
    const employees = []
    array.forEach( employee => employees.push(createEmployeeRecord(employee)))
    return employees
}

function createTimeInEvent(record, timeIn) {
    const timeAr = timeIn.split(" ")
    const obj = {type: "TimeIn", hour: parseInt(timeAr[1]), date: timeAr[0]}
    record.timeInEvents.push(obj)
    return record
}

function createTimeOutEvent(record, timeOut) {
    const timeAr = timeOut.split(" ")
    const obj = {type: "TimeOut", hour: parseInt(timeAr[1]), date: timeAr[0]}
    record.timeOutEvents.push(obj)
    return record
}

function hoursWorkedOnDate (record, date) {

    const timeIn = record.timeInEvents.find(event => event.date === date)
    const timeOut = record.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate (record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor (record) {
    const dates = record.timeOutEvents.map(event => event.date)
    
    return dates.reduce((total, date) => total + wagesEarnedOnDate (record, date), 0)
}

function createEmployeeRecords (array){
    const employeeRecords = []
    array.forEach(arr => employeeRecords.push(createEmployeeRecord(arr)))
    return employeeRecords
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll (array) {
    return array.reduce((total, record) => total + allWagesFor(record), 0)
}