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
	int id;
	int start, end;
};

bool cmp(Elem A, Elem B)
{
	return A.start < B.start;
}

int main()
{
	freopen("B.in", "r", stdin);
	freopen("B.out", "w", stdout);

	int T;
	scanf("%d", &T);

	for (int tcase = 1; tcase <= T; ++tcase)
	{
		printf("Case #%d: ", tcase);
		int Ac, Aj;
		cin >> Ac >> Aj;
		int tot0 = 0, tot1 = 0;
		vector<Elem> all_list;
		for (int i = 0; i < Ac; ++i)
		{
			int st, ed;
			cin >> st >> ed;
			Elem elem;
			elem.id = 0;
			elem.start = st;
			elem.end = ed;
			tot0 += ed - st;
			all_list.push_back(elem);
		}
		for (int i = 0; i < Aj; ++i)
		{
			int st, ed;
			cin >> st >> ed;
			Elem elem;
			elem.id = 1;
			elem.start = st;
			elem.end = ed;
			tot1 += ed - st;
			all_list.push_back(elem);
		}
		sort(all_list.begin(), all_list.end(), cmp);
		Elem elem = all_list[0];
		elem.start += 1440;
		elem.end += 1440;
		all_list.push_back(elem);

		int N = Ac + Aj;
		vector<int> gap0, gap1, gap_diff;
		int ans = 0;
		for (int i = 1; i <= N; ++i)
		{
			Elem &e0 = all_list[i - 1];
			Elem &e1 = all_list[i];
			int diff = e1.start - e0.end;
			if (e0.id != e1.id)
			{
				++ans;
				gap_diff.push_back(diff);
			}
			else
			{
				if (e0.id == 0)
				{
					tot0 += diff;
					gap0.push_back(diff);
				}
				else
				{
					tot1 += diff;
					gap1.push_back(diff);
				}
			}
		}
		int sum = 0;
		for (size_t i = 0; i < gap_diff.size(); ++i)
			sum += gap_diff[i];
		int diff1 = tot0 - tot1;
		if (diff1 < 0)
			diff1 = -diff1;
		if (sum >= diff1)
		{
			cout << ans << endl;
			continue;
		}
		if (tot0 < tot1)
			tot0 += sum;
		else
			tot1 += sum;
		sort(gap0.begin(), gap0.end(), greater<int>());
		sort(gap1.begin(), gap1.end(), greater<int>());

		int diff2 = tot0 - tot1;
		if (diff2 < 0)
			diff2 = -diff2;

		if (tot0 < tot1)
		{
			int sum = 0;
			for (size_t i = 0; i < gap1.size() && sum < diff2; ++i)
			{
				sum += gap1[i]*2;
				ans += 2;
			}
		}
		else
		{
			int sum = 0;
			for (size_t i = 0; i < gap0.size() && sum < diff2; ++i)
			{
				sum += gap0[i]*2;
				ans += 2;
			}
		}
		cout << ans << endl;
	}

	return 0;
}
