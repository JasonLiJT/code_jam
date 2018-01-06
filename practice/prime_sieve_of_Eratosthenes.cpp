#include <cstdio>
#include <cmath>

using namespace std;

void print_prime();
void prime_factorization();

int main() {
	printf("Enter 1 to generate prime numbers, 2 to factorize an integer:\n");
	int response;
	scanf("%d%*c", &response);
	while (response != 1 && response != 2) {
		printf("Invalid input! Please try again:");
		scanf("%d%*c", &response);
	}
	response == 1 ? print_prime() : prime_factorization();
}

void print_prime() {
	printf("Generate the prime numbers up to N using sieve of Eratosthenes.\nPlease enter N:");
	long long N;
	scanf("%lld", &N);

	bool* not_prime = new bool[N + 1]();
	// The parenthesis initializes the dynamic array to 0

	// freopen("primes_to_1e5.txt", "w", stdout);

	for (long long i = 2; i <= N; ++i) {
		if (not_prime[i]) continue;
		printf("%d ", i);
		for (long long j = 1; j * i <= N; ++j) {
			not_prime[j * i] = true;
		}
	}

	printf("\n");

	delete[] not_prime;

}

void prime_factorization() {
	printf("Factorize N using sieve of Eratosthenes.\nPlease enter N:");
	long long N;
	scanf("%lld", &N);

	if (N == 1) {
		printf("1\n");
		return;
	}

	long long upper = floor(sqrt(N)) + 1; // + 1 to avoid floating point error of sqrt(N)

	// bool not_prime[1000000] = {false};
	// long long factors[1000000] = {0};
	bool* not_prime = new bool[upper + 1]();
	long long* factors = new long long[upper + 1]();
	// The parenthesis initializes the dynamic array to 0

	// Check initialization
	// for (long long i = 0; i < upper; ++i) {
	// 	printf("%d/%d ", not_prime[i], factors[i]);
	// }
	// printf("\n");

	for (long long i = 2; i <= upper; ++i) {
		if (not_prime[i] || N%i != 0) continue;
		while (N % i == 0) {
			factors[i]++;
			N /= i;
		}
		for (long long j = 1; j * i <= upper; ++j) {
			not_prime[j * i] = true;
		}
	}

	for (long long i = 2; i <= upper; ++i) {
		if (factors[i] != 0) {
			printf("%lld^%lld\n", i, factors[i]);
		}
	}

	if (N != 1) printf("%d^1\n", N); // N is a prime

	delete[] not_prime;
	delete[] factors;
}