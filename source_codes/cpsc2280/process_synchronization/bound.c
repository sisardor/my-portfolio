#include <stdio.h>
#include <pthread.h>

#define BSIZE 10

typedef struct {
	char buf[BSIZE];
	int occupied;
	int nextin, nextout;
	pthread_mutex_t mutex;
	pthread_cond_t more;
	pthread_cond_t less;
} buffer_t;

buffer_t buffer;

// running flag for thread termination
int done = 0;
int sleep_time;

void* producerFunction(void *);
void* consumerFunction(void *);

pthread_t producerThread;
pthread_t consumerThread;

// ================
// Main method
// ================
int main(int argc, char **argv, char **envp) {

	if( argc != 2) {
		printf("usage: bound sleeptime\n");
		
		return 1;
	}

	// get_parameters
	sleep_time = atoi(argv[1]);

	if( pthread_cond_init(&(buffer.more), NULL) ) 
		printf("error: buffer.more\n");

	if( pthread_cond_init(&(buffer.less), NULL) ) 
		printf("error: buffer.less\n");

	pthread_create(&producerThread, NULL, producerFunction, NULL);
	pthread_create(&consumerThread, NULL, consumerFunction, NULL);

	pthread_join(producerThread, NULL);
	pthread_join(consumerThread, NULL);

	printf("main exiting. \n");

	return 0;
}

// producerFunction()
// produces items
//
// @param void
void* producerFunction(void * param) {
	printf("producer starting... \n");
	 
	// objects to produce, place in buffer for the consumer
	char item[] = "More than meets the eye!";
	int i;


	for(i=0;;i++) {
		if(item[i] == '\0') { 
			buffer.occupied++;
			done = 1;
			break;
		}

		if( pthread_mutex_lock(&(buffer.mutex)) == 0 ) 
			printf("producer has the lock. \n");
	
		if(buffer.occupied >= BSIZE) {
			printf("producer waiting, full buffer ... \n");

		}

		// wait condition      
		if(buffer.occupied == BSIZE) {
			pthread_cond_wait(&(buffer.less), &(buffer.mutex) );
		}

		// add to the buffer 
	      	buffer.buf[buffer.nextin] = item[i];
	      	buffer.nextin = (buffer.nextin +1) % BSIZE;
	      	buffer.occupied++;
	
		// debug info 
	      	printf("producing object number: %i [%c]\n", i, item[i]);

		//release the lock
		pthread_cond_signal(&buffer.more);
		pthread_mutex_unlock(&buffer.mutex);
		
		 

		if( item[i+1] == '\0' ){
			done = 1;
			buffer.occupied++;
			break;
		}
		

		sleep(sleep_time);
	}

	printf("producer exiting. \n");
	pthread_exit(0);
}


// consumerFunction()
// consumes items produced by producerFunction
//
// @param void
void* consumerFunction(void * param) {
	printf("consumer starting... \n");
	char item;
	int i;

	for(i=0;;i++) {
		if(done==1) {
			break;
		}

		// acquire lock
		if( (done == 0) && (pthread_mutex_lock(&(buffer.mutex)) == 0)  ) 
        		printf("consumer has the lock. \n");

		// wait condition
		if(buffer.occupied == 0) {
			pthread_cond_wait(&(buffer.more), &(buffer.mutex));
		}

		// debug info
     		if ( buffer.occupied == 0 ) printf("consumer waiting, empty buffer ... \n");

		// consume from buffer by displaying to the terminal
		item = buffer.buf[buffer.nextout];
		buffer.nextout =  (buffer.nextout +1) % BSIZE;
		buffer.occupied--;

		printf("consuming object number %i [%c]\n", i ,item);
		pthread_cond_signal(&buffer.less);
		pthread_mutex_unlock(&buffer.mutex);
	}	

	printf("consumer exiting. \n");
	pthread_exit(0);
}
