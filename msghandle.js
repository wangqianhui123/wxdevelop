const formatMsg=require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助消息
    //还可以是读取文件的形式来返回
    return '你好，这是一个测试号，目前会原样返回用户输入的数据';
    
}

/**
     * 
     * @param {object} wxmsg 解析XML消息的对象
     * @param {object} retmsg 要返回的数据对象
     */

function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType == 'text'){
        switch (wxmsg.Content) {
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg = help();
                retmsg.msgtype = 'text';
                return formatMsg(retmsg);
            case "about":
                retmsg.msgtype = 'text';
                retmsg.msg = '我是这个测试号的开发者，如有问题，请咨询xxx';
                return formatMsg(retmsg);
            case "about":
                retmsg.msgtype = 'text';
                retmsg.msg = '姓名：王骞卉  学号：2017012002';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype = 'text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);


        }

    }else{
        switch(wxmsg.MsgType){
            case 'image':
            case 'voice':
                retmsg.msgtype = wxmsg.MsgType;
                retmsg.msg = wxmsg.MediaId;
                return formatMsg(retmsg);
                break;
            default:
                //retmsg.msgtype类型为空
                //格式化数据会返回default处的数据
                //提示用户该类型不被支持
                return formatMsg(retmsg);
                retmsg.msg = '不支持类型';
        }
      
    }
    
}

exports.help = help;
exports.userMsg = this.userMsg;

//后续还会加入事件消息支持
exports.msgDispatch = function(wxmsg,retmsg){
    return userMsg(wxmsg,retmsg);
}