# myInvestor
Stock market data analytics using Scala, Kafka, Akka Apache Spark and Cassandra.


## How to run
```
sbt "project app" "runMain com.myinvestor.MyInvestorApp"
sbt "project client" "runMain com.myinvestor.SchedulerApp"
```

## Links referenced
* https://spark.apache.org/docs/1.2.0/job-scheduling.html
* http://doc.akka.io/docs/akka/current/java/scheduler.html
* https://github.com/enragedginger/akka-quartz-scheduler
* https://github.com/bfil/scalescrape
* https://github.com/ruippeixotog/scala-scraper
* https://github.com/Foat/articles/tree/master/akka-web-crawler
* http://stackoverflow.com/questions/21600297/how-to-execute-tests-in-a-single-project-only-in-multi-module-build
* https://github.com/sap1ens/scraper/blob/master/src/main/scala/com/sap1ens/scraper/PageParser.scala
* http://foat.me/articles/crawling-with-akka/

