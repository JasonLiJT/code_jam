#include <iostream>
#include <string>
#include <set>
#include <regex>

using namespace std;
#define endl '\n'

int L, D, N;
set<string> dict;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	cin >> L >> D >> N;
	for (int i = 0; i < D; ++i) {
		string s;
		cin >> s;
		dict.insert(s);
	}
	// cout << "Dictionary read.\n";
	// for (std::set<string>::iterator i = dict.begin(); i != dict.end(); ++i)
	// {
	// 	cout << *i << endl;
	// }
	// cout << "Dictionary printed.\n";
	for (int X = 1; X < N + 1; ++X) {
		int K = 0;
		string line = "", r = "";
		cin >> line;
		// cout << "Line read: " << line << endl;
		for (int i = 0; i < L; ++i) {
			if (line[0] == '(') {
				int right = line.find(')');
				r += '[' + line.substr(1, right - 1) + ']';
				line = line.substr(right + 1);
			} else {
				r += "[" + line.substr(0, 1) + "]";
				line = line.substr(1);
			}
		}
		// cout << "r = " << r << endl;

		regex e(r);
		for (std::set<string>::iterator i = dict.begin(); i != dict.end(); ++i) {
			K += (regex_match(*i, e));
		}

		cout << "Case #" << X << ": " << K << endl;
	}

}