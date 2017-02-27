# Realtime-News-Server

Server for [Realtime News Client](https://github.com/Lily418/Realtime-News-Client)

Parses BBC World News RSS feed then uses Stanford Named Entity Extraction to tag articles with entities they mention inserting new articles into RethinkDB database.

Another process listens to the changes feed and uses pusher to publish entities which have been mentioned in the last day.
