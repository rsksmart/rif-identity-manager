(this["webpackJsonprif-identity-manager"]=this["webpackJsonprif-identity-manager"]||[]).push([[0],{302:function(e){e.exports=JSON.parse('{"a":"0.0.1"}')},309:function(e){e.exports=JSON.parse('{"ethrDid":"0xdca7ef03e98e0dc2b855be647c39abe984fcf21b","rpcUrl":"https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0","tokens":[],"dataVault":null}')},310:function(e){e.exports=JSON.parse('{"ethrDid":"0xdca7ef03e98e0dc2b855be647c39abe984fcf21b","rpcUrl":"https://did.rsk.co:4444","tokens":["0x2acc95758f8b5f583470ba265eb685a8f45fc9d5"],"dataVault":null}')},311:function(e){e.exports=JSON.parse('{"ethrDid":"0xdca7ef03e98e0dc2b855be647c39abe984fcf21b","rpcUrl":"https://did.testnet.rsk.co:4444","tokens":["0x19f64674d8a5b4e652319f5e239efd3bc969a1fe"],"dataVault":{"serviceDid":"did:ethr:rsk:testnet:0x285B30492a3F444d78f75261A35cB292Fc8F41A6","serviceUrl":"http://ec2-3-131-142-122.us-east-2.compute.amazonaws.com:5107"}}')},312:function(e){e.exports=JSON.parse('{"ethrDid":"","rpcUrl":"http://127.0.0.1:7545","tokens":[],"dataVault":null}')},316:function(e){e.exports=JSON.parse('[{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]')},324:function(e,n,t){},351:function(e,n){},390:function(e,n){},392:function(e,n){},401:function(e,n){},403:function(e,n){},428:function(e,n){},430:function(e,n){},431:function(e,n){},436:function(e,n){},438:function(e,n){},444:function(e,n){},446:function(e,n){},458:function(e,n){},470:function(e,n){},473:function(e,n){},483:function(e,n){},540:function(e,n){},543:function(e,n){},607:function(e,n){},627:function(e,n){},735:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t(1),r=t.n(a),i=t(110),s=t.n(i),o=(t(324),t(302)),d=t(10),l=t(32),u=t(11),m=t(12);function b(){var e=Object(u.a)(["\n  border-radius: 5px;\n  padding: 10px 50px;\n  font-size: 18px;\n  border: none;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n"]);return b=function(){return e},e}var j,h=m.a.button(b()),f=t.p+"static/media/rif-id-manager.7afc1cbb.svg",O=function(e){var n=e.handleLogin;return Object(c.jsx)("div",{className:"container login-screen",children:Object(c.jsxs)("div",{className:"column",children:[Object(c.jsx)("img",{src:f,alt:"RIF identity Manager"}),Object(c.jsx)("h1",{children:"Sign in"}),Object(c.jsx)(h,{className:"blue",onClick:n,children:"Connect your wallet"}),Object(c.jsxs)("p",{children:["Don't have a wallet? ",Object(c.jsx)("a",{href:"https://developers.rsk.co/wallet/use/",target:"_blank",rel:"noopener noreferrer",children:"Download here"})]})]})})},p=t(5),x=t(34),v=t.n(x),g=function(e){return new v.a(e).net_version()},y=function(e){return new v.a(e).accounts()},w=function(e){return Promise.all([y(e).then((function(e){return e[0]})),g(e).then((function(e){return parseInt(e)}))])},C=t(307),N=t.n(C),k=t(308),D=t.n(k),A=t(309),S=t(310),I=t(311),T=t(312);!function(e){e.ETHR_DID_CONTRACT="ethrDid",e.RPC_URL="rpcUrl",e.TOKENS="tokens",e.DATAVAULT="dataVault"}(j||(j={}));var V=function(e,n){switch(e){case 1:return A[n];case 30:return S[n];case 31:return I[n];case 5777:return T[n];default:throw new Error("No setting for chainId ".concat(e))}},F=function(e){return V(e,j.ETHR_DID_CONTRACT)},R=function(e){return V(e,j.RPC_URL)},L=new N.a({cachedProvider:!1,providerOptions:{walletconnect:{package:D.a,options:{rpc:{1:R(1),30:R(30),31:R(31),5777:R(5777)}}}},supportedChains:[1,30,31,5777]}),E=t(38),K=Object(E.a)({name:"identity",initialState:{address:"",chainId:null},reducers:{changeAccount:function(e,n){var t=n.payload.address;e.address=t},changeChainId:function(e,n){var t=n.payload.chainId;e.chainId=t}}}),U=K.actions,B=U.changeAccount,P=U.changeChainId,J=K.reducer,z=t(169),M=Object(E.a)({name:"ethrdid",initialState:{didDocument:{"@context":"https://w3id.org/did/v1",id:"",publicKey:[],authentication:[]}},reducers:{resolveDid:function(e,n){var t=n.payload.data;e.didDocument=t}}}),_=M.actions.resolveDid,H=M.reducer,q=t(314),Z=t(315),W=function(e,n){var t="".concat(e.slice(0,6),"...").concat(e.slice(e.length-4));switch(n){case 1:return"did:eth:".concat(t);case 30:return"did:rsk:".concat(t);case 31:return"did:rsk:testnet:".concat(t);default:return t}},Y=function(e,n,t){switch(n){case 1:return"did:".concat(t?"ethr:":"","mainnet:").concat(e);case 30:return"did:".concat(t?"ethr:":"","rsk:").concat(e);case 31:return"did:".concat(t?"ethr:":"","rsk:testnet:").concat(e);case 5777:return"did:".concat(t?"ethr:":"","development:").concat(e);default:return e}},G=function(e){if(-1===e.lastIndexOf(":"))return"".concat(e.slice(0,6),"...").concat(e.slice(e.length-4));var n=e.lastIndexOf(":");return"".concat(e.slice(0,n)).concat(e.slice(n,n+7),"...").concat(e.slice(e.length-4))},Q={networks:[{name:"mainnet",registry:F(1),rpcUrl:R(1)},{name:"rsk",registry:F(30),rpcUrl:R(30)},{name:"rsk:testnet",registry:F(31),rpcUrl:R(31)},{name:"development",registry:F(5777),rpcUrl:R(5777)}]},X=function(e){return function(n){return new Promise((function(t){w(e).then((function(e){var c=Object(p.a)(e,2),a=c[0],r=c[1],i=new Z.a(Object(q.getResolver)(Q)),s=Y(a,r,!0);i.resolve(s).then((function(e){return t(n(_({data:e})))}))}))}))}},$=t(167),ee=t.n($),ne=t(83),te=t.n(ne),ce=t(316),ae={address:"",name:null,symbol:null,balance:0},re=Object(E.a)({name:"tokens",initialState:{tokens:[]},reducers:{addTokenData:function(e,n){var t=n.payload.data,c=Object(d.a)(Object(d.a)({},t),{},{address:t.address.toLowerCase()});0===e.tokens.filter((function(e){return e.address===c.address})).length?e.tokens.push(Object(d.a)(Object(d.a)({},ae),c)):e.tokens=e.tokens.map((function(e){return e.address===c.address?Object(d.a)(Object(d.a)({},e),c):e}))}}}),ie=re.actions.addTokenData,se=re.reducer,oe="id-manager-settings",de=function(e,n){var t=localStorage.getItem("".concat(oe,"-").concat(e));return t&&JSON.parse(t)[n]||null},le=function(e,n,t){return function(c){var a=function(e){return V(e,j.TOKENS)}(parseInt(n)),r=de(n,"TOKEN")?de(n,"TOKEN"):[],i=null===a||void 0===a?void 0:a.concat(r);Array.isArray(i)&&i.map((function(n){c(ue(e,n,t))}))}},ue=function(e,n,t,c){return function(a){var r=new v.a(e),i=new ee.a(r)(ce).at(n);r.getCode(n).then((function(e){if("0x0"===e)return c&&c(new Error("The address is not a contract"));i.symbol().then((function(e){return e[0]})).then((function(e){return a(ie({data:{address:n,symbol:e}}))})).catch((function(e){return console.log("symbol",e.message)})),i.name().then((function(e){return e[0]})).then((function(e){return a(ie({data:{address:n,name:e}}))})).catch((function(e){return console.log("name",e.message)})),i.decimals().then((function(e){return e[0]})).then((function(e){i.balanceOf(t).then((function(e){return e[0]})).then((function(n){return n.div(new te.a(10).pow(e)).toNumber()})).then((function(e){0!==e&&a(ie({data:{address:n,balance:e}})),c&&c(!0)})).catch((function(e){return console.log("balanceOf error",e)}))})).catch((function(){return c&&c(new Error("The address is a contract but not ERC20 or ERC721 token."))}))}))}},me=function(e,n,t,c){return function(a){return new Promise((function(r,i){a(ue(e,t,n,(function(e){return e instanceof Error?i(e):r(function(e,n,t){var c=localStorage.getItem("".concat(oe,"-").concat(e)),a=c?JSON.parse(c):{};a[n]||(a[n]=[]),a[n].push(t),localStorage.setItem("".concat(oe,"-").concat(e),JSON.stringify(a))}(c.toString(),"TOKEN",t))})))}))}},be=t(317),je=t.n(be),he=Object(E.a)({name:"datavault",initialState:{data:{}},reducers:{receiveKeyData:function(e,n){var t=n.payload,c=t.key,a=t.content;e.data[c]=a},addContentToKey:function(e,n){var t=n.payload,c=t.key,a=t.content;e.data[c]?e.data[c].push(a):e.data[c]=[a]},removeContentfromKey:function(e,n){var t=n.payload,c=t.key,a=t.id;e.data[c]=e.data[c].filter((function(e){return e.id!==a}))},swapContentById:function(e,n){var t=n.payload,c=t.key,a=t.id,r=t.content;e.data[c]=e.data[c].map((function(e){return e.id===a?Object(d.a)(Object(d.a)({},e),{},{content:r}):e}))}}}),fe=he.actions,Oe=fe.receiveKeyData,pe=fe.addContentToKey,xe=fe.removeContentfromKey,ve=fe.swapContentById,ge=he.reducer,ye=function(e,n,t){var c=function(e){return V(e,j.DATAVAULT)}(t);return c?new je.a({serviceUrl:c.serviceUrl,serviceDid:c.serviceDid,did:Y(n,t,!0),rpcPersonalSign:function(t){return e.request({method:"personal_sign",params:[n,t]})}}):null},we=function(e){return function(n){return L.connect().then((function(t){e.setProvider(t),w(t).then((function(c){var a=Object(p.a)(c,2),r=a[0],i=a[1];n(B({address:r})),n(P({chainId:parseInt(i)})),n(X(t)),n(le(t,i,r));var s,o,d=ye(t,r,i);e.setDvClient(d),d&&n((s=d,o=Y(r,i,!0),function(e){return s.getKeys().then((function(n){return n.forEach((function(n){return s.get({did:o,key:n}).then((function(e){return e})).then((function(t){return e(Oe({key:n,content:t}))}))}))}))}))}))})).catch((function(e){return console.log("rLogin Error",e)}))}},Ce=Object(l.b)(null,(function(e){return{handleLogin:function(n){return e(we(n))}}}),(function(e,n,t){return Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)({},e),n),t),{},{handleLogin:function(){return n.handleLogin(t.context)}})}))(O),Ne=t.p+"static/media/rif-id-manager-gray.d70174d8.svg";function ke(){var e=Object(u.a)(['\n  position: relative;\n  margin-left: 8px;\n  padding-left: 3px;\n  &:before {\n    position: absolute;\n    right: 98%;\n    top: 45%;\n    transform: translate(-5px, -50%);\n    content: "";\n    display: block;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background: ',";\n  }\n"]);return ke=function(){return e},e}function De(){var e=Object(u.a)(["\n  display: inline-block;\n  border: 1px solid #fff;\n  border-radius: 25px;\n  padding:6px 18px !important;\n  color: #6C6B6C;\n  opacity: 1 !important;\n  border: 1px solid #CCCACD;\n  width: auto;\n"]);return De=function(){return e},e}var Ae=m.a.span(De()),Se=m.a.div(ke(),(function(e){return e.connected?"#40d512":"#DC3545"})),Ie=function(e){switch(e){case 1:return"Ethereum";case 30:return"RSK Mainnet";case 31:return"RSK Testnet";default:return"Network Id ".concat(e.toString())}},Te=function(e){var n=e.connected,t=e.name,a=e.chainId;return Object(c.jsx)(Ae,{className:n?"connected":"disconnected",children:Object(c.jsx)(Se,{connected:n,children:a?Ie(a):t})})};function Ve(){var e=Object(u.a)(["\n  position: relative;\n  display: inline-block;\n  cursor: help;\n  margin-right: 20px;\n  &:hover + "," {\n    visibility: visible;\n    opacity: 1;\n  }\n"]);return Ve=function(){return e},e}function Fe(){var e=Object(u.a)(["\n  visibility: hidden;\n  position: absolute;\n  background-color: #555;\n  color: #fff;\n  text-align: center;\n  padding: 5px 10px;\n  border-radius: 6px;\n  z-index: 1;\n  opacity: 0;\n  transition: opacity .6s;\n  max-width: 250px;\n  word-break: break-all;\n"]);return Fe=function(){return e},e}var Re,Le=m.a.span(Fe()),Ee=m.a.span(Ve(),Le),Ke=function(e){var n=e.hoverContent,t=e.children;return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(Ee,{children:t}),Object(c.jsx)(Le,{className:"hover-content",children:n})]})},Ue=function(e){var n=e.did,t=e.chainId;return Object(c.jsxs)("header",{className:"container",children:[Object(c.jsxs)("div",{className:"column branding",children:[Object(c.jsx)("div",{className:"logo",children:Object(c.jsx)("img",{src:Ne,alt:"RIF Id Manager"})}),n&&Object(c.jsx)("h1",{className:"persona",children:Object(c.jsx)(Ke,{hoverContent:n,children:G(n)})})]}),Object(c.jsx)("div",{className:"column network",children:t&&Object(c.jsx)(Te,{connected:!0,chainId:t})})]})};!function(e){e.DASHBOARD="dashboard",e.DATAVAULT="datavault"}(Re||(Re={}));var Be=function(e){var n=e.selected,t=e.showDataVault,a=e.handleClick;return Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"column",children:Object(c.jsxs)("ul",{className:"navigation",children:[Object(c.jsx)("li",{className:n===Re.DASHBOARD?"active":"",children:Object(c.jsx)("button",{onClick:function(){return a(Re.DASHBOARD)},children:"Dashboard"})}),t&&Object(c.jsx)("li",{className:n===Re.DATAVAULT?"active":"",children:Object(c.jsx)("button",{onClick:function(){return a(Re.DATAVAULT)},children:"Data Vault"})}),Object(c.jsx)("li",{className:"disabled",children:"Request Credentials"}),Object(c.jsx)("li",{className:"disabled",children:"My Dapps"})]})})})};function Pe(){var e=Object(u.a)(["\n  padding: 25px 50px;\n"]);return Pe=function(){return e},e}function Je(){var e=Object(u.a)(["\n  float: right;\n"]);return Je=function(){return e},e}function ze(){var e=Object(u.a)(["\n  display: inline-block;\n  font-weight: 600 !important;\n  font-size: 16px;\n  line-height: 19px;\n  color: #50555c;\n  margin: 0;\n  padding: 0;\n"]);return ze=function(){return e},e}function Me(){var e=Object(u.a)(["\n  padding: 10px 25px 10px 25px;\n  border-bottom: 1px solid #F2F2F2;\n  margin: 0 0 15px 0;\n"]);return Me=function(){return e},e}function _e(){var e=Object(u.a)(["\n  background: #FFFFFF;\n  box-shadow: 0px 4px 20px rgba(145, 145, 145, 0.1);\n  border-radius: 20px;\n  padding: 10px 0;\n"]);return _e=function(){return e},e}var He=m.a.div(_e()),qe=m.a.div(Me()),Ze=m.a.p(ze()),We=m.a.div(Je()),Ye=m.a.div(Pe()),Ge=function(e){var n=e.title,t=e.headerRight,a=e.children,r=e.className;return Object(c.jsxs)(He,{className:"panel ".concat(r),children:[n&&Object(c.jsxs)(qe,{className:"panel-header",children:[Object(c.jsx)(Ze,{className:"panel-title",children:n}),t&&Object(c.jsx)(We,{className:"panel-right",children:t})]}),Object(c.jsx)(Ye,{className:"panel-content",children:a})]})},Qe=r.a.createContext({provider:null,dvClient:null}),Xe=function(e){var n=e.children,t=Object(a.useState)(null),r=Object(p.a)(t,2),i=r[0],s=r[1],o=Object(a.useState)(null),d=Object(p.a)(o,2),l=d[0],u=d[1],m={provider:i,setProvider:function(e){return s(e)},dvClient:l,setDvClient:function(e){return u(e)}};return Object(c.jsx)(Qe.Provider,{value:m,children:n})},$e=t(39);function en(){var e=Object(u.a)(["\n  background: #ffffff;\n  padding: 0 20px 15px 20px;\n"]);return en=function(){return e},e}function nn(){var e=Object(u.a)(["\n  position: absolute;\n  top: 0;\n  right: 10px;\n  color: #C4C4C4;\n  font-size: 2em;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-weight: 300;\n  &:after {\n    content: '\\d7';\n  }\n"],["\n  position: absolute;\n  top: 0;\n  right: 10px;\n  color: #C4C4C4;\n  font-size: 2em;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-weight: 300;\n  &:after {\n    content: '\\\\d7';\n  }\n"]);return nn=function(){return e},e}function tn(){var e=Object(u.a)(["\n  background: #F2F2F2;\n  font-size: 16px;\n  padding: 15px 0\n"]);return tn=function(){return e},e}function cn(){var e=Object(u.a)(["\n  position: relative;\n  width: 100%;\n  max-width: 500px;\n  background: #ffffff;\n  border-radius: 20px;\n  overflow: hidden;\n"]);return cn=function(){return e},e}function an(){var e=Object(u.a)(["\nfont-family: Rubik;\ntransition: opacity 0.1s ease-in-out;\ntext-align: center;\nposition: fixed;\nwidth: 100vw;\nheight: 100vh;\nmargin-left: -50vw;\ntop: 0;\nleft: 50%;\nz-index: 2;\nwill-change: opacity;\nbackground-color: rgba(0, 0, 0, 0.4);\nopacity: 1;\nvisibility: ",";\npointer-events: ",";\ndisplay: flex;\njustify-content: center;\nalign-items: center;\n\n& * {\n  box-sizing: border-box !important;\n}\n"]);return an=function(){return e},e}var rn=m.a.div(an(),(function(e){return e.show?"visible":"hidden"}),(function(e){return e.show?"auto":"none"})),sn=m.a.div(cn()),on=m.a.div(tn()),dn=m.a.button(nn()),ln=m.a.div(en()),un=function(e){var n=e.children,t=e.show,a=e.title,r=e.className,i=e.onClose;return t?Object(c.jsx)(rn,{show:t,className:r,children:Object(c.jsxs)(sn,{children:[Object(c.jsxs)(on,{className:"modal-title",children:[a,Object(c.jsx)(dn,{className:"close",onClick:i})]}),Object(c.jsx)(ln,{className:"modal-content",children:n})]})}):Object(c.jsx)(c.Fragment,{})},mn=function(e){var n=e.delegates,t=e.chainId,r=e.addDelegate,i=e.isOwner,s=Object(a.useState)(!1),o=Object(p.a)(s,2),d=o[0],l=o[1],u=Object(a.useState)(!1),m=Object(p.a)(u,2),b=m[0],j=m[1],f=Object(a.useState)(""),O=Object(p.a)(f,2),x=O[0],v=O[1],g=Object(a.useState)(null),y=Object(p.a)(g,2),w=y[0],C=y[1],N=Object(a.useContext)(Qe),k=function(){C(null),j(!1)};return Object(c.jsxs)("div",{className:"column",children:[Object(c.jsx)("h2",{children:"Controllers"}),Object(c.jsx)("ul",{className:"value",children:null===n||void 0===n?void 0:n.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(Ke,{hoverContent:e.publicKey,children:G(e.publicKey.slice(e.publicKey.lastIndexOf(":")+1,e.publicKey.indexOf("#")))})},e.publicKey)}))}),i&&Object(c.jsx)(h,{onClick:function(){return l(!0)},children:"Add Delegate"}),Object(c.jsx)(un,{show:d,title:"Delegate Identity",onClose:function(){b||(l(!1),k())},children:Object(c.jsxs)("div",{className:"delegate-identity",children:[Object(c.jsx)("p",{children:"Controllers can manage the identity but they are not the owners. Only the owners can transfer identities."}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"Delegate to: "}),Object(c.jsx)("input",{type:"text",value:x,onChange:function(e){return v(e.target.value)},placeholder:"address",className:"line",disabled:b})]}),Object(c.jsx)(h,{className:"blue",disabled:b,onClick:function(){return k(),Object($e.isValidAddress)(x)?x===x.toLowerCase()||Object($e.isValidChecksumAddress)(x,t)?0!==(null===n||void 0===n?void 0:n.filter((function(e){return-1!==e.publicKey.indexOf(x)})).length)?(k(),C("This address is already a delegate.")):(j(!0),void r(null===N||void 0===N?void 0:N.provider,x).then((function(){l(!1),v(""),k()})).catch((function(e){k(),C(e.message)}))):(k(),C("Checksum is incorrect.")):(k(),C("Invalid Address"))},children:"Add controller"}),w&&Object(c.jsx)("p",{children:w})]})})]})},bn=function(e){var n=e.owner,t=e.isOwner,r=e.chainId,i=e.changeOwner,s=Object(a.useState)(!1),o=Object(p.a)(s,2),d=o[0],l=o[1],u=Object(a.useState)(""),m=Object(p.a)(u,2),b=m[0],j=m[1],f=Object(a.useState)(!1),O=Object(p.a)(f,2),x=O[0],v=O[1],g=Object(a.useState)(null),y=Object(p.a)(g,2),w=y[0],C=y[1],N=Object(a.useContext)(Qe),k=function(){C(null),v(!1)};return Object(c.jsxs)("div",{className:"column",children:[Object(c.jsx)("h2",{children:"Owner"}),Object(c.jsx)("p",{className:"value",children:n&&Object(c.jsx)(Ke,{hoverContent:n,children:G(n)})}),t&&Object(c.jsx)(h,{onClick:function(){return l(!d)},children:"Change Owner"}),Object(c.jsx)(un,{show:d,title:"Transfer Identity",onClose:function(){x||(l(!1),k())},children:Object(c.jsxs)("div",{className:"change-owner",children:[Object(c.jsx)("p",{children:"Be aware that once you transfer the identity, you will lose ownership and can no longer manage the identity."}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"Transfer to: "}),Object(c.jsx)("input",{type:"text",value:b,onChange:function(e){return j(e.target.value)},placeholder:"address",className:"line",disabled:x})]}),Object(c.jsx)(h,{className:"blue",disabled:x,onClick:function(){return k(),Object($e.isValidAddress)(b)?b===b.toLowerCase()||Object($e.isValidChecksumAddress)(b,r)?(v(!0),void i(null===N||void 0===N?void 0:N.provider,b).then((function(){l(!1),j(""),k()})).catch((function(e){k(),C(e.message)}))):(k(),C("Checksum is incorrect.")):(k(),C("Invalid Address"))},children:"Transfer"}),w&&Object(c.jsx)("p",{children:w})]})})]})},jn=function(e){var n=e.address,t=e.chainId,r=e.owner,i=e.delegates,s=e.changeOwner,o=e.addDelegate,d=Object(a.useState)(!1),l=Object(p.a)(d,2),u=l[0],m=l[1],b=Object(c.jsx)("button",{className:"advancedToggle",onClick:function(){return m(!u)},children:u?"Basic":"Advanced"}),j=(null===n||void 0===n?void 0:n.toLowerCase())===(null===r||void 0===r?void 0:r.toLowerCase());return n&&t?Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(Ge,{title:"Identity information",className:"identity-information",headerRight:b,children:Object(c.jsxs)("div",{className:"container",children:[Object(c.jsxs)("div",{className:"column",children:[Object(c.jsx)("h2",{children:"Identity Address"}),Object(c.jsx)("p",{className:"value",children:Object(c.jsx)(Ke,{hoverContent:n,children:W(n,t)})})]}),u&&Object(c.jsxs)(c.Fragment,{children:[r&&Object(c.jsx)(bn,{isOwner:j,owner:r,changeOwner:s}),i&&Object(c.jsx)(mn,{isOwner:j,delegates:i,addDelegate:o})]})]})})})}):Object(c.jsx)(c.Fragment,{})},hn=function(e){if(!e)return e;var n=parseFloat(e.toFixed(8));return n===e?e:Object(c.jsx)(Ke,{hoverContent:e,children:n})},fn=function(e){var n=e.token;return Object(c.jsxs)("div",{className:"token",children:[Object(c.jsx)("div",{className:"heading-symbol",children:n.name||"Custom token: ".concat(G(n.address))}),Object(c.jsxs)("div",{children:[Object(c.jsx)("span",{className:"balance",children:hn(n.balance)}),Object(c.jsx)("span",{className:"symbol",children:n.symbol})]})]})},On=function(e){var n=e.tokens,t=e.addCustomToken,r=Object(a.useState)(!1),i=Object(p.a)(r,2),s=i[0],o=i[1],d=Object(a.useState)(""),l=Object(p.a)(d,2),u=l[0],m=l[1],b=Object(a.useState)(!1),j=Object(p.a)(b,2),f=j[0],O=j[1],x=Object(a.useState)(null),v=Object(p.a)(x,2),g=v[0],y=v[1],w=Object(a.useContext)(Qe),C=function(){o(!s),m("")};return Object(c.jsxs)(Ge,{title:"Identity Balance",className:"identity-balance",headerRight:Object(c.jsx)("button",{onClick:C,className:"circle-plus",children:"+"}),children:[null===n||void 0===n?void 0:n.map((function(e){return Object(c.jsx)(fn,{token:e},e.address)})),Object(c.jsxs)(un,{show:s,title:"Add token",onClose:C,children:[Object(c.jsx)("p",{children:"Add an ERC20 or ERC721 token to the dashboard."}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"Token to Add:"}),Object(c.jsx)("input",{type:"text",value:u,onChange:function(e){return m(e.target.value)},placeholder:"contract address",className:"line",disabled:f})]}),Object(c.jsx)(h,{onClick:function(){if(O(!0),y(null),!Object($e.isValidAddress)(u))return O(!1),y("Not a valid address!");t(null===w||void 0===w?void 0:w.provider,u).then((function(){O(!1),o(!1)})).catch((function(e){O(!1),y(e.message)}))},className:"blue",disabled:f,children:"Add Token"}),g&&Object(c.jsx)("p",{children:g})]})]})},pn=function(e){var n=e.chainId,t=e.address,a=e.owner,r=e.delegates,i=e.tokens,s=e.changeOwner,o=e.addDelegate,d=e.addCustomToken;return Object(c.jsxs)("div",{className:"content dashboard",children:[Object(c.jsx)(jn,{address:t,chainId:n,owner:a,delegates:r,changeOwner:s,addDelegate:o}),Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(On,{tokens:i,addCustomToken:d})}),Object(c.jsx)("div",{className:"column",children:"\xa0"})]})]})},xn=function(e){var n=e.publicKey.filter((function(e){return e.id.endsWith("#controller")}))[0];return"undefined"===typeof n?null:n.ethereumAddress},vn=Object(l.b)((function(e){var n;return{address:e.identity.address,chainId:e.identity.chainId,tokens:e.tokens.tokens,owner:xn(e.ethrdid.didDocument),delegates:null===(n=e.ethrdid.didDocument.authentication)||void 0===n?void 0:n.filter((function(e){return!e.publicKey.endsWith("controller")}))}}),(function(e){return{changeOwner:function(n,t){return e(function(e,n){return function(t){return new Promise((function(c,a){w(e).then((function(r){var i=Object(p.a)(r,2),s=i[0],o=i[1];return new z.a({address:s,provider:e,registry:F(parseInt(o))}).changeOwner(n.toLowerCase()).then((function(){return c(t(X(e)))})).catch((function(e){return a(e)}))}))}))}}(n,t))},addDelegate:function(n,t){return e(function(e,n){return function(t){return new Promise((function(c,a){w(e).then((function(r){var i=Object(p.a)(r,2),s=i[0],o=i[1];return new z.a({address:s,provider:e,registry:F(parseInt(o))}).addDelegate(n,{delegateType:"0x73696741757468"}).then((function(n){t(X(e)),c(n)})).catch((function(e){return a(e)}))}))}))}}(n,t))},addCustomToken:function(n,t,c,a){return e(me(n,t,c,a))}}}),(function(e,n,t){return Object(d.a)(Object(d.a)(Object(d.a)(Object(d.a)({},e),n),t),{},{addCustomToken:function(t,c){return n.addCustomToken(t,e.address,c,e.chainId)}})}))(pn),gn=t.p+"static/media/declarative-details.0f849d72.svg",yn=t.p+"static/media/trash.4ceb20aa.svg",wn=t.p+"static/media/pencil.afa201a1.svg",Cn=function(e){var n=e.show,t=e.title,a=e.disabled,r=e.className,i=e.onConfirm,s=e.onClose,o=e.onDeny,d=e.strings;return Object(c.jsxs)(un,{show:n,className:r,onClose:s,title:t||"Are you sure?",children:[Object(c.jsx)("p",{children:(null===d||void 0===d?void 0:d.text)||"Are you sure?"}),Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(h,{onClick:o||s,className:"deny gray full",disabled:a||!1,children:(null===d||void 0===d?void 0:d.deny)||"Deny"})}),Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(h,{onClick:i,className:"confirm gray full",disabled:a||!1,children:(null===d||void 0===d?void 0:d.confirm)||"Confirm"})})]})]})},Nn=function(e){var n=e.show,t=e.className,r=e.onConfirm,i=e.onClose,s=e.disabled,o=e.error,l=e.initValue,u=e.inputType,m=e.strings,b=Object(a.useState)(""),j=Object(p.a)(b,2),f=j[0],O=j[1],x={onChange:function(e){return O(e.target.value)},disabled:s,className:"editable line",placeholder:null===m||void 0===m?void 0:m.placeholder,value:f||""};return Object(a.useEffect)((function(){O(l||"")}),[l]),Object(c.jsxs)(un,{show:n,className:t,onClose:i,title:(null===m||void 0===m?void 0:m.title)||"Edit Value",children:[Object(c.jsx)("p",{className:"intro-text",children:null===m||void 0===m?void 0:m.intro}),Object(c.jsxs)("p",{children:[Object(c.jsx)("label",{children:(null===m||void 0===m?void 0:m.label)||"Value:"}),"textarea"===u?Object(c.jsx)("textarea",Object(d.a)({},x)):Object(c.jsx)("input",Object(d.a)({type:"text"},x))]}),Object(c.jsx)("p",{children:Object(c.jsx)(h,{onClick:function(){return r(f)},disabled:s,className:"submit",children:(null===m||void 0===m?void 0:m.submit)||"Submit"})}),o&&Object(c.jsx)("div",{className:"error container",children:Object(c.jsx)("div",{className:"alert error",children:o})})]})},kn=function(e){var n=e.details,t=e.deleteValue,r=e.swapValue,i=Object(a.useState)(!1),s=Object(p.a)(i,2),o=s[0],d=s[1],l=Object(a.useState)(null),u=Object(p.a)(l,2),m=u[0],b=u[1],j=Object(a.useState)(null),h=Object(p.a)(j,2),f=h[0],O=h[1],x=Object(a.useState)(null),v=Object(p.a)(x,2),g=v[0],y=v[1];return Object(c.jsxs)(Ge,{title:Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("img",{src:gn})," Declarative Details"]}),className:"display",children:[Object(c.jsxs)("table",{children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"type",children:"Type"}),Object(c.jsx)("th",{className:"content",children:"Content"})]})}),Object(c.jsx)("tbody",{children:Object.keys(n).map((function(e){if(0!==n[e].length)return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:e}),Object(c.jsx)("td",{children:n[e].map((function(n){return Object(c.jsxs)("div",{className:"content-row",children:[Object(c.jsx)("div",{className:"content",children:Object(c.jsx)("p",{children:n.content})}),Object(c.jsxs)("div",{className:"options",children:[Object(c.jsx)("button",{disabled:o,className:"icon edit",onClick:function(){b(null),y({key:e,item:n})},children:Object(c.jsx)("img",{src:wn,alt:"Edit item"})}),Object(c.jsx)("button",{disabled:o,className:"icon delete",onClick:function(){return O({key:e,id:n.id})},children:Object(c.jsx)("img",{src:yn,alt:"Delete Item"})})]})]},n.id)}))})]},e)}))})]}),Object(c.jsx)(Nn,{show:null!==g,onClose:function(){return y(null)},onConfirm:function(e){return g&&function(e,n){if(e===n.item.content)return b("New value is the same as the old.");d(!0),b(null),r(n.key,e,n.item.id).then((function(){d(!1),y(null)})).catch((function(e){return b(e.message)})).finally((function(){return d(!1)}))}(e,g)},disabled:o,strings:{title:"Edit value in the DataVault",label:"New value",submit:"Update"},className:"edit-modal",initValue:g?g.item.content:"",inputType:"textarea",error:m}),Object(c.jsx)(Cn,{show:null!==f,onClose:function(){return O(null)},onConfirm:function(){return f&&(e=f,d(!0),b(null),void t(e.key,e.id).then((function(){return O(null)})).catch((function(e){return b(e.message)})).finally((function(){return d(!1)})));var e},disabled:o,strings:{text:"Do you want to delete this item from the data vault?",confirm:"Yes",deny:"No"},className:"delete-modal"})]})},Dn=t.p+"static/media/upload.f7f9ea67.svg";function An(){var e=Object(u.a)(["\n  color: #47C4E1;\n  font-size: 15px;\n  margin: 50px auto;\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: load4 1.3s infinite linear;\n  animation: load4 1.3s infinite linear;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n\n  @-webkit-keyframes load4 {\n    0%,\n    100% {\n      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n    }\n    12.5% {\n      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n    }\n    25% {\n      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n    }\n    37.5% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n    }\n    50% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n    }\n    62.5% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n    }\n    75% {\n      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n    }\n    87.5% {\n      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n    }\n  }\n  @keyframes load4 {\n    0%,\n    100% {\n      box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;\n    }\n    12.5% {\n      box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n    }\n    25% {\n      box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;\n    }\n    37.5% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;\n    }\n    50% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;\n    }\n    62.5% {\n      box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;\n    }\n    75% {\n      box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;\n    }\n    87.5% {\n      box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;\n    }\n  }\n"]);return An=function(){return e},e}var Sn=m.a.div(An()),In=function(e){var n=e.addDeclarativeDetail,t=Object(a.useState)(""),r=Object(p.a)(t,2),i=r[0],s=r[1],o=Object(a.useState)(""),d=Object(p.a)(o,2),l=d[0],u=d[1],m=Object(a.useState)(!1),b=Object(p.a)(m,2),j=b[0],f=b[1],O=Object(a.useState)(null),x=Object(p.a)(O,2),v=x[0],g=x[1],y=Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("img",{src:Dn})," Add New Declarative Details"]});return Object(c.jsxs)(Ge,{title:y,className:"add-declarative",children:[Object(c.jsxs)("div",{className:"container",children:[Object(c.jsxs)("div",{className:"column",children:[Object(c.jsx)("p",{className:"title",children:"Type"}),Object(c.jsx)("input",{type:"text",className:"line type",value:i,onChange:function(e){return s(e.target.value)},disabled:j,placeholder:"Content type"})]}),Object(c.jsxs)("div",{className:"columnDouble",children:[Object(c.jsx)("p",{className:"title",children:"Content"}),Object(c.jsx)("textarea",{className:"line content",value:l,onChange:function(e){return u(e.target.value)},disabled:j,placeholder:"Content"})]}),Object(c.jsx)("div",{className:"column submitColumn",children:Object(c.jsx)(h,{className:"submit turquoise",onClick:function(){if(f(!0),g(null),""===i||""===l)return f(!1),g("Type and Content cannot be empty.");n(i,l).then((function(){f(!1),u(""),s("")})).catch((function(e){f(!1),g(e.message)}))},disabled:j,children:"Add Data"})})]}),v&&Object(c.jsx)("div",{className:"error container",children:Object(c.jsx)("div",{className:"alert error",children:v})}),j&&Object(c.jsx)(Sn,{})]})},Tn=function(e){var n=e.addDeclarativeDetail,t=e.declarativeDetails,r=e.deleteValue,i=e.swapValue,s=Object(a.useContext)(Qe);return Object(c.jsxs)("div",{className:"content data-vault",children:[Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(In,{addDeclarativeDetail:function(e,t){return s.dvClient&&n(s.dvClient,e,t)}})})}),Object(c.jsx)("div",{className:"container",children:Object(c.jsx)("div",{className:"column",children:Object(c.jsx)(kn,{details:t,deleteValue:function(e,n){return s.dvClient&&r(s.dvClient,e,n)},swapValue:function(e,n,t){return s.dvClient&&i(s.dvClient,e,n,t)}})})})]})},Vn=Object(l.b)((function(e){return{declarativeDetails:e.datavault.data}}),(function(e){return{addDeclarativeDetail:function(n,t,c){return e(function(e,n,t){return function(c){return e.create({key:n,content:t}).then((function(e){return e.id})).then((function(e){return c(pe({key:n,content:{id:e,content:t}}))}))}}(n,t,c))},deleteValue:function(n,t,c){return e(function(e,n,t){return function(c){return e.delete({key:n,id:t}).then((function(){return c(xe({key:n,id:t}))}))}}(n,t,c))},swapValue:function(n,t,c,a){return e(function(e,n,t,c){return function(a){return e.swap({key:n,content:t,id:c}).then((function(){return a(ve({key:n,id:c,content:t}))}))}}(n,t,c,a))}}}))(Tn),Fn=function(e){var n=e.chainId,t=e.address,r=Object(a.useState)(Re.DASHBOARD),i=Object(p.a)(r,2),s=i[0],o=i[1],d=Object(a.useContext)(Qe);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(Ue,{chainId:n,did:t}),Object(c.jsx)(Be,{selected:s,handleClick:function(e){return o(e)},showDataVault:!!d.dvClient}),s===Re.DASHBOARD&&Object(c.jsx)(vn,{}),s===Re.DATAVAULT&&Object(c.jsx)(Vn,{})]})},Rn=Object(l.b)((function(e){return{address:e.identity.address,chainId:e.identity.chainId}}))(Fn),Ln=t.p+"static/media/powered-by-iov.a0397e40.svg",En=t.p+"static/media/powered-by-iov-gray.e25db553.svg",Kn=function(e){var n=e.isLoggedIn,t=e.version;return Object(c.jsxs)("footer",{className:"app-footer",children:[Object(c.jsx)("img",{src:n?En:Ln,alt:"Powered By IOV"}),Object(c.jsx)("p",{children:"Copyright \xa9 2020 IOV Labs. All rights reserved."}),Object(c.jsxs)("p",{children:["Version ",t]})]})},Un=function(){var e=Object(a.useContext)(Qe),n=null===e||void 0===e?void 0:e.provider;return Object(c.jsxs)("div",{className:n?"app loggedin":"app login",children:[n?Object(c.jsx)(Rn,{}):Object(c.jsx)(Ce,{context:e}),Object(c.jsx)(Kn,{isLoggedIn:n,version:o.a})]})},Bn=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,737)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),c(e),a(e),r(e),i(e)}))},Pn=t(17),Jn=t(84),zn=t(318),Mn=[Jn.a,Object(zn.createLogger)()],_n=Object(Pn.c)({identity:J,ethrdid:H,tokens:se,datavault:ge}),Hn=function(e){return Object(Pn.e)(_n,e,Pn.a.apply(void 0,Mn))};s.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(l.a,{store:Hn(),children:Object(c.jsx)(Xe,{children:Object(c.jsx)(Un,{})})})}),document.getElementById("root")),Bn()}},[[735,1,2]]]);
//# sourceMappingURL=main.a485b165.chunk.js.map