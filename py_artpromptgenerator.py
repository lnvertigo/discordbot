# read file
# convert into json format
# write json file

import os
import json

cwd = os.getcwd()
outfile = open("_myfile.json", "w")

export_dict = {}

subjects = []
with open(cwd + "/prompts/nouns/subject.txt") as subjects_file:
	for line in subjects_file:
		word = line.strip()
		subjects.append(word)

verbs = []
with open(cwd + "/prompts/verb.txt") as verb_file:
	for line in verb_file:
		word = line.strip()
		verbs.append(word)

# subjects_json = ','.join(subjects)
# verbs_json = ','.join(verbs)

export_dict['subjects'] = subjects
export_dict['verbs'] = verbs

# print(export_dict)
json.dump(export_dict, outfile, indent=4)

outfile.close()
# {subjects: {a,b,c,d,...}}