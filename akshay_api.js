const axios=require("axios");
const prompt=require("prompt-sync")();
axios.get("http://saral.navgurukul.org/api/courses").then((res)=>{
  let data=res.data.availableCourses;
  let list_id=[]
  let a=0;
  for (i of data){
    a++
    console.log(a,i.name)
    list_id.push(i.id)
  }
  console.log("wel-come select the course")
  let user =prompt('chouse course number:-')
  var course_id=list_id[user-1]
  axios.get("http://saral.navgurukul.org/api/courses/" + course_id + "/exercises").then((resp)=>{
    let exersize=resp.data.data
    let slug_list=[]
    let count=0
    for (j of exersize){
      count++
      console.log(count,j.name);
      for (k of j.childExercises){
        slug_list.push(k.slug)
        console.log(" ",count,k.name);
        count++
      }
      slug_list.push(j.slug)
    }
let user1= prompt('select the course number :- ')
var course_slug=slug_list[user1-1]
axios.get("http://saral.navgurukul.org/api/courses/"+course_id+"/exercise/getBySlug?slug="+course_slug).then((resp1)=>{
  console.log(resp1.data.content)
})

}).catch((err)=>{
  console.log(err.message);
})
})
