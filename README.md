## Design idea

Based on Controller -> Service -> Repository design pattern, and add dependency injection to these 3 levels. It is to decouple each layers and make the unit test easier.

routes is designed for supporting multiple versions, can be easily extended.

package typedi is used for dependency injection.
package typeorm is used for database ORM.

## How to run

run server:
npm run dev

run unit test:
npm run test

(due to limited time, only 1 unit test for service is created)

## Tests

Only one endpoint is created

endpoint: http://localhost:8000/api/v1/company

http method: POST

Test data:

1. Basic select by fields, can define fields needed only
   request body:
   {
   "select": ["name","unique_symbol", "total"]
   }
2. filter by score, the filter score is an array for the scores, not a range
   request body:
   {
   "select": ["name","unique_symbol", "total"],
   "score": [15,18,20]
   }

   filter by symbol
   {
   "select": ["name","unique_symbol", "total"],
   "symbol": ["NYSE:PFE"]
   }
3. Sort by score
   request body:
   {
   "select": ["name","unique_symbol", "total"],
   "score": [15,18,20],
   "sortBy": [["total", "DESC"]]
   }
4. Pagination
   Request body
   {
   "select": ["name","unique_symbol", "total"],
   "limit": 3,
   "offset": 0
   }

## Some limitations

1. This endpoint doesn't implement the sort by volatility feature in the backend, so will need to implement this feature in the frontend, other wise will need to create a complex SQL query in the backend.
2. Don't rename the database field, e.g. 'total' is the overall score, may be confusing.
3. SQLite doesn't provide built-in function to calculate volatility, thus create a raw query to do the calculation.
