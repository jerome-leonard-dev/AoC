import sys
import pathlib
import re

# récupération de l'input ou du test
filename = "test-2"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open(str(pathlib.Path(__file__).parent.resolve())+"/"+filename,'r')
lines = file.readlines();

def debug(string):
    string=string
    print(string)

tab=[]
seeds = []
maps = {}


for line in lines:
    line=line.strip()
    debug(line)
    tab.append(line)

def getSeeds(string):
    seeds = list(map(int,string[7:].split(" ")))
    debug("Seeds => "+ str(seeds))
    return seeds

seeds = getSeeds(tab[0])

curMap = ""
total = 0
for y in range(len(tab)):
    line = str(tab[y])        
    if y>0:
        if line.endswith("map:"):
            curMap=line[:-5]
            maps[curMap]=[]
        elif re.match("^[0-9 ]+$", line):
            tline=list(map(int,line.split(" ")))
            maps[curMap].append({ "start": tline[1], "end":tline[1]+tline[2]-1, "trigger":tline[0]-tline[1]})

output = []
for seed in seeds:
    debug("Seed : " + str(seed))
    value = seed
    for map in maps:
        debug( "    " + map)
        for trig in maps[map]:
            if value >= trig["start"] and value <= trig["end"]:
                value += trig["trigger"]
                debug("        "+str(trig))
                break
        debug("    =>"+ str(value))
    output.append(value)
    
debug("minvalue: "+str(min(output)))
                