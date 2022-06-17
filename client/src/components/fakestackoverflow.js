import React from 'react';
import axios from 'axios'
let n = 0;
let q =0;
let checker = false;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
let refpage = 0;
let firsttime = true;
export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props);
    this.displayQuestions = this.displayQuestions.bind(this);
    this.render = this.render.bind(this);
    this.state = ({html: null, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD", login: "#0281E8", signup: "#DDDDDD", profile: "#DDDDDD"}, error: [], qref: null, questiondata: null, tagdata: null, answerdata: null, user: null, suerror: [], logerror:[], comment: [], commenterr:[], profilehtml: null});
    this.askQuestionPage = this.askQuestionPage.bind(this);
    this.ChangeToaskQuestionPage = this.ChangeToaskQuestionPage.bind(this);
    this.ChangeTodisplayQuestions = this.ChangeTodisplayQuestions.bind(this);
    this.askQuestInputs = {title: '', text: '', tags: '', username: ''}
    this.tagmap = new Map();
    this.postquestion = this.postquestion.bind(this);
    this.answerquestion = this.answerquestion.bind(this);
    this.handleAnswerBtn = this.handleAnswerBtn.bind(this);
    this.tagpage = this.tagpage.bind(this);
    this.goToTag = this.goToTag.bind(this);
    this.getData = this.getData.bind(this);
    this.updateAnswerData = this.updateAnswerData.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.signUpPage = this.signUpPage.bind(this);
    this.logInputs = {email: '', password: ''}
    this.signupInputs = {email: '', password: '', name: ''}
    this.goToLogin = this.goToLogin.bind(this);
    this.handlesignup = this.handlesignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.goToNextPage = this.goToNextPage.bind(this)
    this.goToPrevPage = this.goToPrevPage.bind(this)
    this.profilepage = this.profilepage.bind(this)
    this.gotoProfile = this.gotoProfile.bind(this)
    this.getDataProfile = this.getDataProfile.bind(this)
    this.gotoProfileAnswer = this.gotoProfileAnswer.bind(this)
    this.tagprofile = this.tagprofile.bind(this)
    this.answerprofile = this.answerprofile.bind(this)
    this.gotoProfileTag = this.gotoProfileTag.bind(this)
    this.commentinput = "";
    this.getData();

  }
  componentDidCatch(error) {
    // Changing the state to true
    // if some error occurs
    this.setState({
      error: true
    });
  }
  render() {
    if (this.state.user == null && firsttime == true){
      this.loginPage();
      firsttime = false;
    }
    if (this.state.user != null)
      sessionStorage.setItem('user', JSON.stringify(this.state.user))
    
    if (sessionStorage.getItem('user')){
      this.state.user = JSON.parse(sessionStorage.getItem('user'))
      console.log("1")
      if (checker == false && this.state.questiondata != null){
        console.log("2")
        this.state.html = <div id = "welcome"><h1>welcome {this.state.user.username}</h1></div>
        checker = true;
        return <div><div id="banner" className = "banner">
          <a id="quest" href="#quest" onClick = {this.ChangeTodisplayQuestions} style={{"backgroundColor" : this.state.tabcolor.question}}>Questions</a>
          <a  id = "tag" href="#tag " onClick = {this.goToTag}style={{"backgroundColor" : this.state.tabcolor.tags}}>Tags</a>
          <b className ="fake">Fake Stack OverFlow</b>
          <a id = "logout" onClick = {this.goToLogin} >Log Out</a>
          <a id = "profile" onClick = {this.gotoProfile}style={{"backgroundColor" : this.state.tabcolor.profile}} >{this.state.user.username}</a>
          <div id = "searchbar" className = "searchbar">
          <input id = "searchtext" type="text" name ="" placeholder="Search..." onKeyPress={this.handleSearchKeyPress.bind(this)}></input>
          </div></div><div id = "inner">{this.state.html}</div></div>
        

      }
    }
  
    if (this.state.error == true){
      return <div>An connection error occur please try again by refreshing or try at later time</div>

    }
    if (sessionStorage.getItem('user')){
      this.state.user = JSON.parse(sessionStorage.getItem('user'))

    }
    let rehtml;
    if (this.state.user == null){
      rehtml = (<div><div id="banner" className = "banner">
      <a id="quest" href="#quest" onClick = {this.ChangeTodisplayQuestions} style={{"backgroundColor" : this.state.tabcolor.question}}>Questions</a>
      <a  id = "tag" href="#tag " onClick = {this.goToTag}style={{"backgroundColor" : this.state.tabcolor.tags}}>Tags</a>
      <b className ="fake">Fake Stack OverFlow</b>
      <a id = "SignUp" onClick={this.signUpPage} style={{"backgroundColor" : this.state.tabcolor.signup}}>Sign Up</a>
      <a id = "Login" onClick = {this.goToLogin} style={{"backgroundColor" : this.state.tabcolor.login}}>Log In</a>
      <div id = "searchbar" className = "searchbar">
      <input id = "searchtext" type="text" name ="" placeholder="Search..." onKeyPress={this.handleSearchKeyPress.bind(this)}></input>
      </div></div><div id = "inner">{this.state.html}</div></div>)
    }
    else {
      rehtml = (<div><div id="banner" className = "banner">
      <a id="quest" href="#quest" onClick = {this.ChangeTodisplayQuestions} style={{"backgroundColor" : this.state.tabcolor.question}}>Questions</a>
      <a  id = "tag" href="#tag " onClick = {this.goToTag}style={{"backgroundColor" : this.state.tabcolor.tags}}>Tags</a>
      <b className ="fake">Fake Stack OverFlow</b>
      <a id = "logout" onClick = {this.goToLogin} >Log Out</a>
      <a id = "profile" onClick = {this.gotoProfile}style={{"backgroundColor" : this.state.tabcolor.profile}} >{this.state.user.username}</a>
      <div id = "searchbar" className = "searchbar">
      <input id = "searchtext" type="text" name ="" placeholder="Search..." onKeyPress={this.handleSearchKeyPress.bind(this)}></input>
      </div></div><div id = "inner">{this.state.html}</div></div>)
    }
    return rehtml
  
  }
  gotoProfile(){
    let theDate = new Date(this.state.user.date);
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let joinon = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
    this.setState({html: <div><div id="sidebar">
    <a id="sidebarL" onClick={() => this.gotoProfile()}>Created questions</a>
    <a id="sidebarL" onClick={() => this.gotoProfileAnswer()}>Created answers</a>
    <a id="sidebar:" onClick={this.gotoProfileTag}>Created tags</a>
    </div><div margin-left="25%" width = "75%"><h3 id ="profileheader">Member since:{joinon}</h3><h3 id ="profileheader" >Reputation:{this.state.user.reputation}</h3>
    <br></br><this.profilepage></this.profilepage></div></div>})

  }
  gotoProfileAnswer(){
    let theDate = new Date(this.state.user.date);
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let joinon = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
    this.setState({html: <div><div id="sidebar">
    <a id="sidebarL" onClick={() => this.gotoProfile()}>Created questions</a>
    <a id="sidebarL" onClick={() => this.gotoProfileAnswer()}>Created answers</a>
    <a id="sidebar:" onClick={this.gotoProfileTag}>Created tags</a>
    </div><div margin-left="25%" width = "75%"><h3 id ="profileheader">Member since:{joinon}</h3><h3 id ="profileheader" >Reputation:{this.state.user.reputation}</h3>
    <br></br><this.answerprofile></this.answerprofile></div></div>})

  }
  gotoProfileTag(){
    let theDate = new Date(this.state.user.date);
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let joinon = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
    this.setState({html: <div><div id="sidebar">
    <a id="sidebarL" onClick={() => this.gotoProfile()}>Created questions</a>
    <a id="sidebarL" onClick={() => this.gotoProfileAnswer()}>Created answers</a>
    <a id="sidebar:" onClick={this.gotoProfileTag}>Created tags</a>
    </div><div margin-left="25%" width = "75%"><h3 id ="profileheader">Member since:{joinon}</h3><h3 id ="profileheader" >Reputation:{this.state.user.reputation}</h3>
    <br></br><this.tagprofile></this.tagprofile></div></div>})

  }
  tagprofile(){
    let output = [];
    let count = 0;
    for (const y of this.state.user.createdTag){
      if (count == 5){
        output.push((<br key = {"qkea" + n} ></br>))
        count = 0;
        n++;

      }

      for (let z of this.state.tagdata){
        if (y == z._id){
          let html = (<a id = "ptag" key = {"tag" + q.toString()} onClick = {() => this.editTag(z, this)}>{z.name}</a>)
          count ++;
          output.push(html)
          q++;
          break;
        }
      }
    }
    if (output.length == 0){
      return <div>No Created Tags</div>
    }
    n++;
    return <div id = "pT">{output}</div>
    
  }
  editTag(ref){
    this.setState({html:<div id = "askanQuest">
    <h2>Change tag name, leave blank if you dont want to change. If you put space and any word after that only the first word will be taken as the tag name.</h2>
    <label>leaving empty will not change the original</label><br></br>
    <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAns.bind(this)} ref = {(input) => this.text = input}></textarea>
    <h3><button id = "pgbtn" onClick={() => this.changeTag(ref , this)} >Change</button> <button onClick={() => this.deleteTag(ref, this)}  id = "pgbtn" >Delete Tag</button><button onClick={this.gotoProfileTag} id = "pgbtn" >Cancel</button></h3></div>})
    

  }
  changeTag(ref){
    let tag = this.askQuestInputs.text;
    tag = tag.split(" ")
    tag = tag.filter(word => word.length > 0 && word != " ");
    if (tag.length == 0){
      this.gotoProfileTag();
    }
    axios.post('http://localhost:8000/post/changeTag', {
      ref:ref,
      name: tag[0],
      email:this.state.user.email
    }).then(res => {this.getDataProfile()})
    this.askQuestInputs.text = ""
  }
  deleteTag(ref){
    axios.post('http://localhost:8000/post/deleteTag', {
      ref:ref,
      email:this.state.user.email
    }).then(res => {this.getDataProfile()})
    
  }
  answerprofile(){
    console.log(2)
    let answerToQuestion = [];
    for (const i of this.state.user.answer){
      for (const j of this.state.answerdata){
        if (i == j._id){
          let dateobj = new Date(j.ans_date_time);
          let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
          let askOn = (monthsArray[dateobj.getMonth()]) + " " +  (dateobj.getDate()) + ", " + (dateobj.getFullYear())
          let atTime = (dateobj.getHours()) + ":" + (dateobj.getMinutes());
          let answer = (<tr key={"anstoQ" + n} onClick ={()=> this.editAnswer(j, this)}><th width = "100%"><p>{j.text}</p></th><th width = "100%"><p>Ans By {j.ans_by}</p><p>On {askOn}</p><p>At {atTime}</p></th></tr>);

          answerToQuestion.push(answer);

          n++;
          break;
        }

      }
    }
    if (answerToQuestion.length == 0){
      return <div>No Answer Created</div>
    }
    return<div>
      <table id =  "QuestionListPage"><tbody><tr>
        <th id = "questionHead">All Answers Created</th>
        </tr>
        </tbody>
      </table>
      <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{answerToQuestion}</tbody></table><div id ="pagebutton"></div>
      </div>;

  }
  editAnswer(ref){
    this.setState({html:<div id = "askanQuest">
    <h2>Answer Text</h2>
    <label>leaving empty will not change the original</label><br></br>
    <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAns.bind(this)} ref = {(input) => this.text = input}></textarea>
    <h3><button id = "pgbtn" onClick={() => this.changeAnswer(ref , this)} >Change</button> <button onClick={() => this.deleteAnswer(ref, this)}  id = "pgbtn" >Delete Question</button><button onClick={this.gotoProfileAnswer} id = "pgbtn" >Cancel</button></h3></div>})
    
  }
  changeAnswer(ref){
    axios.post('http://localhost:8000/post/changeAnswer', {
      ref:ref,
      text: this.askQuestInputs.text,
      email:this.state.user.email
    }).then(res => {this.getDataProfile()})
    this.askQuestInputs.text = ""

  }
  deleteAnswer(ref){
    axios.post('http://localhost:8000/post/deleteAnswer', {
      ref:ref,
      email:this.state.user.email
    }).then(res => {this.getDataProfile()})

  }
  profilepage(){
    console.log("profile")
    let listOfQuestionsHtml = [];
    let tagarray = this.state.tagdata
    for (const j of this.state.user.question){
      for (const i of this.state.questiondata){
        if (j == i._id){
          let theDate = new Date(i.ask_date_time);
          let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
          let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
          let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
          let z = (<tr id = "questionRow" key = {"question" + n.toString()}>
            <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
            <th><a id = "title" onClick={() => this.editQuestion(i, this)}>{i.title}</a><br></br><p id = "summary">{i.summary}</p><br></br><div id = "tags">{ListallTag(i, tagarray)}</div></th>
            <th>Asked By {i.asked_by}<br></br>On {askOn}<br></br>At {atTime}</th>
          </tr>)
          listOfQuestionsHtml.push(z)
          n++;
        }
      }
      

    }
    console.log(listOfQuestionsHtml.length)
    if (listOfQuestionsHtml.length == 0){
      return <div>No question Created</div>
    } 
    return(
      <div>
      <table id =  "QuestionListPage"><tbody><tr>
        <th id = "questionHead">All Questions Created</th>
        </tr>
        </tbody>
      </table>
      <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{listOfQuestionsHtml}</tbody></table><div id ="pagebutton"></div>
      </div>);
    function ListallTag(questionId, tags){
      let output = [];
      let count = 0;
      for (const y of questionId.tags){
        if (count == 4){
          output.push((<br key = {"qkea" + n} ></br>))
          count = 0;
          n++;
  
        }

        for (let z of tags){
          if (y == z._id){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }

  }
  editQuestion(ref){
    this.setState({html:<div id = "askanQuest">
    <h2>Question Title </h2><label>Title should not be more than 100 characters, leaving empty will not change the title</label><br></br>
    <input id = "title_input" placeholder = "No more than 100 characters" onChange={this.getInputAsk.bind(this)} ref = {(input) => this.title = input}></input>
    <h2>Summary</h2>
    <label>Should not be more than 140 character long  and leaving empty will not change the original </label><br></br>
    <textarea id = "summary_input" placeholder ="summary" onChange={this.getInputAsk.bind(this)} name = 'summary' ref = {(input) => this.summary = input}></textarea>
    <h2>Question Text</h2>
    <label>leaving empty will not change the original</label><br></br>
    <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAsk.bind(this)} ref = {(input) => this.text = input}></textarea>
    <h2>Tags</h2>
    <label>Add Keywords seperated by whitespace and leaving empty will not change the original</label><br></br>
    <input id = "tag_input" placeholder ="tags..." onChange={this.getInputAsk.bind(this)} name = 'tags' ref = {(input) => this.tags = input}></input>
    <h3><button id = "pgbtn" onClick={() => this.changeQuestion(ref , this)} >Change</button> <button onClick={() => this.deletequestion(ref, this)}  id = "pgbtn" >Delete Question</button><button onClick={this.gotoProfile} id = "pgbtn" >Cancel</button></h3></div>})

  }
  deletequestion(ref){
    axios.post('http://localhost:8000/post/deleteQuestion', {
      ref:ref,
      email:this.state.user.email
    }).then(res => {this.getDataProfile()})
  }
  changeQuestion(ref){
    let tag = this.askQuestInputs.tags;
    tag = tag.split(" ")
    tag = tag.filter(word => word.length > 0 && word != " ");
    axios.post('http://localhost:8000/post/editQuestions', {
        qref:ref,
        title: this.askQuestInputs.title,
        summary: this.askQuestInputs.summary,
        text: this.askQuestInputs.text,
        tagAr: tag,
        email:this.state.user.email,
        askby: this.state.user.username
      }).then(res => {this.getDataProfile();});
      this.askQuestInputs = {title: '', text: '', tags: '', summary: ''}

  }


  goToLogin(){
    this.setState({user:null, html:<div><div id = "loginpage">{this.state.logerror}
    <h2>Email</h2>
    <input id = "email_login" onChange={this.handLoginInput.bind(this)} ref = {(input) => this.email = input}></input>
    <h2>Password</h2>
    <input id = "password_login" type="password" onChange={this.handLoginInput.bind(this)} ref = {(input) => this.password = input}></input>
    <h3><button id = "postAnQuestionBtn" onClick={this.handleLogin} ><a id = "postAnQuestionBtn">Log in</a></button>
    <button id = "postAnQuestionBtn" onClick={this.signUpPage} ><a id = "postAnQuestionBtn">Sign Up</a></button></h3>
    <h3><button id = "postAnQuestionBtn" onClick={this.ChangeTodisplayQuestions} ><a id = "postAnQuestionBtn"></a>  continue as a guest user</button></h3>
    </div></div>,tabcolor:{question: "#DDDDDD" , tags: "#DDDDDD", login: "#0281E8", signup: "#DDDDDD", profile: "#DDDDDD"}, error:[], suerror:[]})

  }
  handLoginInput(){
    this.logInputs.email = this.email.value;
    this.logInputs.password = this.password.value;

  }
  handleLogin(){
    axios.post('http://localhost:8000/post/account/login',{email: this.logInputs.email, password: this.logInputs.password  }).then(res =>{
      let error = []
      let condition = false;
      console.log(res)
      if  (res.data.length == 0){
        condition = true;
        error.push(<p key = {"loginerr" + n}>The account dose not exist or wrong password</p>)
      }
      if (condition == false){
        this.logInputs = {email: '', password: ''}
        this.setState({user:res.data[0], logerror:[], tabcolor:{question: "#0281E8" , tags: "#DDDDDD", login: "#DDDDDD", signup: "#DDDDDD", profile: "#DDDDDD"}})
        this.ChangeTodisplayQuestions()
        console.log(res.data[0])
        sessionStorage.setItem('user', JSON.stringify(res.data[0]))


      }
      else{
        this.setState({html: <this.goToLogin></this.goToLogin>, logerror: error})
      }

    })
  
  }
  handleSignUpInput(){
    this.signupInputs.email = this.email.value;
    this.signupInputs.password = this.password.value;
    this.signupInputs.name = this.name.value;
  }
  loginPage(){
    if (this.state.user != null){
      this.state.html = this.displayQuestions();
      console.log(this.state.html)
    }
    else {
      this.state.html = <div><div id = "loginpage">{this.state.logerror}
      <h2>Email</h2>
      <input id = "email_login" onChange={this.handLoginInput.bind(this)} ref = {(input) => this.email = input}></input>
      <h2>Password</h2>
      <input id = "password_login" type="password"  onChange={this.handLoginInput.bind(this)} ref = {(input) => this.password = input}></input>
      <h3><button id = "postAnQuestionBtn" onClick={this.handleLogin} ><a id = "postAnQuestionBtn">Log in</a></button>
    <button id = "postAnQuestionBtn" onClick={this.signUpPage} ><a id = "postAnQuestionBtn">Sign Up</a></button></h3>
      <h3><button id = "postAnQuestionBtn" onClick={this.ChangeTodisplayQuestions} ><a id = "postAnQuestionBtn"></a>  continue as a guest user</button></h3>
      </div></div>
    }
  }
  signUpPage(){
    this.setState({html:<div id = "signuppage">{this.state.suerror}
      <h2>Username</h2>
      <input id = "AccountName_login" onChange={this.handleSignUpInput.bind(this)} ref = {(input) => this.name = input}></input>
       <h2>Email</h2>
       <input id = "email_login" onChange={this.handleSignUpInput.bind(this)} ref = {(input) => this.email = input}></input>
       <h2>Password</h2>
      <input id = "password_login" type="password" onChange={this.handleSignUpInput.bind(this)} ref = {(input) => this.password = input}></input>
      <h3><button id = "postAnQuestionBtn" onClick={this.handlesignup} ><a id = "postAnQuestionBtn">Sign Up</a></button></h3>
    </div>, tabcolor:{question: "#DDDDDD" , tags: "#DDDDDD", login: "#DDDDDD", signup: "#0281E8", profile: "#DDDDDD"}, error: []})

  }
  async handlesignup(){
    console.log(this.signupInputs.email)
    await axios.post('http://localhost:8000/post/account/email', {email:this.signupInputs.email}).then(res => {
      let errors = []
      let condition = false;
      console.log(this.signupInputs.email)
      const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      if (!(validateEmail(this.signupInputs.email))){
        condition = true;
        errors.push(<p key = {"emailerr" + n}>Not an Valid Email</p>)
      }
      else if (res.data.length > 0){
        condition = true;
        errors.push(<p key = {"emailerr" + n}>Email Already Exist</p>)
      }
      if (this.signupInputs.name.length == 0){
        condition = true;
        errors.push(<p key = {"Nameerr" + n}>UserName Is Empty</p>)
      }
      if (this.signupInputs.password.length == 0){
        condition = true;
        errors.push(<p key = {"Passwerr" + n}>Password Is Empty</p>)
      }
      else if (this.signupInputs.password.split(this.signupInputs.email).length > 1){
        condition = true;
        errors.push(<p key = {"Passwrr" + n}>Password contain your email</p>)
      }
      else if (this.signupInputs.password.split(this.signupInputs.name).length > 1){
        condition = true;
        errors.push(<p key = {"Passwerr" + n}>Password contain your username</p>)
      }
      if (condition == false){
        axios.post('http://localhost:8000/post/account',
        {
          email:this.signupInputs.email,
          password: this.signupInputs.password,
          name: this.signupInputs.name
        }
        ).then(res =>{
          this.signupInputs = {email: '', password: '', name: ''}
          this.setState({tabcolor:{question: "#0281E8" , tags: "#DDDDDD", login: "#DDDDDD", signup: "#DDDDDD", profile: "#DDDDDD"}, user:res.data[0],suerror: errors})
          this.ChangeTodisplayQuestions()
        })
      }
      else {
        this.setState({html: <this.signUpPage></this.signUpPage>, suerror: errors})
      }

    })
      


  }
  getDataQ(){
    axios.post('http://localhost:8000/post/account/email', {email: this.state.user.email}).then(accres =>{
      this.setState({user:accres.data[0]})
      axios.get('http://localhost:8000/get/comment').then(commentres =>{
        this.setState({comment: (commentres.data).reverse() })
        axios.get('http://localhost:8000/get/tag').then(tagres =>{
        this.setState(({tagdata: tagres.data}))
        axios.get('http://localhost:8000/get/answer').then(ansres =>{
          this.setState(({answerdata: ansres.data}))
          axios.get('http://localhost:8000/get/questions').then(res =>{
            this.tagmap = new Map();
            this.setState(({questiondata: (res.data).reverse()}))
            for (const i of this.state.questiondata){
              for (const j of i.tags){
                if (this.tagmap.has(j)){
                  this.tagmap.get(j).push(i);
                }
                else{
                  this.tagmap.set(j, []);
                  this.tagmap.get(j).push(i);
                }
              }
            }
            this.setState(({html:<this.displayQuestions></this.displayQuestions>, tabcolor: {question: "#0281E8" , tags: "#DDDDDD"}, error: []}));
          })
        })
      })

      })
    })

  }
  getData(){
    axios.get('http://localhost:8000/get/comment').then(commentres =>{
      this.setState({comment: (commentres.data).reverse() })
      axios.get('http://localhost:8000/get/tag').then(tagres =>{
      this.setState(({tagdata: tagres.data}))
      axios.get('http://localhost:8000/get/answer').then(ansres =>{
        this.setState(({answerdata: ansres.data}))
        axios.get('http://localhost:8000/get/questions').then(res =>{
          this.tagmap = new Map();
          this.setState(({questiondata: (res.data).reverse()}))
          for (const i of this.state.questiondata){
            for (const j of i.tags){
              if (this.tagmap.has(j)){
                this.tagmap.get(j).push(i);
              }
               else{
                this.tagmap.set(j, []);
                this.tagmap.get(j).push(i);
              }
            }
          }
        })
      })
    })

    })

  }
  getDataProfile(){
    axios.post('http://localhost:8000/post/account/email', {email:this.state.user.email}).then(accres =>{
      this.setState({user:accres.data[0]})
      axios.get('http://localhost:8000/get/comment').then(commentres =>{
        this.setState({comment: (commentres.data).reverse() })
        axios.get('http://localhost:8000/get/tag').then(tagres =>{
        this.setState(({tagdata: tagres.data}))
        axios.get('http://localhost:8000/get/answer').then(ansres =>{
          this.setState(({answerdata: ansres.data}))
          axios.get('http://localhost:8000/get/questions').then(res =>{
            this.tagmap = new Map();
            this.setState(({questiondata: (res.data).reverse()}))
            for (const i of this.state.questiondata){
              for (const j of i.tags){
                if (this.tagmap.has(j)){
                  this.tagmap.get(j).push(i);
                }
                else{
                  this.tagmap.set(j, []);
                  this.tagmap.get(j).push(i);
                }
              }
            }
            this.gotoProfile()
          })
        })
      })

      })
    })

  }
  handleSearchKeyPress(event){
    if (event.key === "Enter"){
      this.state.page = 0;
      this.searchMatch(event.target.value, this);
    }

  }
  goToTag(){
    this.setState(({html: <this.tagpage></this.tagpage>, tabcolor: {question: "#DDDDDD" , tags: "#0281E8"}, error: []}));

  }
  tagpage(){
    let alltags = []
    let counter = 0;
    let temprow = [];
    this.state.page = 0
    if (this.state.tagdata.length >0){
      for (const i of this.state.tagdata){
        let tempstr;
        console.log(this.tagmap)
        console.log(i._id)
        if (this.tagmap.get(i._id).length == 1){
          tempstr = <p>{this.tagmap.get(i._id).length} Question</p>
        }
        else{
          tempstr = <p>{this.tagmap.get(i._id).length} Questions</p>
        }  
        temprow.push(<th id = "tagbox" key = {"tagP" + n} width = "33%"><a id = "tagname" onClick={() => this.getTagQ(i, this)}>{i.name}</a><br></br>{tempstr}</th>)
        n++;
        counter ++;
        if (counter == 3){
          alltags.push(<tr key = {"n" + n}>{temprow}</tr>)
          temprow = [];
          counter = 0;
          n ++;
        }
      }
    }
    alltags.push(<tr key = {"n" + n}>{temprow}</tr>)
    return (<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "tagHeader">
      <th id = "amountOftags">{this.state.tagdata.length} Tags</th>
      <th id = "tagheader" width ="80%" >All Tags</th>
      <th ><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody>
    </table><table width="100%"><tbody>{alltags}</tbody></table></div>);
  }
  getTagQ(tag){
    let wantedTag = this.tagmap.get(tag._id);
    let listOfQuestionsHtml = [];
    let tagarray = this.state.tagdata
    for (const i of this.state.questiondata){
      if (wantedTag.indexOf(i) > -1){
        let theDate = new Date(i.ask_date_time);
        let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
        let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
        let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
        let z = (<tr id = "questionRow" key = {"question" + n.toString()}>
          <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
          <th><a id = "title" onClick={() => this.viewTheQuestion(i, this)}>{i.title}</a><br></br><p id = "summary">{i.summary}</p><br></br><div id = "tags">{ListallTag(i, tagarray)}</div></th>
          <th>Asked By {i.asked_by}<br></br>On {askOn}<br></br>At {atTime}</th>
        </tr>)
        listOfQuestionsHtml.push(z)
        n++;
      }
    }
    let pagebutton = <div id = "pg"></div>
      if (this.state.page == 0){
        if (this.state.questiondata.length > 5)
          pagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToTagNextPage(tag, this)}>Next</button></div>
      }
      else if (listOfQuestionsHtml.length - (this.state.page*5) <= 5){
        pagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() =>this.goToTagPrevPage(tag, this)}>Prev</button></div>
  
      }
      else {
        pagebutton = <div id = "pg"><button id = "pgbtn" onClick={() =>this.goToTagPrevPage(tag, this)}>Prev</button><button id = "pgbtn" onClick ={() => this.goToTagNextPage(tag, this)}>Next</button></div>
      }
    this.setState({html:<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "tagHeader">
      <th>{this.tagmap.get(tag._id).length} Questions</th>
      <th >Questions tagged [{tag.name}]</th>
      <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody>
    </table><table width="100%"></table> <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{listOfQuestionsHtml.slice(this.state.page, this.state.page + 5)}</tbody></table></div>});

    function ListallTag(questionId, tags){
      let output = [];
      let count = 0;
      for (const y of questionId.tags){
        if (count == 4){
          output.push((<br key = {"qkea" + n} ></br>))
          count = 0;
          n++;

        }

        for (let z of tags){
          if (y == z._id){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }

  }
  goToTagNextPage(tag){
    this.state.page = this.state.page + 5
    this.getTagQ(tag)

  }
  goToTagprevPage(tag){
    this.state.page = this.state.page - 5
    this.getTagQ(tag)

  }
  displayQuestions() {
    let listOfQuestionsHtml = [];
    let tagarray = this.state.tagdata
    for (const i of this.state.questiondata){
      let theDate = new Date(i.ask_date_time);
      let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
      let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
      let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
      let z = (<tr id = "questionRow" key = {"question" + n.toString()}>
        <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
        <th><a id = "title" onClick={() => this.viewTheQuestion(i, this)}>{i.title}</a><br></br><p id = "summary">{i.summary}</p><br></br><div id = "tags">{ListallTag(i, tagarray)}</div></th>
        <th>Asked By {i.asked_by}<br></br>On {askOn}<br></br>At {atTime}</th>
      </tr>)
      listOfQuestionsHtml.push(z)
      n++;
    }
    listOfQuestionsHtml = listOfQuestionsHtml.slice(this.state.page, this.state.page + 5)
    let pagebutton = <div id = "pg"></div>
    if (this.state.page == 0){
      if (this.state.questiondata.length > 5)
        pagebutton = <div id = "pg"><button id = "pgbtn" onClick ={this.goToNextPage}>Next</button></div>
    }
    else if (this.state.questiondata.length - (this.state.page*5) <= 5){
      pagebutton = <div id = "pg"> <button id = "pgbtn" onClick={this.goToPrevPage}>Prev</button></div>

    }
    else {
      pagebutton = <div id = "pg"><button id = "pgbtn" onClick={this.goToPrevPage}>Prev</button><button id = "pgbtn" onClick ={this.goToNextPage}>Next</button></div>
    }
    return(
      <div>
      <table id =  "QuestionListPage"><tbody><tr>
        <th id = "amountquestion">{this.state.questiondata.length} Questions</th>  
        <th id = "questionHead">All Questions</th>
        <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
        </tr>
        </tbody>
      </table>
      <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{listOfQuestionsHtml}</tbody></table><div id ="pagebutton">{pagebutton}</div>
      </div>);
    function ListallTag(questionId, tags){
      let output = [];
      let count = 0;
      for (const y of questionId.tags){
        if (count == 4){
          output.push((<br key = {"qkea" + n} ></br>))
          count = 0;
          n++;
  
        }

        for (let z of tags){
          if (y == z._id){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }
  
    
  }
  goToNextPage(){
    this.setState({html:<this.displayQuestions></this.displayQuestions>,page:this.state.page + 5})

  }
  goToPrevPage(){
    this.setState({html:<this.displayQuestions></this.displayQuestions>, page:this.state.page - 5})
    
  }
  getInputAsk(){
    console.log(this.summary.value)
    this.askQuestInputs.title = this.title.value;
    this.askQuestInputs.text = this.text.value;
    this.askQuestInputs.tags = this.tags.value;
    this.askQuestInputs.summary = this.summary.value;
  }
  searchMatch(searchString){
    let searchlist = searchString.split(" ");
    let matchedQuestion = [];
    if (searchString.replace(/\s/g,'') != ""){
      for (const i of this.state.questiondata){
        let condition = false;
        for (const j of searchlist){
          if (j.charAt(0) == "[" && j.charAt(j.length - 1) == ']'){
            let searchtag = j.substring(1, j.length - 1);
            searchtag = searchtag.toLowerCase();
            for (const z of this.state.tagdata){
              if (searchtag == z.name){
                searchtag = z._id;
                condition = true;
                break;
              }
            }
            if (condition == true){
              for (const z of i.tags){
                if (searchtag == z){
                  condition = true;
                  break;
                }
                else{
                  condition = false;
                }
              }
            }
          }
          if (condition == true || i.text.toLowerCase().indexOf(j.toLowerCase()) > -1 || i.title.toLowerCase().indexOf(j.toLowerCase()) > -1){
            let tagarray = this.state.tagdata
            let theDate = new Date(i.ask_date_time);
            let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
            let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
            let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
            let z = (<tr id = "questionRow" key = {"seaquestion" + n.toString()}>
              <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
              <th><div id = "title"><a onClick={() => this.viewTheQuestion(i, this)}>{i.title}</a></div><br></br><p id = "summary">{i.summary}</p><br></br><div id = "tags">{ListallTag(i, tagarray)}</div></th>
              <th>Asked By {i.asked_by}<br></br>On {askOn}<br></br>At {atTime}</th>
              </tr>);
            matchedQuestion.push(z)
            n++;
            break
          }
        }
      }
    }
    let size = matchedQuestion.length;
    let matchedHtml;
    if (matchedQuestion.length == 0){
      matchedQuestion = <tr><th>No Question Found</th></tr>
      matchedHtml = (<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "searchheader">
      <th id = "amountquestion">{size} Questions</th>
      <th id = "questionHead">Search Results</th>
      <th ><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage}>Ask A Question</a></button></th>
    </tr></tbody>
    </table><table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{matchedQuestion}</tbody></table></div>);
      
    }
    else{
      let pagebutton = <div id = "pg"></div>
      if (this.state.page == 0){
        if (this.state.questiondata.length > 5)
          pagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToSearchNextPage(searchString, this)}>Next</button></div>
      }
      else if (matchedQuestion.length - (this.state.page*5) <= 5){
        pagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() =>this.goToSearchPrevPage(searchString, this)}>Prev</button></div>
  
      }
      else {
        pagebutton = <div id = "pg"><button id = "pgbtn" onClick={() =>this.goToSearchPrevPage(searchString, this)}>Prev</button><button id = "pgbtn" onClick ={() => this.goToSearchNextPage(searchString, this)}>Next</button></div>
      }
      matchedHtml = (<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "searchheader">
      <th id = "amountquestion">{size} Questions</th>
      <th id = "questionHead">Search Results</th>
      <th ><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage}>Ask A Question</a></button></th>
    </tr></tbody>
    </table><table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{matchedQuestion.slice(this.state.page, this.state.page + 5)}</tbody></table>
    <div id ="pagebutton">{pagebutton}</div></div>);
    }
    this.setState({html: matchedHtml, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: []})
    function ListallTag(questionId, tags){
      let output = [];
      let count = 0;
      for (const y of questionId.tags){
        if (count == 4){
          output.push((<br key = {"qkea" + n} ></br>))
          count = 0;
          n++;

        }

        for (let z of tags){
          if (y == z._id){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }


  }
  goToSearchNextPage(searchString){
    this.state.page = this.state.page + 5
    this.searchMatch(searchString)

  }
  goToSearchPrevPage(searchString){
    this.state.page = this.state.page - 5
    this.searchMatch(searchString)

    
  }
  askQuestionPage(){
    if (this.state.user == null){
      let error = []
      error.push(<p key = {"feature err" + n}>Sign in or Sign up to use the feature</p>)
      this.state.logerror = error
      this.goToLogin();

    }
    else{
      return (<div id = "askanQuest">{this.state.error}
      <h2>Question Title </h2><label>Title should not be more than 100 characters</label><br></br>
      <input id = "title_input" placeholder = "No more than 100 characters and should not be empty." onChange={this.getInputAsk.bind(this)} ref = {(input) => this.title = input}></input>
      <h2>Summary</h2>
      <label>Should not be more than 140 character long</label><br></br>
      <textarea id = "summary_input" placeholder ="summary" onChange={this.getInputAsk.bind(this)} name = 'summary' ref = {(input) => this.summary = input}></textarea>
      <h2>Question Text</h2>
      <label>Add Details</label><br></br>
      <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAsk.bind(this)} ref = {(input) => this.text = input}></textarea>
      <h2>Tags</h2>
      <label>Add Keywords seperated by whitespace.</label><br></br>
      <input id = "tag_input" placeholder ="tags..." onChange={this.getInputAsk.bind(this)} name = 'tags' ref = {(input) => this.tags = input}></input>
    
      <h3><button id = "postAnQuestionBtn" onClick={this.postquestion} ><a id = "postAnQuestionBtn">Post Question</a></button></h3></div>);
    }
    
  }
  postquestion(){
    let errors = []
    let dateobj = new Date();
    let y = true;
    let tag = this.askQuestInputs.tags;
    tag = tag.split(" ")
    tag = tag.filter(word => word.length > 0 && word != " ");
    if (this.askQuestInputs.title.length > 50 || this.askQuestInputs.title.length == 0){
      y = false;
      errors.push(<p key = {"title" + n}>The title is more than 50 characters or empty</p>)

    }
    if (this.askQuestInputs.summary.length > 140){
      y = false;
      errors.push(<p key = {"text" + n}>summary over 140</p>)

    }
    if (this.askQuestInputs.text.length == 0){
      y = false;
      errors.push(<p key = {"text" + n}>The text is empty</p>)
    }
    const tagvalue = [...this.tagmap.values()]
    for (const i in tag){
      if (tagvalue.indexOf(i) == -1){
        if (this.state.user.reputation < 100){
          y = false;
          errors.push(<p key = {"rep" + n}>Not Enough reputation to make new Tag</p>)
          break;
        }

      }

      
    }
    if (y == true){
      axios.post('http://localhost:8000/post/addQuestions', {
        title: this.askQuestInputs.title,
        summary: this.askQuestInputs.summary,
        text: this.askQuestInputs.text,
        tagAr: tag,
        email:this.state.user.email,
        askby: this.state.user.username,
        date: dateobj,}).then(res => {this.getDataQ()});
      this.askQuestInputs = {title: '', text: '', tags: '', username: '',  summary: ''}
    }
    else{
      this.setState({html: <this.askQuestionPage></this.askQuestionPage>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: errors})
    }

  }
  ChangeTodisplayQuestions(){
    this.state.page = 0;
    this.setState(({html:<this.displayQuestions></this.displayQuestions>, tabcolor: {question: "#0281E8" , tags: "#DDDDDD"}}))
  }
  ChangeToaskQuestionPage(){
    this.setState(({html: <this.askQuestionPage></this.askQuestionPage>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}}));
  }
  goToViewQQNextPage(question, ref){
    console.log(1)
    this.state.commentlist.get(ref).page += 3
    this.viewquesthelper(question)

  }
  goToViewQQPrevPage(question, ref){
    this.state.commentlist.get(ref).page -= 3
    this.viewquesthelper(question)

  }
  viewTheQuestion(question){
    this.state.page = 0;
    question.views += 1;
    let url = 'http://localhost:8000/post/questions/' + question._id
    axios.post(url,{
        view:question.views
      }).then(res =>{console.log("working")})
    this.state.commentlist = new Map(); 
    this.getComment(question, this)
    this.viewquesthelper(question);
    
  }
  viewquesthelper(question){
    let answerToQuestion = [];
    for (const i of question.answers){
      for (const j of this.state.answerdata){
        if (i == j._id){
          this.getComment(j, this)
          let commentlist = this.state.commentlist.get(j).html
          let compagebutton = <div id = "pg"></div>
          if (this.state.commentlist.get(question).page == 0){
            if (this.state.commentlist.get(question).html.length > 3)
              compagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToViewQQNextPage(question, j)}>Next</button></div>
          }
          else if (this.state.commentlist.get(question).html.length - (this.state.commentlist.get(question, this).page*3) < 3){
            compagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() => this.goToViewQQPrevPage(question, j)}>Prev</button></div>

          }
          else {
            compagebutton = <div id = "pg"><button id = "pgbtn" onClick={() => this.goToViewQQPrevPage(question, j)}>Prev</button><button id = "pgbtn" onClick ={() => this.goToViewQQNextPage(question, j)}>Next</button></div>
          }
          
          let commenctsection = <div id = "comment" >{compagebutton}<table id = "commentT"><tbody>{commentlist.slice(this.state.commentlist.get(j).page, this.state.commentlist.get(j).page + 3)}</tbody></table><br></br>
          <button id = "pgbtn" onClick={() =>this.commentpage(i, "answer", question, this)}>Comment</button></div>
          let dateobj = new Date(j.ans_date_time);
          let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
          let askOn = (monthsArray[dateobj.getMonth()]) + " " +  (dateobj.getDate()) + ", " + (dateobj.getFullYear())
          let atTime = (dateobj.getHours()) + ":" + (dateobj.getMinutes());
          let answer = (<tr key={"anstoQ" + n}><tr ><button onClick={()=> this.handleUpvote(j, "answer", question, this)} id = 'pgbtn'>UpVote</button><p>{j.vote}</p><button id ='pgbtn' onClick={()=> this.handleDovote(j, "answer", question, this)}>DownVote</button><th width = "100%"><p>{j.text}</p></th><th width = "100%"><p>Ans By {j.ans_by}</p><p>On {askOn}</p><p>At {atTime}</p></th></tr><tr width = '100%'>{commenctsection}</tr></tr>);

          answerToQuestion.push(answer);

          n++;
          break;

        }
      }

    }
    let pagebutton = <div id = "pg"></div>
    if (this.state.page == 0){
      if (answerToQuestion.length > 5)
        pagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToViewQNextPage(question)}>Next</button></div>
    }
    else if (answerToQuestion.length - (this.state.page*5) <= 5){
      console.log("113")
      pagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() => this.goToViewQPrevPage(question)}>Prev</button></div>

    }
    else {
      pagebutton = <div id = "pg"><button id = "pgbtn" onClick={() => this.goToViewQPrevPage(question)}>Prev</button><button id = "pgbtn" onClick ={() => this.goToViewQNextPage(question)}>Next</button></div>
    }
    let commentlist = this.state.commentlist.get(question).html
    let compagebutton = <div id = "pg"></div>
    if (this.state.commentlist.get(question).page == 0){
      if (this.state.commentlist.get(question).html.length > 3)
        compagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToViewQQNextPage(question, question)}>Next</button></div>
    }
    else if (this.state.commentlist.get(question).html.length - (this.state.commentlist.get(question).page*3) < 3){
      compagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() => this.goToViewQQPrevPage(question, question)}>Prev</button></div>

    }
    else {
      compagebutton = <div id = "pg"><button id = "pgbtn" onClick={() => this.goToViewQQPrevPage(question, question)}>Prev</button><button id = "pgbtn" onClick ={() => this.goToViewQQNextPage(question, question)}>Next</button></div>
    }
    let commenctsection = <div id = "comment" >{compagebutton}<table id = "commentT"><tbody>{commentlist.slice(this.state.commentlist.get(question).page, this.state.commentlist.get(question).page + 3)}</tbody></table><br></br>
    <button id = "pgbtn" onClick={() =>this.commentpage(question,"quest", question, this)}>Comment</button></div>


    let theDate = new Date(question.ask_date_time);
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
    let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
    let questionHtml = (<div id = "questionpage">{this.state.qerr}<table id =  "QuestionListPage"><tbody><tr><button id = 'pgbtn' onClick={()=> this.handleUpvote(question, "quest", question, this)}>UpVote</button><p>{question.vote}</p><button id ='pgbtn' onClick={()=> this.handleDovote(question, "quest", question, this)}>DownVote</button>
    <th id = "amountquestion">{question.answers.length} Answers</th>  
    <th id = "questionHead" width ="100%">{question.title}</th>
    <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody></table><table width="100%" className = "questionsecondrow"><tbody>
    <tr height="100px" className = "secondrow">
      <th id = "views">Views {question.views}</th>
      <th id = "context" width = "75%"><p>{question.text}</p></th>
      <th><p id = "askby" >Asked By {question.asked_by}</p><p id = "date">Asked On {askOn}</p><p id = "time" >At {atTime}</p></th>
    </tr></tbody>
    </table>{commenctsection}<table id = "questionThreads"><tbody>{answerToQuestion.slice(this.state.page, this.state.page + 5)}</tbody></table><button id = "ansbtn" onClick={() => this.goToanswerquestion(question, this)}><a>Answer Question</a></button>
    {pagebutton}</div>)
    this.setState({html: questionHtml, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}}, );

  }
  
  handleUpvote(ref, string, question){
    if (this.state.user == null){
      let error = []
      error.push(<p key = {"feature err" + n}>Sign in or Sign up to use the feature</p>)
      this.state.logerror = error
      this.goToLogin();

    }
    else{
      this.state.qerr = []
      if (this.state.user.reputation < 100){
        this.state.qerr.push(<p>not enough reputation to vote</p>)
        this.viewquesthelper(question);
      }
      else{
        this.state.qref = question
        axios.post('http://localhost:8000/post/upvote', {ref:ref, string: string}).then(res =>this.updateAnswerData())
        this.state.qerr = null

      }

    }
    

  }
  handleDovote(ref, string, question){
    if (this.state.user == null){
      let error = []
      error.push(<p key = {"feature err" + n}>Sign in or Sign up to use the feature</p>)
      this.state.logerror = error
      this.goToLogin();
  
    }
    else {
      this.state.qerr = []
      if (this.state.user.reputation < 100){
        this.state.qerr.push(<p>not enough reputation to vote</p>)
        this.viewquesthelper(question);
      }
      else{
        this.state.qref = question
        axios.post('http://localhost:8000/post/downvote', {ref:ref, string: string}).then(res =>this.updateAnswerData())
        this.state.qerr = null;

      }

    }

  }
  inputcommet(){
    console.log(this.comment.value)
    this.commentinput = this.comment.value;

  }
  commentpage(ref, string, qref){
    if (this.state.user == null){
      let error = []
      error.push(<p key = {"feature err" + n}>Sign in or Sign up to use the feature</p>)
      this.state.logerror = error
      this.goToLogin();

    }
    this.setState({html:<div id = "commentpg">{this.state.commenterr}<textarea wrap = "virtual"  onChange={this.inputcommet.bind(this)} ref = {(input) => this.comment = input}></textarea><br></br><button id = "pgbtn" onClick={() =>this.handleComment(ref, string, qref, this)}>Comment</button></div>})

  }
  getComment(ref){
    let htmlar = []
    for (const i of ref.comments){
      for (const j of this.state.comment){
        if (i == j._id){
          let comment = (<tr id = "ctr" key={"comm" + n}><th width = "70%"><p>{j.text}</p></th><th><p>comment By {j.com_by}</p></th></tr>);
          htmlar.push(comment);
          n++;

        }

      }

    }
    let obj = {
      html: htmlar,
      page: 0
    }
    this.state.commentlist.set(ref, obj)

  }
  handleComment(ref, string, qref){
    let err = []
    console.log(this.commentinput)
    this.state.qref = qref
    if (this.commentinput.length == 0 || this.commentinput.length > 140){
      err.push(<p id = "err"key={"len" + n}>comment is empty or more than 140 character</p>)
    }
    if (this.state.user.reputation < 100){
      err.push(<p id = "err"key={"repcom" + n}>reputation is not enough to comment</p>)
    }
    if (err.length == 0){
      if (string == "answer"){
        axios.post('http://localhost:8000/post/comment/answer', {
        ref:ref,
        text:this.commentinput,
        name:this.state.user.username,
        email:this.state.user.email
      }).then(res => this.updateAnswerData())
      this.commentinput = "";

      }
      else{
        axios.post('http://localhost:8000/post/comment/quest', {
        ref:ref,
        text:this.commentinput,
        name:this.state.user.username,
        email:this.state.user.email
      }).then(res => this.updateAnswerData())
      this.commentinput = "";

      }

    }
    else { 
      this.state.commenterr = err; 
      this.commentpage(ref, string)

    }

  }


  goToViewQNextPage(question){
    this.state.page = this.state.page + 5
    this.viewquesthelper(question);

  }
  goToViewQPrevPage(question){
    this.state.page = this.state.page - 5
    this.viewquesthelper(question);
  }
  viewTheQuestion2nd(question){
    let answerToQuestion = [];
    for (const i of question.answers){
      for (const j of this.state.answerdata){
        if (i == j._id){
          let dateobj = new Date(j.ans_date_time);
          let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
          let askOn = (monthsArray[dateobj.getMonth()]) + " " +  (dateobj.getDate()) + ", " + (dateobj.getFullYear())
          let atTime = (dateobj.getHours()) + ":" + (dateobj.getMinutes());
          let answer = (<tr key={"anstoQ" + n}><th width = "85%"><p>{j.text}</p></th><th><p>Ans By {j.ans_by}</p><p>On {askOn}</p><p>At {atTime}</p></th></tr>);
          answerToQuestion.push(answer);
          n++;
          break;

        }
      }

    }
    let pagebutton = <div id = "pg"></div>
    if (this.state.page == 0){
      if (answerToQuestion.length > 5)
        pagebutton = <div id = "pg"><button id = "pgbtn" onClick ={() => this.goToViewQNextPage(question)}>Next</button></div>
    }
    else if (answerToQuestion.length - (this.state.page*5) <= 5){
      console.log("113")
      pagebutton = <div id = "pg"> <button id = "pgbtn" onClick={() => this.goToViewQPrevPage(question)}>Prev</button></div>

    }
    else {
      pagebutton = <div id = "pg"><button id = "pgbtn" onClick={() => this.goToViewQPrevPage(question)}>Prev</button><button onClick ={() => this.goToViewQNextPage(question)}>Next</button></div>
    }
    let theDate = new Date(question.ask_date_time);
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let askOn = (monthsArray[theDate.getMonth()]) + " " +  (theDate.getDate()) + ", " + (theDate.getFullYear())
    let atTime = (theDate.getHours()) + ":" + (theDate.getMinutes());
    let questionHtml = (<div><table id =  "QuestionListPage"><tbody><tr>
    <th id = "amountquestion">{question.answers.length} Answers</th>  
    <th id = "questionHead" width ="100%">{question.title}</th>
    <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody></table><table width="100%" className = "questionsecondrow"><tbody>
    <tr height="100px" className = "secondrow">
      <th id = "views">Views {question.views}</th>
      <th id = "context" width = "75%"><p>{question.text}</p></th>
      <th><p id = "askby" >Asked By {question.asked_by}</p><p id = "date">Asked On {askOn}</p><p id = "time" >At {atTime}</p></th>
    </tr></tbody>
    </table><table id = "questionThreads"><tbody>{answerToQuestion.slice(this.state.page, this.state.page + 5)}</tbody></table><button id = "ansbtn" onClick={() => this.goToanswerquestion(question, this)}><a>Answer Question</a></button>
    {pagebutton}</div>)
    this.setState({html: questionHtml, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}}, );
  }
  




  answerquestion(){
    return (<div id = "askanQuest">{this.state.error}
    <h2>Answer Text</h2>
    <label>Add Details</label><br></br>
    <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAns.bind(this)} ref = {(input) => this.text = input}></textarea>
    <h3><button id = "postAnQuestionBtn" onClick={this.handleAnswerBtn} ><a id = "postAnQuestionBtn">Post Answer</a></button></h3></div>);
  }
  goToanswerquestion(question){
    if (this.state.user == null){
      let error = []
      error.push(<p key = {"feature err" + n}>Sign in or Sign up to use the feature</p>)
      this.state.logerror = error
      this.goToLogin();

    }
    else{
      this.setState({html: <this.answerquestion></this.answerquestion>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, qref: question, error: []});
    }

    
  }
  getInputAns(){
    this.askQuestInputs.text = this.text.value;
  }
  handleAnswerBtn(){
    console.log(this.state.qref)
    let errors = []
    let dateobj = new Date();
    let y = true;
    if (this.askQuestInputs.text.length == 0){
      y = false;
      errors.push(<p key = {"text" + n}>The text is empty</p>)
    }
    if (y == true){
      axios.post('http://localhost:8000/post/answer', {
        qref:this.state.qref,
        text:this.askQuestInputs.text,
        name:this.state.user.username,
        date:dateobj,
        email:this.state.user.email
      }).then(res => this.updateAnswerData())
      this.askQuestInputs = {title: '', text: '', tags: '', username: ''}
      this.state.error =  errors
      
    }
    else{
      this.setState({html: <this.answerquestion></this.answerquestion>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: errors})
    }


  }
  updateAnswerData(){
    axios.post('http://localhost:8000/post/account/email', {email: this.state.user.email}).then(accres =>{
      this.setState({user:accres.data[0]})
      axios.get('http://localhost:8000/get/comment').then(commentres =>{
        this.setState({comment: (commentres.data).reverse() })
        axios.get('http://localhost:8000/get/tag').then(tagres =>{
          this.setState(({tagdata: tagres.data}))
          axios.get('http://localhost:8000/get/answer').then(ansres =>{
            this.setState(({answerdata: ansres.data}))
            axios.get('http://localhost:8000/get/questions').then(res =>{
              this.tagmap = new Map();
              let qref = this.state.qref
              this.setState(({questiondata: (res.data).reverse()}))
              for (const i of this.state.questiondata){
                if (qref._id == i._id){
                  qref = i
                }
                for (const j of i.tags){
                  if (this.tagmap.has(j)){
                    this.tagmap.get(j).push(i);
                  }
                  else{
                    this.tagmap.set(j, []);
                    this.tagmap.get(j).push(i);
                  }
                }
              }
              this.viewTheQuestion(qref)
              this.setState({qref: null});
              
            })
          })
        })
      })
    })

  }
  

  


}