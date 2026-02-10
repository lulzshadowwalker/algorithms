#include <stdio.h>

int recurse(int n);
int fib(int n);
int iterativeFib(int n);
int tailRecurse(int n, int res);

int main()
{
    printf("iteration_and_recursion cpp\n");

    printf("=== Recursion\n");
    printf("recurse(5) = %d\n", recurse(5));

    printf("\n");

    printf("=== Tail Recursion\n");
    printf("tailRecurse(5) = %d\n", tailRecurse(5, 0));

    printf("\n");

    printf("fib(10) = %d\n", fib(10));
    printf("iterativeFib(10) = %d\n", iterativeFib(10));
    return 0;
}

// we sum going up/asc.
int recurse(int n)
{
    printf("[recurse] enter n=%d\n", n);

    if (n == 1)
    {
        printf("[recurse] base case reached, returning %d\n", n);
        return n;
    }

    int result = n + recurse(n - 1);

    // this runs while the stack is "unwinding" (coming back up)
    printf("[recurse] returning %d (n=%d + rest)\n", result, n);
    return result;
}

// we sum going down/desc.
//
// compiler "might" optimize it into something similar to iteration in terms of space complexity
// since we don't need the context going "back up".
int tailRecurse(int n, int res)
{
    printf("[tailRecurse] enter n=%d, res=%d\n", n, res);

    if (n == 0)
    {
        printf("[tailRecurse] base case reached, final result=%d\n", res);
        return res;
    }

    // note: no work happens AFTER the recursive call
    // all the state is carried forward in 'res'
    return tailRecurse(n - 1, n + res);
}

int fib(int n)
{
    if (n <= 1)
        return n;

    return fib(n - 1) + fib(n - 2);
}

int iterativeFib(int n)
{
    int curr = 0, next = 1;
    // [current: 0, next: 1]
    // [0, 1, 2]
    // [0, 1, 2, 3]
    // [0, 1, 2, 3, 5]
    // [0, 1, 2, 3, 5, ...]
    // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
    for (int i = 0; i < n; i++)
    {
        int temp = curr;
        curr = next;
        next = temp + next;
    }

    return curr;
}
