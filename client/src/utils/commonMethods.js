function showElements(...propertyNames){
    propertyNames.forEach(name => this[name] = true)
}

function hideElements(...propertyNames){
    propertyNames.forEach(name => this[name] = false)
}

function showAndHideErrorMessage(){
    this.message = 'Please make a selection'
    setTimeout( () => {
        this.message = null
    }, 4000)
}

export { showElements, hideElements, showAndHideErrorMessage }