(this.webpackJsonpsorting_algorithms=this.webpackJsonpsorting_algorithms||[]).push([[0],{43:function(e,a,t){},49:function(e,a,t){"use strict";t.r(a);var r=t(0),s=t.n(r),n=t(15),o=t.n(n),d=(t(43),t(35)),c=t(23),i=t(7),l=t(68),u=t(66),p=t(69),y=t(64),j=t(70),b=t(4),f=Object(y.a)((function(e){return Object(j.a)({root:{display:"flex",justifyContent:"space-between","& .speedContainer":{width:300},"& > *":{textTransform:"none",margin:e.spacing(1)}}})})),m=function(e,a){switch(a.type){case"setArray":return Object(i.a)(Object(i.a)({},e),{},{array:a.payload.array,iteration:0,sorted:0});case"setSpeed":return Object(i.a)(Object(i.a)({},e),{},{speed:a.payload});case"swapeItems":var t=Object(c.a)(e.array);if(t[a.payload.firstIndex].value>t[a.payload.secondIndex].value){var r=[t[a.payload.secondIndex].value,t[a.payload.firstIndex].value];t[a.payload.firstIndex].value=r[0],t[a.payload.secondIndex].value=r[1]}return Object(i.a)(Object(i.a)({},e),{},{array:t});case"setArrayStatusCompare":var s=Object(c.a)(e.array);return s[a.payload.firstIndex].status="compare",s[a.payload.secondIndex].status="compare",Object(i.a)(Object(i.a)({},e),{},{array:s});case"setArrayStatusUnsorted":var n=Object(c.a)(e.array);return n[a.payload.firstIndex].status="unsorted",n[a.payload.secondIndex].status="unsorted",Object(i.a)(Object(i.a)({},e),{},{array:n});case"setStart":return Object(i.a)(Object(i.a)({},e),{},{started:a.payload});case"setIteration":return Object(i.a)(Object(i.a)({},e),{},{iteration:a.payload});case"setIterationAndSorted":var o=Object(c.a)(e.array);return o[a.payload.sortedIndex].status="sorted",Object(i.a)(Object(i.a)({},e),{},{array:o,iteration:a.payload.iteration,sorted:a.payload.sorted});default:return e}},O=function(e){var a=s.a.useRef(),t=s.a.useReducer(m,{array:e.items,iteration:0,sorted:0,started:!1,speed:50}),r=Object(d.a)(t,2),n=r[0],o=r[1];s.a.useEffect((function(){n.started&&(a.current&&clearTimeout(a.current),a.current=setTimeout(c,150-n.speed))}),[n.iteration,n.started,n.speed]),s.a.useEffect((function(){o({type:"setArray",payload:{array:e.items}})}),[e.items]);var c=function(){var e=n.iteration,a=n.sorted,t=n.array;if(o({type:"setArrayStatusUnsorted",payload:{firstIndex:0===e?0:e-1,secondIndex:e}}),e<t.length-a-1){var r=e+1;o({type:"setArrayStatusCompare",payload:{firstIndex:e,secondIndex:r}}),t[e].value>t[r].value&&o({type:"swapeItems",payload:{firstIndex:e,secondIndex:r}}),o({type:"setIteration",payload:e+1})}else o({type:"setIterationAndSorted",payload:{iteration:0,sorted:a+1,sortedIndex:e}})},i=f();return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("section",{className:i.root,children:[Object(b.jsx)(l.a,{variant:"contained",size:"small",color:"primary",disabled:n.started,onClick:function(){o({type:"setArray",payload:{array:Array.from({length:30},(function(){return{value:Math.floor(300*Math.random())+10,status:"unsorted"}}))}})},children:"Generate Random Array"}),!n.started&&Object(b.jsx)(l.a,{size:"small",variant:"contained",onClick:function(){o({type:"setStart",payload:!0})},children:"Start"}),n.started&&Object(b.jsx)(l.a,{size:"small",variant:"contained",onClick:function(){o({type:"setStart",payload:!1}),a.current&&clearTimeout(a.current)},children:"Pause"}),Object(b.jsxs)("div",{className:"speedContainer",children:[Object(b.jsx)(u.a,{children:"Speed"}),Object(b.jsx)(p.a,{defaultValue:50,onChangeCommitted:function(e,a){o({type:"setSpeed",payload:a})},min:10,max:100,valueLabelDisplay:"auto",step:10,marks:!0})]})]}),Object(b.jsx)("section",{className:"chartContainer",children:n.array.map((function(e,a){return Object(b.jsx)("div",{className:"pipe ".concat(e.status),style:{height:e.value+"px"}},a)}))})]})},x=t(67),h=Array.from({length:30},(function(){return{value:Math.floor(300*Math.random())+10,status:"unsorted"}}));var v=function(){return Object(b.jsx)(x.a,{className:"App",children:Object(b.jsx)(O,{items:h})})};o.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.bef17a15.chunk.js.map