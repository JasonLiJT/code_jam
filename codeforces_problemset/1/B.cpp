#include <iostream>
#include <string>
#include <cmath>

#define endl '\n'
#define DEBUG false

using namespace std;

int strTOint(string s) {
	int len = s.length(), sum = 0, digit;
	char next;
	for (int i = 0; i < len; ++i) {
		sum *= 10;
		next = s[i];
		digit = next - '0';
		sum += digit;
	}
	return sum;
}

int lettersTOnum(string s) {
	int len = s.length(), sum = 0, digit;
	for (int i = 0; i < len; ++i){
		sum *= 26;
		digit = s[i] - 'A' + 1;
		sum += digit;
	}
	return sum;
}

string numTOletters(int sum) {
	string rev, ans;
	char next;
	while (sum > 0) {
		next = sum % 26 - 1 + 'A';
		sum /= 26;
		if (next < 'A') {
			next = 'Z';
			sum -= 1;
		}
		rev += next;
	}

	int len = rev.length();
	ans = rev;
	for (int i = 0; i < len; ++i) {
		ans[i] = rev[len - i - 1];
	}
	if (DEBUG) {
		cout << "numTOletters: rev = " << rev << ", ans = " << ans << endl;
	}
	return ans;
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	int n;  // 1 <= n <= 1e5
	cin >> n;
	cin.get(); // skip the '\n'

	for (int i = 0; i < n; ++i) {
		// string line;  // row and column <= 1e6
		// cin >> line;
		// int len = line.length();
		string a, b, c, d;
		char next;
		bool is_RXCY = false;
		int status = 1; // range: 1 - 4. 1, 3 for letters, 2, 4 for numbers
		cin.get(next);
		while (next != '\n') {
			if ((status % 2 == 1) && (next >= 'A')) {
				// from letter to next letter
				a += next;
			} else if (status % 2 == 1) {
				// from letter to number
				status += 1;
				if (status == 2) {
					b += next;
				} else {
					d += next;
				}
			} else if ((status % 2 == 0) && (next >= 'A')) {
				// from number to letter
				status += 1;
				is_RXCY = true;
				c += next;
			} else {
				// from number to next number
				if (status == 2) {
					b += next;
				} else {
					d += next;
				}

			}
			cin.get(next);
		}
		if (is_RXCY) {
			if (DEBUG) {
				cout << "It's is_RXCY:\n";
				cout << a << ' ' << b << ' ' << c << ' ' << d << endl;
				cout << 'R' << b << 'C' << d << endl;
				int column = strTOint(d);
				cout << "strTOint(d) = " << column << endl;

			}
			cout << numTOletters(strTOint(d)) << b << endl;
			
		} else {
			if (DEBUG) {
				cout << "It's excel format:\n";
				cout << a << ' ' << b << ' ' << c << ' ' << d << endl;
				cout << a << b << endl;
			}
			cout << 'R' << b << 'C' << lettersTOnum(a) << endl;
		}

	}
}