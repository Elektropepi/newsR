(this.webpackJsonpnewsr=this.webpackJsonpnewsr||[]).push([[0],{119:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(58),i=n.n(c),s=(n(69),n(3)),o=n(4),u=n(6),l=n(5),h=n(7),d=(n(70),n(2)),p=n.n(d),f=n(20),m=n(27),v=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"loading"},r.a.createElement(m.a,{icon:"spinner",spin:!0}),"\xa0\xa0Loading ...")}}]),t}(r.a.Component),b=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={isContentLoading:!1,contents:[]},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:this.loadContent();case 1:case"end":return e.stop()}}),null,this)}},{key:"componentDidUpdate",value:function(e){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:this.props.article===e.article&&this.props.showContent===e.showContent||this.loadContent();case 1:case"end":return t.stop()}}),null,this)}},{key:"loadContent",value:function(){var e;return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.props.showContent){t.next=2;break}return t.abrupt("return");case 2:return this.setState({isContentLoading:!0,contents:[]}),t.next=5,p.a.awrap(this.props.article.contents());case 5:e=t.sent,this.setState({isContentLoading:!1,contents:e});case 7:case"end":return t.stop()}}),null,this)}},{key:"nestContent",value:function(e,t){return 0===e?t:r.a.createElement("div",{className:"nested-content"},this.nestContent(e-1,t))}},{key:"render",value:function(){var e=this,t=this.props,n=t.article,a=t.showContent,c=t.onClickHeader,i=this.state,s=i.contents,o=i.isContentLoading;return r.a.createElement("div",{className:"article-detail"},r.a.createElement("div",{className:"header",onClick:function(){return c&&c(n.id)}},r.a.createElement("h1",{className:"article-detail-title"},n.subject),r.a.createElement("p",{className:"article-detail-author"},n.date.format("DD.MM.YYYY")," by ",n.author.name," (",r.a.createElement("a",{href:"mailto:".concat(n.author.email)},n.author.email),")")),o&&r.a.createElement(v,null),a&&r.a.createElement("div",{className:"article-detail-content"},s.map((function(t,n){return r.a.createElement("div",{key:n},e.nestContent(t.citationLevel,t.text))}))))}}]),t}(r.a.Component);b.defaultProps=void 0,b.defaultProps={onClickHeader:null};var w=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.showContent,n=e.article,a=e.onClick;return r.a.createElement("li",{key:n.id},r.a.createElement(b,{article:n,showContent:t,onClickHeader:function(e){return a(e)}}),t&&r.a.createElement("div",null,r.a.createElement(E,{articles:n.followUps}),r.a.createElement("div",{className:"collapsible-line",onClick:function(){return a(n.id)}})))}}]),t}(r.a.Component),E=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={forceShowIds:[]},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleArticleClick",value:function(e){var t=this.state.forceShowIds;t.includes(e)?t.splice(t.indexOf(e)):t.push(e),this.setState({forceShowIds:t})}},{key:"render",value:function(){var e=this,t=this.props.articles,n=this.state.forceShowIds;return r.a.createElement("div",{className:"collapsible-thread-list"},r.a.createElement("ul",null,t.map((function(t){return r.a.createElement(w,{key:t.id,article:t,showContent:n.includes(t.id),onClick:function(t){return e.handleArticleClick(t)}})}))))}}]),t}(r.a.Component),j=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.article;return null===e?"Article not found!":r.a.createElement("div",{className:"thread-detail"},r.a.createElement(f.Helmet,null,r.a.createElement("title",null,"newsR - ",null===e||void 0===e?void 0:e.subject)),r.a.createElement(b,{article:e,showContent:!0}),r.a.createElement(E,{articles:null===e||void 0===e?void 0:e.followUps}))}}]),t}(r.a.Component),O=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"sidebar-content"},r.a.createElement("div",{className:"sidebar-content-sidebar"},this.props.sidebar),r.a.createElement("div",{className:"sidebar-content-content"},this.props.content))}}]),t}(r.a.Component),y=n(13),C=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.group,n=e.url;return r.a.createElement("div",{className:"group-title"},r.a.createElement(y.b,{className:"no-link",to:"".concat(n)},t.name))}}]),t}(r.a.Component),k=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app-grid"},r.a.createElement("div",{className:"app-grid-header"},this.props.header),r.a.createElement("div",{className:"app-grid-body"},this.props.body),r.a.createElement("div",{className:"app-grid-footer"},this.props.footer))}}]),t}(r.a.Component),g=n(28),x=n(37),N=n.n(x),_=n(61),S=n.n(_),R=function(){function e(t,n){Object(s.a)(this,e),this.name=void 0,this.email=void 0,this.name=t,this.email=n}return Object(o.a)(e,null,[{key:"authorFromString",value:function(t){var n,a,r=new RegExp("(.*?) <(.*?)>").exec(t);return null===r?(n=t,a="placeholder.mail@srvr.at"):(n=r[1],a=r[2]),new e(n,a)}}]),e}(),L=function(){function e(t,n,a,r,c){Object(s.a)(this,e),this.id=void 0,this.subject=void 0,this.date=void 0,this.author=void 0,this.references=[],this.directReference="",this.followUps=[],this.newsieClient=void 0,this.id=t,this.subject=n,this.date=a,this.author=r,this.newsieClient=c}return Object(o.a)(e,[{key:"setReferences",value:function(e){e.length<=0||(this.references=e.split(" "),this.directReference=this.references[this.references.length-1])}},{key:"contents",value:function(){var e,t,n;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(this.newsieClient.body(this.id));case 2:if((e=a.sent).article.body){a.next=5;break}return a.abrupt("return",[]);case 5:return t=[],n=null,e.article.body.forEach((function(e){for(var a=0;a<e.length&&">"===e[a];)a++;if(e=e.substring(a,e.length),null!==n)return a!==n.citationLevel?(t.push(n),void(n={text:e,citationLevel:a})):void(n.text+="\n"+e);n={text:e,citationLevel:a}})),n&&t.push(n),a.abrupt("return",t);case 10:case"end":return a.stop()}}),null,this)}}]),e}(),D=function(){function e(t,n,a){Object(s.a)(this,e),this.name=void 0,this.description=void 0,this.newsieClient=void 0,this.name=t,this.description=n,this.newsieClient=a}return Object(o.a)(e,[{key:"threads",value:function(){var e,t,n,a,r,c=this;return p.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,p.a.awrap(this.newsieClient.group(this.name));case 2:if(0!==(e=i.sent.group).number){i.next=5;break}return i.abrupt("return",[]);case 5:return i.next=7,p.a.awrap(this.newsieClient.over("".concat(e.low,"-").concat(e.high)));case 7:return t=i.sent,n=t.articles.map((function(e){var t=S()(e.headers.DATE),n=R.authorFromString(e.headers.FROM),a=new L(e.headers["MESSAGE-ID"],e.headers.SUBJECT,t,n,c.newsieClient);return a.setReferences(e.headers.REFERENCES),a})),a={},r=[],n.forEach((function(e){a[e.id]=e,0===e.references.length?r.push(e):a[e.directReference]&&a[e.directReference].followUps.push(e)})),r.sort((function(e,t){return t.date.unix()-e.date.unix()})),i.abrupt("return",r);case 14:case"end":return i.stop()}}),null,this)}}]),e}(),G=function e(t,n,a,r){var c=this;Object(s.a)(this,e),this._socket=void 0,this._host=void 0,this._port=void 0,this._queue=void 0,this.connect=function(){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){c._socket.addEventListener("open",(function(){c.write("NNTPCONNECT ".concat(c._host," ").concat(c._port)),c._addSocketHandlers(),e(c._socket)}))})));case 1:case"end":return e.stop()}}))},this.disconnect=function(){c._socket.close(),c._queue.forEach((function(e){return e.reject(new Error("Disconnected from server"))})),c._queue=[]},this.write=function(e){c._socket.send(e)},this.addCallback=function(e,t,n){c._queue.push({callback:e,resolve:t,reject:n})},this._addSocketHandlers=function(){c._socket.onmessage=function(e){var t=c._queue[0],n=t.callback(e.data);c._queue.shift(),t.resolve(n)},c._socket.onerror=function(e){throw c._queue.forEach((function(t){return t.reject(e)})),c.disconnect(),e},c._socket.onclose=function(){c._queue.forEach((function(e){return e.reject(new Error("Connection closed"))}))}},this._socket=new WebSocket("ws://localhost:8080"),this._host=t,this._port=n,this._queue=[]},q=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e)))._wsConnection=void 0,n.connect=function(){var e,t;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(n._wsConnection.connect());case 2:return e=a.sent,a.next=5,p.a.awrap(n.sendData(x.Command.GREETING));case 5:return t=a.sent,a.abrupt("return",Object(g.a)({},t,{socket:e}));case 7:case"end":return a.stop()}}))},n.disconnect=function(){return n._wsConnection.disconnect()},n.sendData=function(e,t){return new Promise((function(e,a){n._wsConnection.addCallback((function(e){return JSON.parse(e)}),e,a),t&&n._wsConnection.write(t)})).then((function(e){return e.code<400?e:Promise.reject(e)}))};var a=e.host,r=e.port,c=void 0===r?119:r,i=e.tlsPort,o=void 0!==i&&i,h=e.tlsOptions,d=void 0===h?{}:h;return n._wsConnection=new G(a,c,o,d),n}return Object(h.a)(t,e),t}(N.a),A=function(){function e(t,n){Object(s.a)(this,e),this.host=void 0,this.port=void 0,this.newsieClient=void 0,this.host=t,n&&(this.port=n),this.newsieClient=e.initWsNewsieClient(this.host,this.port)}return Object(o.a)(e,[{key:"connectAndVerifyNewsieClient",value:function(){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.awrap(this.newsieClient.connect());case 2:if(200===e.sent.code){e.next=5;break}throw Error("No connection to server.");case 5:return e.next=7,p.a.awrap(this.newsieClient.capabilities());case 7:if(e.sent.capabilities.LIST.includes("NEWSGROUPS")){e.next=10;break}throw Error("Server does't have the required LIST NEWSGROUPS capability.");case 10:case"end":return e.stop()}}),null,this)}},{key:"getGroupByName",value:function(e){var t,n=this;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(this.newsieClient.listNewsgroups(e));case 2:if(1===(t=a.sent).newsgroups.length){a.next=5;break}return a.abrupt("return",null);case 5:return a.abrupt("return",t.newsgroups.map((function(e){var t="undefined"===typeof e.description?"":e.description;return new D(e.name,t,n.newsieClient)}))[0]);case 6:case"end":return a.stop()}}),null,this)}},{key:"groups",value:function(){var e,t=this;return p.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,p.a.awrap(this.newsieClient.listNewsgroups("tu-graz*"));case 2:return e=n.sent,n.abrupt("return",e.newsgroups.map((function(e){var n="undefined"===typeof e.description?"":e.description;return new D(e.name,n,t.newsieClient)})));case 4:case"end":return n.stop()}}),null,this)}}],[{key:"instance",value:function(){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==this.server){t.next=4;break}return this.server=new e("news.tugraz.at",119),t.next=4,p.a.awrap(this.server.connectAndVerifyNewsieClient());case 4:return t.abrupt("return",this.server);case 5:case"end":return t.stop()}}),null,this)}},{key:"initWsNewsieClient",value:function(e,t){var n={host:e};return t&&!isNaN(t)&&(n.port=t),new q(n)}}]),e}();A.server=null;var P=n(14),I=n(63);function H(e){var t=e.entry;return a.createElement("div",null,a.createElement("p",{className:"list-entry"},a.createElement(y.b,{className:"no-link",to:t.url},a.createElement("span",{className:"title"},t.title),a.createElement("br",null),a.createElement("span",{className:"subtitle"},t.subtitle))))}function M(e){var t=e.data;return r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement(H,{key:t,entry:e})})))}var U=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).state={loading:!0,group:null,threads:[]},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e,t,n;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.a.awrap(A.instance());case 2:return e=a.sent,a.next=5,p.a.awrap(e.getGroupByName(this.props.match.params.name));case 5:if(null!==(t=a.sent)){a.next=9;break}return this.setState({loading:!1,group:null}),a.abrupt("return");case 9:return a.next=11,p.a.awrap(t.threads());case 11:n=a.sent,this.setState({loading:!1,group:t,threads:n});case 13:case"end":return a.stop()}}),null,this)}},{key:"render",value:function(){var e=this.props.match,t=this.state,n=t.loading,a=t.group,c=t.threads;if(n)return r.a.createElement(v,null);if(null===a)return"Group not found!";var i=c.map((function(t){return{title:t.subject,subtitle:"".concat(t.author.name," - ").concat(t.date.format("DD.MM.YY")),url:"".concat(e.url,"/").concat(t.id)}}));return r.a.createElement("div",{className:"group-detail"},r.a.createElement(f.Helmet,null,r.a.createElement("title",null,"newsR - ",null===a||void 0===a?void 0:a.name)),r.a.createElement(k,{header:r.a.createElement("div",{className:"float-div"},r.a.createElement("div",{className:"float"},r.a.createElement(y.b,{className:"no-link",to:"/"},r.a.createElement(m.a,{icon:"home",size:"xs"}))),r.a.createElement(C,{group:a,url:e.url})),body:r.a.createElement(I.a,{query:"(max-width: 800px)"},(function(t){return t?r.a.createElement(P.c,null,r.a.createElement(P.a,{path:"".concat(e.path,"/:id"),render:function(e){return r.a.createElement(j,Object.assign({},e,{group:a,article:c.find((function(t){return t.id===e.match.params.id}))||null}))}}),r.a.createElement(P.a,{path:"".concat(e.path)},r.a.createElement(M,{data:i}))):r.a.createElement(O,{sidebar:r.a.createElement(M,{data:i}),content:r.a.createElement(P.c,null,r.a.createElement(P.a,{path:"".concat(e.path,"/:id"),render:function(e){return r.a.createElement(j,Object.assign({},e,{group:a,article:c.find((function(t){return t.id===e.match.params.id}))||null}))}}),r.a.createElement(P.a,{path:"".concat(e.path)},r.a.createElement("h3",null,"Please select a thread")))})})),footer:r.a.createElement("div",null)}))}}]),t}(r.a.Component),W=n(39);function T(){var e=Object(a.useState)({groups:[],filteredGroups:[]}),t=Object(W.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!0),s=Object(W.a)(i,2),o=s[0],u=s[1];if(Object(a.useEffect)((function(){!function(){var e,t;p.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return u(!0),n.next=3,p.a.awrap(A.instance());case 3:return e=n.sent,n.next=6,p.a.awrap(e.groups());case 6:t=n.sent,c({groups:t,filteredGroups:t}),u(!1);case 9:case"end":return n.stop()}}))}()}),[]),o)return r.a.createElement(v,null);return r.a.createElement("div",null,r.a.createElement(f.Helmet,null,r.a.createElement("title",null,"newsR - news.tugraz.at")),r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"Welcome to news.tugraz.at"),r.a.createElement("input",{className:"search",type:"text",placeholder:"Search...",onChange:function(e){return function(e){var t=n.groups.filter((function(t){return t.name.toLowerCase().includes(e)}));c(Object(g.a)({},n,{filteredGroups:t}))}(e.target.value.toLowerCase())}})),r.a.createElement(M,{data:n.filteredGroups.map((function(e){return{title:e.name,subtitle:e.description,url:"/groups/".concat(e.name)}}))}))}var Y=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(T,null)}}]),t}(r.a.Component),z=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"app"},r.a.createElement(P.c,null,r.a.createElement(P.a,{path:"/groups/:name",component:U}),r.a.createElement(P.a,{path:"/",component:Y})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=n(21),F=n(38);B.b.add(F.b),B.b.add(F.a),i.a.render(r.a.createElement(y.a,{basename:""},r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},64:function(e,t,n){e.exports=n(119)},69:function(e,t,n){},70:function(e,t,n){},90:function(e,t){},92:function(e,t){}},[[64,1,2]]]);
//# sourceMappingURL=main.494337ea.chunk.js.map