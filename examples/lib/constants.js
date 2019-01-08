const canUseLazy = !!(
    typeof document !== undefined &&
    typeof document.documentMode === 'number' ||
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent === 'string' &&
    /\bEdge\/\d/.test(navigator.userAgent)
)
const ELEMENT_NODE_TYPE = 1 // 元素
const ATTR_NODE_TYPE = 2 // 属性
const TEXT_NODE_TYPE = 3 // 元素或属性中的文本内容
const CDATASECTION_NODE_TYPE = 4 // 不会被解释的部分
const ENTITYREFERENCE_NODE_TYPE = 5 // 实体引用
const ENTITY_NODE_TYPE = 6 // 实体
const PROCESSINGINSTRUCTION_NODE_TYPE = 7 // 代表处理指令
const COMMENT_NODE_TYPE = 8  // 注释
const DOC_NODE_TYPE = 9 // 代表整个文档
const DOCUMENTFRAGMENT_NODE_TYPE = 11 // 轻量级的文档处理对象