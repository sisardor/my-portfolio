#!/bin/bash
# Author:	Sardor Isakov 100160085
# Lab:		lab 10
# Name:		hangman.sh
# Description:	This is system monitor script
array0=( 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0) # array for CPU usage graph
array1=( 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0) # array for Memory usage graph
tput civis
tput cup 0 0
tput ed
C=0 # CPU option switch
M=0 # Memory option switch


PREV_TOTAL=0
PREV_IDLE=0
DIFF_USAGE_UNITS=0

# CPU_data() function is called from MAIN controller and
# it collects cpu data from /proc/stat file and calculates 
# all neccessery informations. These infos later will be used
# as following
#	1) to assign cpu_array[25] 
#	2) show cpu usage in header section
#
function CPU_data() {
	CPU=(`grep '^cpu ' /proc/stat`) # Get the total CPU statistics.
	unset CPU[0]                          # Discard the "cpu" prefix.
	IDLE=${CPU[4]}                        # Get the idle CPU time.
	 
	# Calculate the total CPU time.
	TOTAL=0
	for VALUE in "${CPU[@]}"; do
	  let "TOTAL=$TOTAL+$VALUE"
	done
	 
	# Calculate the CPU usage since we last checked.
	let "DIFF_IDLE=$IDLE-$PREV_IDLE"
	let "DIFF_TOTAL=$TOTAL-$PREV_TOTAL"
	let "DIFF_USAGE=1000*($DIFF_TOTAL-$DIFF_IDLE)/$DIFF_TOTAL"
	let "DIFF_USAGE_UNITS=$DIFF_USAGE/10"
	let "DIFF_USAGE_DECIMAL=$DIFF_USAGE%10"
	#echo -en "\rCPU: $DIFF_USAGE_UNITS.$DIFF_USAGE_DECIMAL%    \b\b\b\b"
	 
	# Remember the total and idle CPU times for the next check.
	PREV_TOTAL="$TOTAL"
	PREV_IDLE="$IDLE"	
}
# MEM_data() function is called from MAIN controller
# and is used to collect memory data from 'free' command,
# following command retrive a line which contains memory
# info:
#	free -k|grep 'Mem'
# output of this creates array _MEM[] and it used to calculate
# different information for displaying Memory graphe
#
# Output of this function is used in 2 places:
#	1) assgining mem_array[25] which later used to draw graphe
#	2) used to display memory usage on header section
#
function MEM_data() {
	_MEM=(`free -k|grep 'Mem'`) # collection data from 'free' command

	# collecting different info from array
	MEM_USED=${_MEM[2]} 
	MEM_BUFF=${_MEM[5]}
	MEM_CACHE=${_MEM[6]}
	MEM_TOTAL=${_MEM[1]}

	# calculating  diffirent information for later use
	let "MEM_USG=1000*($MEM_USED-$MEM_BUFF-$MEM_CACHE)/$MEM_TOTAL"
	let "MEM_USG_UNITS=$MEM_USG/10" # unit part
	let "MEM_USG_DEC=$MEM_USG%10"	# saperating decimal
}

# print_top5() function called from MAIN controller and
# it will print lower section of the program, this will print
# top 5 processes runing on the system
function print_top5() {
	printf "%5s %-8s %s %4s %4s  %-10s\n" ${TOP5[@]:0:6}`tput el` 
	printf "%5s %-8s %s %4s %4s  %-10s\n" ${TOP5[@]:6:6}`tput el`
	printf "%5s %-8s %s %4s %4s  %-10s\n" ${TOP5[@]:12:6}`tput el`
	printf "%5s %-8s %s %4s %4s  %-10s\n" ${TOP5[@]:18:6}`tput el`
	printf "%5s %-8s %s %4s %4s  %-10s\n" ${TOP5[@]:24:6}`tput el`
}

function print_stars() {
	if ((i >= $1)); then
		echo -ne "\e[32m* \e[0m" # print green
	elif ((i == 1)); then
		echo -ne "\e[33m* \e[0m" # print yellow
	else
		echo -ne "\e[31m* \e[0m" # print red
	fi
}


# print_array() function called from MAIN controller
# and it will print CPU or MEMORY graphe, depending to argument passed to it
# this function is called as following
#	print_array "${cpu_array[@]}"
#
print_array() {
	array=( "${@}" ) # getting array's loction address
	
	# for loop print * or . accoridng what values are in the array
	let a=100
	for ((i=0; i<5; i++))
	do
		echo -n ""
		if ((i >= 2)); then
			OUTPUT= "*  "
		else
			OUTPUT= "\e[31m*  \e[0m";
		fi

		for ((j=1; j<35; j++))
		do
			if ((${array[j]} == 0)); then
				echo -n "  "
			elif ((${array[j]} >= $a)); then
				print_stars i
			elif ((${array[j]} >= $a-19)); then
				print_stars i
			else
				echo -n "  "		
			fi
		done; echo
	let a=a-20
	done
}

# MAIN controller
# this is main part of this script,
# it will go to infinte loop perform different calculation by
# calling functions and checking user input for option for print
# CPU or Memort graphs
# 

while :
do	
	# collection top 5 processes info to header section of the program
	TOP5=(`ps  -eo pid,user,state,pcpu,pmem,ucmd|sort -k 4 -r|head -6`)

	# calling this functin which will prepare needed information to print
	# graph
	CPU_data;MEM_data
	
	read -n 1 -t 1  input # reading user input
	
	tput cup 0 0
	# menu case if toggled c display CPU graph
	# if selected 'm' display Memory graph
	case $input in 
        	q|Q) tput cup 0 0;tput clear;tput reset; exit 0;;
		c|C) if (($C)) # check if switcher is 0 then make 1 or if 1 make it 0
			then 
				C=0
			else
				C=1
		     fi;;
		m|M) if (($M))	# check if switcher is 0 then make 1 or if 1 make it 0
			then 
				M=0
			else
				M=1
		     fi;;
		*) sleep .5;;
    	esac
	
	# Displaying header sectin of this program
	echo `date +%r`"  CPU time: $DIFF_USAGE_UNITS.$DIFF_USAGE_DECIMAL%  Memory: ${_MEM[1]} total, ${_MEM[3]} free       "
	
	# if 'C' (CPU) option is selected then start displaying CPU usage graph
	if (($C))
	  then
		echo -e "`tput el`\nCPU usage"`tput el`"\n"`tput el`	
		print_array "${array0[@]}" 	# calling print_array function
		unset array0[0]			# unseting array[0] to shift array and later assign 
						# 25th array with value of CPU usage precentage
		array0=( "${array0[@]}" $((DIFF_USAGE_UNITS)) )
	fi
	
	# if 'M' (Memory) option is selected then start displaying Memory usage graph
	if (($M))
	  then
		echo -e "`tput el`\nMEM usage"`tput el`"\n"`tput el`
		print_array "${array1[@]}"
		unset array1[0]			# unseting array[0] to shift array and later assign 
						# 25th array with value of MEMORY usage precentage
		array1=( "${array1[@]}" $((MEM_USG_UNITS)) )
	fi				
	
	echo `tput el`
	print_top5
	echo `tput el`
	echo "Toggle (C)PU graphe, toggle (M)emory graphe, (q)uit"`tput el`
	tput ed

done 2>/dev/null #erro is redirected to null


exit 0
