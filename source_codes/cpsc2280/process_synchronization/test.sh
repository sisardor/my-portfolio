#!/bin/bash

./bound 0 > t0
./bound 0 > t1
diff t0 t1
