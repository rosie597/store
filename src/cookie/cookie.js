export function setCookie(name , value , day){
    if(day != 0){
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date()+expires);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    }else{
        document.cookie = name + "=" + escape(value);
    }
}
  export function  getCookie(name) {
      var arr;
      var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
       if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
         else
           return null;
       }; 
    export function delCookie (name) {
       setCookie(name, ' ', -1);//设为过去的时间
     };