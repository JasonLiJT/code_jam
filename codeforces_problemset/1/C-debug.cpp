#include <iostream>
#include <cmath>

using namespace std;
#define endl '\n'

const bool DEBUG = true;
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
	if (DEBUG) 	x1 = 28.718442, y1 = 36.116251,
				x2 = 36.734593, y2 = 35.617015,
				x3 = 76.193973, y3 = 99.136077,
				ans = 6271.48941610; // test 29
	// if (DEBUG) 	x1 = 115.715093, y1 = 141.583620,
	// 			x2 = 136.158119, y2 =  -23.780834,
	// 			x3 = 173.673212, y3 = 64.802787,
	// 			ans = 24043.74046813; // test 5
	// if (DEBUG) 	x1 = 0, y1 = 0,
	// 			x2 = 1, y2 = 0,
	// 			x3 = 1, y3 = 1,
	// 			ans = 1; // test 1
	else cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

	// compute angles
	double 	ang1 = theta(x2-x1, y2-y1, x3-x1, y3-y1),
			ang2 = theta(x1-x2, y1-y2, x3-x2, y3-y2),
			ang3 = PI - ang1 - ang2,
			s1 = dis(x2, y2, x3, y3),
			R = s1 * 0.5 / sin(ang1);

	// find N
	int N, correct_N;
	for (N = 3; N < 101; ++N) {
		if (DEBUG){
			if (equal(ans, N * 0.5 * R * R * sin(2 * PI / N))){
				cout << "correct_N = " << (correct_N = N) << endl;
			}
		}
		if (fdivisible(ang1, PI / N) && fdivisible(ang2, PI / N) && fdivisible(ang3, PI / N)) {
			// N found
			break;
		}
	}

	ans = N * 0.5 * R * R * sin(2 * PI / N);

	cout.precision(20);
	if (DEBUG){
		cout << fixed << "N = " << N << "\nang1 = " << ang1 
		<< "\nang2 = " << ang2 << "\nang3 = " << ang3 << endl
		<< "PI / correct_N = " << PI / correct_N << endl
		<< "ang1 > PI / correct_N = " << (ang1 > PI / correct_N) << endl
		<< "ang2 > PI / correct_N = " << (ang2 > PI / correct_N) << endl
		<< "ang3 > PI / correct_N = " << (ang3 > PI / correct_N) << endl
		<< "fdivisible(ang1, PI / correct_N) = " << fdivisible(ang1, PI / correct_N) << endl
		<< "fdivisible(ang2, PI / correct_N) = " << fdivisible(ang2, PI / correct_N) << endl
		<< "fdivisible(ang3, PI / correct_N) = " << fdivisible(ang3, PI / correct_N) << endl;
	}
	cout.precision(6);
	cout << fixed << ans << endl;
	// Equivalent to
	// printf("%.6f\n", ans);
}