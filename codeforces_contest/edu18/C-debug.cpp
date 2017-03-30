#include <iostream>
#include <string>
#include <vector>

#define DEBUG
#define endl '\n'

using namespace std;

int main() {
	ios::sync_with_stdio(false);
	cin.tie(NULL);

	string s;
	cin >> s;
    int remainder = 0, length = s.length();
    vector<int> v_ones, v_twos;
    for (int i = length - 1; i >= 0; --i) {
        int d = s[i] - '0';
        if (d % 3 == 1) v_ones.push_back(i);
        if (d % 3 == 2) v_twos.push_back(i);
        remainder = (remainder + d) % 3;
    }

    if (remainder == 0) {
        cout << s << endl;
        return 0;
    } else if (remainder == 1) {
        if (v_ones.size() > 0 && v_twos.size() < 2) {
            s = s.substr(0, v_ones[0]) + s.substr(v_ones[0] + 1);
        } else if (v_ones.size() < 1 && v_twos.size() > 1) {
            s = s.substr(0, v_twos[1]) + s.substr(v_twos[1] + 1, v_twos[0] - v_twos[1] - 1)
                + s.substr(v_twos[0] + 1);
        } else if (v_ones.size() > 0 && v_twos.size() > 1) {
            string s1, s2;
            s1 = s.substr(0, v_ones[0]) + s.substr(v_ones[0] + 1);
            s2 = s.substr(0, v_twos[1]) + s.substr(v_twos[1] + 1, v_twos[0] - v_twos[1] - 1)
                + s.substr(v_twos[0] + 1);
            s = (s1.length() > s2.length()) ? s1 : s2;
        }
    } else if (remainder == 2) {
        if (v_twos.size() > 0 && v_ones.size() < 2) {
            s = s.substr(0, v_twos[0]) + s.substr(v_twos[0] + 1);
        } else if (v_twos.size() < 1 && v_ones.size() > 1) {
            s = s.substr(0, v_ones[1]) + s.substr(v_ones[1] + 1, v_ones[0] - v_ones[1] - 1)
                + s.substr(v_ones[0] + 1);
        } else if (v_twos.size() > 0 && v_ones.size() > 1) {
            string s1, s2;
            s1 = s.substr(0, v_twos[0]) + s.substr(v_twos[0] + 1);
            s2 = s.substr(0, v_ones[1]) + s.substr(v_ones[1] + 1, v_ones[0] - v_ones[1] - 1)
                + s.substr(v_ones[0] + 1);
            s = (s1.length() > s2.length()) ? s1 : s2;
        }
    }

    int skip0 = 0;
    for (int i = 0; i < s.length() - 1; ++i) {
        if (s[i] != '0') break;
        skip0++;
    }
    s = s.substr(skip0);


#ifdef DEBUG
    cout << "remainder = " << remainder << endl;
    cout << "v_ones.size() = " << v_ones.size() << endl;
    for (std::vector<int>::iterator i = v_ones.begin(); i != v_ones.end(); ++i) {
        cout << *i << ' ';
    }
    cout << "\nv_twos.size() = " << v_twos.size() << endl;
    for (std::vector<int>::iterator i = v_twos.begin(); i != v_twos.end(); ++i) {
        cout << *i << ' ';
    }
    cout << endl << endl;

#endif
    if (s.length() == 0) cout << -1 << endl;
    else cout << s << endl;

}