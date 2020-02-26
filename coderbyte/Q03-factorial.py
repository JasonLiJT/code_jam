def FirstFactorial(num):
  ans = 1
  while num > 1:
    ans *= num
    num -= 1
  return ans

# keep this function call here 
print FirstFactorial(input())