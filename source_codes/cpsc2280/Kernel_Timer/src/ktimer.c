#include <stdio.h>
#include <stdlib.h>
#include <signal.h>  
#include <stdio.h>
#include <unistd.h>  
#include <sys/time.h>
#include "ktimer.h"

void initialize();
void parent_func(int sig);
void child_1_func(int sig);
void child_2_func(int sig);
long unsigned int fibonacci(unsigned int n);
int elapsed_usecs(long a, long b);

static struct itimerval p_realt,c1_realt, c2_realt;
static struct itimerval p_virtt,c1_virtt, c2_virtt;
static struct itimerval p_proft,c1_proft, c2_proft;

/*====================
 * Main function
 =====================*/
int main ( int argc, char *argv[] ) {
	long unsigned fib = 0;
	int pid1, pid2;
	unsigned int fibarg;
	int status;

	// Get command line arugment, fibarg
	if ( argc != 2 ) { /* argc should be 2 for correct execution */
		/* We print argv[0] assuming it is the program name */
		printf( "usage: %s filename [Integer]\n", argv[0] );
		return 0;
	}
	else { 
		 
		if ( sscanf( argv[1], "%d", &fibarg ) == 0 ) {
	    		printf( "Please enter number only\n" );
			return 0;
		}
		
		printf("fibarg = %i\n",fibarg);
    	}
	
	// Initialize parent, cild1, and child 2 timer values
	initialize();

	// Enable your signal handlers for the parent
	signal(SIGALRM,parent_func);    
    	signal(SIGVTALRM,parent_func);  
	signal(SIGPROF,parent_func);

	setitimer(ITIMER_REAL, &p_realt, NULL);
	setitimer(ITIMER_VIRTUAL, &p_virtt, NULL);
	setitimer(ITIMER_PROF, &p_proft, NULL);
	
	pid1 = fork();
	if(pid1 == 0) { /*Child 1*/
		// Enable child 1 signal handlers (disable parent handlers)
		signal(SIGALRM,child_1_func);    
    		signal(SIGVTALRM,child_1_func);  
		signal(SIGPROF,child_1_func);
		
		// Set the child 1 itimers
		setitimer(ITIMER_REAL, &c1_realt, NULL);
		setitimer(ITIMER_VIRTUAL, &c1_virtt, NULL);
		setitimer(ITIMER_PROF, &c1_proft, NULL);

		///printf("Before %ld seconds, %ld microseconds ...\n", c1_realt.it_value.tv_sec, c1_realt.it_value.tv_usec);

		// Start child 1 on the Fibonacci program
		fib = fibonacci(fibarg);//fibarg);

		// Collecting time info
		getitimer(ITIMER_PROF,  &c1_proft);
  		getitimer(ITIMER_REAL,&c1_realt);
 		getitimer(ITIMER_VIRTUAL, &c1_virtt);

		// Displaying child 1 result
		printf("\nChild 1:\n");
  		printf("Child 1 fib = %ld, real time = %ld sec, %i msec\n", fib, c1_realt_secs, elapsed_usecs(c1_realt.it_value.tv_sec, c1_realt.it_value.tv_usec));
		printf("Child 1 fib = %ld, cpu time = %ld sec, %i msec\n", fib, c1_proft_secs, elapsed_usecs(c1_proft.it_value.tv_sec, c1_proft.it_value.tv_usec));
		printf("Child 1 fib = %ld, user time = %ld sec, %i msec\n",fib, c1_virtt_secs, elapsed_usecs(c1_virtt.it_value.tv_sec, c1_virtt.it_value.tv_usec));
		printf("Child 1 fib = %ld, kernel time = %ld sec, %i msec\n", fib, c1_proft_secs-c1_virtt_secs,
			(elapsed_usecs(c1_proft.it_value.tv_sec, c1_proft.it_value.tv_usec)) - (elapsed_usecs(c1_virtt.it_value.tv_sec,c1_virtt.it_value.tv_usec)));
		
		printf("\n");
		fflush(stdout);
		exit(EXIT_SUCCESS);
	}
	else {
      		pid2 = fork();
     		if(pid2 == 0) { /*Child 2*/
			// Enable child 2 signal handlers (disable parent handlers)
			signal(SIGALRM,child_2_func);    
	    		signal(SIGVTALRM,child_2_func);  
			signal(SIGPROF,child_2_func);

			// Set the child 2 itimers
			setitimer(ITIMER_REAL, &c2_realt, NULL);
			setitimer(ITIMER_VIRTUAL, &c2_virtt, NULL);
			setitimer(ITIMER_PROF, &c2_proft, NULL);

			fib = fibonacci(fibarg);
	
			// Collecting time info
			getitimer(ITIMER_PROF,  &c2_proft);
	  		getitimer(ITIMER_REAL,&c2_realt);
	 		getitimer(ITIMER_VIRTUAL, &c2_virtt);
			
			// Displaying child 2 result
			printf("\nChild 2:\n");
			printf("Child 2 fib = %ld, real time = %ld sec, %i msec\n", fib, c2_realt_secs, elapsed_usecs(c2_realt.it_value.tv_sec, c2_realt.it_value.tv_usec));
			printf("Child 2 fib = %ld, cpu time = %ld sec, %i msec\n", fib, c2_proft_secs, elapsed_usecs(c2_proft.it_value.tv_sec, c2_proft.it_value.tv_usec));
			printf("Child 2 fib = %ld, user time = %ld sec, %i msec\n",fib, c2_virtt_secs, elapsed_usecs(c2_virtt.it_value.tv_sec, c2_virtt.it_value.tv_usec));
			printf("Child 2 fib = %ld, kernel time = %ld sec, %i msec\n", fib, c2_proft_secs-c2_virtt_secs,
				(elapsed_usecs(c2_proft.it_value.tv_sec, c2_proft.it_value.tv_usec)) - (elapsed_usecs(c2_virtt.it_value.tv_sec,c2_virtt.it_value.tv_usec)));

			printf("\n");
			fflush(stdout);
			exit(EXIT_SUCCESS);
			
		}
		else { /* This is the parent */
			//Start the parent on the Fibonacci program
      			fib = fibonacci(fibarg);
			
			//waiting for childs
			waitpid(0, &status, 0);
    			waitpid(0, &status, 0);

			// Collecting parent time info
			getitimer(ITIMER_PROF,  &p_proft);
	  		getitimer(ITIMER_REAL,&p_realt);
	 		getitimer(ITIMER_VIRTUAL, &p_virtt);
			
			// Displaying parent result
			printf("Parent fib = %ld, real time = %ld sec, %i msec\n", fib, p_realt_secs, elapsed_usecs(p_realt.it_value.tv_sec, p_realt.it_value.tv_usec));
			printf("Parent fib = %ld, cpu time = %ld sec, %i msec\n", fib, p_proft_secs, elapsed_usecs(p_proft.it_value.tv_sec, p_proft.it_value.tv_usec));
			printf("Parent fib = %ld, user time = %ld sec, %i msec\n",fib, p_virtt_secs, elapsed_usecs(p_virtt.it_value.tv_sec, p_virtt.it_value.tv_usec));
			printf("Parent fib = %ld, kernel time = %ld sec, %i msec\n", fib, p_proft_secs-p_virtt_secs,
				(elapsed_usecs(p_proft.it_value.tv_sec, p_proft.it_value.tv_usec)) - (elapsed_usecs(p_virtt.it_value.tv_sec,p_virtt.it_value.tv_usec)));
			
			printf("\n");
			fflush(stdout);
			exit(EXIT_SUCCESS);
		}

		printf("this line should never be printed\n");
	}
		
	return 0;
}

