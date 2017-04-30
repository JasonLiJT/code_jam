#include <iostream>
#include <fstream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <algorithm>
#include <vector>
using namespace std;

struct Elem
{
	double bottom;
	double lateral;
};

bool cmp(Elem A, Elem B)
{
	return A.lateral > B.lateral;
}

const double pi = 3.1415926535897932384626;

int main()
{
	freopen("A.in", "r", stdin);
	freopen("A.out", "w", stdout);

	int T;
	scanf("%d", &T);

	for (int tcase = 1; tcase <= T; ++tcase)
	{
		printf("Case #%d: ", tcase);
		int N, K;
		cin >> N >> K;
		vector<Elem> lst;
		double max_ans = 0;
		for (int i = 0; i < N; ++i)
		{
			int R, H;
			cin >> R >> H;
			Elem elem;
			elem.bottom = (pi*R)*R;
			elem.lateral = (2.0*pi*R)*H;
			lst.push_back(elem);
		}
		sort(lst.begin(), lst.end(), cmp);
		
		for (int k = 0; k < N; ++k)
		{
			double cur_ans = lst[k].bottom + lst[k].lateral;
			int cnt = 0;
			for (int i = 0; i < N && cnt < K - 1; ++i)
				if (i != k && lst[i].bottom <= lst[k].bottom)
				{
					cur_ans += lst[i].lateral;
					++cnt;
				}
			if (cnt == K - 1 && max_ans < cur_ans)
				max_ans = cur_ans;
		}
		printf("%.8f\n", max_ans);
	}

	return 0;
}
