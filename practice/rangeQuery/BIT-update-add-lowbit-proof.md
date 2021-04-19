# Definition

Binary Indexed Tree (BIT), a.k.a. the Fenwick Tree, is a tree data structure implemented by a 1-based indexed array `BIT` to calculate cumulative sum (prefix sum) of an array `arr` in `O(logN)` time and `O(N+1)` space.

To define a BIT, we first define the `lowbit` function. For any positive index `i`, define `lowbit(i)` to be `i`'s last set bit, i.e. the integer whose binary representation is the lowest (least significant) set bit of `i` and the zeros after it. For example, `lowbit(0b10100) = 0b100`. `lowbit` can be implemented as `lowbit(i) = i & (-i)`, using 2's complement.

`BIT[i]` stores the sum of `lowbit(i)` elements in the range `(i - lowbit(i), i]` of the original `arr`. Another way of understanding `BIT` is that in the binary tree `BIT` represents, the `BIT[i]` node sums `arr[i]` and `arr` elements whose indices are in its left subtree, visualized below.

Example for a length 8 array:

```
BIT[] as a binary tree:
           ______________*
           ______*
           __*     __*
           *   *   *   *
indices: 0 1 2 3 4 5 6 7 8

Fenwick simply said that the responsibility range of every node in the interrogation tree would be according to its last set bit.
E.g. as the last set bit of 6==00110 is a "2-bit" it will be responsible for a range of 2 nodes. For 12==01100, it is a "4-bit", so it will be responsible for a range of 4 nodes.
```

# Calculate prefix sum given `BIT`
This is trivial:
```c++
int prefixSum(int i) {  // Sums indices [1, i] inclusive
  int sum = 0;
  while (i > 0) {
    sum += BIT[i];  // Responsible for (i - lowbit(i), i]
    i -= (i & -i);  // Next i' = i - lowbit(i), responsible for (i' - lowbit(i'), i - lowbit(i)], which is immediate neighbour to the previous range
  }
  return sum;
}
```


# Update `BIT` to reflect a modified `arr[i]`

https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees

Proposed implementation:
```c++
void update(int i, int val) {
  int diff = val - arr[i];
  arr[i] = val;
  while (i <= MaxIdx) {
    BIT[i] += diff;
    i += (i & -i);  // <- why does adding lowbit(i) give the next smallest index that is responsible for the modified index?
  }
}
```

But why does `i + lowbit(i)` give the next BIT node to update?

---
## Proposed proof

Let's say `arr[i]` is updated, and we want to update `BIT` starting at `BIT[i]`.

By definition, it's obvious that `BIT[i]` is the smallest index responsible for `arr[i]`, because each BIT node `j` is only responsible for a subset of `indices <= j`.

## Step 1: correctness of the 1st iteration
After updating `BIT[i]`, we need to to find the next index `j` responsible for `arr[i]`. In other words, `j` has to be the smallest `j` that satisfies: a) `j > i`; b) `BIT[j]` includes `arr[i]`.

Now we prove that `j = i + lowbit(i)`.

1. First we prove the minimality. Apparently, adding any `d` smaller than `lowbit(i)` will make `i` outside the responsibility range of `j`. This is because the responsibility range of `j` is `(j - lowbit(j), j]`, and `lowbit(j) = lowbit(i + d) = lowbit(d) <= d = j - i` tells us that `j - lowbit(j) >= i`.

2. Then we prove `BIT[j]` includes `arr[i]`.

    By definition of `lowbit`:
    ```
    lowbit(j) = lowbit(i + lowbit(i)) > lowbit(i) = j - i
    ```

    Hence `i > j - lowbit(j)`, and we have `j - lowbit(j) < i < j`.

    By definition, `arr[i]` is in the responsibility range of `BIT[j]`, which is `(j - lowbit(j), j]`.

1 and 2 prove that `j = i + lowbit(i)` is the second `BIT` node to update after `arr[i]` is changed.

## Step 2: correctness of the 2nd iteration and beyond
We need to prove Theorem A:

**Theorem A**
- The `BIT` node for `k = j + lowbit(j)` and the iterations beyond are all responsible for the initial `arr[i]`.

We will prove a stronger version of Theorem A, which is surprisingly easier to prove:

**Theorem B**
- Let `i_n` be the index in the n-th iteration, e.g. `j = i + lowbit(i) = i_1`, then
  - The responsibility range of `BIT[i_n+1]` contains the responsibility range of `BIT[i_n]` for any `n >= 1`.
  - By induction, `BIT[i_n]` is responsible for all `arr` elements in `(i - lowbit(i), i_n]`.

Proof: consider the binary representation of `i_n`. There are only two cases:

a. the bit on the left of the last set bit of `i_n` is `0`;
  - ```
    For example: 0b...0100
                      |^-- last set bit
                      |
                      --- 0 on the left of the last set bit
    ```

b. the last set bit of `i_n` is the end of `m` consecutive `1`s, `m >= 2`.
  - ```
    For example: 0b...0111100
                       |||^-- last set bit
                       |||
                       |||
                       ---- (m - 1) consecutive `1`s on the left of the last set bit. m = 4 in this case.
    ```

Now we prove Theorem B in both cases.

### Case a
By definition, `i_n+1 = i_n + lowbit(i_n)`.

Note that `lowbit(i_n+1) = lowbit(i_n) << 1`, i.e. shift left once.

Therefore, `i_n+1 - lowbit(i_n+1) = i_n - lowbit(i_n)`.

Hence, `(i_n+1 - lowbit(i_n+1), i_n+1]` contains `(i_n - lowbit(i_n), i_n]`, and their left boundry is the same.

### Case b
By definition, `i_n+1 = i_n + lowbit(i_n)`.

Note that `lowbit(i_n+1) = lowbit(i_n) << m`, i.e. shift left `m` times, where `m` is the number of consecutive `1`s including the last set bit.

Hence, `i_n+1 - lowbit(i_n+1)` clears the last `m` (consecutive) set bits of `i_n`.

Note that `i_n - lowbit(i_n)` only clears the last set bit of `i_n`.

Therefore, `i_n+1 - lowbit(i_n+1) < i_n - lowbit(i_n)`.

Hence, `(i_n+1 - lowbit(i_n+1), i_n+1]` contains `(i_n - lowbit(i_n), i_n]`, and extends its left boundary compared to the latter.

Case a and b prove Theorem B, which proves Theorem A.

Hence, `i + lowbit(i)` gives the next `BIT[i]` to update in every iteration.

Q.E.D.