import ReactMultiChild from '../react-reconciler/ReactMultiChild'
import DOMNamespaces from './DOMNamespaces'
import DOMPropertyOperations from './DOMPropertyOperations'
import DOMLazyTree from './client/utils/DOMLazyTree'

import { getNodeFromInstance, precacheNode } from './client/ReactDOMComponentTree'
import { registrationNameModules } from '../shared/event/EventPluginRegistry'

const CONTENT_TYPES = {'string': true, 'number': true}

class ReactDOMComponent {
    constructor(element) {
        const tag = element.type
        // for diff
        this._domID = null

        this._currentElement = element
        this._tag = tag.toLowerCase()
        this._namespaceURI = null
    }

    mountComponent(
        transaction = { useCreateElement: true},
        nativeParent,
        nativeContainerInfo,
        context
    ) {
        this._domID = nativeContainerInfo._idCounter++
        this._nativeParent = nativeParent
        this._nativeContainerInfo = nativeContainerInfo

        const props = this._currentElement.props

        // namespace 还没去研究干啥的
        let namespaceURI
        let parentTag

        if (nativeParent) {
            namespaceURI = nativeParent._namespaceURI
            parentTag = nativeParent._tag
        } else if (nativeContainerInfo._tag) {
            namespaceURI = nativeContainerInfo._namespaceURI
            parentTag = nativeContainerInfo._tag
        }

        if (namespaceURI == null ||
            namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
                namespaceURI = DOMNamespaces.html
        }

        if (namespaceURI === DOMNamespaces.html) {
            if (this._tag === 'svg') {
              namespaceURI = DOMNamespaces.svg;
            } else if (this._tag === 'math') {
              namespaceURI = DOMNamespaces.mathml;
            }
        }

        this._namespaceURI = namespaceURI

        let mountImage

        // 创建
        if (transaction.useCreateElement) {
            const ownerDocument = nativeContainerInfo._ownerDocument
            let el 

            if (namespaceURI === DOMNamespaces.html) {
                if (this._tag === 'script') {
                
                } else {
                    el = ownerDocument.createElement(this._currentElement.type)
                } 
            } else {
                el = ownerDocument.createElementNS(
                    namespaceURI,
                    this._currentElement.type
                )
            }

            precacheNode(this, el)

            if (!this._nativeParent) {
                DOMPropertyOperations.setAttributeForRoot(el);
            }

            this._updateDOMProperties(null, props, transaction)

            const lazyTree = DOMLazyTree(el)

            this._createInitialChildren(transaction, props, context, lazyTree)

            mountImage = lazyTree
        } else { // 更新

        }

        return mountImage
    }

    /**
     * 事件绑定
     * @param {*} lastProps 
     * @param {*} nextProps 
     * @param {*} transaction 
     */
    _updateDOMProperties(lastProps, nextProps, transaction) {
        let propKey
        for (propKey in lastProps) {

        }
        for (propKey in nextProps) {
            const nextProp = nextProps[propKey]

            if (registrationNameModules.hasOwnProperty(propKey)) {

            }
        }
    }

    _createInitialChildren(transaction, props, context, lazyTree) {
        const innerHTML = props.dangerouslySetInnerHTML

        if (innerHTML) {

        } else {
            const contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null
            const childrenToUse = contentToUse != null ? null : props.children

            if (contentToUse != null) {
                // 将文本绑定到节点上去
                DOMLazyTree.queueText(lazyTree, contentToUse);
              } else if (childrenToUse != null) {
                // 还不知道干啥
                const mountImages = this.mountChildren(
                  childrenToUse,
                  transaction,
                  context
                )
                for (var i = 0; i < mountImages.length; i++) {
                  DOMLazyTree.queueChild(lazyTree, mountImages[i]);
                }
              }
        }
    }

    getPublicInstance() {
        return getNodeFromInstance(this)
    }
}

ReactDOMComponent.displayName = 'ReactDOMComponent'

Object.assign(
    ReactDOMComponent.prototype,
    ReactMultiChild
)

export default ReactDOMComponent