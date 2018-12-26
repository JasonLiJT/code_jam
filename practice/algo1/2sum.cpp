#include <cstdio>
#include <algorithm>
#include <unordered_set>
#include <vector>

using namespace std;

constexpr size_t N = 1000000;
constexpr long long LEFT_BOUND = -10000;
constexpr long long RIGHT_BOUND = 10000;

int main() {
    unordered_set<long long> validSums;
    vector<long long> nums(N);

    for (size_t i = 0; i < N; ++i) {
        scanf("%lld", &nums[i]);
    }

    sort(nums.begin(), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    printf("%lu unique numbers left\n", nums.size());

    // O(N log N) time, O(N) space

    bool searchCompleted = false;
    for (auto xIt = nums.begin(), yLower = nums.end(), yUpper = nums.end();
         xIt != nums.end() && !searchCompleted && validSums.size() < 20001;
         ++xIt) {
        // Look for y in the sorted set nums so that
        // x + y lies in [LEFT_BOUND, RIGHT_BOUND] --- A
        // i.e. y lies in [LEFT_BOUND - x, RIGHT_BOUND - x + 1) --- B
        // When x increases, interval B moves left
        if (*xIt >= -5000) {
            // After this loop,
            // (-inf, x] and [-1000 - x, inf) will have been checked
            // If x >= -5000, then x >= -1000 - x,
            // the search will be completed after this loop.
            searchCompleted = true;
        }
        printf("\rChecking %ld/%lu      ", xIt - nums.begin(), nums.size());
        yLower = lower_bound(nums.begin(), yLower, LEFT_BOUND - *xIt);
        yUpper = upper_bound(yLower, yUpper, RIGHT_BOUND - *xIt + 1);
        for (auto yIt = yLower; yIt != yUpper; ++yIt) {
            if (*xIt != *yIt) {  // x, y must be distinct
                long long sum = *xIt + *yIt;
                validSums.insert(sum);
            }
        }
    }
    // Let U denote unique numbers among the 1e6 input and M = 20001
    // The time complexity is O(U) * (O(log U) + O(M)) = O(U log U + UM) = O(N log N + NM)

    printf("\nAnswer is %lu\n", validSums.size());

    return 0;
}
