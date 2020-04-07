const http = require('http');
var url = require('url');
const querystring = require('querystring');
// const fs = require('fs');


//  var options = {
//    key: fs.readFileSync('./key.pem', 'utf8'),
//    cert: fs.readFileSync('./server.crt', 'utf8')
// };
 const uri =
          "mongodb+srv://collectionName:username_password@cluster0-xbsxj.mongodb.net/test?retryWrites=true&w=majority";

http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.setHeader('Access-Control-Allow-Origin',"*");
   response.writeHead(200, {'Content-Type': 'application/json'});
   var urlObject = url.parse(request.url,true);
   // Send the response body as "Hello World"
   var path = urlObject.pathname;

   const queryStringValue = url.parse(request.url).query;
   var queryObject = querystring.parse(queryStringValue);
   if(path==="/graphdata")
   {
      findPrice(
         queryObject.url,function(completeReturnData){
         if(completeReturnData!==null)
         {   
         response.end(JSON.stringify(completeReturnData));
         }
         else{
            response.end("failed");
         }
      });
    }
   else
   response.end('failed');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');



async function findPrice(url,callback) {
  var details = {};
  details.url = url;
  details.data = {};
  actualData = {};
  predictedData = {};
  productName = "";
  graphData = [];
  if (url.includes("flipkart")) {
        const MongoClient = require("mongodb").MongoClient;
        
        const client = new MongoClient(uri, { useNewUrlParser: true } );
        client.connect(err => {
          const collection = client
            .db("price_predictor")
            .collection("price_value");
            collection.find({ url: details.url }).toArray(
               function(err, vall) {
                  if(err)
                  {
                     callback(null);
                  }
                  if(vall.length>0)
                  {
                  productName=vall[0].name;
                  vall[0].data.forEach(element => {
                        var date="";
                        var price = -1;
                        if(element.price!=null)
                         price=parseInt(element.price.substring(8).replace(/\,/g,"")); 
                        if(element.date!=null)
                        {
                        var strdate=new Date(element.date).toISOString();
                        date=strdate.substring(0,strdate.indexOf('T'));
                        }
                        if(date!==""&&price>=0)
                        actualData[date]=price;
                  });
               }
               else{
                  callback(null);
               }
            }
            )
          const collection2= client.db('price_predictor').collection("predicted_price");
          collection2.find({ url: details.url }).toArray(function(err,val2){
                  if(err)
                  {
                     callback(null);
                  }
                  if(val2.length>0)
                  {
                  val2[0].lr.forEach(element => {
                     var date="";
                     var price = -1;
                     if(element.price!=null)
                      price=parseInt(element.price); 
                     if(element.date!=null)
                     {
                     var strdate=new Date(element.date).toISOString();
                     date=strdate.substring(0,strdate.indexOf('T'));
                     }
                     if(date!==""&&price>=0)
                     predictedData[date]=price;
               });
               let actualDataReturn ={};
               let predictedDataReturn ={};
               actualDataReturn["name"]="Actual Price";
               actualDataReturn["data"]=actualData;
               predictedDataReturn["name"]="Predicted Price";
               predictedDataReturn["data"]=predictedData;
               graphData[0]=actualDataReturn
               graphData[1]=predictedDataReturn;
               let completeReturnData = {};
               completeReturnData["name"]=productName;
               completeReturnData["url"]=url;
               completeReturnData["graphData"]=graphData;
               // console.log(completeReturnData);
               // return completeReturnData;
               callback(completeReturnData);
            }
            else
            {
               callback(null);
            }
          })
       client.close();   
      })

  } 
  else{
     callback(null);
  }
}


// findPrice(
//   "https://www.flipkart.com/oneplus-6t-midnight-black-128-gb/p/itm481488ed3d219"
// );


