# simple-dependency-graph
Simple dependency graph that allows circular dependencies.

## Usage
```js
var graph = new DependencyGraph();

graph.addDependency('b', 'a');
graph.addDependency('a', 'b');

var dependants = graph.getDependantsOf('a');
expect(dependants).toEqual(['b']);
```

## API
- hasNode(id)
- removeNode(id)
- addDependency(from, to)
- removeDependency(from, to)
- hasDependency(from, to)
- getDependantsOf(id)
- getDependenciesOf(id)