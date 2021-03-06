let genericComponentClass = null
let textComponentClass = null

const ReactHostComponentInjection = {
    injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
    },
    injectTextComponentClass: function(componentClass) {
        textComponentClass = componentClass;
    }
}

function createInternalComponent(element) {
    return new genericComponentClass(element)
}

function createInstanceForText(node) {
    return new textComponentClass(text)
}

const ReactNativeComponent = {
    createInternalComponent,
    createInstanceForText,
    injection: ReactHostComponentInjection
}

export default ReactNativeComponent