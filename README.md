# simple-dependency-graph
Simple dependency graph that allows circular dependencies.

## Usage
```js
var graph = new DependencyGraph();

graph.addDependency('b', 'a');
graph.addDependency('a', 'b');

var dependents = graph.getDependentsOf('a');
expect(dependents).toEqual(['b']);
```

## API
- hasNode(id)
- removeNode(id)
- addDependency(from, to)
- removeDependency(from, to)
- hasDependency(from, to)
- getDependentsOf(id)
- getDependenciesOf(id)
