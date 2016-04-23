#!/bin/bash
input="$1"
output="$1-new.png"
convert $input -fill white -opaque black -colors 255 -transparent white $output
colors=("cyan" "blue" "lime" "yellow" "orange" "red")
index=0
for i in `seq 0 28 160`; do
  convert $output -fuzz 15% -fill ${colors[$index]} -opaque "rgb(${i},${i},${i})" $output;
  ((index++));
done
