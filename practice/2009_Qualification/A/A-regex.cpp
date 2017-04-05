#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <algorithm>

using namespace std;
#define endl '\n'

int L, D, N;
vector<string> dict;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);
	cin >> L >> D >> N;
	for (int i = 0; i < D; ++i) {
		string s;
		cin >> s;
		dict.push_back(s);
	}
	for (int X = 1; X < N + 1; ++X) {
		int K = 0;
		string line = "";
		cin >> line;

		///////////////////////////////////////////////////
		// for (int i = 0; i < L; ++i) {
		// 	int pos = line.find("(");
		// 	if (pos != -1) {
		// 		line[pos] = '[';
		// 		line[line.find(")")] = ']';
		// 	}
		// }
		replace(line.begin(), line.end(), '(', '[');
		replace(line.begin(), line.end(), ')', ']');
		///////////////////////////////////////////////////

		regex e(line);
		for (std::vector<string>::iterator i = dict.begin(); i != dict.end(); ++i) {
			K += (regex_match(*i, e));
		}
		cout << "Case #" << X << ": " << K << endl;
	}
}