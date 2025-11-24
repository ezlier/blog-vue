---
title: Git
date: 2025-11-12 19:55:29
tags: git
image: https://raw.githubusercontent.com/ezlier/tuchuang/refs/heads/main/cover-10.jpg
---

# Git介绍

Git 是一个开源的分布式版本控制系统。  
常用于项目代码管理、文件管理等场景。它有版本管理的功能，会记录每一次文件的修改，用户可翻看历史版本的文件，或者删除某些历史修改。

------------------

# Git工作流

Git工作流由3个区组成

- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫 stage 或 index。一般存放在 **.git** 目录下的 index 文（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **版本库：**工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库。

-------------------

# Git基本操作

当你要使用Git时，需要先创建一个仓库：

```text
git init           //创建本地仓库
git clone [地址]   //或者下载一个远程仓库
```

如果远程仓库文件发生变化，可以使用`git pull`自动更新本地仓库的文件，但如果本地有同文件被修改了，就会发生冲突。

本地仓库文件修改完成后，需要先上传到暂存区。

```text
git add <filename>        //添加指定文件
git add .                 //添加所有文件
git status                //显示变更文件
```

然后提交本地仓库。

```text
git commit -m "修改信息"
```

最后推送到远程仓库.

```text
git remote add origin <远程仓库地址>  //已连接则跳过这步
git push                  //推送
```

# Git 分支管理

分支是用来将特性开发绝缘开来的。在你创建仓库的时候，master 是“默认的”分支。在其他分支上进行开发，完成后再将它们合并到主分支上。

``` text
git checkout -b [分支命]      //创建分支并切换
git checkout [分支名]         //切换分支
git branch -d [分支名]        //删除分支
git branch                    //查看所有分支
git merge [分支名]            //合并分支
```

