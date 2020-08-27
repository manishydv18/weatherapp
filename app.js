const express=require("express");
const https=require("https");
const q=require("body-parser");
const app=express();
app.use(q.urlencoded({extended:true}));

app.get("/",fun1)
function fun1(req,res)
{
    res.sendFile(__dirname +"/index.html");

}

app.post("/",fun2)
function fun2(req,res)
{
    const query=req.body.cityname;
    const apikey="3144c58b90ed1e78371fb02613509dbb";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

    https.get(url,fun3)
    function fun3(response)
    {
        response.on("data",function(data){
            const weatherdata =JSON.parse(data);
            const weatherdescription =weatherdata.weather[0].description;
            const temp=weatherdata.main.temp;
            const icon =weatherdata.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The Weather is currently "+weatherdescription+" </p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celsius</h1>");
            res.write("<image src="+imageurl+" >");
            res.send();
        })
    }


}
app.listen(process.env.PORT||3000);

//3144c58b90ed1e78371fb02613509dbb
