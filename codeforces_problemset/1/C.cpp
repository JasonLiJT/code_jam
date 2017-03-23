#include <iostream>
#include <cmath>

using namespace std;
#define endl '\n'

const double PI = acos(-1.0);
const double err = 1e-5;

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
	return fabs(a - b) < err;
}

bool fdivisible(const double & a, const double & b) {
	if (equal(a, b)) return true;
	double remainder = fmod(a, b);
	if (equal(remainder, 0) || equal(remainder, b)) return true;
	return false;
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
			R = s1 * 0.5 / sin(ang1);

	// find N
	int N;
	for (N = 3; N < 101; ++N) {
		if (fdivisible(ang1, PI / N) && fdivisible(ang2, PI / N) && fdivisible(ang3, PI / N)) {
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