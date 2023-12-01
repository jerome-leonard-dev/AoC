import sys
import pathlib

# récupération de l'input ou du test
filename = "test-2"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open(str(pathlib.Path(__file__).parent.resolve())+"/"+filename,'r')
lines = file.readlines();

digits = ["1","2","3","4","5","6","7","8","9","one","two","three","four","five","six","seven","eight","nine"]

def getFirstDigitIn(line):
    position = 99999
    result = ""
    for digit in digits:
        digitPosition = line.find(digit)
        if digitPosition>=0 and digitPosition<position:
            position = digitPosition
            result=digit
    return result

def getLastDigitIn(line):
    position = -1
    result = ""
    for digit in digits:
        digitPosition = line.rfind(digit)
        if digitPosition>=0 and digitPosition>position:
            position = digitPosition
            result=digit
    return result

total = 0
for line in lines:
    numbers =  [getFirstDigitIn(line),getLastDigitIn(line)]
    nb1 = numbers[0].replace("one","1").replace("two","2").replace("three","3").replace("four","4").replace("five","5").replace("six","6").replace("seven","7").replace("eight","8").replace("nine","9")
    nb2 = numbers[len(numbers)-1].replace("one","1").replace("two","2").replace("three","3").replace("four","4").replace("five","5").replace("six","6").replace("seven","7").replace("eight","8").replace("nine","9")
    print(line.strip()+"  : " +numbers[0]+numbers[len(numbers)-1] + "=>" +nb1+nb2 )#+ "  " +str(numbers))
    total += int(nb1+nb2)

print(total)