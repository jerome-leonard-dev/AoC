import sys
import re

# récupération de l'input ou du test
filename = "test-2"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open('./'+filename,'r')
lines = file.readlines();

total = 0
for line in lines:
    numbers = re.findall("([1-9]|one|two|three|four|five|six|seven|eight|nine)",line.strip())
    nb1 = numbers[0].replace("one","1").replace("two","2").replace("three","3").replace("four","4").replace("five","5").replace("six","6").replace("seven","7").replace("eight","8").replace("nine","9")
    nb2 = numbers[len(numbers)-1].replace("one","1").replace("two","2").replace("three","3").replace("four","4").replace("five","5").replace("six","6").replace("seven","7").replace("eight","8").replace("nine","9")
    print(line.strip()+"  : " +numbers[0]+numbers[len(numbers)-1] + "=>" +nb1+nb2)
    total += int(nb1+nb2)

print(total)