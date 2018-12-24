#include <iostream>
#include <algorithm>
#include <vector>
#include <queue>
#include <functional>
#include <cassert>

using namespace std;

class LowerMedianKeeper {
   private:
    size_t N;
    priority_queue<int> smallerHalfMaxPQ;                            // [0, (N - 1) / 2]
    priority_queue<int, vector<int>, greater<int>> largerHalfMinPQ;  // ((N - 1) / 2, N)
    // When N is odd, smallerHalfMaxPQ.size() == largerHalfMinPQ.size() + 1
    // When N is even, smallerHalfMaxPQ.size() == largerHalfMinPQ.size()

   public:
    LowerMedianKeeper() : N(0), smallerHalfMaxPQ(), largerHalfMinPQ() {
    }

    int getMedian() {
        assert(N > 0);
        return smallerHalfMaxPQ.top();
    }

    void insert(int i) {
        N++;
        if (N == 1) {
            smallerHalfMaxPQ.push(i);
        } else if (i > smallerHalfMaxPQ.top()) {
            largerHalfMinPQ.push(i);
            if (N & 1) {  // N was even. Insertion violates size invariants
                smallerHalfMaxPQ.push(largerHalfMinPQ.top());
                largerHalfMinPQ.pop();
            }
        } else {
            smallerHalfMaxPQ.push(i);
            if (!(N & 1)) {  // N was odd. Insertion violates size invariants
                largerHalfMinPQ.push(smallerHalfMaxPQ.top());
                smallerHalfMaxPQ.pop();
            }
        }

        // Check size invariants
        size_t smallerHalf = smallerHalfMaxPQ.size(), largerHalf = largerHalfMinPQ.size();
        assert(((N&1) && smallerHalf == largerHalf + 1) || (!(N&1) && smallerHalf == largerHalf));
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> nums;
    nums.reserve(10000);
    for (int i; cin >> i;) {
        nums.push_back(i);
    }

    LowerMedianKeeper median;
    int medianSum = 0;
    for (int i : nums) {
        median.insert(i);
        int currentMedian = median.getMedian();
        medianSum = (medianSum + currentMedian) % 10000;
    }
    cout << medianSum << endl;
    return 0;
}
