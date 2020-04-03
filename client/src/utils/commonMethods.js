function showElements(...propertyNames){
    propertyNames.forEach(name => this[name] = true)
}

function hideElements(...propertyNames){
    propertyNames.forEach(name => this[name] = false)
}

export { showElements, hideElements }