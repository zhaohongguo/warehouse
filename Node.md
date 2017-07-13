#Node.js

##一 组成部分
####1.引入required模块：使用require指令来载入Node.js模块
		
	eg:载入http模块,并将实例化的HTTP赋值给变量http：
		var http = require("http");//这个方法的返回值,其实就是被加载模块中的module.exports对象
####2.创建服务器：服务器可以监听客户端的请求。

	eg:使用http.createSever()方法创建服务器,并使用listen方法绑定8888端口。函数通		过request,response参数来接收和响应数据。
	首先在根目录下创建一个server.js文件,然后写入下面代码：
	http.createServer(function(request,response){
		//发送 HTTP 头部
		// HTTP 状态值： 200：OK
		//内容类型：text/plain
		response.writeHead(200,{'Content-Type':'text/plain'});//设置对正文的额外处理
		response.write("返回到客户端的信息")//双引号里面为正文
		//发送响应数据"Hello World"
		response.end("Hello World");
	}).listen(8888,"IP",callback)

	//终端打印信息
	console.log('Server running at http://127.0.0.1:8888');

####3.接收请求与响应请求:服务器创建很容易,客户端可以使用浏览器或终端发送HTTP请求,服
####务器接受请求后返回响应数据。

####4.moudle.exports :  抛出一个对象
	moudle:保存提供和当前模块有关的一些信息
	node.js中调用其他模块中的变量除了使用module.exports来挂在变量外,还可以使用globle。变量名来声明变量。
####5.创建客户端
	http.createClient()

##二 回调函数
		Node.js异步编程的直接体现就是回调，但不能说使用了回调后程序就异步化了。使用回调函数可以使执行代码时没有阻塞大大提高了Node.js的性能，可以处理大量的并发请求。
		即阻塞是按顺序执行的,而非阻塞是不需要按顺序的,所以要处理回调函数的参数,就需要写在回调函数内。

##三 内置模块
###1、文件系统（fs）
	Node.js文件系统(fs模块)模块中的方法均有异步和同步版本,
	异步的方法函数最后一个参数为回调函数,回调函数的第一个参数包含了错误信息(err)
	
	(1)获取文件系统模块
	    var fs=require("fs");
	(2)读取文件
		异步：fs.readFile(path,fn(err,data){
				//path 要读取的文件的路径
				//fn(err,data)回调函数
				//err 包含了读取失败时的错误信息
				//data 包含了读取的文件内容
				
			})
		 eg: fs.readFile("./test.txt",function(err,data){
			if(err){console.log(err);return)
			console.log("读取成功")
			})
		同步：fs.readFileSync(path);
	(3)写入文件
		*覆盖写：*
		如果文件存在,该方法会覆盖写入的内容会覆盖旧的文件内容,如果文件不存在,会创建新文件并写入内容		
		fs.writeFile(filepath,"内容",fn(err){
			if(err){console.error(err);return}
			//这里的参数只有err  错误信息 在写入失败时返回
			console.log("写入成功")
			})
		*追加写：*
		fs.appendFile(filepath,"内容",fn(err){
			if(err){console.error(err);return}
				console.log("写入成功")
		})
	（4）删除文件
		fs.unlink(path,fn(err){
			if(err){console.error(err);return}
			console.log("删除成功")
		})
	（5）打开文件
		fs.open(filepath,flags[,mode],fn(err,fd){
			//flags  文件打开的行为
			r	以读取模式打开文件。如果文件不存在抛出异常。
			r+	以读写模式打开文件。如果文件不存在抛出异常。
			rs	以同步的方式读取文件。
			rs+	以同步的方式读取和写入文件。
			w	以写入模式打开文件，如果文件不存在则创建。
			wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
			w+	以读写模式打开文件，如果文件不存在则创建。
			wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
			a	以追加模式打开文件，如果文件不存在则创建。
			ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
			a+	以读取追加模式打开文件，如果文件不存在则创建。
			ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。
			//mode	设置文件模式（权限）
			//fd 通过 fs.open() 方法返回的文件描述符
		})
		fs.close(fd,fn(err){})//关闭文件
	（6）获取文件信息
		fs.stat(path,fn(err,stats){
			//path 文件路径
			//stats  fs.Stats对象,从其下的方法可以获取文件的属性信息
			stats.isFile()	//是文件返回true,否则返回false
			stats.isDirectory()//是目录返回true,否则返回false
			....
			//其他方法参考http://www.runoob.com/nodejs/nodejs-fs.html
			
		})
	(7)创建目录
		fs.mkdir(path,function(err){
			//path  创建的目录路径
			//function(err){}回调函数
		})
	（8）读取目录
		fs.readdir(path,function(err,files){
			//files 目录下的文件数组列表
			
			files.forEach(function(file,index){})
		})
		同步：fs.mkdirSync(path);
		     fs.rmdirSync(path);
	(9)删除目录
		fs.rmdir(path,function(err){})
	(10)修改类型、重命名、修改路径	
		fs.rename(oldpath/name,newpath/name,function(err){})
	(11)监听目录
		fs.watch(filedir,function(ev,file){})
