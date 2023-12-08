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

def checkTop(x,y):
    if y > 0 and tab[y-1][x]=="*":
        return x*1000+(y-1)
    return 0 

def checkBottom(x,y):
    if y < len(tab)-1 and tab[y+1][x]=="*":
        return x*1000+(y+1)
    return 0 

def checkTopLeft(x,y):
    if y > 0 and x > 0 and tab[y-1][x-1]=="*":
        return (x-1)*1000+(y-1)
    return 0 

def checkBottomLeft(x,y):
    if y < len(tab)-1 and x > 0 and tab[y+1][x-1]=="*":
        return (x-1)*1000+(y+1)
    return 0 

def checkLeft(x,y):
    if x > 0 and tab[y][x-1]=="*":
        return (x-1)*1000+(y)
    return 0 

def checkTopRight(x,y):
    if y > 0 and x < len(tab[0])-1 and tab[y-1][x+1]=="*":
        return (x+1)*1000+(y-1)
    return 0 

def checkBottomRight(x,y):
    if y < len(tab)-1 and x < len(tab[0])-1 and tab[y+1][x+1]=="*":
        return (x+1)*1000+(y+1)
    return 0 

def checkRight(x,y):
    if x < len(tab[0])-1 and tab[y][x+1]=="*":
        return (x+1)*1000+(y)
    return 0 


digits = ['1','2','3','4','5','6','7','8','9','0']
total = 0
curNumber = 0
curNumberOk = False
curNumberTabStars = []
tabStars={}
for y in range(len(tab)):
    #debug("Ligne "+str(y)+" => "+tab[y])
    for x in range(len(tab[y])):
        #debug("Colonne "+str(x)+" => "+tab[y][x])
        curCar=tab[y][x]
        if curCar in digits:
            if curNumber==0:
                curNumberTabStars.append( checkTopLeft(x,y))
                curNumberTabStars.append( checkLeft(x,y))
                curNumberTabStars.append( checkBottomLeft(x,y))
            curNumberTabStars.append( checkTop(x,y))
            curNumberTabStars.append( checkBottom(x,y))
            curNumber = curNumber*10+int(curCar)
        else:
            if curNumber>0:
                curNumberTabStars.append( checkTopRight(x-1,y))
                curNumberTabStars.append( checkRight(x-1,y))
                curNumberTabStars.append( checkBottomRight(x-1,y))
                for star in curNumberTabStars:
                    if star > 0:
                        if star not in tabStars:
                            tabStars[star]=[]
                        tabStars[star].append(curNumber)
            curNumber = 0
            curNumberTabStars=[]
    if curNumber>0:
        for star in curNumberTabStars:
            if star > 0:
                if star not in tabStars:
                    tabStars[star]=[]
                tabStars[star].append(curNumber)
    curNumber = 0
    curNumberTabStars=[]

for star in tabStars:
    if len(tabStars[star])==2:
        total+= tabStars[star][0]*tabStars[star][1]

print(total)