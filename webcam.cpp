#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

#include <cstdio>

using namespace cv;

#define DISPLAY "Webcam"
#define OUTPUT_DIR "./public/temp"
#define OUTPUT_BASE_NAME "image"
#define OUTPUT_EXTENSION ".jpg"

int main(int argc, char *argv[])
{
	VideoCapture capture(0);
	Mat frame;
	uint64_t count = 0;
	char path[1024] = {'\0'};

	namedWindow(DISPLAY, WINDOW_AUTOSIZE);
	if (capture.isOpened())
	{
		while(true)
		{
			capture.read(frame);
			imshow(DISPLAY, frame);

			memset(path, '\0', 1024);
			sprintf(path, "%s/%s%lu%s", OUTPUT_DIR,
					OUTPUT_BASE_NAME, count, OUTPUT_EXTENSION);
			imwrite(path, frame);

			char key = waitKey(20);
			if (key == 'q' || key == 10 || key == 27)
				break;

			count ++;
		}
	}
	return 0;
}
