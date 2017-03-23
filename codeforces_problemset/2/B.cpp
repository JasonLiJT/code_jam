#include <iostream>
#include <cmath>

using namespace std;
#define endl '\n'

struct Matrix {
    bool zero;
    int twos;
    int fives;
} mat[1000][1000];

bool has_zero = false;
int zero_x = 0, zero_y = 0;

void read(int n, Matrix mat[][1000]) {
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            int num, twos = 0, fives = 0;
            cin >> num;
            if (num == 0) {
                mat[i][j].zero = true;
                has_zero = true;
                zero_x = i; zero_y = j;
            } else {
                mat[i][j].zero = false;
                while (num % 2 == 0) {
                    num /= 2;
                    ++twos;
                }
                while (num % 5 == 0) {
                    num /= 5;
                    ++fives;
                }
            }
            mat[i][j].twos = twos;
            mat[i][j].fives = fives;
        }
    }
}

void show(int n, Matrix mat[][1000]) {
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cout << mat[i][j].zero << ':' << mat[i][j].twos << '/' << mat[i][j].fives << ' ';
        }
        cout << endl;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n; // [2, 1000]

    int i=0, j=0;
    read(n, mat);
    show(n, mat);

}