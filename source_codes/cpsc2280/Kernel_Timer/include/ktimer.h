#ifndef KTIMER
#define KTIMER

#define INTERVAL 1
#define FALSE           0
#define TRUE            1
#define STD_INPUT       0
#define STD_OUTPUT      1
#ifndef NULL
#define NULL    0
#endif
long unsigned int fibonacci(unsigned int n);
void user_func(int sig);

static long p_realt_secs = 0, c1_realt_secs = 0, c2_realt_secs = 0;
static long p_virtt_secs = 0, c1_virtt_secs = 0, c2_virtt_secs = 0;
static long p_proft_secs = 0, c1_proft_secs = 0, c2_proft_secs = 0;

static long p_realt_usecs = 0, c1_realt_usecs = 0, c2_realt_usecs = 0;
static long p_virtt_usecs = 0, c1_virtt_usecs = 0, c2_virtt_usecs = 0;
static long p_proft_usecs = 0, c1_proft_usecs = 0, c2_proft_usecs = 0;

#endif // KTIMER
