#include <iostream>
#include <algorithm>
#include <vector>
#include <memory>

using namespace std;

class Solution {
   private:
    struct DLHeapNode {  // Doubly linked heap node
        int stone;
        size_t heapInd;
        int l, r;  // Interval length
        weak_ptr<DLHeapNode> left;
        weak_ptr<DLHeapNode> right;
        DLHeapNode(int stone, int l, int r) : stone(stone), heapInd(0), l(l), r(r), left(), right() {
        }
        bool operator<(const DLHeapNode &other) const {
            int smaller = l, larger = r;
            if (l > r) {
                swap(smaller, larger);
            }
            int otherSmaller = other.l, otherLarger = other.r;
            if (otherSmaller > otherLarger) {
                swap(otherSmaller, otherLarger);
            }

            // Min heap, use >
            if (smaller == otherSmaller) {
                return larger > otherLarger;
            } else {
                return smaller > otherSmaller;
            }
        }
    };

    struct PtrCmp {
        bool operator()(const shared_ptr<DLHeapNode>& lhs, const shared_ptr<DLHeapNode>& rhs) {
            return *lhs < *rhs;
        }
    };

    PtrCmp ptrCmp;

    vector<shared_ptr<DLHeapNode>> minHeap;

    void buildDoublyLinkedMinHeap(const vector<int>& stones, const vector<int>& diff, int n, int destination) {
        minHeap.clear();
        for (int i = 0; i < n; ++i) {
            minHeap.emplace_back(new DLHeapNode(stones[i], diff[i], diff[i + 1]));
        }
        for (int i = 1; i < n - 1; ++i) {
            minHeap[i]->left = minHeap[i - 1];
            minHeap[i]->right = minHeap[i + 1];
        }
        if (n > 1) {
            minHeap[0]->right = minHeap[1];
            minHeap[n - 1]->left = minHeap[n - 2];
        }

        make_heap(minHeap.begin(), minHeap.end(), ptrCmp);
        for (int i = 0; i < n; ++i) {
            minHeap[i]->heapInd = i;
        }
    }

    void minHeapSinkFromTop() {
        int N = minHeap.size();
        size_t current = 0, l = 1, r = 2;
        while (l < N) {
            size_t largest = current; // Raise the largest among the 3 node
            if (ptrCmp(minHeap[largest], minHeap[l])) largest = l;
            if (r < N && ptrCmp(minHeap[largest], minHeap[r])) largest = r;
            if (largest == current) break;
            swap(minHeap[largest], minHeap[current]);
            minHeap[largest]->heapInd = largest;
            minHeap[current]->heapInd = current;
            current = largest;
            l = 2 * current + 1;
            r = l + 1;
        }
    }

    void minHeapRaiseToTop(size_t ind) {
        while (ind != 0) {
            size_t p = (ind - 1) / 2;
            swap(minHeap[ind], minHeap[p]);
            minHeap[ind]->heapInd = ind;
            minHeap[p]->heapInd = p;
            ind = p;
        }
    }

    shared_ptr<DLHeapNode> minHeapPop() {
        // Pop min and update all changed indices
        swap(minHeap.front(), minHeap.back());
        minHeap[0]->heapInd = 0;
        shared_ptr<DLHeapNode> node = minHeap.back();
        minHeap.pop_back();
        minHeapSinkFromTop();
        return node;
    }

    void minHeapDelete(size_t ind) {
        minHeapRaiseToTop(ind);
        minHeapPop();
    }

    void minHeapInsert(shared_ptr<DLHeapNode> x) {
        minHeap.push_back(x);
        size_t ind = minHeap.size() - 1;
        x->heapInd = ind;
        while (ind != 0) {
            size_t p = (ind - 1) / 2;
            if (!ptrCmp(minHeap[p], minHeap[ind])) break;
            swap(minHeap[ind], minHeap[p]);
            minHeap[ind]->heapInd = ind;
            minHeap[p]->heapInd = p;
            ind = p;
        }
    }

   public:
    void maximizeMinimumInterval(vector<int> &stones, int m, int destination) {
        if (stones.empty()) return;
        int n = stones.size();
        vector<int> diff(n + 1);
        diff[0] = stones[0];
        diff[n] = destination - stones[n - 1];
        for (int i = 1; i < n; ++i) {
            diff[i] = stones[i] - stones[i - 1];
        }

        buildDoublyLinkedMinHeap(stones, diff, n, destination);

        for (int i = 0; i < m; ++i) {
            cout << "Min heap: ";
            for (const auto& ptr : minHeap) {
                cout << ptr->stone << " ";
            }
            cout << endl;
            shared_ptr<DLHeapNode> minNode = minHeapPop();
            cout << "Remove stone " << minNode->stone << endl;
            int mergedInterval = minNode->l + minNode->r;
            shared_ptr<DLHeapNode> left = minNode->left.lock(), right = minNode->right.lock();
            if (left) {
                minHeapDelete(left->heapInd);
                left->r = mergedInterval;
                left->right = right;
            }
            if (right) {
                minHeapDelete(right->heapInd);
                right->l = mergedInterval;
                right->left = left;
            }
            if (left) minHeapInsert(left);
            if (right) minHeapInsert(right);
        }

        stones.clear();
        for (const auto& ptr : minHeap) {
            stones.push_back(ptr->stone);
        }
        sort(stones.begin(), stones.end());
    }

    int minInterval() {
        if (minHeap.empty()) return -1;
        return min(minHeap[0]->l, minHeap[0]->r);
    }
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    // Input
    int destination = 100;
    vector<int> stones = {1, 2, 3, 50, 90, 95};
    int m = 4;

    cout << "m = " << m << endl;
    cout << "Initial stones:\n";
    for (int i : stones) {
        cout << i << " ";
    }
    cout << endl;

    Solution sol;
    sol.maximizeMinimumInterval(stones, m, destination);

    cout << "Final stones:\n";
    for (int i : stones) {
        cout << i << " ";
    }
    cout << endl;
    cout << "Final minimum interval: " << sol.minInterval() << endl;

    return 0;
}
