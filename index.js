import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const finals = fifaData.filter(game => game["Stage"] === "Final" && game["Year"] === 2014)[0];
console.log("task 1a: ", finals["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log("task 1b: ", finals["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log("task 1c: ", finals["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("task 1d: ", finals["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("task 1e: ", finals["Win conditions"].split(" ")[0]);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
  return data.filter(game => game["Stage"] === "Final");
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinalsCb) {
  let finals = getFinalsCb(array);
  return finals.map(game => game["Year"]);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, getFinalsCb) {
  let finals = getFinalsCb(array);
  return finals.map(game => {
    if (game["Home Team Goals"] > game["Away Team Goals"]){
      return game["Home Team Name"];
    } else {
      return game["Away Team Name"];
    }
  });
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getYearsCb, getWinnersCb) {
  let years = getYearsCb(array, getFinals);
  let winners = getWinnersCb(array, getFinals);
  let strings = [];
  for (let i = 0; i < years.length; i++){
    strings.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
  }
  return strings;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

// you got me pretty good with all that callback stuff.
function getAverageGoals(data) {
  let scoreSum = data.reduce((a,b)=> {
    return (a + b["Home Team Goals"] + b["Away Team Goals"]);
  },0);
  return (scoreSum / data.length).toFixed(2);
}

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  let finals = getFinals(data);
  let plays = finals.filter(game => {
    return (game["Home Team Initials"] === teamInitials) || (game["Away Team Initials"] === teamInitials);
  });
  let wins = plays.reduce((acc, game) => {
    if (game["Home Team Initials"] === teamInitials && game["Home Team Goals"] > game["Away Team Goals"]){
      return acc + 1;
    } else if (game["Away Team Initials"] === teamInitials && game["Away Team Goals"] > game["Home Team Goals"]){
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  return wins;
}

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
  let finals = getFinals(data);
  let plays = {};
  for (let game of finals){
    plays[game["Home Team Initials"]] = 0;
    plays[game["Away Team Initials"]] = 0;
  };
  let scores = {...plays};
  for (let game of finals){
    plays[game["Home Team Initials"]] += 1;
    scores[game["Home Team Initials"]] += game["Home Team Goals"];
    plays[game["Away Team Initials"]] += 1;
    scores[game["Away Team Initials"]] += game["Away Team Goals"];
  }
  let scoreAvgs = {...scores};
  for (let teamInitials of Object.keys(scores)){
    scoreAvgs[teamInitials] = scores[teamInitials] / plays[teamInitials];
  }
  let max = Object.keys(scoreAvgs).reduce(function(acc, currVal){
    if(scoreAvgs[currVal] > scoreAvgs[acc]){
      return currVal;
    } else {
      return acc;
    }
  });
  return [max, scoreAvgs[max]];
}

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
  let finals = getFinals(data);
  let plays = {};
  for (let game of finals){
    plays[game["Home Team Initials"]] = 0;
    plays[game["Away Team Initials"]] = 0;
  };
  let scores = {...plays};
  for (let game of finals){
    plays[game["Home Team Initials"]] += 1;
    // I literally copy pasted stretch 2 and swapped the += game["Away/Home"] parts below;
    scores[game["Home Team Initials"]] += game["Away Team Goals"];
    plays[game["Away Team Initials"]] += 1;
    scores[game["Away Team Initials"]] += game["Home Team Goals"];
  }
  let scoreAvgs = {...scores};
  for (let teamInitials of Object.keys(scores)){
    scoreAvgs[teamInitials] = scores[teamInitials] / plays[teamInitials];
  }
  let max = Object.keys(scoreAvgs).reduce(function(acc, currVal){
    if(scoreAvgs[currVal] > scoreAvgs[acc]){
      return currVal;
    } else {
      return acc;
    }
  });
  return [max, scoreAvgs[max]];
}

console.log(badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */

function getTeamAppearances(data, teamInitials){
  let finals = getFinals(data);
  return finals.reduce((acc, game) => {
    if (teamInitials === game["Home Team Initials"] || teamInitials === game["Away Team Initials"]){
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
