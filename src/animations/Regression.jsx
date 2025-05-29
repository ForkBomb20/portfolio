import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function CubicRegression() {
  const svgRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let centerX = width / 2;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    svg.selectAll("*").remove();

    // 🎯 True cubic function: y = A x^3 + B x^2 + C x + D
    const trueA = 600;
    const trueB = 0;
    const trueC = -600;
    const trueD = height / 2;

    let noiseLevel = height * 0.1;
    let numPoints = Math.floor((width * height) / 5000);

    let points = [];
    
    const generatePoints = () => {
      points = d3.range(numPoints).map(() => {
        const xNorm = Math.random() * 2 - 1; // [-1, 1]
        const x = centerX + xNorm * (width / 2);
        const baseY = trueA * xNorm ** 3 + trueB * xNorm ** 2 + trueC * xNorm + trueD;

        // Nonlinear + random noise
        const wave = Math.cos(xNorm * 5 * Math.PI) * noiseLevel * 0.5;
        const randomNoise = (Math.random() - 0.5) * noiseLevel * 2;
        const y = baseY + wave + randomNoise;

        return { xNorm, x, y };
      });
    };

    generatePoints();

    const updatePoints = () => {
      svg.selectAll("circle")
        .data(points)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 3)
        .attr("fill", "#FFF")
        .attr("opacity", 0.7);
    };

    updatePoints();

    // 🧠 Model: y = a*x^3 + b*x^2 + c*x + d
    let a = 0, b = 0, c = 0, d = height / 2;
    const learningRate = 0.03;

    const curveLine = svg.append("path")
      .attr("stroke", "#AA74E6")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    const updateCurve = () => {
      const linePoints = d3.range(-1, 1.01, 0.02).map(xNorm => {
        const x = centerX + xNorm * (width / 2);
        const y = a * xNorm ** 3 + b * xNorm ** 2 + c * xNorm + d;
        return [x, y];
      });

      const linePath = d3.line()(linePoints);
      curveLine.attr("d", linePath);
    };

    const step = () => {
      let da = 0, db = 0, dc = 0, dd = 0;

      for (const { xNorm, y } of points) {
        const yPred = a * xNorm ** 3 + b * xNorm ** 2 + c * xNorm + d;
        const error = y - yPred;

        da += -2 * xNorm ** 3 * error;
        db += -2 * xNorm ** 2 * error;
        dc += -2 * xNorm * error;
        dd += -2 * error;
      }

      const n = points.length;
      a -= learningRate * (da / n);
      b -= learningRate * (db / n);
      c -= learningRate * (dc / n);
      d -= learningRate * (dd / n);

      updateCurve();
    };

    updateCurve();
    const interval = d3.interval(step, 10);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;
        centerX = width / 2;
        noiseLevel = height * 0.1;
        numPoints = Math.floor((width * height) / 5000);
        
        svg.attr("width", width).attr("height", height);
        
        // Reset model parameters for new dimensions
        d = height / 2;
        
        // Generate new points for new dimensions
        generatePoints();
        updatePoints();
        updateCurve();
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