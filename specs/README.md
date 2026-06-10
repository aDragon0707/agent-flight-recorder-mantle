# Specs

This directory is the lightweight OpenSpec-style control layer for Agent Flight Recorder.

Use this order:

```text
spec-graph.json -> status.json -> task-board.md -> current spec -> implementation -> evidence -> verification
```

Rules:

- `spec-graph.json` is the dependency graph.
- `status.json` is the machine-readable status source.
- `task-board.md` is the human-readable status source.
- Each task has one spec file.
- Each verified task has one evidence file under `docs/evidence/`.
- A task cannot be marked verified unless its dependencies are verified.

