#include <iostream>
#include <algorithm>
#include <vector>
#include <cmath>

#define endl '\n'

using namespace std;

const double SMALL_NUM = 1e-7;

template <class T>
bool equals(T a, T b) {
	return (-1.0 * SMALL_NUM < (a - b) && (a - b) < SMALL_NUM);
}

template <class T>
bool smaller(T a, T b) {
	return ((a - b) < -1.0 * SMALL_NUM);
}

template <class T>
bool greater(T a, T b) {
	return ((a - b) > SMALL_NUM);
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n, r;
	cin >> n >> r;

	vector<double> vx, vy;

	double x;
	for (int i = 0; i < n; ++i) {
		cin >> x;
		vx.push_back(x);
	}

	for (int i = 0; i < n; ++i) {
		// pushing i-th disk
		bool touch_disk = false;
		double y_max = 0;
		for (int j = 0; j < i; ++j) {
			// Testing the previous i-1 disks
			// vy must have exactly i-1 elements
			if (abs(vx[j] - vx[i]) <= 2 * r) {
				// Will touch previous disk j
				touch_disk = true;
				double y_current = (vy[j] + sqrt(4 * r * r - (vx[j] - vx[i]) * (vx[j] - vx[i])));
				y_max = max(y_max, y_current);
			}
		}
		if (touch_disk) {
			vy.push_back(y_max);
		} else {
			vy.push_back(r);
		}
	}

	cout.precision(10);
    cout << fixed;

    for (auto& d: vy) {
    	cout << d << " ";
    }

	return 0;
}