##二 Buffer(缓冲区)
	Js语言自身只有字符串数据类型,没有二进制数据类型。
		node 读取的的内容都是buffer对象
	

	(1)Buffer类可以通过多种方式创建
	方法1：var buf=new Buffer(10);//创建长度为10 字节的buffer实例
		ps:当我们为一个Buffer对象分配空间大小后,其长度是固定,不能更改
	方法2：var buf=new Buffer([,,,]);//通过给定的数组创建Buffer实例
	方法3：var buf=new Buffer('字符串');//通过一个字符串来创建Buffer实例,一个汉字占3个字符,一个字母占一个字节
	buf.length   返回buffer的bytes字节数
	
	(2)写入缓冲区buffer:
	
	buf.write(string,offset,length,encoding);
	//string,写入缓冲区的字符串
	//offset,缓冲区开始写入的索引值
	//length,写入的字节数，默认为buffer.length
	//encoding 编码 默认为utf-8
	
	(3)从缓冲区读取数据：
	
	buf.toString();//返回字符串

	(4)将buffer转为Json数据
	
	buf.toJson();

	(5)缓冲区合并：
	buf.concat(buf1,buf2,buf3)

	(6)缓冲区比较：
	buf.compare(otherbuf);
	返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同

#三 Global 全局对象
	
	(1)__filename  (__是两个短下划线)
		表示当前正在执行的脚本的文件名,输出文件所在位置的绝对路径且和命令行参数指定的文件名不一定相同。如果在模块中,返回的值是模块文件的路径
	
	eg：运行main.js console.log(__filename)
	
	(2)__dirname
		表示当前执行脚本所在的目录
	(3)setTimeout(callback,ms)
		定时器,全局函数在指定的ms数后执行callback函数一次
	(4)clearTimeout(t)
		清除定时器,t是之前创建的定时器
	(5)setInterval(callback,ms)
		定时器,在指定的ms数后执行callback,不停的执行
	(6)clearInterval(t)
		清除定时器
	(7)console.time(label)
		输出时间,表示计时开始
	   console.timeEnd(label)
		结束时间,表示计时结束
	(8)process  //它是一个全局对象,进程对象
		process.argv();//返回一个数据,
		process.env();
		process.pid();
		process.title();
		process.exit();退出当前程序
		process.stdout 标准输出对象  //  process.stdout.write(内容)//命令行输出
		process.stdin 标准输入对象	 //	 process.stdin.on()监听用户输入
		eg:
			process.stdin.resume();//默认输入流是关闭的,要监听处理输入流数据,首先要开启这个输入流
			//用于监听用户的输入数据
			process.stdin.on("data",function(chunk){
				console.log('用户输入了:'+chunk);    //chunk  是用户输入的内容,回车键后来才能输出
				})


#四 EventEmitter事件触发器
	Node.js所有的异步I/O操作在完成时都会发送一个事件都事件队列
	events模块只提供了一个对象：events.EventEmitter.

	//引入events模块
	(1)var events=require('events');
	//创建eventsEmitter对象
	(2)var eventEmitter=new events.EventEmitter();

	以上两步是一个完成的EventEmitter初始化过程
	
	(3)eventEmitter.on("事件名",fn(){
		console.log('事件触发执行')
		})
	(4)eventEmitter.emit('事件名');//事件调用触发事件
	原理：eventEmitter对象注册了事件“事件名”的一个监听器,之后向eventEmitter对象发送事件,此时会调用其监听器。
	ps:对于事件,eventEmitter支持注册多个监听器给同一个事件,当事件触发时,事件监听器被依次调用。

	实例：
	//event.js 文件
	var events = require('events'); 
	var emitter = new events.EventEmitter(); 
	emitter.on('someEvent', function(arg1, arg2) { 
		console.log('listener1', arg1, arg2); 
	}); 
	emitter.on('someEvent', function(arg1, arg2) { 
		console.log('listener2', arg1, arg2); 
	}); 
	emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 


	方法：
	1.addListener(event,listener)
		为指定事件添加一个监听器到监听器数组的尾部。
	2.once(event,listener)
		为指定事件注册一个单词监听器,即监听器最多只会触发一次,触发后立刻解除监听器
	3.removeListener(event,listener)
		移除指定事件的某个监听器,必须是绑定过的监听器
	4.removeAllListener([event])
		移除所有事件的所有监听器,如果指定事件,则移除指定事件的所有监听器
	5.listeners(event)
		返回指定事件的监听器数组
