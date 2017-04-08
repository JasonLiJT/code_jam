#include <iostream>
#include <algorithm>
#include <deque>

using namespace std;
#define endl '\n'

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int T;
    cin >> T;
    for (int i = 0; i < T; ++i) {
        long long N, K;
        deque<long long> vacancies;
        cin >> N >> K;
        vacancies.push_back(N);
        K--;
        while (K--){
            long long len = vacancies.size(), last = vacancies[len - 1];
            if (last == 1) {
                vacancies.pop_back();
            } else if (last == 2) {
                vacancies.pop_back();
                vacancies.push_front(1);
            }else {
                long long a = (last - 1) / 2, b = last - 1 - a;
                vacancies.pop_back();
                vacancies.push_front(b);
                vacancies.push_front(a);
            }
            if (last % 2 == 0 && vacancies[len - 2] % 2 == 1) {
                // clog << endl << "SORTTTTTTTT" << endl;
                sort(vacancies.begin(), vacancies.end());
            }
            // for (std::deque<long long>::iterator ll = vacancies.begin(); ll != vacancies.end(); ++ll) {
            //     clog << *ll << " ";
            // } clog << endl;
        }
        long long last = vacancies.back();
        long long a = (last - 1) / 2, b = last - 1 - a;
        cout << "Case #" << i + 1 << ": " << b << " " << a << endl;
    }
}
