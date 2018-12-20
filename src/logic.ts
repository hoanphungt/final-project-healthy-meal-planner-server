import Day from "./days/entity";
import  Recipe from "./recipes/entity";

function randomRecipe (recipList : Recipe[]) {
  const index = Math.floor(Math.random()*recipList.length)
  const randomRecipe = recipList[index]
  recipList.splice(index, 1);
  console.log(recipList)
  return randomRecipe
}

export async function createDay (planner, today, increment, user,recipList) {
const date = new Date(today)
const day = new Day
 // check if this planner already has a day with current Date
 date.setDate(date.getDate()+increment)
 const checkingDay = await Day.findOne(
   {where :
  {day :`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ,
   planner : user.planner
  }
  })

   if(!checkingDay) {
    day.planner = planner
    day.day = new Date
    
    day.day.setDate( date.getDate())
    day.day.setMonth( date.getMonth())
    day.day.setFullYear(date.getFullYear())

    day.recipe =  randomRecipe(recipList)

    await day.save()
   }
  else { console.log('DAY ALREADY EXIST')}
}



