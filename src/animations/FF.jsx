import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function NeuralNetworkAnimation() {
  const svgRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    svg.selectAll("*").remove();

    // Network architecture - reduced for performance
    const layers = [6, 8, 10, 8, 4]; // Input -> Hidden layers -> Output
    
    // Generate network nodes and connections
    let nodes = [];
    let connections = [];
    
    const generateNetwork = () => {
      nodes = [];
      connections = [];
      
      const layerSpacing = width / (layers.length + 1);
      
      layers.forEach((nodeCount, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1);
        const layerHeight = height * 0.8;
        const nodeSpacing = layerHeight / (nodeCount + 1);
        const startY = (height - layerHeight) / 2;
        
        for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
          const y = startY + nodeSpacing * (nodeIndex + 1);
          nodes.push({
            id: `${layerIndex}-${nodeIndex}`,
            layer: layerIndex,
            index: nodeIndex,
            x,
            y,
            activation: 0,
            bias: (Math.random() - 0.5) * 2,
            inputs: []
          });
        }
      });

      // Create connections between layers
      for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
        const currentLayerNodes = nodes.filter(n => n.layer === layerIndex);
        const nextLayerNodes = nodes.filter(n => n.layer === layerIndex + 1);
        
        currentLayerNodes.forEach(fromNode => {
          nextLayerNodes.forEach(toNode => {
              const weight = (Math.random() - 0.5) * 4;
            connections.push({
              from: fromNode,
              to: toNode,
              weight,
              id: `${fromNode.id}-${toNode.id}`
            });
            
            toNode.inputs.push({ node: fromNode, weight });
          });
        });
      }
    };

    generateNetwork();

    // Create gradient definitions for node activation
    const defs = svg.append("defs");
    
    const nodeGradient = defs.append("radialGradient")
      .attr("id", "node-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    
    nodeGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FFFFFF")
      .attr("stop-opacity", 1);
    
    nodeGradient.append("stop")
      .attr("offset", "70%")
      .attr("stop-color", "#AA74E6")
      .attr("stop-opacity", 0.8);
    
    nodeGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#4A1A5A")
      .attr("stop-opacity", 0.3);

    // Activation function (sigmoid)
    const sigmoid = (x) => 1 / (1 + Math.exp(-x));
    
    // Tanh activation for more dynamic range
    const tanh = (x) => Math.tanh(x * 0.5);
    
    // ReLU activation
    const relu = (x) => Math.max(0, x);

    // Create connections (lines between nodes)
    const connectionLines = svg.selectAll(".connection")
      .data(connections)
      .join("line")
      .attr("class", "connection")
      .attr("x1", d => d.from.x)
      .attr("y1", d => d.from.y)
      .attr("x2", d => d.to.x)
      .attr("y2", d => d.to.y)
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("opacity", 0.3);

    // Create nodes
    const nodeCircles = svg.selectAll(".node")
      .data(nodes)
      .join("circle")
      .attr("class", "node")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => {
        const baseSize = Math.min(width, height) * 0.008;
        return Math.max(baseSize, 4);
      })
      .attr("fill", "url(#node-gradient)")
      .attr("stroke", "#FFF")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7);

    // Forward propagation function with frame skipping
    let frameCount = 0;
    const forwardPropagate = () => {
      // Only update input every few frames for performance
      if (frameCount % 3 === 0) {
        // Generate random input for the first layer
        const inputLayer = nodes.filter(n => n.layer === 0);
        inputLayer.forEach(node => {
          // Create wave-like input patterns that change over time
          const timeOffset = Date.now() * 0.002;
          const spatialFreq = node.index * 0.8;
          node.activation = Math.sin(timeOffset + spatialFreq) * 0.5 + 0.5;
        });
      }

      // Propagate through each layer
      for (let layerIndex = 1; layerIndex < layers.length; layerIndex++) {
        const currentLayerNodes = nodes.filter(n => n.layer === layerIndex);
        
        currentLayerNodes.forEach(node => {
          let sum = node.bias;
          node.inputs.forEach(input => {
            sum += input.node.activation * input.weight;
          });
          
          // Use different activation functions for different layers
          if (layerIndex < layers.length - 1) {
            node.activation = relu(tanh(sum)); // Hidden layers
          } else {
            node.activation = sigmoid(sum); // Output layer
          }
        });
      }
      frameCount++;
    };

    // Update visualization with plasma colors and performance optimizations
    const updateVisualization = () => {
      // Update node appearance based on activation with plasma colormap
      nodeCircles
        .attr("fill", d => {
          const intensity = Math.max(0, Math.min(1, d.activation));
          // Plasma colormap: dark purple -> magenta -> yellow -> white
          if (intensity < 0.2) return "#0D0887"; // Deep purple
          else if (intensity < 0.4) return "#6A00A8"; // Purple
          else if (intensity < 0.6) return "#B12A90"; // Magenta
          else if (intensity < 0.8) return "#E16462"; // Orange-red
          else return "#FCA636"; // Yellow
        })
        .attr("opacity", d => 0.7 + 0.3 * d.activation)
        .attr("stroke-width", d => 1 + d.activation * 1.5);

      // Simplified connection updates with plasma colors
      connectionLines
        .attr("stroke", d => {
          const flow = d.from.activation * Math.abs(d.weight) * 0.4;
          const intensity = Math.max(0, Math.min(1, flow));
          if (d.weight > 0) {
            // Positive weights: plasma warm colors
            return d3.interpolateRgb("#333", "#E16462")(intensity);
          } else {
            // Negative weights: plasma cool colors
            return d3.interpolateRgb("#333", "#6A00A8")(intensity);
          }
        })
        .attr("opacity", d => {
          const flow = d.from.activation * Math.abs(d.weight) * 0.2;
          return 0.3 + Math.max(0, Math.min(0.6, flow));
        });
    };

    // Animation loop
    const step = () => {
      forwardPropagate();
      updateVisualization();
    };

    // Start animation with reduced frame rate for performance
    const interval = d3.interval(step, 100); // 10 FPS instead of 20

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        
        svg.attr("width", width).attr("height", height);
        
        // Regenerate network with new dimensions
        generateNetwork();
        
        // Update DOM elements with new data (batch updates for performance)
        svg.selectAll(".connection").remove();
        svg.selectAll(".node").remove();
        
        const newConnectionLines = svg.selectAll(".connection")
          .data(connections)
          .join("line")
          .attr("class", "connection")
          .attr("x1", d => d.from.x)
          .attr("y1", d => d.from.y)
          .attr("x2", d => d.to.x)
          .attr("y2", d => d.to.y)
          .attr("stroke", "#333")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.3);
        
        const newNodeCircles = svg.selectAll(".node")
          .data(nodes)
          .join("circle")
          .attr("class", "node")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", d => {
            const baseSize = Math.min(width, height) * 0.008;
            return Math.max(baseSize, 4);
          })
          .attr("fill", "url(#node-gradient)")
          .attr("stroke", "#FFF")
          .attr("stroke-width", 1)
          .attr("opacity", 0.7);
        
        // Update references for animation
        connectionLines = newConnectionLines;
        nodeCircles = newNodeCircles;
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