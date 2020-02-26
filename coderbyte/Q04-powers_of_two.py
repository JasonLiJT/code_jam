def PowersofTwo(num):
  return 'true' if bin(num).count('1') == 1 else 'false'

# keep this function call here 
print(PowersofTwo(input()))