const titbit = require('titbit');
const xmlparse = require('xml2js').parseString;
const wxmsg = require('./msghandle');

var app = new titbit();

var {router} = app;


app.router.post('/wqh/abc',async c => {
    try{
        let data = await new Promise((rv,rj) => {
            xmlparse(c.body,{explicitArray:false},(err,result) => {
                   if(err){
                       rj(err);
                   }else{
                       rv(result.xml);
                   }
            });
        });

        let retmsg = {
            touser:data.FromUserName,
            fromuser:data.ToUserName,
            msgtype: data.Content,
            msgtime:parseInt(Date.now()/1000),
            msg:''
        };
        //没有消息派发函数进行处理
        //要把解析后的消息和要返回的数据对象传出去

        c.res.body = wxmsg.msgDispatch(data,retmsg);

    }catch(err){
        console.log(err);
    }
});

app.run(8001,'localhost');