#五 Web模块(Http)
	Node.js提供了http模块,http模块主要用于搭建HTTP服务端和客户端,使用HTTP服务器与客户端功能必须调用http模块。
	var http=require('http');//调用http模块


	URL 模块

	var url=require('url');//调用url模块,url.parse(req.url,true).query解析url的参数
	一个URL字符串是一个结构化的字符串,它包含多个有意义的组成部分,当被解析时会返回一个URL对象,它包含每个组成部分	
		//console.log(url)
		Url {
 			 protocol: 'http:',协议
 			 slashes: true,
 			 auth: null,   
			 host: 'www.baidu.com',  主机
 			 port: null,              端口
 			 hostname: 'www.baidu.com',主机名
 			 hash: '#top',       锚点
  			 search: '?id=1&user=admin',  拼接参数
  			 query: 'id=1&user=admin',    修改参数
  			 pathname: '/user/index.html',   路径部分
  			 path: '/user/index.html?id=1&user=admin',
 			 href: 'http://www.baidu.com/user/index.html?id=1&user=admin#top' 
			}
	┌─────────────────────────────────────────────────────────────────────────────────────────────┐
	│                                            href                                             │
	├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
	│ protocol │  │        auth         │        host         │           path            │ hash  │
	│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
	│          │  │                     │   hostname   │ port │ pathname │     search     │       │
	│          │  │                     │              │      │          ├─┬──────────────┤       │
	│          │  │                     │              │      │          │ │    query     │       │
	"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
	│          │  │          │          │   hostname   │ port │          │                │       │
	│          │  │          │          ├──────────────┴──────┤          │                │       │
	│ protocol │  │ username │ password │        host         │          │                │       │
	├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
	│   origin    │                     │       origin        │ pathname │     search     │ hash  │
	├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
	│                                            href                                             │
	└─────────────────────────────────────────────────────────────────────────────────────────────┘
	(请忽略字符串中的空格，它们只是为了格式化)



	querystring 模块  (查询字符串,即?后面的东西)

	var querystring=require("querystring");//调用querystring模块,querystring.stringify
        	          		 url.parse(string).query
        	                                   |
        	   url.parse(string).pathname      |
         	               |                   |
         	               |                   |
           	             ------ -------------------
	http://localhost:8888/start?foo=bar&hello=world
         	                        ---       -----
         	                         |          |
         	                         |          |
           querystring.parse(queryString)["foo"]    |
                     	                            |
                         querystring.parse(queryString)["hello"]
	//创建服务器
	http.createServer(function(request,reponse){
		//解析请求,包括文件名
		var pathname=url.parse(request.url).pathname;
		
		//格式化url
		var obj={
			"protocol":"https",
			 "host": "www.126.com",
			 "pathname":"/index/index.html",
			 "search":"?id=1&user=admin"
			};	
		url.format(obj)//结果：拼接到一块去了
		// 从文件系统中读取请求的文件内容
   	fs.readFile(pathname.substr(1), function (err, data) {
      		if (err) {
        		 console.log(err);
         		// HTTP 状态码: 404 : NOT FOUND
        		// Content Type: text/plain
        	 	response.writeHead(404, {'Content-Type': 'text/html'});
      		}else{	         
         		// HTTP 状态码: 200 : OK
         		// Content Type: text/plain
        	 response.writeHead(200, {'Content-Type': 'text/html'});	
         
        	 	// 响应文件内容,写入响应信息中
        	 response.write(data.toString());		
      		}
     	 		//  发送响应数据,结束发送请求
      		response.end();
   		});   
	}).listen(80,"ip(可选)")
