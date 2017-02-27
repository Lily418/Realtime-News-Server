#!/bin/sh

# This file exists to start the stanford named entity recognition server running, it is taken from https://github.com/niksrc/ner
# but with the port updated to avoid a conflict with RethinkDB's admin console

# Put this in the directory in which you extracted the STANFORD NER package.

scriptdir=`dirname $0`

# Configure classifiers and port to your need

java -mx1000m -cp "$scriptdir/stanford-ner.jar:$scriptdir/lib/*" edu.stanford.nlp.ie.NERServer  -loadClassifier $scriptdir/classifiers/english.muc.7class.distsim.crf.ser.gz -port 9000 -outputFormat inlineXML
