import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function DecisionTreeLearning() {
  const svgRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    svg.selectAll("*").remove();

    // Generate two-class dataset with clear decision boundaries
    const numPoints = Math.floor((width * height) / 4000);
    let points = [];
    
    const generatePoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * width * 0.8 + width * 0.1;
        const y = Math.random() * height * 0.8 + height * 0.1;
        
        // Create complex decision boundary for interesting tree growth
        let label = 0;
        if (x < width * 0.5) {
          if (y < height * 0.6) {
            label = Math.random() < 0.8 ? 1 : 0;
          } else {
            label = Math.random() < 0.3 ? 1 : 0;
          }
        } else {
          if (y < height * 0.4) {
            label = Math.random() < 0.2 ? 1 : 0;
          } else {
            label = Math.random() < 0.9 ? 1 : 0;
          }
        }
        
        points.push({ x, y, label, nodeId: 0 });
      }
    };

    generatePoints();

    // Tree structure
    let tree = {
      nodes: [
        {
          id: 0,
          x: width / 2,
          y: height * 0.1,
          isLeaf: true,
          splitFeature: null,
          splitValue: null,
          leftChild: null,
          rightChild: null,
          points: [...points],
          depth: 0,
          prediction: 0.5,
          grown: false
        }
      ],
      nextId: 1
    };

    const colors = ["#AA74E6", "#74E6AA"];
    const nodeColor = "#E6AA74";

    // Create point elements
    const dataPoints = svg.selectAll(".data-point")
      .data(points)
      .join("circle")
      .attr("class", "data-point")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 2)
      .attr("fill", d => colors[d.label])
      .attr("opacity", 0.7);

    // Tree visualization elements
    const treeGroup = svg.append("g").attr("class", "tree");
    
    // Calculate impurity (Gini index)
    const calculateImpurity = (nodePoints) => {
      if (nodePoints.length === 0) return 0;
      const class1Count = nodePoints.filter(p => p.label === 1).length;
      const p1 = class1Count / nodePoints.length;
      const p0 = 1 - p1;
      return 1 - (p1 * p1 + p0 * p0);
    };

    // Find best split
    const findBestSplit = (node) => {
      let bestGain = 0;
      let bestSplit = null;
      const nodePoints = node.points;
      const parentImpurity = calculateImpurity(nodePoints);

      // Try splits on x and y coordinates
      for (const feature of ['x', 'y']) {
        const values = nodePoints.map(p => p[feature]).sort((a, b) => a - b);
        
        for (let i = 1; i < values.length; i++) {
          const splitValue = (values[i] + values[i-1]) / 2;
          
          const leftPoints = nodePoints.filter(p => p[feature] <= splitValue);
          const rightPoints = nodePoints.filter(p => p[feature] > splitValue);
          
          if (leftPoints.length === 0 || rightPoints.length === 0) continue;
          
          const leftImpurity = calculateImpurity(leftPoints);
          const rightImpurity = calculateImpurity(rightPoints);
          const weightedImpurity = (leftPoints.length * leftImpurity + rightPoints.length * rightImpurity) / nodePoints.length;
          const gain = parentImpurity - weightedImpurity;
          
          if (gain > bestGain) {
            bestGain = gain;
            bestSplit = {
              feature,
              value: splitValue,
              gain,
              leftPoints,
              rightPoints
            };
          }
        }
      }

      return bestSplit;
    };

    // Split a node
    const splitNode = (nodeId) => {
      const node = tree.nodes.find(n => n.id === nodeId);
      if (!node || !node.isLeaf || node.points.length < 10) return;

      const bestSplit = findBestSplit(node);
      if (!bestSplit || bestSplit.gain < 0.01) return;

      // Update current node
      node.isLeaf = false;
      node.splitFeature = bestSplit.feature;
      node.splitValue = bestSplit.value;
      node.grown = true;

      // Create child nodes
      const leftX = node.x - (width * 0.15) / (node.depth + 1);
      const rightX = node.x + (width * 0.15) / (node.depth + 1);
      const childY = node.y + height * 0.12;

      const leftChild = {
        id: tree.nextId++,
        x: leftX,
        y: childY,
        isLeaf: true,
        splitFeature: null,
        splitValue: null,
        leftChild: null,
        rightChild: null,
        points: bestSplit.leftPoints.map(p => ({...p, nodeId: tree.nextId - 1})),
        depth: node.depth + 1,
        prediction: bestSplit.leftPoints.filter(p => p.label === 1).length / bestSplit.leftPoints.length,
        grown: false
      };

      const rightChild = {
        id: tree.nextId++,
        x: rightX,
        y: childY,
        isLeaf: true,
        splitFeature: null,
        splitValue: null,
        leftChild: null,
        rightChild: null,
        points: bestSplit.rightPoints.map(p => ({...p, nodeId: tree.nextId - 1})),
        depth: node.depth + 1,
        prediction: bestSplit.rightPoints.filter(p => p.label === 1).length / bestSplit.rightPoints.length,
        grown: false
      };

      node.leftChild = leftChild.id;
      node.rightChild = rightChild.id;

      tree.nodes.push(leftChild);
      tree.nodes.push(rightChild);
    };

    // Update visualization
    const updateVisualization = () => {
      // Draw edges
      const edges = [];
      tree.nodes.forEach(node => {
        if (!node.isLeaf) {
          const leftChild = tree.nodes.find(n => n.id === node.leftChild);
          const rightChild = tree.nodes.find(n => n.id === node.rightChild);
          if (leftChild) edges.push({ from: node, to: leftChild });
          if (rightChild) edges.push({ from: node, to: rightChild });
        }
      });

      treeGroup.selectAll(".edge")
        .data(edges)
        .join("line")
        .attr("class", "edge")
        .attr("x1", d => d.from.x)
        .attr("y1", d => d.from.y)
        .attr("x2", d => d.to.x)
        .attr("y2", d => d.to.y)
        .attr("stroke", "#FFF")
        .attr("stroke-width", 1)
        .attr("opacity", 0.6);

      // Draw nodes
      treeGroup.selectAll(".node")
        .data(tree.nodes)
        .join("circle")
        .attr("class", "node")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.isLeaf ? 8 : 12)
        .attr("fill", d => {
          if (d.isLeaf) {
            return d.prediction > 0.5 ? colors[1] : colors[0];
          }
          return nodeColor;
        })
        .attr("stroke", "#FFF")
        .attr("stroke-width", 2)
        .attr("opacity", d => d.grown ? 1 : 0.5);

      // Draw split lines
      const splitLines = tree.nodes.filter(n => !n.isLeaf && n.grown);
      
      treeGroup.selectAll(".split-line")
        .data(splitLines)
        .join("line")
        .attr("class", "split-line")
        .attr("x1", d => d.splitFeature === 'x' ? d.splitValue : 0)
        .attr("y1", d => d.splitFeature === 'y' ? d.splitValue : 0)
        .attr("x2", d => d.splitFeature === 'x' ? d.splitValue : width)
        .attr("y2", d => d.splitFeature === 'y' ? d.splitValue : height)
        .attr("stroke", nodeColor)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("opacity", 0.7);

      // Update point colors based on current tree predictions
      dataPoints.attr("fill", d => {
        const leafNode = tree.nodes.find(n => n.isLeaf && n.points.some(p => p.x === d.x && p.y === d.y));
        if (leafNode) {
          return leafNode.prediction > 0.5 ? colors[1] : colors[0];
        }
        return colors[d.label];
      })
      .attr("opacity", d => {
        const leafNode = tree.nodes.find(n => n.isLeaf && n.points.some(p => p.x === d.x && p.y === d.y));
        if (leafNode) {
          return 0.4 + 0.6 * Math.abs(leafNode.prediction - 0.5) * 2;
        }
        return 0.7;
      });

      // Draw node labels
      treeGroup.selectAll(".node-label")
        .data(tree.nodes.filter(n => !n.isLeaf))
        .join("text")
        .attr("class", "node-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#FFF")
        .attr("font-size", "12px")
        .attr("font-family", "monospace")
        .text(d => `${d.splitFeature} ${d.splitValue ? d.splitValue.toFixed(0) : ''}`);
    };

    // Animation loop
    let iteration = 0;
    const maxIterations = 100;
    let lastSplitTime = 0;
    const splitInterval = 2000; // 2 seconds between splits

    const step = () => {
      const currentTime = Date.now();
      
      if (currentTime - lastSplitTime > splitInterval && iteration < maxIterations) {
        // Find leaf nodes that can be split
        const leafNodes = tree.nodes.filter(n => n.isLeaf && n.points.length >= 10 && n.depth < 4);
        
        if (leafNodes.length > 0) {
          // Split the leaf with highest impurity
          const nodeToSplit = leafNodes.reduce((best, node) => {
            const impurity = calculateImpurity(node.points);
            const bestImpurity = calculateImpurity(best.points);
            return impurity > bestImpurity ? node : best;
          });
          
          splitNode(nodeToSplit.id);
          lastSplitTime = currentTime;
          iteration++;
        }
      }
      
      updateVisualization();
    };

    // Initial visualization
    updateVisualization();
    
    // Start animation
    const interval = d3.interval(step, 100);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (newWidth !== width || newHeight !== height) {
        const scaleX = newWidth / width;
        const scaleY = newHeight / height;
        
        width = newWidth;
        height = newHeight;
        
        svg.attr("width", width).attr("height", height);
        
        // Scale tree nodes
        tree.nodes.forEach(node => {
          node.x *= scaleX;
          node.y *= scaleY;
          if (node.splitValue) {
            if (node.splitFeature === 'x') {
              node.splitValue *= scaleX;
            } else {
              node.splitValue *= scaleY;
            }
          }
          node.points.forEach(point => {
            point.x *= scaleX;
            point.y *= scaleY;
          });
        });
        
        // Scale data points
        points.forEach(point => {
          point.x *= scaleX;
          point.y *= scaleY;
        });
        
        dataPoints.data(points)
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
        
        updateVisualization();
        
        // Reset animation
        iteration = 0;
        lastSplitTime = 0;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      interval.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}