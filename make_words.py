#!/usr/bin/env python

# Just a little utility to help make words.js from a file containing words.

import sys

PER_LINE = 12

with open(sys.argv[1]) as f:
    data = [line[:-1] for line in f]


i = 0
while i < len(data):
    print(f'"{" ".join(data[i:i+PER_LINE])}",')
    i += PER_LINE
