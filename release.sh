#!/bin/bash
echo "Start zip package"

zip -r htmlacademy-checklist.zip . -x "/img/*" -x "/.*" -x "readme.md" -x "release.sh"
mv htmlacademy-checklist.zip ~/Downloads

echo "Done ;-)"
