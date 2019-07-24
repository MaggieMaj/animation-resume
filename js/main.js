var result =`
/*
* 面试官你好，我是XXX
* 只用文字作做我介绍太单调了
* 我就用代码来介绍吧
*/
/* 加个渐变 */
*{
transition:all 1s;
}
html{
  background:#cbb;
  font-size:16px;
}
/* 加个边框 */
#code{
  border:1px solid #000;
  padding:16px;
}
/* 加一点代码高亮 */
.token.property{
    color:#690;
}
.token.selector{
    color:#905;
}
.token.function{
    color:yellow;
}
/* 加一点呼吸效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
  }
/* 现在我来介绍我自己吧 */
/* 我需要一张白纸 */
#code-wrapper{
  width:50%;
  left:0; 
  position:fixed; 
  height:100%;
     
}
#paper >.content{
  display:block;
  background:white;
  width:100%;
  height:100%;
}
`
var result2 = `
#paper{
/* 接下来，找一个库marked.js 把 Markdown 变成HTML */

/* 这就是我的会动的简历 */
}`

var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
var result3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
writeCode('',result,()=>{//writeCode call function fn（回调）
    createPaper(()=>{//同步函数 也可以加 回调
        console.log('paper有了')
        writeMarkdown(md,()=>{//不覆盖前面的代码，加前缀prefix
            writeCode(result,result2,()=>{
                convertMarkdownToHtml(()=>{
                    writeCode(result+result2,result3,()=>{
                      console.log('完成')
                    })
                })
            })
        })
    })
})
//console.log('执行fn2');fn2()

/*把code写到#code和styleTag里
* wirtCode是异步函数：不等结果直接进行下一步
*回调是拿到异步结果的一种方式，回调也可以拿到同步结果
*设置闹钟，writeCode 返回，执行fn2，闹钟时间到，开始写代码
*/
function writeCode(prefix,code,fn){//writeCode call function fn（回调）
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    //console.log('设置闹钟')
    let id = setInterval(()=>{
        n +=1
        //console.log('开始写代码')
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n),Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n>code.length){
          window.clearInterval(id)
          fn && fn.call()
        }
      },10)
}

//在code的后面添加一个paper
function createPaper(fn){
    var paper = document.createElement('div')//创建一个div作为paper
    paper.id = 'paper'//这个div的id 设置为paper
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)//创建了一个pre叫content 作为paper的儿子
    document.body.appendChild(paper)//把paper当作body的最后一个儿子
    fn && fn.call()
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

function convertMarkdownToHtml(fn){
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper>.content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
//fn3就是给paper加样式
/*function fn3(preResult){
    var n = 0
    var id = setInterval(()=>{
        n+=1
        code.innerHTML = preResult + result.substring(0,n)
        code.innerHTML = Prism.highlight(code.innerHTML,Prism.languages.css)
        styleTag.innerHTML = preResult + result.substring(0,n)
        if(n>=code.length){
          window.clearInterval(id)
        }
      },10)    
}
*/