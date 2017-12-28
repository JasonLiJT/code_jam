#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

#define endl '\n'

template <typename T>
vector<T> merge_appendInversions(const vector<T>& vL, const vector<T>& vR, int& inv) {
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
void merge_sort_appendInversions(vector<T>& v, int& inv) {
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

    vector<int> vi;

    int n, x;
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> x;
        vi.push_back(x);
    }

    vector<int> vi2(vi);
    int inv = 0;
    merge_sort_appendInversions(vi, inv);
    bool even = (inv % 2 == 0);

    int a, b;
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> a >> b;
        a--; b--;
        reverse(vi2.begin() + a, vi2.begin() + b + 1);
        vi = vi2;
        inv = 0;
        merge_sort_appendInversions(vi, inv);
        even = (inv % 2 == 0);
        cout << (even ? "even" : "odd") << endl;
        // for (auto x: vi2) {
        //     cout << x << " ";
        // }
        // cout << endl;
    }
}