// Cild 1 signal handler
// @param signal number
void child_1_func(int sig){  
   	if(sig==SIGALRM) {  
		c1_realt_secs++;
   	}  
   	else if(sig==SIGVTALRM) {  
		c1_virtt_secs++;
    	}
    	else if(sig==SIGPROF)  {
		c1_proft_secs++;
	}
}  

// Cild 2 signal handler
// @param signal number
void child_2_func(int sig){  
    	if(sig==SIGALRM) {  
		c2_realt_secs++;
	}  
    	else if(sig==SIGVTALRM){  
		c2_virtt_secs++;
	}
 	else if(sig==SIGPROF) {
		c2_proft_secs++;
	}
}

// Parent signal handler
// @param signal number
void parent_func(int sig) {  
	if(sig==SIGALRM){  
		p_realt_secs++;
    	}  
    	else if(sig==SIGVTALRM){  
		p_virtt_secs++;
	}
 	else if(sig==SIGPROF) {
		p_proft_secs++;
	}
}

// Fibonacci function
long unsigned int fibonacci(unsigned int n) {
	if(n ==0)
		return 0;
	else if (n == 1 || n ==2)
		return 1;
	else
		return (fibonacci(n-1) + fibonacci(n-2));
}

 

int elapsed_usecs(long a, long b) {
	return ((a) * 1000 + b/1000.0);
}

//Initialize parent, cild1, and child 2 timer values
void initialize() {
      
	//perant
   	p_realt.it_value.tv_sec=INTERVAL;  
    	p_realt.it_value.tv_usec=999999;  
    	p_realt.it_interval.tv_sec=INTERVAL;  
    	p_realt.it_interval.tv_usec=999999;

	p_virtt.it_value.tv_sec=INTERVAL;  
    	p_virtt.it_value.tv_usec=999999;  
    	p_virtt.it_interval.tv_sec=INTERVAL;  
    	p_virtt.it_interval.tv_usec=999999;
	
	p_proft.it_value.tv_sec=INTERVAL;  
    	p_proft.it_value.tv_usec=999999;  
    	p_proft.it_interval.tv_sec=INTERVAL;  
    	p_proft.it_interval.tv_usec=999999;

	//child 1
	c1_realt.it_value.tv_sec=INTERVAL;  
    	c1_realt.it_value.tv_usec=999999;  
    	c1_realt.it_interval.tv_sec=INTERVAL;  
    	c1_realt.it_interval.tv_usec=999999;

	c1_virtt.it_value.tv_sec=INTERVAL;  
    	c1_virtt.it_value.tv_usec=999999;  
    	c1_virtt.it_interval.tv_sec=INTERVAL;  
    	c1_virtt.it_interval.tv_usec=999999;
	
	c1_proft.it_value.tv_sec=INTERVAL;  
    	c1_proft.it_value.tv_usec=999999;  
    	c1_proft.it_interval.tv_sec=INTERVAL;  
    	c1_proft.it_interval.tv_usec=999999;

	//child 2
   	c2_realt.it_value.tv_sec=INTERVAL;  
    	c2_realt.it_value.tv_usec=999999;  
    	c2_realt.it_interval.tv_sec=INTERVAL;  
    	c2_realt.it_interval.tv_usec=999999;

	c2_virtt.it_value.tv_sec=INTERVAL;  
    	c2_virtt.it_value.tv_usec=999999;  
    	c2_virtt.it_interval.tv_sec=INTERVAL;  
    	c2_virtt.it_interval.tv_usec=999999;
	
	c2_proft.it_value.tv_sec=INTERVAL;  
    	c2_proft.it_value.tv_usec=999999;  
    	c2_proft.it_interval.tv_sec=INTERVAL;  
    	c2_proft.it_interval.tv_usec=999999;

}
