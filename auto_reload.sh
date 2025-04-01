#!/usr/bin/env bash

SRC=$(pwd)
DEBUG=$1

if [ "$DEBUG" = "true" ]; then
  export GTK_DEBUG=interactive
fi

reload() {
	pkill gjs

	ags run ./src/app.ts --gtk4 --define "SRC='${SRC}'" &
}

reload

while inotifywait -e close_write -r ./src; do
	reload
done
