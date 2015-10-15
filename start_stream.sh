#!/bin/bash
ffmpeg -f v4l2 -s 640x480 -i /dev/video0 http://127.0.0.1:8080/feed.ffm
