import Day from "./days/entity";
import Recipe from "./recipes/entity";

export async function createDay (planner, date, increment, user) {

  const day = new Day
 // check if this planner already has a day with current Date
 const checkingDay = await Day.findOne(
   {where :
  { day :`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+increment}` ,
    planner : user.planner
  }
  })

   if(!checkingDay) {
    day.planner = planner
    day.day = new Date()
    day.day.setDate( date.getDate() + increment )
     await day.save()
   }

  else { console.log('DAY ALREADY EXIST')}
}



export async function randomRecipe (recipList) {
  const randomRecipe = recipList[Math.floor(Math.random()*recipList.length)]
  return randomRecipe
}