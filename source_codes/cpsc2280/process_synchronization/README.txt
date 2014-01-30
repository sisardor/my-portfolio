==============================================
 Author	: Sardor Isakov
 Lab	: 6
 CPSC 2280
 ===============================================


Assignment: [lab6] 
---------- 
Synchronization Mechanisms 


Description:  
----------- 
C implementation Synchronization Mechanisms with threads


Included Files:
--------------
My assignment solution consists of the following files: 
- bound.c 
- test.sh
- makefile


Running my solution: 
------------------- 
You can run my assignment as follows: 
> make run
or
> ./test


Compiler:  
------------ 
gcc version 4.6.3 (Ubuntu/Linaro 4.6.3-1ubuntu5)


Assumptions: 
----------- 
My program can't 1 sec sleep or any positive numer of sleeps


Conclusions/Remarks: 
------------------- 
I had some problem implementing consumer function which goes to infinit loop or 
something after producer finishes it job

Errors/Bugs: 
----------- 
I couldn't solve one bug, which is when you make it sleep to 1 sec (e.g.  ./bound 1), "consumer" 
function hangs after acquire lock at the end of execution. 


Additional Tools Used:
---------------------
All program and libraries are on Ubuntu
