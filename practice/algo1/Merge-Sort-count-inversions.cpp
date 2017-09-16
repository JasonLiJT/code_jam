#include <iostream>
#include <vector>

using namespace std;

#define endl '\n'

template <typename T>
vector<T> merge_appendInversions(const vector<T>& vL, const vector<T>& vR, long long& inv) {
    vector<T> vM;
    for (unsigned int i = 0, iL = 0, iR = 0; i < vL.size() + vR.size(); ++i) {
        if (iL == vL.size()) {
            vM.push_back(vR[iR]);
            iR++;
        } else if (iR == vR.size()) {
            vM.push_back(vL[iL]);
            iL++;
        } else if (vL[iL] <= vR[iR]) {
            vM.push_back(vL[iL]);
            iL++;
        } else {
            vM.push_back(vR[iR]);
            iR++;
            inv += vL.size() - iL;  // Inversions happen here
        }
    }
    return vM;
}

template <typename T>
void merge_sort_appendInversions(vector<T>& v, long long& inv) {
    if (v.size() == 1) {
        return;
    }
    int l = v.size() / 2, r = v.size() - l;
    vector<T> vL(v.begin(), v.begin() + l), vR(v.end() - r, v.end());
    merge_sort_appendInversions(vL, inv);
    merge_sort_appendInversions(vR, inv);
    v = merge_appendInversions(vL, vR, inv);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<long long> vLL;
    long long x;
    while (cin >> x) {
        vLL.push_back(x);
    }
    long long inv = 0;
    merge_sort_appendInversions(vLL, inv);
    // for (auto i: vLL) {
    //     cout << i << endl;
    // }
    cout << "Total inversions: " << inv << endl;
}
