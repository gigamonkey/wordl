#!/usr/bin/env python

import sys

PER_LINE = 20

with open(sys.argv[1]) as f:
    data = [line[:-1] for line in f]


i = 0
while i < len(data):
    print(f'"{" ".join(data[i:i+PER_LINE])}",')
    i += PER_LINE
