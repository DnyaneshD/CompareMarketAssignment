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



