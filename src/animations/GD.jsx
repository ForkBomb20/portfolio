import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function GradientDescent3D() {
  const svgRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    svg.selectAll("*").remove();

    // Isometric projection parameters
    const scale = Math.min(width, height) * 0.3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Isometric projection function
    const project = (x, y, z) => {
      const isoX = (x - y) * Math.cos(Math.PI / 6);
      const isoY = (x + y) * Math.sin(Math.PI / 6) - z;
      return [centerX + isoX * scale, centerY + isoY * scale];
    };

    // Complex 3D loss function with multiple local minima
    const lossFunction = (x, y) => {
      const term1 = Math.sin(x * 2) * Math.cos(y * 2) * 0.8;
      const term2 = (x * x + y * y) * 0.3;
      const term3 = Math.exp(-(Math.pow(x - 0.5, 2) + Math.pow(y + 0.5, 2)) * 3) * -1.5;
      const term4 = Math.exp(-(Math.pow(x + 0.8, 2) + Math.pow(y - 0.3, 2)) * 4) * -1.2;
      const term5 = Math.sin(x * 4) * Math.sin(y * 4) * 0.2;
      return term1 + term2 + term3 + term4 + term5;
    };

    // Gradient calculation
    const gradient = (x, y) => {
      const h = 0.01;
      const dx = (lossFunction(x + h, y) - lossFunction(x - h, y)) / (2 * h);
      const dy = (lossFunction(x, y + h) - lossFunction(x, y - h)) / (2 * h);
      return [dx, dy];
    };

    // Create surface mesh
    const gridSize = 40;
    const range = 2;
    const gridStep = (2 * range) / (gridSize - 1);
    
    let surfaceData = [];
    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        const x1 = -range + i * gridStep;
        const y1 = -range + j * gridStep;
        const x2 = -range + (i + 1) * gridStep;
        const y2 = -range + (j + 1) * gridStep;
        
        const z1 = lossFunction(x1, y1);
        const z2 = lossFunction(x2, y1);
        const z3 = lossFunction(x2, y2);
        const z4 = lossFunction(x1, y2);
        
        // Create two triangles for each grid cell
        surfaceData.push({
          points: [
            project(x1, y1, z1),
            project(x2, y1, z2),
            project(x2, y2, z3)
          ],
          avgZ: (z1 + z2 + z3) / 3,
          color: (z1 + z2 + z3) / 3
        });
        
        surfaceData.push({
          points: [
            project(x1, y1, z1),
            project(x2, y2, z3),
            project(x1, y2, z4)
          ],
          avgZ: (z1 + z3 + z4) / 3,
          color: (z1 + z3 + z4) / 3
        });
      }
    }

    // Sort by depth for proper rendering
    surfaceData.sort((a, b) => a.avgZ - b.avgZ);

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain(d3.extent(surfaceData, d => d.color))
      .interpolator(t => {
        if (t < 0.15) return `hsl(${280 + t * 400}, 90%, ${40 + t * 40}%)`;
        if (t < 0.35) return `hsl(${240 + t * 200}, 95%, ${50 + t * 30}%)`;
        if (t < 0.55) return `hsl(${180 + t * 120}, 100%, ${60 + t * 25}%)`;
        if (t < 0.75) return `hsl(${120 + t * 80}, 100%, ${65 + t * 20}%)`;
        return `hsl(${60 + t * 40}, 100%, ${70 + t * 15}%)`;
      });

    // Create gradients for depth effect
    const defs = svg.append("defs");
    
    surfaceData.forEach((face, i) => {
      const gradient = defs.append("radialGradient")
        .attr("id", `surface-gradient-${i}`)
        .attr("cx", "30%")
        .attr("cy", "30%")
        .attr("r", "70%");
      
      const baseColor = colorScale(face.color);
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.color(baseColor).brighter(0.5))
        .attr("stop-opacity", 0.9);
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.color(baseColor).darker(0.3))
        .attr("stop-opacity", 0.7);
    });

    // Render surface
    const surface = svg.selectAll(".surface-face")
      .data(surfaceData)
      .join("path")
      .attr("class", "surface-face")
      .attr("d", d => {
        const path = d3.path();
        path.moveTo(d.points[0][0], d.points[0][1]);
        path.lineTo(d.points[1][0], d.points[1][1]);
        path.lineTo(d.points[2][0], d.points[2][1]);
        path.closePath();
        return path.toString();
      })
      .attr("fill", (d, i) => `url(#surface-gradient-${i})`)
      .attr("stroke", "none")
      .attr("opacity", 0.8);

    // Gradient descent point
    let currentPos = { x: 1.5, y: 1.2 };
    let trajectory = [];
    const learningRate = 0.05;
    const momentum = 0.8;
    let velocity = { x: 0, y: 0 };

    // Create trajectory path
    const trajectoryPath = svg.append("path")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("opacity", 0.8)
      .attr("stroke-dasharray", "5,5");

    // Create gradient descent point
    const pointGroup = svg.append("g");
    
    const point = pointGroup.append("circle")
      .attr("r", 8)
      .attr("fill", "#FFFFFF")
      .attr("stroke", "#AA74E6")
      .attr("stroke-width", 3)
      .style("filter", "drop-shadow(0px 0px 10px #AA74E6)");

    // Add glow effect around the point
    const glowCircle = pointGroup.append("circle")
      .attr("r", 15)
      .attr("fill", "none")
      .attr("stroke", "#AA74E6")
      .attr("stroke-width", 2)
      .attr("opacity", 0.4)
      .style("animation", "pulse 2s infinite");

    // Add CSS for pulse animation
    const style = svg.append("defs").append("style");
    style.text(`
      @keyframes pulse {
        0% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
        100% { opacity: 0.4; transform: scale(1); }
      }
    `);

    const updateVisualization = () => {
      // Calculate gradient
      const [dx, dy] = gradient(currentPos.x, currentPos.y);
      
      // Update velocity with momentum
      velocity.x = momentum * velocity.x - learningRate * dx;
      velocity.y = momentum * velocity.y - learningRate * dy;
      
      // Update position
      currentPos.x += velocity.x;
      currentPos.y += velocity.y;
      
      // Add to trajectory
      const z = lossFunction(currentPos.x, currentPos.y);
      const projectedPos = project(currentPos.x, currentPos.y, z);
      trajectory.push([projectedPos[0], projectedPos[1]]);
      
      // Limit trajectory length
      if (trajectory.length > 100) {
        trajectory.shift();
      }
      
      // Update trajectory path
      if (trajectory.length > 1) {
        const line = d3.line()
          .x(d => d[0])
          .y(d => d[1])
          .curve(d3.curveCatmullRom);
        trajectoryPath.attr("d", line(trajectory));
      }
      
      // Update point position
      point
        .attr("cx", projectedPos[0])
        .attr("cy", projectedPos[1]);
        
      glowCircle
        .attr("cx", projectedPos[0])
        .attr("cy", projectedPos[1]);
      
      // Reset if point goes too far or gets stuck
      if (Math.abs(currentPos.x) > 3 || Math.abs(currentPos.y) > 3 || 
          (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001)) {
        currentPos = { 
          x: (Math.random() - 0.5) * 3, 
          y: (Math.random() - 0.5) * 3 
        };
        velocity = { x: 0, y: 0 };
        trajectory = [];
        trajectoryPath.attr("d", "");
      }
    };

    // Animation loop
    let iteration = 0;
    const animationStep = () => {
      updateVisualization();
      iteration++;
    };

    // Start animation
    const interval = d3.interval(animationStep, 50);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        
        svg.attr("width", width).attr("height", height);
        
        // Reset and regenerate for new dimensions
        currentPos = { x: 1.5, y: 1.2 };
        trajectory = [];
        trajectoryPath.attr("d", "");
        
        // You would need to regenerate the surface here for proper scaling
        // For simplicity, we'll just reset the point
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