const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app =express();

app.use(express.static("public"));  //if we will not specify it our bootstrap got disappear and img also hence make public folder and give it static
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/signup.html")
});

app.post("/" ,function(req,res){

  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  const data={
    members:[

      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME:lastname
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/01ccb03485"

  const options={
    method:"POST",
    auth:"rajanr21:0b4badb695f60351fc1e23d4f8e21918-us83"
  }
const request = https.request(url,options,function(response)
{
if(response.statusCode===200){
  res.sendFile(__dirname + "/success.html");
}
else {
  res.sendFile(__dirname + "/failure.html");
}
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
  request.write(jsonData);
  request.end();
//  console.log(firstname);
})

app.post("/failure",function(req,res){

  res.redirect("/");
})
app.listen(process.env.port || 3000,function(){

console.log("running");

});



//0b4badb695f60351fc1e23d4f8e21918-us8

//01ccb03485
