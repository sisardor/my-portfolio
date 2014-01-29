#Makefile 5
IDIR=../include
CC=gcc
CFLAGS=-I$(IDIR)

RPOGAM_NAME=ktimer

ODIR=obj
LDIR =../lib
LIBS=-lm

_DEPS = ktimer.h
DEPS = $(patsubst %,$(IDIR)/%,$(_DEPS))

_OBJ = ktimer.o ktimerfunc.o
OBJ = $(patsubst %,$(ODIR)/%,$(_OBJ))

$(ODIR)/%.o: %.c $(DEPS)
	$(CC) -c -o $@ -g $< $(CFLAGS)

$(RPOGAM_NAME): $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

run:
	./$(RPOGAM_NAME) $(ARGS)

.PHONY: clean
clean:
	rm -f $(ODIR)/*.o *~ core $(IDIR)/*~

