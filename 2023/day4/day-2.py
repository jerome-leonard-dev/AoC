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
    #print(string)

digits=['1','2','3','4','5','6','7','8','9','0']
tab = []
for line in lines:
    line=line.strip()
    debug(line)
    tab.append(line)

def debug(string):
    string=string
    print(string)



total = 0
curNumber = 0
for y in range(len(tab)):
    #debug("Ligne "+str(y)+" => "+tab[y])
    for x in range(len(tab[y])):
        #debug("Colonne "+str(x)+" => "+tab[y][x])
        curCar=tab[y][x]
        if curCar == "*":
            print("*")
print(total)