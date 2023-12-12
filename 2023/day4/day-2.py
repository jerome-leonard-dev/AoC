import sys
import pathlib
import math

# récupération de l'input ou du test
filename = "test-2"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open(str(pathlib.Path(__file__).parent.resolve())+"/"+filename,'r')
lines = file.readlines();

def debug(string):
    string=string
    print(string)

tab = []
cardCopyTab = []


for line in lines:
    line=line.strip()
    debug(line)
    tab.append(line)
    cardCopyTab.append(1)

#Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53

def getCardNumber(str):
    return str[:str.find(":")][str.find(" "):].strip()

def getWiningNumbers(str):
    return str[:str.find("|")][str.find(":")+1:].strip()

def getPlayingNumbers(str):
    return str[str.find("|")+1:].strip()

print(str(cardCopyTab))
total = 0
for y in range(len(tab)):
    cardMatch = 0
    for curNum in getPlayingNumbers(tab[y]).split(" "):
        if len(curNum) == 0:
            continue
        if (" "+curNum+" ") in " "+getWiningNumbers(tab[y])+" ":
            cardMatch+=1
    for i in range(cardMatch):
        cardCopyTab[y+i+1]+=cardCopyTab[y]
    debug( getCardNumber(tab[y]) + "==>" + getWiningNumbers(tab[y]) + "==>" + getPlayingNumbers(tab[y]) +" ====== " + str(cardMatch))
    print(str(cardCopyTab))


total = 0
for i in cardCopyTab:
    total += i

print(str(cardCopyTab))
print(total)