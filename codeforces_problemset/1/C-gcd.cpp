#include <iostream>
#include <cmath>

using namespace std;
#define endl '\n'

const double PI = acos(-1.0);
const double err = 1e-2;

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

double gcd(const double &a, const double &b) {
	if (equal(fmod(a, b), 0)) return b;
	if (equal(fmod(b, a), 0)) return a;
	return gcd(b, fmod(a, b));
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	double x1, y1, x2, y2, x3, y3, ans = 0;
	cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

	// compute angles
	double 	ang1 = 2 * theta(x2-x1, y2-y1, x3-x1, y3-y1),
			ang2 = 2 * theta(x1-x2, y1-y2, x3-x2, y3-y2),
			ang3 = 2 * PI - ang1 - ang2,
			s1 = dis(x2, y2, x3, y3),
			R = s1 * 0.5 / sin(ang1 / 2);
	// find N
	double phi = gcd(gcd(ang1, ang2), ang3);
	double N = (2 * PI / phi);

	ans = N * 0.5 * R * R * sin(phi);

	cout.precision(6);
	cout << fixed << ans << endl;
	// Equivalent to
	// printf("%.6f\n", ans);
}