sudo apt-get install -y software-properties-common python-software-properties curl unzip
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update 
sudo apt-get install -y openjdk-8-jdk

source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y rethinkdb

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

wget http://nlp.stanford.edu/software/stanford-ner-2016-10-31.zip
unzip stanford-ner-2016-10-31.zip || true
sudo wget https://raw.githubusercontent.com/Lily418/Realtime-News-Server/master/ner-server.sh -O stanford-ner-2016-10-31/ner-server.sh
sudo chmod +x stanford-ner-2016-10-31/ner-server.sh 

sudo mv /home/vagrant/env.sh /etc/profile.d/
