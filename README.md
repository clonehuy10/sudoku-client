# Sudoku
  This website allows users to play sudoku, a puzzle in which missing numbers are to be filled into a 9 by 9 grid of squares which are subdivided into 3 by 3 boxes so that every row, every column, and every box contains the numbers 1 through 9.

  You can get access to it by the link below:
  ```
  https://clonehuy10.github.io/sudoku-client/#/
  ```

## API
-  [API repository](https://github.com/clonehuy10/sudoku-api)
-  [Heroku deployed link](https://sei-sudoku-api.herokuapp.com)

## Technologies Used
- React Hooks
- HTML
- CSS
- Javascript
- Axios

## Technical Description

#### Account Path
- Users are able to create new accounts to login.
- Users are able to sign in with their accounts.
- Users are able to change password or sign out after signing in.

#### Game Path
- Users are able to play the game.
- Users are able to view their playing time.
- Users are able to check their solution when there is no empty cell on the puzzle.
- Users are able to view their game history.
- Users are able to keep playing on unfinished games.
- Users are able to delete the games on viewing game history.

## Development process
Coming up with this project is inspired by Tic Tac Toe game. I only have a few days to work on this project before submitting it to course instructor, so that I thought Sudoku or Minesweeper would be something I could do in the limited amount of time, and it is also challenging.\
\
My first step to the project is to create the front-end part for the authentication because I am sure that I can get it done perfectly. The reason is that I want to make sure I can make connection between front end and back end, and I can get the authentication out of my way.\
\
Making this sudoku project is actually not difficult. Its hardest point is the logic of building a playable table basing on the rules of sudoku. Luckily for me npm has a package that creates tables with solutions. I have used it to create sudoku tables, so every time users enter the game, they will experience a different table. The rest is to convert the array I get from the npm library into something that I use to draw the game table on the screen and save the information on the api.

## Wireframe
![](https://media.git.generalassemb.ly/user/30416/files/724dcf00-1834-11eb-94d6-b77763f3ba00)

## Unsolved Problems
- I want to add more features for users like sorting or filtering list of games in history.
- I want to add a ranking system so that users can interact with each others.
- I want to add a chat room in home page so that users can communicate with each others.
- I want to add tic-tac-toe and minesweeper so that users can have more game to choose from.

## Contributing
If you would like to fork this repo and add more to it, you will need to run these commands to get verything set up:
```
$ git clone git@github.com:clonehuy10/sudoku-client.git
$ cd sudoku-client
$ npm install
```
