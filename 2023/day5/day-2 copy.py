import sys
import pathlib
import re

# récupération de l'input ou du test
filename = "test-1"
if len(sys.argv)>=2 :
    filename = sys.argv[1]

file = open(str(pathlib.Path(__file__).parent.resolve())+"/"+filename,'r')
lines = file.readlines();

def debug(string):
    string=string
#    print(string)

def trace(string):
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

def compute( map, start, end):
    intervals = []
    curInterval = {}
    value = start
    for trig in map:
        if value >= trig["start"] and value <= trig["end"]:
            curInterval["start"]=value+trig["trigger"]
            if end <= trig["end"]:
                curInterval["end"]=end+trig["trigger"]
            else:
                curInterval["end"]=trig["end"]
                value = trig["end"]+1
            intervals.append(curInterval)
    return intervals


def getMaped(seeds):
    output = 99999999999999999999
    for seed in seeds:
        output = min(output, getFinalValue(seed))
        
    #debug("minvalue: "+str(min(output)))
    return output

def getFinalValue(seed):
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
    return value

# Print iterations progress
def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end = printEnd)
    # Print New Line on Complete
    if iteration == total: 
        print()

curMap = ""
for y in range(len(tab)):
    line = str(tab[y])        
    if y>0:
        if line.endswith("map:"):
            curMap=line[:-5]
            maps[curMap]=[]
        elif re.match("^[0-9 ]+$", line):
            tline=list(map(int,line.split(" ")))
            maps[curMap].append({ "start": tline[1], "end":tline[1]+tline[2]-1, "trigger":tline[0]-tline[1]})

out = 999999999999999999999999
seeds = getSeeds(tab[0])
for i in range(int(len(seeds)/2)):
    filled = []
    trace("Seeds :" + str(seeds[2*i]) + " => " +str(seeds[2*i]+seeds[2*i+1]))
    printProgressBar(0, seeds[2*i+1], prefix = 'Progress:', suffix = 'Complete', length = 150)
    for j in range(seeds[2*i], seeds[2*i]+seeds[2*i+1]):
        printProgressBar(j-seeds[2*i], seeds[2*i+1], prefix = 'Progress:', suffix = 'Complete', length = 150)
        out=min(out, getFinalValue(j))
    printProgressBar(j-seeds[2*i]+1, seeds[2*i+1], prefix = 'Progress:', suffix = 'Complete', length = 150)
    trace("")
    trace("==>" + str(out))
trace(str(out))