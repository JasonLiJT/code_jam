#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>

using namespace std;
const double PI = acos(-1);

struct cake {
    long long R;
    long long H;
    long long product;
    void cal_product() {
        product = 1LL * R * H;
    }
};

bool comp_R(const cake& a, const cake& b) {
    return a.R < b.R;
}

bool comp_product(const cake& a, const cake& b) {
    return a.product < b.product;
}

int main() {
    int T;
    cin >> T;
    cout << fixed;
    for (int test_case = 1; test_case < T + 1; ++test_case) {
        int N, K;
        cin >> N >> K;
        vector<cake> pancakes;

        for (int i = 0; i < N; ++i) {
            cake p;
            cin >> p.R >> p.H;
            p.cal_product();
            pancakes.push_back(p);
        }

        sort(pancakes.rbegin(), pancakes.rend(), comp_product);
        // clog << endl;
        // for (auto i: pancakes) {
        //     clog << i.R << "\t" << i.H << "\t" << i.product << "\n";
        // }
        double ans = 0;
        int max_R_index = (max_element(pancakes.begin(), pancakes.begin() + K, comp_R) - pancakes.begin());
        int max_R_all_index = (max_element(pancakes.begin(), pancakes.end(), comp_R) - pancakes.begin());
        // clog << "max_R_index = " << max_R_index << endl;
        // clog << "max_R_all_index = " << max_R_all_index << endl;
        ans += PI * pancakes[max_R_index].R * pancakes[max_R_index].R;
        for (int i = 0; i < K; ++i) {
            ans += 2 * PI * pancakes[i].product;
        }
        if (max_R_index != max_R_all_index) {
            int del_index = K - 1;
            // clog << "del_index = " << del_index << endl;
            for (int i = K; i < N; ++i) {
                double diff = 0;
                if (pancakes[i].R > pancakes[max_R_index].R) {
                    diff = PI * (pancakes[i].R * pancakes[i].R + 2 * pancakes[i].product
                                -pancakes[max_R_index].R * pancakes[max_R_index].R - 2 * pancakes[del_index].product);
                    // clog << "diff " << i << ": " << diff << endl;
                }

                if (diff > 0) {
                    // clog << "swap " << i << ", " << del_index << endl;
                    ans += diff;
                    swap(pancakes[i], pancakes[del_index]);
                    max_R_index = K - 1;        
                }
            }
        }
        cout << "Case #" << test_case << ": " << ans << endl;
        
    }
}