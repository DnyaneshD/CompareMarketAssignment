# CompareMarketAssignment

This is a solution for following problem give to me during las communication with HR team.

Given a book in a text file (http://www.loyalbooks.com/download/text/Railway-Children-by-E-Nesbit.txt for example)

1.	Write an application that outputs the individual words that appear in the book, and how many times that word appears in the text file.
2.	The second part is to also output whether the number of times each word appears is a prime number.

# About Solution

To be very honest there are multiple ways to slove given problem but I chose below keeping following things in mind.
1. Scalability of the application
2. Technical stack matching to the current usage of technologies used in your organisation

High level solution: I have used 3 layas to slove the problem.
1. Client - To accepet URI from user and show output to the user
2. API - An application which will interact with Client and process the output
3. Service - A service which have only one resposiblity to process the words from give uri

# To Run solution

Requirements: 
 1. Node version 9.0.0 or higher is required
 2. Kafka set up is required (I followed https://dzone.com/articles/running-apache-kafka-on-windows-os . I assume dev tem would already have it)
3. I have also used Redis and Mongo but no set up is required

Note: If kafka setup is not available and dev team do not want to do the set up for to test this application, I will set up app with https://www.cloudkarafka.com/plans.html but, I will need at least 1 more day to do so.

Steps:
1. Download or clone this folder (https://github.com/DnyaneshD/CompareMarketAssignment)
2. 'npm i' in 3 folders
3. After npm install
  i. Run BookReaderService first by hitting 'npm run dev' on terminal or VS code
  ii. Now run BookReaderApi by hitting 'npm run dev' on terminal or VS code
  iii. At this stage Client can be started with help of 'npm start' on terminal
  
 Here if all the service are started correctly then URI can be put on client text area and out should be visible on Client after finishing the operation.