#六 工具模块
	##1.Path模块
		提供了一些用于处理文件路径的小工具,引入Path模块：
		var path=require("path");
	  方法：
		（1）path.parse(req.url)//返回路径字符串的对象
		（2）path.normalize()//规范化路径,去除路径中多余的斜杠
		（3）path.join([path1],[path2]...)//用于连接路径
		（4）path.resolve(from,to)//将to参数解析为绝对路径
		（5）path.isAbsolute(path)//判断参数path是否是绝对路径
		（6）path.relative(from,to)//用于将相对路径转为绝对路径
		（7）path.dirname()返回路径中代表文件夹的部分
		（8）path.basename(url)//返回路径中的最后一部分
		（9）path.extname()//返回路径中文件的后缀名
		（10）path.format()//从对象中返回路径字符串,与path.parse相反
#七 Express
	1.Express框架核心特性
		* 可以设置中间件来响应HTTP请求
		* 定义了路由表用于执行不同的HTTP请求动作
		* 可以通过向模板传递参数来动态渲染HTML页面
	2.安装
		cnpm install express --save
		随着一起安装的重要模块有：
		cnpm install body-parser --save 
		//node.js中间件,用于处理JSon,Raw,Text和URL编码的数据,只适合表单提交
	3. 设置静态资源站(处理主动请求,例如img_src,script_src,link_href)
		app.use(express.static("./public"));
		//静态资源站固定写法,public可以任意填,静态资源要放入这个文件夹	
	4.get请求
		(1)app.get("/",function(req,res，,next){
			//app.get  监听一层,第一个参数写要监听的路径
			//next();	强制执行下一个相同的路由,中间遇到不相同路由会跳过
			res.send();//响应结束 标记
			}),

			app.get("/:static/:val",function(res,req){
				// :val与:static 均为变量路由(相当于一个变量)
			})
		(2)app.use("/test",function(req,res){
			//app.use 第一个参数可以不写,默认从/开始,如果写了就从这个路径开始无限向后匹配
			//此中间件适合做静态资源站,看上一点
			})
		(3)app.set()
###创建一个express + ejs项目
		1.设置ejs模板引擎
		cnpm install express --save;
		cnpm install ejs --save;

		初始化静态资源库：
		
		app.use(express.static("./public"));
		
		设置模板库：(默认不设置,就是去views文件夹下找)
		app.set("views",__dirname+"/views");//第一个参数views固定,设置模板文件夹的路径
		
		设置模板引擎:
		app.set("view engine","ejs");
		app.get("/",function(req,res){
			console.log(req.query)
			
			res.render("跳转到的ejs文件,不加后缀名",{data:data})
			//res.render 结束标记 调用模板引擎解析名字（第一个参数写的）的模板并传入data参数 
			})
		app.listen("端口号")
		2.  ejs 模板中三种标签方式
			ejs结尾的文件就是模板文件
			<%=  直接输出到页面上 %>	
			<%-  没有输出HTML代码到页面上输出的是标签未转义时内部的变量值 %>
			<%这里可以写js逻辑代码%>
###创建一个express + html项目	（post请求为例）
		1.设置html模板引擎
		cnpm install express --save
		cnpm install ejs --save
		cnpm install body-parser --save


		var express=require("express");
		var bodyParser=require("body-parser");
		app.use(bodyParser.urlencoded({extended:false}));固定写法

		//app.use(express.bodyParser());express提供的一个中间件,支持urlencoded,multipart,json三种表单格式
		//相当于
		//app.use(express.json());
		//app.use(express.urlencoded());
		//app.use(express.multipart());


		初始化静态资源库：	
		app.use(express.static("/public"));
		设置模板库：
		app.set("views",__dirname+"/views");
		设置模板引擎：
		app.set("view engine","html");
		app.engine(".html",require("ejs").__express);
		app.post("/dologin",function(req,res){
			console.log(req.body);//接收post提交的参数
			res.render()//读取views目录下的指定文件,解析并返回给客户端
			})
		ps:
			req.body;接收post提交的参数
			req.query;接收get提交的参数
			req.params;两种都能接收到
		 ajax,不能使用render,redirect,只能使用send返回值
