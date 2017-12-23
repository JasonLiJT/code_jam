#include <iostream>
#include <algorithm>
#include <set>
#include <iterator>

#define endl '\n'

using namespace std;

set<char> possible;

int main() {
	ios::sync_with_stdio(false);
	// cin.tie(NULL);

	for (char c = 'a'; c <= 'z'; ++c) {
		possible.insert(c);
	}

	char status, c;
	int n; cin >> n;
	int letter_found = 0, could_avoid = 0;

	for (int i = 0; i < n; ++i) {		
		cin >> status;
		cin.get();  // The space
		set<char> word, intersect, difference;
		switch (status) {
			case '!':
				could_avoid += letter_found;
				c = cin.get();
				// Guaranteed non-empty word
				do {
					word.insert(c);
					c = cin.get();
				} while ('a' <= c && c <= 'z');
				set_intersection(word.begin(), word.end(), possible.begin(), possible.end(), inserter(intersect, intersect.begin()));
				possible = intersect;
				// cout << "\t-!-" << possible.size() << "-" << could_avoid << endl;
				// cout << "\tword:";
				// for (auto w: word) {
					// cout << w;
				// }
				// cout << endl;
				break;
			case '.':
				c = cin.get();
				// Guaranteed non-empty word
				do {
					word.insert(c);
					c = cin.get();
				} while ('a' <= c && c <= 'z');
				set_difference(possible.begin(), possible.end(), word.begin(), word.end(), inserter(difference, difference.begin()));
				possible = difference;
				// cout << "-.-" << possible.size() << "-" << could_avoid << endl;
				// cout << "\tword: ";
				// for (auto w: word) {
					// cout << w;
				// }
				// cout << endl;
				break;
			case '?':
				c = cin.get();
				// Guaranteed non-empty letter
				if (i < n - 1) {
					// Not the last guess, shocked
					could_avoid += letter_found;
					possible.erase(c);
				}
				// cout << "-?-" << possible.size() << "-" << could_avoid << endl;
				break;
		}

		// Judge whether the letter is found
		if (possible.size() == 1) {
			letter_found = 1;
		}
		
	}

	cout << could_avoid << endl;

	return 0;
}
