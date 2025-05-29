import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function EMAlgorithmGMM() {
  const svgRef = useRef();

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#000");

    svg.selectAll("*").remove();

    // Number of clusters
    const K = 3;
    const numPoints = Math.floor((width * height) / 3000); // More points

    // Generate evenly spaced true cluster parameters
    const trueClusters = [
      { x: width * 0.25, y: height * 0.3, sx: width * 0.08, sy: height * 0.08 },
      { x: width * 0.75, y: height * 0.3, sx: width * 0.08, sy: height * 0.08 },
      { x: width * 0.5, y: height * 0.75, sx: width * 0.08, sy: height * 0.08 }
    ];

    // Generate data points from true clusters with higher density
    let points = [];
    const generatePoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        const cluster = trueClusters[Math.floor(Math.random() * K)];
        const x = d3.randomNormal(cluster.x, cluster.sx)();
        const y = d3.randomNormal(cluster.y, cluster.sy)();
        
        // Keep points within bounds with some padding
        if (x > width * 0.1 && x < width * 0.9 && y > height * 0.1 && y < height * 0.9) {
          points.push({ x, y, responsibility: new Array(K).fill(1/K) });
        }
      }
      // Ensure we have enough points by filling up if needed
      while (points.length < numPoints * 0.8) {
        const cluster = trueClusters[Math.floor(Math.random() * K)];
        const x = d3.randomNormal(cluster.x, cluster.sx)();
        const y = d3.randomNormal(cluster.y, cluster.sy)();
        
        if (x > width * 0.1 && x < width * 0.9 && y > height * 0.1 && y < height * 0.9) {
          points.push({ x, y, responsibility: new Array(K).fill(1/K) });
        }
      }
    };

    generatePoints();

    // Define colors for clusters
    const colors = ["#AA74E6", "#74E6AA", "#E6AA74"];
    
    // Initialize model parameters randomly but spread out
    let clusters = [
      {
        x: width * (0.2 + 0.6 * Math.random()),
        y: height * (0.2 + 0.6 * Math.random()),
        sx: width * 0.1,
        sy: height * 0.1,
        weight: 1/K,
        color: colors[0]
      },
      {
        x: width * (0.2 + 0.6 * Math.random()),
        y: height * (0.2 + 0.6 * Math.random()),
        sx: width * 0.1,
        sy: height * 0.1,
        weight: 1/K,
        color: colors[1]
      },
      {
        x: width * (0.2 + 0.6 * Math.random()),
        y: height * (0.2 + 0.6 * Math.random()),
        sx: width * 0.1,
        sy: height * 0.1,
        weight: 1/K,
        color: colors[2]
      }
    ];

    // Create filled ellipse elements for each cluster with gradients
    const ellipses = svg.selectAll(".cluster-ellipse")
      .data(clusters)
      .join("ellipse")
      .attr("class", "cluster-ellipse")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.7);

    // Create center dots for clusters
    const centers = svg.selectAll(".cluster-center")
      .data(clusters)
      .join("circle")
      .attr("class", "cluster-center")
      .attr("r", 6)
      .attr("stroke", "#FFF")
      .attr("stroke-width", 2);

    // Create data points
    const dataPoints = svg.selectAll(".data-point")
      .data(points)
      .join("circle")
      .attr("class", "data-point")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 2)
      .attr("fill", "#FFF")
      .attr("opacity", 0.8);

    // Gaussian PDF function
    const gaussianPDF = (x, y, mx, my, sx, sy) => {
      const dx = (x - mx) / sx;
      const dy = (y - my) / sy;
      const exponent = -(dx*dx + dy*dy) / 2;
      return Math.exp(exponent) / (2 * Math.PI * sx * sy);
    };

    // E-step: Calculate responsibilities
    const eStep = () => {
      points.forEach(point => {
        let totalLikelihood = 0;
        const likelihoods = clusters.map(cluster => {
          const likelihood = cluster.weight * gaussianPDF(
            point.x, point.y, cluster.x, cluster.y, cluster.sx, cluster.sy
          );
          totalLikelihood += likelihood;
          return likelihood;
        });

        // Calculate responsibilities (posterior probabilities)
        point.responsibility = likelihoods.map(likelihood => 
          totalLikelihood > 0 ? likelihood / totalLikelihood : 1/K
        );
      });
    };

    // M-step: Update cluster parameters with damping
    const mStep = () => {
      clusters.forEach((cluster, k) => {
        let weightSum = 0;
        let xSum = 0, ySum = 0;
        let sxSum = 0, sySum = 0;

        points.forEach(point => {
          const resp = point.responsibility[k];
          weightSum += resp;
          xSum += resp * point.x;
          ySum += resp * point.y;
        });

        if (weightSum > 0) {
          const newX = xSum / weightSum;
          const newY = ySum / weightSum;
          const newWeight = weightSum / points.length;

          // Apply damping for slower convergence
          cluster.x = cluster.x + dampingFactor * (newX - cluster.x);
          cluster.y = cluster.y + dampingFactor * (newY - cluster.y);
          cluster.weight = cluster.weight + dampingFactor * (newWeight - cluster.weight);

          // Update covariances with damping
          points.forEach(point => {
            const resp = point.responsibility[k];
            const dx = point.x - cluster.x;
            const dy = point.y - cluster.y;
            sxSum += resp * dx * dx;
            sySum += resp * dy * dy;
          });

          const newSx = Math.max(Math.sqrt(sxSum / weightSum), width * 0.02);
          const newSy = Math.max(Math.sqrt(sySum / weightSum), height * 0.02);
          
          cluster.sx = cluster.sx + dampingFactor * (newSx - cluster.sx);
          cluster.sy = cluster.sy + dampingFactor * (newSy - cluster.sy);
        }
      });
    };

    // Update visualization
    const updateVisualization = () => {
      // Update ellipses with gradients (2.5 standard deviations for sharp transitions)
      ellipses
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("rx", d => d.sx * 2.5)
        .attr("ry", d => d.sy * 2.5)
        .attr("fill", (d, i) => `url(#cluster-gradient-${i})`)
        .attr("stroke", "none");

      // Update cluster centers
      centers
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#000")
        .attr("stroke-width", 1);

      // Color points by their strongest responsibility
      dataPoints
        .attr("fill", d => {
          const maxResp = Math.max(...d.responsibility);
          const clusterIndex = d.responsibility.indexOf(maxResp);
          return clusters[clusterIndex].color;
        })
        .attr("opacity", d => {
          const maxResp = Math.max(...d.responsibility);
          return 0.7 + 0.3 * maxResp;
        });
    };

    // Create gradient definitions for each cluster
    const defs = svg.append("defs");
    
    clusters.forEach((cluster, i) => {
      const gradient = defs.append("radialGradient")
        .attr("id", `cluster-gradient-${i}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      
      // Sharp density gradient matching the reference image
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#FFFF80") // Bright yellow center
        .attr("stop-opacity", 1.0);
        
      gradient.append("stop")
        .attr("offset", "8%")
        .attr("stop-color", "#80FF80") // Bright green
        .attr("stop-opacity", 0.95);
      
      gradient.append("stop")
        .attr("offset", "18%")
        .attr("stop-color", "#40E0D0") // Cyan
        .attr("stop-opacity", 0.85);
        
      gradient.append("stop")
        .attr("offset", "30%")
        .attr("stop-color", "#4080FF") // Blue
        .attr("stop-opacity", 0.7);
      
      gradient.append("stop")
        .attr("offset", "45%")
        .attr("stop-color", "#8040FF") // Purple
        .attr("stop-opacity", 0.5);
      
      gradient.append("stop")
        .attr("offset", "65%")
        .attr("stop-color", "#A040A0") // Dark purple
        .attr("stop-opacity", 0.3);
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#602060") // Very dark purple
        .attr("stop-opacity", 0.1);
    });

    // Animation control parameters
    let iteration = 0;
    const maxIterations = 1000;
    const iterationSpeed = 150; // milliseconds between iterations (slower = more visible)
    let dampingFactor = 0.3; // Slow down convergence (0.1 = very slow, 1.0 = original speed)
    
    const step = () => {
      if (iteration < maxIterations) {
        eStep();
        mStep();
        updateVisualization();
        iteration++;
      }
    };

    // Initial update
    updateVisualization();
    
    // Start animation with slower speed
    const interval = d3.interval(step, iterationSpeed);

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
        
        // Scale existing model clusters
        clusters.forEach(cluster => {
          cluster.x *= scaleX;
          cluster.y *= scaleY;
          cluster.sx *= scaleX;
          cluster.sy *= scaleY;
        });
        
        // Scale true clusters (maintains relative positions)
        trueClusters.forEach(cluster => {
          cluster.x *= scaleX;
          cluster.y *= scaleY;
          cluster.sx *= scaleX;
          cluster.sy *= scaleY;
        });
        
        // Scale existing data points to maintain relative positions
        points.forEach(point => {
          point.x *= scaleX;
          point.y *= scaleY;
        });
        
        // Update DOM elements with scaled positions
        dataPoints.data(points)
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
        
        updateVisualization();
        
        // Reset iteration counter for fresh convergence
        iteration = 0;
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