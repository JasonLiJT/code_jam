/*
Problem Set #2: Optional Theory Problems (Batch #1)
You are given as input an unsorted array of n distinct numbers, where n is a power of 2.
Give an algorithm that identifies the second-largest number in the array,
and that uses at most n + logn/log2 − 2 comparisons.
*/
#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>

using namespace std;

int size = 64;
int* arr = new int[size];

// Divide and conquer, keep track of the maximum number,
// and the numbers that have been compared with it
pair<int, vector<int> > getMaxAndNumbersComparedWithIt(const int* arr, int size) {
    if (size == 1) {
        return make_pair(arr[0], vector<int>());
    }
    int sizeL = size / 2, sizeR = size - sizeL;
    int* arrL = new int[sizeL];
    int* arrR = new int[sizeR];
    copy(arr, arr + sizeL, arrL);
    copy(arr + sizeL, arr + size, arrR);
    pair<int, vector<int> > left = getMaxAndNumbersComparedWithIt(arrL, sizeL),
                            right = getMaxAndNumbersComparedWithIt(arrR, sizeR);
    if (left.first >= right.first) {
        vector<int> ans(left.second);
        ans.push_back(right.first);
        return make_pair(left.first, ans);
    } else {
        vector<int> ans(right.second);
        ans.push_back(left.first);
        return make_pair(right.first, ans);
    }
}

int main() {
    cout << "Array to be inspected to find the second-largest element:\n";
    for (int i = 0; i < size; ++i) {
        arr[i] = 233 * tan(i);  // Some random integers
        cout << arr[i] << ' ';
    }
    cout << endl;
    cout << "--------------\n";
    pair<int, vector<int> > ans = getMaxAndNumbersComparedWithIt(arr, size);
    cout << "Max: " << ans.first << endl;
    cout << "Elements compared with it: " << endl;
    for (auto i : ans.second) {
        cout << i << ' ';
    }
    cout << endl;
    cout << "Therefore the second-largest is the largest of them: " << endl;
    cout << *max_element(ans.second.begin(), ans.second.end()) << endl;
}