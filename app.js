const express = require("express");
const { Http2ServerResponse } = require("http2");
const https = require("https");
const bodypar= require("body-parser")
const appi =express();


appi.use(express.static("public"));
appi.use(bodypar.urlencoded({extended:true}));
appi.get("/",function(req,res)
{


    res.sendFile(__dirname +"/signup.html");
    

});

appi.post("/",function(req,res)
{
    var fnm= req.body.fname;
    var lnm= req.body.lname;
    var eml= req.body.eml;

    const data= {
        members:[
            {
                email_address: eml,
                status:"subscribed",
                merge_fields:
                {
                    FNAME: fnm,
                    LNAME: lnm
                }
            }

        ]    
    };

    const jsd= JSON.stringify(data);

    const url= "https://us9.api.mailchimp.com/3.0/lists/1623b1c6a3";
    const options=
    {
        method: "POST",
        auth: "saura1:e8bb95a9a8da296ea7d190f04f14afba-us9"
    }
    console.log(fnm,lnm,eml);
    const request=https.request(url,options,function(response)
    {
        if(response.statusCode=== 200)
        {
            res.sendFile(__dirname+ "/success.html");
        }
        else
        {
            res.sendFile(__dirname+ "/failure.html");
        }

        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsd);
    request.end();

})


appi.post("/failure",function(req,res)
{
  res.redirect("/")

})



appi.listen(3000,function()
{
    console.log("Server is running");
});


// 1623b1c6a3.
// e8bb95a9a8da296ea7d190f04f14afba-us9