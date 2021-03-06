const ReactReconciler = {
    mountComponent: function (
        internalInstance,
        transaction = { useCreateElement: true },
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        const markup = internalInstance.mountComponent(
            transaction,
            nativeParent,
            nativeContainerInfo,
            context
        ) 
        if ( internalInstance._currentElement &&
            internalInstance._currentElement.ref !== null) {

        }
        return markup
    }
}

export default ReactReconciler