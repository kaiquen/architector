import React, { MouseEvent, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type DataType = {
    name: string;
    type: "file" | "directory";
    size: number; // Define a profundidade da camada
    color?: string; // Define a cor da camada
    children?: DataType[]; // Children só existe se type for directory 
}


const data:DataType = {
    name:"root",
    type: "directory",
    size: 1,
    children: [
        {
            name:"Domain",
            type: "directory",
            size: 1,
            color: "#ffffbc",
            children: [
                {name:"Entity.ts",type:"file", size: 1},
                {name:"Repository.ts",type:"file", size: 1}
            ],
        },
        {
            name:"Application",
            type: "directory",
            size: 2,
            color: "#fca3a2",
            children: [],
        },
        {
            name:"Interface",
            type: "directory",
            size: 3,
            color: "#a5fdbe",
            children: [],
        },
        {
            name: "Infrastructure",
            type: "directory",
            size: 4,
            color: "#aad9fa",
            children: [],
        }
    ]
}

interface ExtendedHierarchyNode extends d3.HierarchyNode<DataType> {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export const ConcentricCircles: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [history, setHistory] = useState<ExtendedHierarchyNode[]>([]);

    useEffect(() => {
        drawChart(data);
    }, [data])
    
    const drawChart = (data: DataType) => {
        const width = 600;
        const height = 600;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .style("font", "12px sans-serif");

        svg.selectAll("*").remove();

        const fallbackColor = d3.scaleOrdinal(d3.schemeCategory10);

        const root = d3.hierarchy(data).sum(d => d.size || 1);

        const levels = root.descendants().filter(d => d.depth === 1);
            
        if(!levels) return;

        const maxRadius = radius;
        const levelThickness = maxRadius / levels.length;

        svg
            .selectAll("circle")
            .data(levels.reverse()) 
            .join("circle")
            .attr("fill", (d) => d.data.color || fallbackColor(d.data.name))
            .attr("stroke", "black")
            .attr("r", (d, i) => (levels.length - i) * levelThickness) 
            .attr("cursor", "pointer")
            .on("click", (event, d) => transitionToSunburst(event, d as ExtendedHierarchyNode));

        svg
            .selectAll("text")
            .data(levels)
            .join("text")
            .attr("text-anchor", "middle")
            .attr("y", (d, i) => {
                if (i === levels.length - 1) { 
                    return 0; 
                } else {
                    return -((levels.length - i) * levelThickness - levelThickness / 2);
                }
            })
            .attr("dy", (d, i) => {
                if (i === levels.length - 1) { 
                    return 0; 
                } else {
                    return ".35em"
                }
            })
            .text((d) => d.data.name)
            .style("fill", "black")
            .style("font-size", "16px");


        const computeTextRotation = (d: ExtendedHierarchyNode) => {
            const angle = (d.x0 + d.x1) / Math.PI * 90;
            return (angle < 180) ? angle - 90 : angle + 90;
        };

        const goBack = () => {
            drawChart(data);
            setHistory([]);
        };

        function transitionToSunburst(event: React.MouseEvent<SVGPathElement, MouseEvent> | null, d: ExtendedHierarchyNode) {
            setHistory(prevHistory => [...prevHistory, d]);

            const width = 600;
            const height = 600;
            const radius = Math.min(width, height) / 2;
            
            const svg = d3.select(svgRef.current);

            svg.selectAll("*").remove(); 

            const partition = d3.partition<DataType>()
                .size([2 * Math.PI, radius]);

            const root = d3.hierarchy(d.data)
                .sum(d => d.size || 1);

            partition(root);

            if (!d.data.color) {
                d.data.color = d3.schemeCategory10[Math.floor(Math.random() * 10)];
            }

            const arc = d3.arc<ExtendedHierarchyNode>()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .innerRadius(d => d.depth === 0 ? 0 : d.y0) 
                .outerRadius(d => d.y1);

            svg
                .attr("viewBox", [-width / 2, -height / 2, width, height]);

            svg
                .selectAll("path")
                .data(root.descendants().slice(1) as ExtendedHierarchyNode[]) 
                .join("path")
                .attr("display", d => d.depth ? null : "none") 
                .attr("d", arc)
                .style("stroke", "black")
                .style("fill", d => d.data.color || d3.schemeCategory10[Math.floor(Math.random() * 10)])
                .on("click", (event, d) => {
                    transitionToSunburst(event, d as ExtendedHierarchyNode)
                });

            svg.append("path")
                .datum(root)
                .attr("d", arc(root as ExtendedHierarchyNode))
                .style("fill", d.data.color) 
                .style("stroke", "black")
                .style("cursor", "pointer")
                .on("click", goBack);
    
            const textX = 0;
            const textY = 0; 

            svg
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", textX) 
                .attr("y", textY)
                .text(d.data.name) 
                .style("font-size", "16px")
                .style("fill", "#000");

            svg
                .selectAll("text.arc-text")
                .data(root.descendants().slice(1) as ExtendedHierarchyNode[]) 
                .join("text")
                .attr("class", "arc-text")
                .attr("transform", d => `translate(${arc.centroid(d)})rotate(${computeTextRotation(d)})`)
                .attr("dx", "-20")
                .attr("dy", ".5em")
                .text(d => d.data.name)
                .style("font-size", "12px")
                .style("fill", "#000");
        }
    };

    return (
        <svg ref={svgRef} width="100%" height="600"></svg>
    );
}



//     const drawChart = () => {
//         const width = 500;
//         const height = width;
//         const radius = width / 6;

//         const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

//         const hierarchy = d3.hierarchy(data)
//             .sum(d => d.value)
//             .sort((a, b) => (b.value || 0) - (a.value || 0));


//         const root = d3.partition<d3.HierarchyRectangularNode<any>>()
//             .size([2 * Math.PI, hierarchy.height + 1])(hierarchy);
        
//          root.each((d:any) => (d.current = d));
  
//          const svg = d3.select(svgRef.current)
//             .attr("viewBox", [-width / 2, -height / 2, width, width])
//             .style("font", "10px sans-serif");
            
//         const arc = d3.arc<d3.HierarchyRectangularNode<any>>()
//             .startAngle(d => d.x0)
//             .endAngle(d => d.x1)
//             .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
//             .padRadius(radius * 1.5)
//             .innerRadius(d => d.y0 * radius)
//             .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

//         const path = svg.append("g")
//             .selectAll("path")
//             .data(root.descendants().slice(1))
//             .join("path")
//             .attr("fill", d => {
//               while (d.depth > 1) d = d.parent!;
//               return color(d.data.name);
//             })
//             .attr("fill-opacity", d => (arcVisible(d) ? (d.children ? 0.6 : 0.4) : 0))
//             .attr("pointer-events", d => (arcVisible(d) ? "auto" : "none"))
//             .attr("d", (d: any) => arc(d.current));
        
//         path.filter((d:any) => d.children)
//             .style("cursor", "pointer")
//             .on("click", (event, p) => clicked(event, p, svg, path, arc, root));
      
//         path.append("title")
//             .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${d3.format(",d")(d.value!)}`);
      
//         const label = svg.append("g")
//             .attr("pointer-events", "none")
//             .attr("text-anchor", "middle")
//             .style("user-select", "none")
//             .selectAll("text")
//             .data(root.descendants().slice(1))
//             .join("text")
//             .attr("dy", "0.35em")
//             .attr("fill-opacity", d => +labelVisible(d))
//             .attr("transform", d => labelTransform(d))
//             .text(d => d.data.name);
            
//         const parent = svg.append("circle")
//             .datum(root)
//             .attr("r", radius)
//             .attr("fill", "none")
//             .attr("pointer-events", "all")
//             .on("click", (event) => clicked(event, root, svg, path, arc, root)); // Clicar no centro volta ao root

//         function clicked(event:MouseEvent, p:d3.HierarchyRectangularNode<any>, svg:any, path:any, arc:any, root:d3.HierarchyRectangularNode<any>) {
//             root.each((d:any) => (d.target = {
//                 x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
//                 x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
//                 y0: Math.max(0, d.y0 - p.depth),
//                 y1: Math.max(0, d.y1 - p.depth)
//             }));
        
//             const t = svg.transition().duration(750);
        
//             path.transition(t)
//                 .tween("data", (d:any) => {
//                     const i = d3.interpolate(d.current, d.target);
//                     return (t:any) => (d.current = i(t));
//                 })
//                 .filter(function(this: any, d: any) {
//                     const element = d3.select(this as SVGPathElement);
//                     return !!element.attr("fill-opacity") || arcVisible(d.target);
//                 })
//                 .attr("fill-opacity", (d:any) => arcVisible(d.target) ? 1 : 0)  
//                 .attr("pointer-events", (d:any) => (arcVisible(d.target) ? "auto" : "none"))
//                 .attrTween("d", (d:any) => () => arc(d.current));
        
//             label
//             .filter(function(this: any, d: any) {
//                 return !!d3.select(this).attr("fill-opacity") || labelVisible(d.target);
//             })
//                 .transition(t)
//                 .attr("fill-opacity", (d:any) => +labelVisible(d.target))
//                 .attrTween("transform", (d:any) => () => labelTransform(d.current));
//         }

//         function arcVisible(d:any) {
//             return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
//         }

//         function labelVisible(d:any) {
//             return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
//         }
    
//         function labelTransform(d:any) {
//             const x = ((d.x0 + d.x1) / 2) * 180 / Math.PI;
//             const y = (d.y0 + d.y1) / 2 * radius;
//             return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
//         }
//     }