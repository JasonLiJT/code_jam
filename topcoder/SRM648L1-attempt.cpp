#include <iostream>
#include <cmath>
#include <string>

using namespace std;
#define endl '\n'

class AB {
	public:
	int min_sum_factors(int x, int &a, int &b){
		if (x == 0) {
			a = 0;
			b = 0;
			return 0;
		}
		if (x == 1) {
			a = 1;
			b = 1;
			return 2;
		}
		int upper = (floor(sqrt(x)) + 1), min_sum = x + 1;
		a = 1, b = x;
		for (int i = 0; i < upper; ++i) {
			if (x % a == 0) {
				b = x / a;
				min_sum = min(min_sum, a + b);
			}
			a++;
		}
		a = 1, b = x;
		for (int i = 0; i < upper; ++i) {
			if (x % a == 0) {
				b = x / a;
				if (a + b == min_sum) break;
			}
			a++;
		}
		return min_sum;
	}
	string createString(int N, int K){
		string s = "";
		int a = 1, b = K;
		if (N >= min_sum_factors(K, a, b)) {
			cout << "a = " << a << "\tb = " << b << '\t';
			int r = N - a - b;
			while (r--)
				s += 'B';
			while (a--)
				s += 'A';
			while (b--)
				s += 'B';
		}
		return s;
	}
} test;

int main() {
	AB test;
	int a = 24, b = 160;
	// cin >> a >> b;
	// cout << "output:\n" << test.createString(a, b) << endl;
	cout << "Searching for valid K from 0 to b\n";
	for (int i = 0; i <= b; ++i) {
		cout << i << '\t' << test.createString(a, i) << endl;
	}
}