var DependencyGraph = require('../index.js');

describe("DependencyGraph", function () {
  describe("#getDependenciesOf", function(){
    it("can track dependencies", function(){
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('b', 'c');

      var dependecies = graph.getDependenciesOf('b');
      expect(dependecies.length).toBe(2);
      expect(dependecies).toContain('a');
      expect(dependecies).toContain('c');
    });
  });

  describe("#getDependantsOf", function(){
    it("can track one-to-one dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');

      var dependants = graph.getDependantsOf('a');
      expect(dependants).toEqual(['b']);
    });

    it("can track one-to-many dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('c', 'a');

      var dependants = graph.getDependantsOf('a');
      expect(dependants.length).toBe(2);
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
    });

    it("can track chain dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('c', 'a');

      var dependants = graph.getDependantsOf('a');
      expect(dependants.length).toBe(2);
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
    });

    it("can track duplicate dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('c', 'a');
      graph.addDependency('c', 'b');

      var dependants = graph.getDependantsOf('a');
      expect(dependants.length).toBe(2);
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
    });

    it("can track circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('a', 'b');

      var dependants = graph.getDependantsOf('a');
      expect(dependants).toEqual(['b']);
    });

    it("can track self circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('a', 'a');

      var dependants = graph.getDependantsOf('a');
      expect(dependants).toEqual([]);
    });

    it("can track long circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('c', 'b');
      graph.addDependency('d', 'c');
      graph.addDependency('a', 'd');

      var dependants = graph.getDependantsOf('a');
      expect(dependants.length).toBe(3);
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
      expect(dependants).toContain('d');
    });

    it("can track some circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('c', 'a');
      graph.addDependency('a', 'c');

      graph.addDependency('b', 'a');
      graph.addDependency('a', 'b');

      var dependants = graph.getDependantsOf('a');
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
      expect(dependants.length).toBe(2);
    });

    it("can track complex circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('c', 'a');
      graph.addDependency('a', 'c');

      graph.addDependency('b', 'a');
      graph.addDependency('a', 'b');

      graph.addDependency('c', 'b');
      graph.addDependency('b', 'c');

      var dependants = graph.getDependantsOf('a');
      expect(dependants).toContain('b');
      expect(dependants).toContain('c');
      expect(dependants.length).toBe(2);
    });

    it("can track more complex circular dependency", function () {
      var graph = new DependencyGraph();

      graph.addDependency('b', 'a');
      graph.addDependency('c', 'b');
      graph.addDependency('a', 'c');

      graph.addDependency('d', 'b');

      graph.addDependency('e', 'd');
      graph.addDependency('c', 'e');

      graph.addDependency('f', 'e');
      graph.addDependency('c', 'f');

      var dependants = graph.getDependantsOf('b');
      expect(dependants).toContain('a');
      expect(dependants).toContain('c');
      expect(dependants).toContain('d');
      expect(dependants).toContain('e');
      expect(dependants).toContain('f');
      expect(dependants.length).toBe(5);
    });
  });

  describe("#removeDependency", function(){
    it("can remove simple incoming dependency", function () {
      var graph = new DependencyGraph();
      graph.addDependency("b", "a");
      graph.removeDependency("b", "a");

      var dependants = graph.getDependantsOf('a');
      expect(dependants.length).toBe(0);
    });

    it("can remove simple outgoing dependency", function () {
      var graph = new DependencyGraph();
      graph.addDependency("b", "a");
      graph.removeDependency("b", "a");

      var dependecies = graph.getDependenciesOf('b');
      expect(dependecies.length).toBe(0);
    });
  });

  describe("#hasDependency", function(){
    it("can detect simple dependency", function () {
      var graph = new DependencyGraph();
      graph.addDependency("b", "a");

      expect(graph.hasDependency('b', 'a')).toBe(true);
    });
  });

  describe("#removeNode", function(){
    it("can remove all incoming dependencies", function () {
      var graph = new DependencyGraph();
      graph.addDependency("b", "a");
      graph.addDependency("a", "c");
      graph.addDependency("c", "a");

      graph.removeNode("a");

      var dependantsOfA = graph.getDependantsOf('a');
      expect(dependantsOfA.length).toBe(0);

      var dependantsOfC = graph.getDependantsOf('c');
      expect(dependantsOfC.length).toBe(0);
    });

    it("can remove all outgoing dependencies", function () {
      var graph = new DependencyGraph();
      graph.addDependency("b", "a");
      graph.addDependency("a", "c");
      graph.addDependency("c", "a");

      graph.removeNode("a");

      var dependantsOfA = graph.getDependenciesOf('a');
      expect(dependantsOfA.length).toBe(0);
    });

    //TODO outgoing test
  });

  describe("#hasNode", function(){
    it("can detect incoming dependency", function () {
      var graph = new DependencyGraph();
      graph.addDependency("a", "b");

      expect(graph.hasNode("b")).toBe(true);
    });

    it("can detect outgoing dependency", function () {
      var graph = new DependencyGraph();
      graph.addDependency("a", "b");

      expect(graph.hasNode("a")).toBe(true);
    });
  });
});
