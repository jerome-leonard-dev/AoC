import sys
import re

# récupération de l'input ou du test
filename = "test-1"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open('./'+filename,'r')
lines = file.readlines();

total = 0
for line in lines:
    numbers = re.findall("[0-9]",line.strip())
    print(line.strip()+"  : " +numbers[0]+numbers[len(numbers)-1])
    total += int(numbers[0]+numbers[len(numbers)-1])

print(total)