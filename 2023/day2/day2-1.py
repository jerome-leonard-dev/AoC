import sys
import pathlib
import math

# récupération de l'input ou du test
filename = "test-1"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open(str(pathlib.Path(__file__).parent.resolve())+"/"+filename,'r')
lines = file.readlines();

def debug(string):
    string=string
#    print(string)

#Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
def getGameNumber(str):
    number=str[:str.find(":")][4:]
    debug( "Partie : " + number)
    return int(number)

def getMaxByColor(color, string):
    #le debut sert a rien
    string = string[string.find(":")+1:].strip()
    maximum = 0
    for hand in string.split(";"):
        hand = hand.strip()
        for value in hand.split(","):
            value = value.strip()
            if value.endswith(color):
                count = int(value[:value.find(" ")].strip())
                maximum = max(maximum, count)
    debug( "max("+color+")="+str(maximum));
    return maximum

total = 0
for line in lines:
    line=line.strip()
    debug(line)
    gameNumber = getGameNumber(line)
    if getMaxByColor("blue", line)<=14 and getMaxByColor("green", line)<=13 and getMaxByColor("red", line)<=12:
        debug("OK pour la partie "+str(gameNumber))
        total += gameNumber

print(total)