###request对象的具体介绍
		req.app：当callback为外部文件时，用req.app访问express的实例
		req.baseUrl：获取路由当前安装的URL路径
		req.body / req.cookies：获得「请求主体」/ Cookies
		req.fresh / req.stale：判断请求是否还「新鲜」
		req.hostname / req.ip：获取主机名和IP地址
		req.originalUrl：获取原始请求URL
		req.params：获取路由的parameters
		req.path：获取请求路径
		req.protocol：获取协议类型
		req.query：获取URL的查询参数串
		req.route：获取当前匹配的路由
		req.subdomains：获取子域名
		req.accepts()：检查可接受的请求的文档类型
		req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
		req.get()：获取指定的HTTP请求头
		req.is()：判断请求头Content-Type的MIME类型
###response对象的具体介绍
		res.app：同req.app一样
		res.append()：追加指定HTTP头
		res.set()在res.append()后将重置之前设置的头
		res.cookie(name，value [，option])：设置Cookie
		opition: domain / expires / httpOnly / maxAge / path / secure / signed
		res.clearCookie()：清除Cookie
		res.download()：传送指定路径的文件
		res.get()：返回指定的HTTP头
		res.json()：传送JSON响应
		res.jsonp()：传送JSONP响应
		res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
		res.redirect()：设置响应的Location HTTP头，并且设置状态码302
		res.send()：传送HTTP响应
		res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
		res.set()：设置HTTP头，传入object可以一次设置多个头
		res.status()：设置HTTP状态码
		res.type()：设置Content-Type的MIME类型

#八	 NodeJS连接MongoDB数据库
		1.下载安装mongodb模块
		  cnpm install mongodb --save
		2.引入mongodb模块
		  var mongodb=require("mongodb");
		  var url="mongodb://127.0.0.1:27017/database";
		  ps:
		  	mongodb://固定格式必须要指定
		  	127.0.0.1 要连接到的数据库的地址
		  	27017  默认端口
		  	database 要连接到的库
		3.连接数据库
		  	function getDb(callback){
		  		mongodb.connect(url,function(rr,db){
		  			//  db,就是数据库操作对象
		  			if(err){console.log(err);return}
		  				console.log("连接成功")
		  				callback(db);
		  		  	})
		 		}
		 4.增
		 	function insert(){
					var obj={
						name:"插入数据",
						.....
					};
					getDb(function(db){
						console.log(db);
						db.collection("集合名").insert(obj,function(err,data){
							console.log(data)
						})
					})
		 		}
		 5.删
		 	function del(){
					var obj={
						name:"插入数据"
					};
					getDb(function(db){
						console.log(db);
						db.collection("集合名").remove(obj,function(err){
							if(err){console.log(err);return}
							console.log("删除成功")
						})
					})
		 		}
		 6.改
		 	function update(){
					var obj={
						name:"插入数据"
					};
					getDb(function(db){
						console.log(db);
						db.collection("集合名").update(obj,{$set:{name:"修改数据"}},function(err){
							if(err){console.log(err);return}
							console.log("修改成功")
						})
					})
		 		}
		 7.查
		 	function find(){
					var obj={
						name:"插入数据"
					};
					getDb(function(db){
						console.log(db);
						db.collection("集合名").find(obj).toArray(function(err,data){
							console.log(data)
						})
						
					})
		 		}
