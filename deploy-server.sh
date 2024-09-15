#!/bin/bash

echo 'Building and uploading server jar...'
./gradlew build && scp app/build/libs/server.jar itmo:/home/studs/s408968/httpd-root/fcgi-bin