import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NetworkData, NeuralNode, NeuralLink } from '../types';
import { NetworkLinks } from './NetworkLinks';
import { NetworkNodes } from './NetworkNodes';
import { NetworkGlowFilter } from './NetworkGlowFilter';

interface NetworkGraphProps {
  data: NetworkData;
  showWeights: boolean;
  showActivations: boolean;
  selectedNode: string | null;
  onNodeSelect: (nodeId: string | null) => void;
}

export function NetworkGraph({
  data,
  showWeights,
  showActivations,
  selectedNode,
  onNodeSelect
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 600;
  const height = 400;

  useEffect(() => {
    if (!svgRef.current) return;

    const simulation = d3.forceSimulation<NeuralNode>(data.nodes)
      .force('link', d3.forceLink<NeuralNode, NeuralLink>(data.links)
        .id(d => d.id)
        .distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    simulation.on('tick', () => {
      // Force re-render on simulation tick
      if (svgRef.current) {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
        svg.append('g')
          .selectAll('line')
          .data(data.links)
          .join('line')
          .attr('stroke', '#00ff41')
          .attr('stroke-opacity', 0.6)
          .attr('x1', d => (d.source as NeuralNode).x || 0)
          .attr('y1', d => (d.source as NeuralNode).y || 0)
          .attr('x2', d => (d.target as NeuralNode).x || 0)
          .attr('y2', d => (d.target as NeuralNode).y || 0);
      }
    });

    return () => simulation.stop();
  }, [data]);

  return (
    <svg
      ref={svgRef}
      viewBox={[0, 0, width, height].join(' ')}
      className="w-full h-full bg-matrix-dark"
      onClick={() => onNodeSelect(null)}
    >
      <NetworkGlowFilter />
      <NetworkLinks links={data.links} showWeights={showWeights} />
      <NetworkNodes
        nodes={data.nodes}
        selectedNode={selectedNode}
        showActivations={showActivations}
        onNodeSelect={onNodeSelect}
      />
    </svg>
  );
}
