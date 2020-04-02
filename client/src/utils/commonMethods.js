// export const namespaced = true

// export const helperMethods = {
//     showElements: (...propertyNames) => {
//         propertyNames.forEach(name => this[name] = true)
//     },
//     hideElements: (...propertyNames) => {
//         propertyNames.forEach(name => this[name] = false)
//     }
// }

    function showElements(...propertyNames){
        propertyNames.forEach(name => this[name] = true)
    }

    function hideElements(...propertyNames){
        propertyNames.forEach(name => this[name] = false)
    }

    export { showElements, hideElements }