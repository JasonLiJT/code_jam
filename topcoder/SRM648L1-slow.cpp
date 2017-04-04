/*
Problem Statement
You are given two s: N and K. Lun the dog is interested in strings that satisfy the following conditions:

The string has exactly N characters, each of which is either 'A' or 'B'.
The string s has exactly K pairs (i, j) (0 <= i < j <= N-1) such that s[i] = 'A' and s[j] = 'B'.
If there exists a string that satisfies the conditions, find and return any such string.
Otherwise, return an empty string.

Definition
Class: AB
Method: createString
Parameters: int, int
Returns: string
Method signature: string createString(int N, int K)
(be sure your method is public)
Limits
Time limit (s): 2.000
Memory limit (MB): 256
Constraints
- N will be between 2 and 50, inclusive.
- K will be between 0 and N(N-1)/2, inclusive.
Examples
0)
3
2
Returns: "ABB"
This string has exactly two pairs (i, j) mentioned in the statement: (0, 1) and (0, 2).
1)
2
0
Returns: "BA"
Please note that there are valid test cases with K = 0.
2)
5
8
Returns: ""
Five characters is too short for this value of K.
3)
10
12
Returns: "BAABBABAAB"
Please note that this is an example of a solution; other valid solutions will also be accepted.
*/

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class AB {
	public:
		int N, K;

		string createString(const int& N_in, const int& K_in){
			N = N_in;
			K = K_in;
			std::vector<char> vab(N, 'B');
			bool found = false;
			for (int i = 1; i < N/2+1; ++i) {
				////////////////////////////////////
				if (i * (N-i) < K) continue;////////
				////////////////////////////////////
				vab[i-1] = 'A';
				// cout << "i = " << i << endl;
				do{
					if (K == count_AB_pairs(vab)) {
						// cout << "found!\n";
						found = true;
						break;
					}
				} while(next_permutation(vab.begin(), vab.end()));
				if (found) break;
			}

			if (!found) return "";

			string s = "";
			for (std::vector<char>::const_iterator c = vab.begin(); c != vab.end(); ++c) {
				s += *c;
			}
			return s;
		}

		int count_AB_pairs(const std::vector<char>& vab) {
			int sum = 0;
			bool skip = true;
			int count_A = 0;
			for (std::vector<char>::const_iterator c = vab.begin(); c != vab.end(); ++c) {
				if (skip && *c == 'B') continue;
				else skip = false;
				if (*c == 'A') {
					count_A++;
				}
				if (*c == 'B') {
					sum += count_A;
				}
			}
			return sum;
		}
};

int main() {
	AB test;
	int a = 50, b = 600;
	cin >> a >> b;
	cout << "output:\n" << test.createString(a, b) << endl;
	cout << "Searching for valid K from 0 to b\n";
	for (int i = 0; i <= b; ++i) {
		if (!test.createString(a, i).empty()) {
			cout << i << ' ';
		}
	}
}