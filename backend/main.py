# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Set
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Edge(BaseModel):
    id: str | None = None
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Edge]

@app.post("api/pipelines/parse")
def parse_pipeline(p: Pipeline):
    num_nodes = len(p.nodes)
    num_edges = len(p.edges)

    nodes: Set[str] = {n.get('id') for n in p.nodes if n.get('id') is not None}
    adj = {n: set() for n in nodes}
    indeg = {n: 0 for n in nodes}

    for e in p.edges:
        if e.source in nodes and e.target in nodes:
            if e.target not in adj[e.source]:
                adj[e.source].add(e.target)
                indeg[e.target] += 1

    # Kahn's algorithm for DAG
    queue = [n for n, d in indeg.items() if d == 0]
    visited = 0
    while queue:
        u = queue.pop(0)
        visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    is_dag = visited == len(nodes)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}

@app.get("/api/health")
def health():
    return {"ok": True}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
