#include <iostream>
#include <cmath>

using namespace std;

#define PI 3.1415926535897932
#define endl '\n'
#define err 1e-3

double dis(const double &x1, const double &y1, const double &x2, const double &y2) {
	return sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

double dot(const double &x1, const double &y1, const double &x2, const double &y2) {
	return x1*x2 + y1*y2;
}

double theta(const double &x1, const double &y1, const double &x2, const double &y2) {
	return acos(dot(x1, y1, x2, y2)/ (dis(x1, y1, 0, 0) * dis(x2, y2, 0, 0)));
}

bool equal(const double &a, const double &b) {
	return abs(a - b) < err;
}

bool fdivisible(double a, double b) {
	if (equal(fmod(a, b), 0)) return true;
	else return false;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	double x1, y1, x2, y2, x3, y3, ans = 0;
	cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

	// compute angles
	double 	ang1 = theta(x2-x1, y2-y1, x3-x1, y3-y1),
			ang2 = theta(x1-x2, y1-y2, x3-x2, y3-y2),
			ang3 = PI - ang1 - ang2,
			s1 = dis(x2, y2, x3, y3),
			// s2 = dis(x1, y1, x3, y3),
			// s3 = dis(x1, y1, x2, y2),
			R = s1 * 0.5 / sin(ang1),
			dtheta1 = 2 * abs(ang1 - ang2),
			dtheta2 = 2 * abs(ang1 - ang3);

	// find N
	int N;
	for (N = 3; N < 101; ++N) {
		if (fdivisible(dtheta1, 2 * PI / N) && fdivisible(dtheta2, 2 * PI / N)) {
			// N found
			break;
		}
	}

	ans = N * 0.5 * R * R * sin(2 * PI / N);

	cout.precision(6);
	cout << fixed << ans << endl;
	// Equivalent to
	// printf("%.6f\n", ans);
}