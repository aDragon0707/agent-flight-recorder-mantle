# Specs

This directory is the lightweight OpenSpec-style control layer for Agent Flight Recorder.

`specs/task-board.md` is the Chinese human-readable board. `specs/status.json` and `specs/spec-graph.json` remain the English machine-readable sources.

Use this order:

```text
spec-graph.json -> status.json -> task-board.md -> current spec -> implementation -> evidence -> verification
```

Rules:

- `spec-graph.json` is the dependency graph.
- `status.json` is the machine-readable status source.
- `task-board.md` is the Chinese human-readable status view.
- Each task has one spec file.
- Each verified task has one evidence file under `docs/evidence/`.
- A task cannot be marked verified unless its dependencies are verified.
