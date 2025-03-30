#!/usr/bin/env bash

DEBUG=$1

if [ "$DEBUG" = "true" ]; then
  export GTK_DEBUG=interactive
fi

reload() {
	pkill gjs

	ags run ./src/app.ts --gtk4 &
}

reload

while inotifywait -e close_write -r ./src; do
	reload
done
