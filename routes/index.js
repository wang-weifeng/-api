var Tq = require('../modu/db');
var http = require('http');
var request = require('request');

module.exports = function(app) {
  
  app.get('/', function (req, res) {
    res.render('index',{
        title:'欢迎来到天气查询页面'


    });

  });   
   
  app.get('/devices/:id',function(req, res){


  		 //判断Tq数据库里是否有要输入查找的内容
    
     Tq.findAll({
    
		  where: {
		    city: req.param('id')
		    
		   }
		}).then(function(result){
		        console.log(  result.length);

		    if(result.length === 0 )
		    	{

		  //  	if(req.param('id') !='上海'&&req.param('id') !='北京'&&req.param('id') !='南京'&&req.param('id') !='杭州'&&req.param('id') !='苏州'&&req.param('id') !='无锡')
          //  {
            	
                
           //   res.statusCode = 404;
            //  return res.send('Error 404: No products found')  
    			
           // }
           // 
           //   
           

            
         
           request('http://api.yytianqi.com/citylist/id/1', function (error, response, body) 
                {   if (!error && response.statusCode == 200) {
             
             console.log('--------------------------');
             
             
             var obj2 = JSON.parse(body); 
             //console.log(obj2);
             //console.log(obj2);
            // console.log(obj2.list.length);
            urlpath =  'http://api.yytianqi.com/'
            for(var z=0;z<3;z++)
             {
             
            if(req.param('id')===obj2.list[z].list[0].name)
            	urlpath =  'http://api.yytianqi.com/forecast7d?city='+obj2.list[z].list[0].city_id+'&key=f8l6iewnnm9l81uv';
        		}
console.log('--------------1-----------');
            for(var i =4;i<30;i++)
                {
                for(var j =0 ;j<obj2.list[i].list.length;j++)
                   
                       {
                       	
                        
                       	if(req.param('id')===obj2.list[i].list[j].list[0].name)
				{  
					urlpath =  'http://api.yytianqi.com/forecast7d?city='+obj2.list[i].list[j].list[0].city_id+'&key=f8l6iewnnm9l81uv';
				}

  
                }
                console.log('--------------2-----------');
               
              

            }
            for(var x=30;x<31;x++){
            	for(var y =0 ;y<obj2.list[x].list.length-1;y++)
            	if(req.param('id')===obj2.list[x].list[y].list[0].name)
            		{  
					urlpath =  'http://api.yytianqi.com/forecast7d?city='+obj2.list[x].list[y].list[0].city_id+'&key=f8l6iewnnm9l81uv';
				}
				console.log('--------------6-----------');
			}
			console.log('--------------3-----------');

			
			if(urlpath==='http://api.yytianqi.com/')
				{  
					console.log('--------------4-----------');
                    res.statusCode = 404;
             return res.send('Error 404: No products found') ;

					//urlpath =  'http://api.yytianqi.com/forecast7d?city='+obj2.list[30].list[20].list[0].city_id+'&key=f8l6iewnnm9l81uv';
				}
        
        
           
           // 
           //
            
			
		
			//console.log(urlpath);	
			 console.log(req.param('id'))

		    request(urlpath, function (error, response, body) 
		        {   if (!error && response.statusCode == 200) {
		   
		     console.log('--------------------------');
		     
		     console.log('--------------------------');
		     var obj2 = JSON.parse(body); 
		     //console.log(obj2);
		     console.log(obj2.data.cityName);
		    //写进数据库
		    
		     Tq.create({
		    city: obj2.data.cityName,
		    date: obj2.data.list[0].date,
		    daywe: obj2.data.list[0].tq1,
		    nightwe: obj2.data.list[0].tq2,
		    dayt: obj2.data.list[0].qw1,
		    nightt: obj2.data.list[0].qw2
		    }).then(function(result){
		        console.log('inserted tq ok');
		    });
		     
		      
		        
		     var da = {
                	user1:
                	{
                	
                	code:'1',msg:'Success',data:{city:obj2.data.cityName, date:obj2.data.list[0].date, daywe: obj2.data.list[0].tq1, 
                	nightwe: obj2.data.list[0].tq2, dayt: obj2.data.list[0].qw1, nightt: obj2.data.list[0].qw2
                	}

                	}
                
              }
               
                 var user = da['user1'];
      			 console.log( user );
      			 res.set({'Content-Type':'text/json','Encodeing':'utf8'});
      			 res.send(user);

		   }
		 })
		
		}
		    
         })
    //res.statusCode = 404;
         //     return res.send('Error 404: No products found') 
        }
    


		  
		    //数据库里有输出
		       if(result.length != 0 ){
		         for (var i = 0, usr; usr = result[i++];) {
		       
		      
		  
                
                 
                var da = {
                	user1:
                	{ 
                	code:'1',msg:'Success',data:{city:usr.city, date:usr.date, daywe: usr.daywe, 
                	nightwe: usr.nightwe, dayt: usr.dayt, nightt: usr.nightt
                	}
                }
                	
                }
               
                 var user = da['user1'];
       
      			 console.log( user );
      			 res.set({'Content-Type':'text/json','Encodeing':'utf8'});
      			 res.send(user);
       			
                
            

                //var weathe = JSON.stringify(da);

               // console.log(weathe);
                //console.log('今天天气是：'+weathe);
              } 
              } 








         })



    
      
 
   
        
      })    
    };