# 九 express会话控制(cookie与session)
		http协议是一种无状态协议,即当你浏览了一个页面,然后转到同一个网站的另一个页面,服务器无法认识到,这是同一个浏览器在访问同一个网站。
		1.cookie

			cookie是http协议的一部分,可以将信息保存在客户端的好东西,也叫(HTTPCookie),最大不超过4M。
			Cookie应用场景：
				1.电子商务购物网站，需要在用户点击支付之前，知道用户购买了哪些商品。 说明：目前也有不部门实现是，每次点击购买，都直接发请求到后台，
				后台存储要购买的数据，然后再点击支付之前，从后台获取用户要购买的尚品数据，不使用Cookie也可以完成。
				2.用户登录，记住密码。开发者可以在用户登录之后，将用户名和密码，以某种加密的方式存储到客户端，第二次登录时，直接获取Cookie，然后发送Cookie到后台
				服务器进行验证，达到用户勾选了“记住密码”，后续无需输入用户名和密码的功能。当然是在Cookie的有效期内。
			(1)安装
				cnpm  install cookie-parser --save
			(2)加载模块
				var express = require("express");
				//这个cookieParser是express提供的一个分析Cookie信息,并将信息保存在req.cookie中的中间件
				var cookieParser = require("cookie-parser");
				var app = express();
				app.use(cookieParser());
			(3)设置
				res.cookie(key,value,{生效时间,生效路径});
				eg: 
					res.cookie(username,"张三",{maxAge:1000*60,path:"/"})
					//生存时间(maxAge)
					//生存路径(path:"url")  /所有路径都可以取  /index指定路径
			(4)读取
				req.cookies. 通过req.cookies.key获取对象cookies中记录的value值
				第一次获取的值为undefined,从第二次开始才会有记录
			(5)工作流程
				第一次访问客户端没有cookie  服务器向客户端下发cookie
				第二次访问请求的url中,带设置的cookie
				eg:
				app.get("/",function(req,res){
							if(req.cookie.remember){
								res.send('Remembered :). Click to <a href="/forget">forget</a>!.')
							}else{
								res.send('<form method="post"><p>Check to <label>'
		     					 + '<input type="checkbox" name="remember"/> remember me</label> '
		     					 + '<input type="submit" value="Submit"/>.</p></form>');
							}
						})
				app.get('/forget', function(req, res){
						  //输入key值，清除对应的value值
						  res.clearCookie('remember');
						  res.redirect('back');
						});
			(6)注意
			res.cookie('name', 'laodoujiao', { domain: '.cnblog.com', path: '/admin', secure: true,expires: new Date(Date.now() + 900000), httpOnly: true,maxAge:900000 });
			cookie中的其他几个参数:
				domain:域名
				path:cookie影响到的路径,匹配改路径才发送这个cookie
				expires:具体的cookie过期时间
				httpOnly:浏览器不允许脚本操作document.cookie去更改cookie
		2.session

			作用:保存一些不能放到浏览器,却又跟用户息息相关的信息，用指定的参数创建一个session中间件，sesison数据不是保存在cookie中，仅仅sessionID保存到cookie中，session的数据仅仅保存在服务器端
			(1)安装
				cnpm  install express-session --save
			(2)加载模块
				var session = require("express-session");
			(3)设置session相关信息:
				app.use(session({
						//secret  加密用的密钥
						secret:"随机字符串",
						resave:true,//是指每次请求,重新设置session
						rolling:true,//每次请求都重新设置cookie默认是false
						cookie:{
							maxAge:1000*60
						}
					}))
			(4)设置路由中的session
				req.session.usename=value;
				中间件第二个参数可以添加多个情况处理函数,需要用到next()
				app.use(function(req,res,next){
						// res.locals 本地存储信息的对象
						// 设置默认信息 
						res.locals.user = '';

						if(req.session.username){
							res.locals.user = req.session.username;
						}
				})
			(5)多页面内共享
				res.locals对象  可以在任何一个模板中取它身上的值

		3.加密算法

			cnpm install crypto --save
			var crypto=require("crypto");
			var md5=crypto.createHash("md5");

			//转的密码必须是字符串类型
			eg:
			var pwd="1";

			var password=md5.update(pwd).digest("base64");
			console.log(pwd);
