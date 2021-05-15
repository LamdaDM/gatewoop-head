#!/usr/bin/env bash
docker rm -f dev-gatewoop_main
docker rmi -f main
docker image prune
docker volume prune
docker build -t dev-gatewoop_main/gw_ext