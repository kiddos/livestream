CPP = g++
CPPFLAGS = -Wall -g -O3
LIBS = -lopencv_core -lopencv_highgui

TARGET = webcam

all: $(TARGET)

webcam: webcam.cpp
	$(CPP) $(CPPFLAGS) -o $@ webcam.cpp $(LIBS)

clean:
	rm public/temp/*.jpg

uninstall:
	rm $(TARGET)

.PHONY:
	all clean
