# 源码解析

## 初始化入口组件
instanitateReactComponent判断node类型来区分不同组件的入口

## React组件
React根据生成的ReactElement或者Node节点来生成自己的React组件，组件封装实现了通用方法mountComponent， receiveComponent，unMountComponent等
* **ReactDOMComponent** DOM标签组件
* **ReactDOMEmptyComponent** 空组件
* **ReactDOMTextComponent** 文本组件
* **ReactCompositeComponent** 自定义标签组件，包括继承Component的Class组件，函数组件(包括stateless组件), Class组件中的钩子也是在此实例中

### ReactDOMComponent
* **属性的更新** 包括样式，属性，处理事件
* **子节点的更新** 包括内容，子节点，此部分涉及Diff算法

### ReactCompositeComponent
React的生命周期和setState机制的实现