#include <iostream>
#include <string>

using namespace std;
#define endl '\n'

int main() {
    string x, y;
    cin >> x >> y;
    long long Lx = x.length(), Ly = y.length();
    if (Lx < Ly) {
        // Make sure x is longer than y
        swap(x, y);
        swap(Lx, Ly);
    }
    
}