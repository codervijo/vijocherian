# What kubelet actually does on a constrained edge device

Kubernetes on a server is one thing. Kubernetes on a 1 GB ARM box sitting in a cabinet somewhere is another. Most of the surprises come from the kubelet, and most of those surprises come from people not really knowing what it does.

## The short version

Kubelet is the per-node agent. It watches the API server for pods assigned to its node, talks to the container runtime to make those pods exist, and reports node and pod status back. That's the headline. The interesting parts are everything underneath.

## What it actually owns on the device

- The container runtime interface (CRI) socket and its lifecycle.
- Pod lifecycle: pulling images, mounting volumes, configuring cgroups, wiring networking via CNI.
- Liveness, readiness, and startup probes — running them on a real schedule, killing containers that fail.
- Resource accounting and eviction. This is the one that bites you on edge devices.
- Node status updates: capacity, allocatable, conditions, heartbeats.

## Why edge devices are different

On a server, eviction thresholds and image GC settings are mostly fine at defaults. On a constrained device, the defaults assume you have headroom you don't have. A kubelet that decides to evict your only workload because disk pressure crossed a threshold during a log burst is not a hypothetical — it happens.

Tune `evictionHard`, `imageGCHighThresholdPercent`, and `nodeStatusUpdateFrequency` to the actual device, not to the cluster's defaults. Set realistic resource requests on every workload. Treat the kubelet as something you configure per fleet, not as a black box.

## The mental model that helps

Kubelet is not a Kubernetes thing that happens to run on the node. It's a node-management daemon that happens to take its instructions from Kubernetes. Once you see it that way, the tuning surface makes sense.