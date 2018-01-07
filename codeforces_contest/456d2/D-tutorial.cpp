#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <utility>
#include <vector>

using namespace std;

typedef long long ll;
typedef pair<int, int> pii;

const int di[] = {-1, 0, 0, 1};
const int dj[] = {0, -1, 1, 0};

int n, m, r, k;

ll contrib(int i, int j)
{
    // Indices i, j start from 0
    int real_height = min(n, i + r) - max(i + 1, r) + 1;
    int real_width = min(m, j + r) - max(j + 1, r) + 1;
    return real_height * 1LL * real_width;
}

struct Compare
{
    bool operator()(const pii &p1, const pii &p2) const {
        return contrib(p1.first, p1.second) < contrib(p2.first, p2.second);
    }
};

int main()
{
    cin >> n >> m >> r >> k;
    int si = n / 2, sj = m / 2;

    set<pii> visited;
    visited.emplace(si, sj);
    priority_queue<pii, vector<pii>, Compare> q;
    q.emplace(si, sj);

    ll ans = 0;
    for (int z = 0; z < k; z++) {
        int i, j;
        tie(i, j) = q.top();
        q.pop();
        ans += contrib(i, j);

        for (int t = 0; t < 4; t++) {
            int new_i = i + di[t], new_j = j + dj[t];
            if (new_i < 0 || new_i >= n || new_j < 0 || new_j >= m) {
                continue;
            }
            if (visited.count(make_pair(new_i, new_j))) {
                continue;
            }
            q.emplace(new_i, new_j);
            visited.emplace(new_i, new_j);
        }
    }

    ll effective_area = (n - r + 1) * 1LL * (m - r + 1);
    cout << fixed; cout.precision(12); cout << ((double)ans / effective_area) << endl;

    return 0;
}