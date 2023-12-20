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
    print(string)

def trace(string):
    string=string
    print(string)

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

def computeMapSeed( map, seed):
    debug("compute("+str(map)+","+str(seed)+")")
    result = []
    intervals = []
    intervals.append(seed)
    for trig in map:
        intervals2=[]
        for interval in intervals:
            res = intersect(interval, {"start":trig["start"],"end":trig["end"]})
            #traitement des resultats
            intervals2.extend(res["out"])
            for int in res["in"]:
                result.append({"start":int["start"]+trig["trigger"],"end":int["end"]+trig["trigger"]})   
        intervals=intervals2
    debug("in=>"+str(result))
    debug("out=>"+str(intervals))
    result.extend(intervals)    
    return result

def intersect(seed, map):
    debug("intersect("+str(seed)+","+str(map)+")")
    res = {"in":[],"out":[]}
    if seed["start"]>map["end"] or seed["end"]<map["start"]:
        res["out"].append(seed);
    elif seed["start"]>=map["start"] and seed["end"]<=map["end"]:
        res["in"].append(seed)
    elif seed["start"]<map["start"] and seed["end"]<map["end"]:
        res["in"].append({"start":map["start"],"end":seed["end"]})
        res["out"].append({"start":seed["start"],"end":map["start"]-1})
    elif seed["start"]>=map["start"] and seed["end"]>map["end"]:
        res["in"].append({"start":seed["start"],"end":map["end"]})
        res["out"].append({"start":map["end"]+1,"end":seed["end"]})
    return res

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
intervals = []
for i in range(int(len(seeds)/2)):
    intervals.append({"start":seeds[2*i],"end":seeds[2*i]+seeds[2*i+1]})

debug("intervals:"+str(intervals))
for map in maps:
    debug(map+" : " +str(maps[map]))

debug("")
debug("COMPUTE")
debug("")

progress = 0
#printProgressBar(progress, len(intervals)+len(maps), prefix = 'Progress:', suffix = 'Complete', length = 150)
results=[]
for interval in intervals:
    debug("Seed:"+str(interval))
    mapInts = [interval]
    for map in maps:
        debug(str(map))
        mapTmp=[]
        #printProgressBar(++progress, len(intervals)+len(maps), prefix = 'Progress:', suffix = 'Complete', length = 150)
        for mapInt in mapInts:
            mapTmp.extend(computeMapSeed(maps[map], mapInt))
        mapInts = mapTmp
    results.extend(mapInts)
debug(str(results))        
for val in results:
    if val["start"] < out:
        out = val["start"]
        
trace(str(out))