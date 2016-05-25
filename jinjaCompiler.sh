#!/usr/bin/env bash

j2 jinja2/info.j2.html yaml/jobs.yaml > info.temp.html && mv info.temp.html info.html
j2 jinja2/projects.j2.html yaml/projects.yaml > projects.temp.html && mv projects.temp.html projects.html