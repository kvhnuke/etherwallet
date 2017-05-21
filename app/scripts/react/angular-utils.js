// kitchen sink helpers to intrace with angular

let translateService = null;
let rootScope = null;
let filters = {};

angular.module("mewApp").run([
  "$filter",
  "$rootScope",
  "$translate",
  function($filter, $rootScope, $translate) {
    translateService = $translate;
    rootScope = $rootScope;
    filters.number = $filter("number");
    filters.currency = $filter("currency");
    module.exports.di.rootScope = $rootScope;
  }
]);

function _findInScope(scope, key) {
  if (!scope) {
    return;
  }
  if (scope[key]) {
    return scope[key];
  }
  return _findInScope(scope.$parent, key);
}

function translateJsxNode(element) {
  if (element.props && element.props.translate) {
    element = Object.assign({}, element, {
      props: Object.assign({}, element.props, {
        dangerouslySetInnerHTML: {
          __html: translateService.instant(element.props.translate)
        }
      })
    });
    delete element.props.children;
    delete element.props.translate;
    return element;
  }
  if (element.props && element.props.children) {
    return Object.assign({}, element, {
      props: Object.assign({}, element.props, {
        children: translateJsx(element.props.children)
      })
    });
  }
  return element;
}

function translateJsx(jsx) {
  if (!jsx) {
    return jsx;
  }

  if (!Array.isArray(jsx)) {
    return translateJsxNode(jsx)
  }

  return jsx.map(translateJsxNode);
}

// FIXME not proper HOC
function translate(Wrapped) {
  return class Translated extends Wrapped {
    componentDidMount() {
      if (super.componentDidMount) super.componentDidMount();
      this.unsubscribe = rootScope.$on("$translateChangeSuccess", () => {
        this.forceUpdate();
      });
    }
    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();
      this.unsubscribe();
    }
    render() {
      return translateJsx(super.render());
    }
  };
}

module.exports = {
  di: {
    filters: filters
  },
  findInScope: function(component, key) {
    return _findInScope(angular.element(ReactDOM.findDOMNode(component)).scope(), key);
  },
  translate: translate
};
