#include <iostream>
#include <fstream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <algorithm>
using namespace std;

int main()
{
	freopen("C.in", "r", stdin);
	freopen("C.out", "w", stdout);

	int T;
	scanf("%d", &T);

	for (int tcase = 1; tcase <= T; ++tcase)
	{
		printf("Case #%d: ", tcase);
		int N, K;
		cin >> N >> K;
		double U;
		cin >> U;
		double P[100];
		for (int i = 0; i < N; ++i)
			cin >> P[i];
		P[N] = 1.0;
		sort(P, P + N);
		int k;
		double prefix_sum = P[0];
		for (k = 1; k <= N; ++k)
		{
			double avg = (prefix_sum + U)/k;
			if (avg <= P[k])
			{
				for (int i = 0; i < k; ++i)
					P[i] = avg;
				break;
			}
			prefix_sum += P[k];
		}
		double ans = 1.0;
		for (int i = 0; i < N; ++i)
			ans *= P[i];
		printf("%.7f\n", ans);
			
	}

	return 0;
}
