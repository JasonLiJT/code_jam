#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

template <typename T>
vector<T> merge(const vector<T>& vl, const vector<T>& vr, const int& l, const int& r){
    vector<T> vm;
    for (int i = 0, j = 0, k = 0; i < l + r; ++i) {
        if (k == r) {
            vm.push_back(vl[j]);
            j++;
        } else if (j == l) {
            vm.push_back(vr[k]);
            k++;
        } else if (vl[j] <= vr[k]){
            vm.push_back(vl[j]);
            j++;
        } else {
            vm.push_back(vr[k]);
            k++;
        }
    }
    return vm;
}

template <typename T>
void merge_sort(vector<T>& v){
    int n = v.size(), l = n / 2, r = n - l;
    if (n == 1) return;
    vector<T> vl(v.begin(), v.begin() + l), vr(v.end() - r, v.end());
    merge_sort(vl);
    merge_sort(vr);
    v = merge(vl, vr, l, r);
}

template <typename T>
void merge_sort_loop(vector<T>& v){
    int n = v.size(), chunk = 1, start = 0;
    do {
        start = 0;
        do {
            vector<T> c;
            for (int i = start, j=0, k=0; i < start + 2 * chunk && i < n; ++i) {
                // merge chunk
                if (start + j >= n) break;
                if (k == chunk || start + chunk + k >= n) {
                    c.push_back(v[start + j]);
                    j++;
                } else if (j == chunk) {
                    c.push_back(v[start + chunk + k]);
                    k++;
                } else if (v[start + j] <= v[start + chunk + k]) {
                    c.push_back(v[start + j]);
                    j++;
                } else {
                    c.push_back(v[start + chunk + k]);
                    k++;
                }
            }
            copy(c.begin(), c.end(), v.begin() + start);
            start += 2 * chunk;
        } while (start < n);
        chunk *= 2;
    } while (chunk < n);
}


int main() {
    vector<int> vi;
    int n, k;
    cin >> n;
    for (int i = 0; i < n; ++i) {
        cin >> k;
        vi.push_back(k);
    }

    cout << "Input array:" << endl;
    for (vector<int>::iterator i = vi.begin(); i != vi.end(); ++i) {
        cout << *i << ' ';
    }
    cout << endl;

    vector<int> v_rec = vi, v_iter = vi;
    merge_sort(v_rec);
    merge_sort_loop(v_iter);

    cout << "Recursively Merge Sorted array:" << endl;
    for (vector<int>::iterator i = v_rec.begin(); i != v_rec.end(); ++i) {
        cout << *i << ' ';
    }
    cout << endl;

    cout << "Iteratively Merge Sorted array:" << endl;
    for (vector<int>::iterator i = v_iter.begin(); i != v_iter.end(); ++i) {
        cout << *i << ' ';
    }
    cout << endl;
}