var _ = require("lodash");

var DependencyGraph = (function () {
  function DependencyGraph() {
    this.incoming = {};
    this.outgoing = {};
  }

  DependencyGraph.prototype.hasNode = function(id){
    return !!this.incoming[id] || !!this.outgoing[id];
  };


  DependencyGraph.prototype.removeNode = function(id){
    var _this = this;

    delete this.incoming[id];
    _.forIn(this.incoming, function(dependants, key){
      _this.removeDependency(id, key);
    });

    delete this.outgoing[id];
  };

  DependencyGraph.prototype.hasDependency = function (from, to) {
    return (this.incoming[to] ? this.incoming[to] : []).some(function(id){
      return id === from;
    });
  };

  DependencyGraph.prototype.addDependency = function (from, to) {
    if(to+"" === from+""){
      return ;
    }
    this._addDependency(this.incoming, from, to);
    this._addDependency(this.outgoing, to, from);
  };

  DependencyGraph.prototype._addDependency = function(edge, val, key){
    if(!edge[key]){
      edge[key] = [];
    }
    if (edge[key].indexOf(val) === -1) {
      edge[key].push(val);
    }
  };

  DependencyGraph.prototype.removeDependency = function (from, to) {
    this._removeDependency(this.incoming, from, to);
    this._removeDependency(this.outgoing, to, from);
  };

  DependencyGraph.prototype._removeDependency = function(edge, val, key){
    if(!edge[key]){
      return;
    }
    var index = edge[key].indexOf(val);
    if (index !== -1) {
      edge[key].splice(index, index+1);
    }
  };

  DependencyGraph.prototype.getDependentsOf = function (dependOn) {
    return _.without(this._trackDependencies(this.incoming, dependOn, []), dependOn);
  };

  DependencyGraph.prototype.getDependenciesOf = function (dependFrom) {
    return _.without(this._trackDependencies(this.outgoing, dependFrom, []), dependFrom);
  };

  DependencyGraph.prototype._trackDependencies = function (edge, id, context) {
    var _this = this;

    var dependants = edge[id];
    var next = _.difference(dependants, context);
    var newContext = context.concat(next);

    return _.uniq(next.reduce(function(context, id){
      return context.concat(_this._trackDependencies(edge, id, context));
    }, newContext));
  };

  return DependencyGraph;
})();

module.exports = DependencyGraph;
