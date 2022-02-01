!function(e){var t={};function o(d){if(t[d])return t[d].exports;var r=t[d]={i:d,l:!1,exports:{}};return e[d].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,d){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(o.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(d,r,function(t){return e[t]}.bind(null,r));return d},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=11)}([function(e,t,o){"use strict";var d=this&&this.__awaiter||function(e,t,o,d){return new(o||(o=Promise))((function(r,i){function s(e){try{l(d.next(e))}catch(e){i(e)}}function u(e){try{l(d.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,u)}l((d=d.apply(e,t||[])).next())}))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.dbDisconnect=t.dbConnect=t.db=void 0;const i=o(18);r(o(4)).default.config(),t.db=i.createConnection({host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASS,port:Number(process.env.DB_PORT),database:process.env.DB_DATABASE});t.dbConnect=()=>d(void 0,void 0,void 0,(function*(){yield t.db.connect(e=>{e?console.log("DB接続失敗: "+e):console.log("DB接続成功")})}));t.dbDisconnect=()=>d(void 0,void 0,void 0,(function*(){yield t.db.end(e=>{e?console.log("DB切断失敗: "+e):console.log("DB切断成功")})}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchSmallGoals=void 0;const d=o(0);t.fetchSmallGoals=(e,t)=>{const o={work_id:e.params.id};d.db.query("WITH work AS (SELECT * FROM works WHERE ?) SELECT work_name, small_goal_id, small_goal_name, small_goals.completed, small_goals.total_time FROM work LEFT JOIN small_goals ON work.work_id = small_goals.work_id",o,(e,o)=>{if(e)throw e;t.json(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchWorks=void 0;const d=o(0);t.fetchWorks=(e,t)=>{const o={user_id:e.params.id};d.db.query("SELECT * FROM works WHERE ?",o,(e,o)=>{if(e)throw e;t.json(o)})}},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchChat=void 0;const d=o(0);t.fetchChat=(e,t)=>{d.db.query("SELECT * FROM chat WHERE guild_id = ?",e.params.id,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchMyGuild=void 0;const d=o(0);t.fetchMyGuild=(e,t)=>{const o={user_id:e.params.id};d.db.query("WITH members AS (SELECT * FROM guild_members WHERE ?) SELECT guilds.guild_id, guild_name, guild_picture, comment, admin_id FROM members JOIN guilds ON members.guild_id = guilds.guild_id",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchUser=void 0;const d=o(0);t.fetchUser=(e,t)=>{const o={user_id:e.params.id};d.db.query("SELECT * FROM users WHERE ?",o,(e,o)=>{if(e)throw e;t.send(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postGuildMember=void 0;const d=o(0),r=o(7);t.postGuildMember=(e,t)=>{const o={user_id:e.params.id,guild_id:e.body.guildId};d.db.query("INSERT INTO guild_members SET ?",o,e=>{if(e)throw e}),r.fetchMyGuild(e,t)}},function(e,t,o){"use strict";var d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.setCookie=void 0;const r=o(0),i=d(o(5));t.setCookie=(e,t)=>{r.db.query("SELECT user_id FROM users WHERE mail= ? AND password= SHA1(?)",[e.body.mail,e.body.pass],(e,o)=>{if(e)throw e;if(o[0]){const e=i.default.sign({userId:o[0].user_id},"JwtSecret");t.cookie("userId",e,{httpOnly:!0}),t.cookie("auth",!0),t.json({userId:o[0].user_id})}else t.json({err:"mail or password is not correct"})})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const d=o(12),r=process.env.port||4e3;d.app.listen(r,()=>{console.log("port: "+r)})},function(e,t,o){"use strict";var d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.app=void 0;const r=d(o(3)),i=d(o(13)),s=d(o(14)),u=d(o(4)),l=o(15),n=o(0);u.default.config(),t.app=r.default();const a={credentials:!0,origin:process.env.URL};t.app.use(i.default(a)),t.app.use(s.default()),t.app.use("/",l.router),n.dbConnect()},function(e,t){e.exports=require("cors")},function(e,t){e.exports=require("cookie-parser")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.router=void 0;const d=o(3),r=o(16),i=o(17),s=o(19),u=o(20),l=o(21),n=o(22),a=o(23),c=o(24),f=o(6),p=o(25),_=o(26),m=o(27),b=o(28),y=o(29),h=o(7),E=o(30),v=o(31),g=o(1),O=o(8),T=o(32),M=o(2),w=o(33),S=o(34),R=o(35),P=o(9),k=o(36),j=o(37),W=o(10),C=o(38),q=o(39),G=o(40),I=o(41),D=o(42),H=o(43),L=o(44),N=o(45),F=o(46),A=o(47),x=o(48);t.router=d.Router(),t.router.use(d.json()),t.router.use(d.urlencoded({extended:!0})),t.router.get("/get/validation/mail/duplicated/:mail",(e,t)=>{F.validateDuplicatedMail(e,t)}).get("/logout",(e,t)=>{A.logout(t)}).get("/auth",(e,t)=>{r.auth(e,t)}).get("/fetch/user/:id",(e,t)=>{O.fetchUser(e,t)}).get("/fetch/userlist/:limit",(e,t)=>{T.fetchUserList(e,t)}).get("/fetch/works/:id",(e,t)=>{M.fetchWorks(e,t)}).get("/fetch/smallgoals/:id",(e,t)=>{g.fetchSmallGoals(e,t)}).get("/fetch/smallgoal/battle/:id",(e,t)=>{v.fetchSmallGoalOnBattle(e,t)}).get("/fetch/guildlist",(e,t)=>{b.fetchGuildList(e,t)}).get("/fetch/myguild/:id",(e,t)=>{h.fetchMyGuild(e,t)}).get("/fetch/guild/:id",(e,t)=>{m.fetchGuild(e,t)}).get("/fetch/guild/members/:id",(e,t)=>{y.fetchGuildMembers(e,t)}).get("/fetch/chat/:id",(e,t)=>{f.fetchChat(e,t)}).get("/fetch/report/:id",(e,t)=>{E.fetchReport(e,t)}).get("/fetch/report/:day/:id",(e,t)=>{x.fetchReportOfToday(e,t)}).get("/fetch/cheer/:id",(e,t)=>{p.fetchCheer(e,t)}).get("/fetch/cheered/:id",(e,t)=>{_.fetchCheered(e,t)}).post("/signup",(e,t)=>{C.signup(e,t)}).post("/login",(e,t)=>{W.setCookie(e,t)}).post("/post/work/:id",(e,t)=>{j.postWork(e,t)}).post("/post/smallgoal/:id",(e,t)=>{k.postSmallGoal(e,t)}).post("/post/guild/:id",(e,t)=>{R.postGuild(e,t)}).post("/post/guild_member/:id",(e,t)=>{P.postGuildMember(e,t)}).post("/post/chat/:id",(e,t)=>{w.postChat(e,t)}).post("/post/cheer",(e,t)=>{S.postCheer(e,t)}).put("/update/profile/:id",(e,t)=>{G.updateProfile(e,t)}).put("/update/work/completed",(e,t)=>{s.completedWork(e,t)}).put("/update/work/:id",(e,t)=>{N.updateWork(e,t)}).put("/update/smallgoal/completed",(e,t)=>{i.completedSmallGoal(e,t)}).put("/update/smallgoal/:id",(e,t)=>{D.updateSmallGoal(e,t)}).put("/update/user/level/:id",(e,t)=>{q.updateLevel(e,t)}).put("/update/user/title/:id",(e,t)=>{H.updateTitle(e,t)}).put("/update/totaltime/:id",(e,t)=>{L.updateTotalTime(e,t)}).put("/update/report/:day/:id",(e,t)=>{I.updateReport(e,t)}).delete("/delete/work",(e,t)=>{c.deleteWork(e,t)}).delete("/delete/smallgoal",(e,t)=>{a.deleteSmallGoal(e,t)}).delete("/delete/cheer",(e,t)=>{u.deleteCheer(e,t)}).delete("/delete/guild/member",(e,t)=>{n.deleteGuildMember(e,t)}).delete("/delete/guild",(e,t)=>{l.deleteGuild(e,t)})},function(e,t,o){"use strict";var d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.auth=void 0;const r=d(o(5));t.auth=(e,t)=>{const o=r.default.verify(e.cookies.userId,"JwtSecret");t.send(o)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.completedSmallGoal=void 0;const d=o(0);t.completedSmallGoal=(e,t)=>{const o=[{completed:e.body.completed},{small_goal_id:e.body.id}];d.db.query("UPDATE small_goals SET ? WHERE ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t){e.exports=require("mysql")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.completedWork=void 0;const d=o(0);t.completedWork=(e,t)=>{const o=[{completed:e.body.completed},{work_id:e.body.id}];d.db.query("UPDATE works SET ? WHERE ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteCheer=void 0;const d=o(0);t.deleteCheer=(e,t)=>{const o=[{user_id:e.body.userId},{target_id:e.body.targetId}];d.db.query("DELETE FROM cheerings WHERE ? AND ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteGuild=void 0;const d=o(0);t.deleteGuild=(e,t)=>{const o={guild_id:e.body.guildId};d.db.query("DELETE FROM guilds WHERE ?",o,e=>{if(e)throw e}),d.db.query("DELETE FROM guild_members WHERE ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteGuildMember=void 0;const d=o(0);t.deleteGuildMember=(e,t)=>{const o=[{guild_id:e.body.guildId},{user_id:e.body.userId}];d.db.query("DELETE FROM guild_members WHERE ? AND ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteSmallGoal=void 0;const d=o(0);t.deleteSmallGoal=(e,t)=>{d.db.query("DELETE FROM small_goals WHERE small_goal_id = ?",e.body.id,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deleteWork=void 0;const d=o(0);t.deleteWork=(e,t)=>{d.db.query("DELETE FROM works WHERE work_id = ?",e.body.id,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchCheer=void 0;const d=o(0);t.fetchCheer=(e,t)=>{d.db.query("WITH cheerings as (SELECT * FROM cheerings WHERE user_id = ?) SELECT users.user_id, user_name, mail, picture, sex, comment, total_time, title, white_noise, level FROM cheerings JOIN users ON target_id = users.user_id",e.params.id,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchCheered=void 0;const d=o(0);t.fetchCheered=(e,t)=>{d.db.query("WITH cheerings as (SELECT * FROM cheerings WHERE target_id = ?) SELECT users.user_id, user_name, mail, picture, sex, comment, total_time, title, white_noise, level FROM cheerings JOIN users ON cheerings.user_id = users.user_id",e.params.id,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchGuild=void 0;const d=o(0);t.fetchGuild=(e,t)=>{d.db.query("SELECT * FROM guilds WHERE guild_id = ?",e.params.id,(e,o)=>{if(e)throw e;t.send(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchGuildList=void 0;const d=o(0);t.fetchGuildList=(e,t)=>{d.db.query("SELECT * FROM guilds",(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchGuildMembers=void 0;const d=o(0);t.fetchGuildMembers=(e,t)=>{const o=[e.params.id,["users.user_id","user_name","mail","picture","sex","comment","total_time","title","white_noise","level"]];d.db.query("WITH members AS (SELECT * FROM guild_members WHERE guild_id = ?) SELECT ?? FROM members JOIN users ON members.user_id = users.user_id",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchReport=void 0;const d=o(0);t.fetchReport=(e,t)=>{d.db.query("SELECT monday, tuesday, wednesday, thursday, friday, saturday, sunday FROM reports WHERE user_id = ?",e.params.id,(e,o)=>{if(e)throw e;t.send(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchSmallGoalOnBattle=void 0;const d=o(0);t.fetchSmallGoalOnBattle=(e,t)=>{const o={small_goal_id:e.params.id};d.db.query("SELECT small_goal_name, total_time FROM small_goals WHERE ?",o,(e,o)=>{if(e)throw e;t.json(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchUserList=void 0;const d=o(0);t.fetchUserList=(e,t)=>{const o=Number(e.params.limit);d.db.query("SELECT * FROM users ORDER BY total_time DESC LIMIT ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postChat=void 0;const d=o(0),r=o(6);t.postChat=(e,t)=>{const o={guild_id:e.params.id,user_id:e.body.userId,comment:e.body.comment,created:e.body.time};d.db.query("INSERT INTO chat SET ?",o,e=>{if(e)throw e}),r.fetchChat(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postCheer=void 0;const d=o(0);t.postCheer=(e,t)=>{const o={user_id:e.body.userId,target_id:e.body.targetId};d.db.query("INSERT INTO cheerings SET ?",o,(e,o)=>{if(e)throw e;t.send(o)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postGuild=void 0;const d=o(0),r=o(9);t.postGuild=(e,t)=>{const o={guild_name:e.body.guildName,guild_picture:e.body.guildPicture,comment:e.body.comment,admin_id:e.params.id};d.db.query("INSERT INTO guilds SET ?",o,(o,d)=>{if(o)throw o;e.body.guildId=d.insertId,r.postGuildMember(e,t)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postSmallGoal=void 0;const d=o(0),r=o(1);t.postSmallGoal=(e,t)=>{const o={work_id:e.params.id,small_goal_name:e.body.smallGoalName,completed:!1,created:e.body.created,total_time:0};d.db.query("INSERT INTO small_goals SET ?",o,e=>{if(e)throw e}),r.fetchSmallGoals(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.postWork=void 0;const d=o(0),r=o(2);t.postWork=(e,t)=>{const o={user_id:e.params.id,work_name:e.body.workName,completed:!1,created:e.body.created,deadline:e.body.deadline,total_time:0};d.db.query("INSERT INTO works SET ?",o,e=>{if(e)throw e}),r.fetchWorks(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.signup=void 0;const d=o(0),r=o(10);t.signup=(e,t)=>{const o={user_name:e.body.userName,mail:e.body.mail,picture:null,sex:e.body.sex,comment:"",total_time:0,level:1,title:1,guild_id:null,white_noise:"clock"};d.db.query("INSERT INTO users SET ?, password= SHA1(?)",[o,e.body.pass],(e,t)=>{if(e)throw e;d.db.query("INSERT INTO reports SET user_id = ?, monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0",t.insertId,e=>{if(e)throw e})}),r.setCookie(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateLevel=void 0;const d=o(0);t.updateLevel=(e,t)=>{const o=[{level:e.body.level},{user_id:e.params.id}];d.db.query("UPDATE users SET ? WHERE ?",o,(e,t)=>{if(e)throw e}),d.db.query("SELECT level FROM users WHERE ?",o[1],(e,o)=>{if(e)throw e;t.json(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateProfile=void 0;const d=o(0),r=o(8);t.updateProfile=(e,t)=>{const o=[{picture:e.body.picture,user_name:e.body.name,mail:e.body.mail,sex:e.body.sex,comment:e.body.comment},{user_id:e.params.id}];d.db.query("UPDATE users SET ? WHERE ?",o,e=>{if(e)throw e}),r.fetchUser(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateReport=void 0;const d=o(0);t.updateReport=(e,t)=>{const o=e.params.day,r=[o,o,e.body.time,{user_id:e.params.id}];d.db.query("UPDATE reports SET ?? = ?? + ? WHERE ?",r,e=>{if(e)throw e;t.end()})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateSmallGoal=void 0;const d=o(0),r=o(1);t.updateSmallGoal=(e,t)=>{const o=[{small_goal_name:e.body.smallGoalName},{small_goal_id:e.body.smallGoalId}];d.db.query("UPDATE small_goals SET ? WHERE ?",o,e=>{if(e)throw e}),r.fetchSmallGoals(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateTitle=void 0;const d=o(0);t.updateTitle=(e,t)=>{const o=[{title:e.body.title},{user_id:e.params.id}];d.db.query("UPDATE users SET ? WHERE ?",o,(e,o)=>{if(e)throw e;t.send(o[0])})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateTotalTime=void 0;const d=o(0);t.updateTotalTime=(e,t)=>{const o=e.body.addTime,r=[{small_goal_id:e.params.id},{work_id:e.body.workId},{user_id:e.body.userId}];d.db.query("UPDATE small_goals SET total_time = total_time + ? WHERE ?",[o,r[0]],(e,t)=>{if(e)throw e}),d.db.query("UPDATE works SET total_time = total_time + ? WHERE ?",[o,r[1]],(e,t)=>{if(e)throw e}),d.db.query("UPDATE users SET total_time = total_time + ? WHERE ?",[o,r[2]],(e,t)=>{if(e)throw e}),t.end()}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateWork=void 0;const d=o(0),r=o(2);t.updateWork=(e,t)=>{const o=[{work_name:e.body.workName,deadline:e.body.deadline},{work_id:e.body.workId}];d.db.query("UPDATE works SET ? WHERE ?",o,e=>{if(e)throw e}),r.fetchWorks(e,t)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateDuplicatedMail=void 0;const d=o(0);t.validateDuplicatedMail=(e,t)=>{d.db.query("SELECT mail FROM users WHERE mail = ?",[e.params.mail],(e,o)=>{if(e)throw e;t.json({duplicate:o[0]})})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.logout=void 0;t.logout=e=>{e.clearCookie("userId"),e.clearCookie("auth"),e.send("Cookie was cleared")}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fetchReportOfToday=void 0;const d=o(0);t.fetchReportOfToday=(e,t)=>{const o=[e.params.day,e.params.id];d.db.query("SELECT ?? FROM reports WHERE user_id = ?",o,(e,o)=>{if(e)throw e;t.send(o[0])})}}]);