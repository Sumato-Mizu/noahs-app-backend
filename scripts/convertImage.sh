#!/bin/bash
input="$1"
output="$1-new.png"
convert $input -fill white -opaque black -colors 255 -transparent white $output
colors=("blue" "lime" "yellow" "orange" "red" "pink")
index=0
for i in `seq 0 50 250`; do
  convert $output -fuzz 30% -fill ${colors[$index]} -opaque "rgb(${i},${i},${i})" $output;
  ((index++));
done
