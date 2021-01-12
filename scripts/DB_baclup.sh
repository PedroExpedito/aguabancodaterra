#!/bin/bash

#Author: Pedro Expedito De Oliveira
#Date: 12/11/2020 11 dec 2020

DATE=$(date | sed 's/ /:/g')

mkdir ~/agua-baclup
mkdir ~/"$DATE"

mongodump --out ~/agua-baclup/"${DATE}"