# 十 文件上传(file_upload)
			Multer是一个node.js中间件,用于处理multipart/form-data类型的表单数据,它主要用于上传文件。
			Multer会添加一个body对象以及file或files对象到request对象中,body对象包含表单的文本域信息,
			file或files对象包含对象表单上传的文件信息。
		注意:
			Multer不会处理任何非multipart/form-data类型的表单数据。
		安装：
			cnpm install --save multer

		var express=require("express");
		var app=express();
		var multer=require("multer");
		var path=require("path");
		


		ps:
		multer(options)
			multer接受一个options对象,其中最基本的是dest属性,这将告诉Multer将上传文件保存在哪,如果省略将保存在内存中。
		以下是可以传递给Multer的选项：
			key						Description
			dest or storage			在哪里存储文件
			fileFilter				文件过滤器,控制哪些文件可以被接收
			limits					限制上传的数据

		简版配置:
		var upload=multer({dest:"上传文件存储到的路径"});
		app.use("/doform",upload.single("表单上传文件的name值"),function(req,res){})
		精版配置:
		(1)设置存储引擎(上传文件存储的路径和信息)(diskStorage和memoryStorage)
		var storage=multer.diskStorage({
				//文件路径
				destination:function(req,file,cb){
					//cb(null,"文件路径")
					cb(null,"./upload")
				}
				//文件名
				filename: function (req,file,cb) {
					//获取上传文件的扩展名
					var ext=path.extname(file.originalname);

				}
			});
		(2)过滤引擎(fileFilter)
		
			function fileFilter (req,file,cb) {
				console.log(file)
				/*  { fieldname: 'upload_file',
					  originalname: '1.jpg',
					  encoding: '7bit',
					  mimetype: 'image/jpeg' }*/
					//这个函数应该调用cb用boolean值来指示是否应该接受该文件
					//拒绝文件
					cb(null,false)
					//接受文件
					cb(null,true)
					//如果有问题，这样放一个错误
					cb(new Error(" I don't have a clue!"))

					var allType=["image/jpeg","image/png"];
					if(allType.indexOf(file.mimetype)==-1){
						console.log("上传失败");
						cb(null,false)
					}else{
						console.log("上传成功");
						cb("null,true")
					}
				}
		(3)文件上传配置第三步


			limits选项：
				fieldNameSize  field名字最大长度(表单名)  100bytes
				fieldSize		field值的最大长度		  1MB
				fields          非文件 field的最大数量无限
				fileSize		在multipart表单中,文件最大长度(字节单位)

			var upload=multer({
					storage:storage,
					fileFilter:fileFilter,
					limits:{
						fileSize:1024*30
					}
				}).single("upload_file");
			//路由与错误处理机制
			app.post("/doform",function(req,res){
					//upload()第三个参数就是cb
					upload(req,res,function(err){
						console.log(err)
						if(err){
							//发生错误
							return;
						} else {
							//一切都好
							res.send("ok");
						}		
					})
				})
# 十一  使用Mongoose  NodeJs连接
		使mongodb使用起来更加简便

		1.安装
		cnpm install mongoose --save
		2.连接数据库
		var mongoose=require("mongodb");
		//var dburl="mongodb://username:password@hostname:port/database";
		var dburl="mongodb://127.0.0.1:27017/item";
		var db=mongoose.connect(dburl,function(err){
				if(err){console.log(err);return}
				console.log("数据库链接成功")
			});
		3.预设数据存储结构骨架(数据在集合中的存储规则)
		eg:
		 var userSchema=new mongoose.Schema({
			 	name:{
			 		type:String,//数据存储类型
			 		unique:true //设置值唯一
			 	},
			 	upwd:String,
			 	sex:{
			 		type:Number,
			 		default:2 //设置默认值
			 	},
			 	class:String
		 	});
		 4.绑定数据骨架到集合对象
		 //第三个参数可以使在数据库存储时集合不会被自动加上s,如果没有第三个参数会默认给集合加上s
		 var userModel=mongoose.model("userdata",userSchema,"userSchema","userdata");

		5.关联查询
			在要设置关联的数据骨架中加入:
				uid:{
					type:"ObjectId",// 必须是这个ID 因为它是唯一的
					ref:"users"//reference,  users是被关联的集合
				}
			需要设置两个或多个骨架(Schema)，通过将uid插入到要被关联的集合文档中来实现目的
			userModel.find(con,function(err,data){
			    console.log(data[0]._id)
			    var con={
			      goodsname:"iphone7",
			      price:1000,
			      uid:data[0]._id
			    }
			    indexModel.create(con,function(err,info){
			      console.log(info);
			    })
			  })
			  res.redirect("/")
			});
			app.get("/",function(req,res){
			  indexModel.find({goodsname:"iphone7"}).populate("uid",{name:1,year:1}).exec(function(err,data){
			      console.log(data);
			      res.send("OK");
			  })
			})

		 //populate与exec关键查询固定写法
	# 十二  Mongoose中的增删改查
		userModel.create({uname:"MM",upwd:1234},function(err,info){
			if(err){console.log(err);return;}
			console.log(info);
			})
		userModel.remove({uname:"MM"},function(err,info){
			console.log("删除成功");
			})
		 userModel.update({uname:"Min"},{$set:{uname:"IN"}},function(err,info){
		 	console.log("修改成功");
			})
		userModel.find({uname:"Msea"},function(err,info){
		 	console.log("找到",info);
		 	})
	# 十三 错误信息模块(connect-flash)
		安装:
		cnpm install connect-flash --save
		使用:
		app.use(flash()); 
		app.use(function(req,res,next){
			//将错误信息挂到全局对象locals身上可以全局使用
			res.locals.errMsg=req.flash("errMsg");
			next();
			});
					









