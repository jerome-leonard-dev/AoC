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
    print(string)

tab = []

def isPartNumber(x,y):
    #topleft
    if x>0 and y>0:
        if tab[y-1][x-1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #top
    if y>0:
        if tab[y-1][x] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #topright
    if x<len(tab[0])-1 and y>0:
        if tab[y-1][x+1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #left
    if x>0:
        if tab[y][x-1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #right
    if x<len(tab[0])-1:
        if tab[y][x+1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #bottomleft
    if x>0 and y<len(tab)-1:
        if tab[y+1][x-1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #bottom
    if y<len(tab)-1:
        if tab[y+1][x] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    #bottomright
    if x<len(tab[0])-1 and y<len(tab)-1:
        if tab[y+1][x+1] not in ['.','1','2','3','4','5','6','7','8','9','0']:
            return True
    return False


for line in lines:
    line=line.strip()
    debug(line)
    tab.append(line)

total = 0
curNumber = 0
curNumberOk = False
for y in range(len(tab)):
    #debug("Ligne "+str(y)+" => "+tab[y])
    for x in range(len(tab[y])):
        #debug("Colonne "+str(x)+" => "+tab[y][x])
        curCar=tab[y][x]
        if curCar in ['1','2','3','4','5','6','7','8','9','0']:
            curNumber = curNumber*10+int(curCar)
            if isPartNumber(x,y):
                curNumberOk=True
        else:
            if curNumberOk:
                total += curNumber
            elif curNumber>0:
                debug("Ignore ["+str(x)+","+str(y)+"]"+str(curNumber))
            curNumber = 0
            curNumberOk = False
    total += curNumber
    curNumber = 0
    curNumberOk = False

print(total)