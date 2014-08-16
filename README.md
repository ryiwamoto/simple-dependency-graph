# simple-dependency-graph
Simple dependency graph that allows circular dependencies.

## Usage
```js
var graph = new DependencyGraph();

graph.addDependency('b', 'a');//b depends on a
graph.addDependency('a', 'b');//a depends on b
graph.addDependency('c', 'a');//c depends on a

var dependents = graph.getDependentsOf('a');
expect(dependents).toEqual(['b', 'c']);
```

## API
- hasNode(id)
- removeNode(id)
- addDependency(from, to)
- removeDependency(from, to)
- hasDependency(from, to)
- getDependentsOf(id)
- getDependenciesOf(id)
