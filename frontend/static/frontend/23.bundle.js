(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{234:function(e,n,t){"use strict";t.r(n);var a=t(43),l=t.n(a),c=t(0),r=t.n(c),u=t(149),i=t.n(u);n.default=function(e){var n=parseInt(e.match.params.id.substring(1),10),t=Object(c.useState)([]),a=l()(t,2),u=a[0],s=a[1];return Object(c.useEffect)((function(){i.a.get("accounts/profiledetails/".concat(n,"/")).then((function(e){return s(e.data)}))}),[]),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h4",null,"Name : ",u.name),r.a.createElement("p",null,"Address : ",u.address),r.a.createElement("p",null,"Phone : ",u.phone),r.a.createElement("p",null,"Email : ",u.emailid),r.a.createElement("p",null,"Id: ",u.id)))}}}]);