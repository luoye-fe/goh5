MongoDB的安装和使用
========================

[MongoDB下载页](https://www.mongodb.org/downloads#production)

根据平台下载安装，安装完成后

* ##### mac平台可以直接在命令行中使用

	如果把数据保存在本地 `~/data/db` 的文件夹并启动服务，执行
	```
	~/data/db && mongod --dbpath ~/data/db
	```

	数据库操作，执行

	```
	mongo
	```

	进入命令行操作

	```
	show dbs // 查看所有非空数据库
	```

	```
	use goh5 // 使用名为goh5的数据库，如果不存在将新建此数据库
	```

* ##### win平台需要进入mongodb的安装目录的bin文件夹下进行命令行操作，并且需要带上 `.exe` 执行命令，如 

	```
	mongod.exe --dbpath d:/data/db

	mongo.exe
	```

	其它命令不用带～



详细自行谷歌