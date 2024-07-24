(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,r,o,c,a,u){var i=g.querySelector(".card").cloneNode(!0),l=i.querySelector(".card__image");l.src=e.link,l.alt=e.name,i.querySelector(".card__title").textContent=e.name;var s=i.querySelector(".card__delete-button");e.owner._id===t?s.addEventListener("click",(function(){return n(e._id,i)})):s.remove();var p=i.querySelector(".card__likes-number");p.textContent=e.likes.length;var d=i.querySelector(".card__like-button");return a(e,t)&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){r(e,t,a,o,c,p,d)})),l.addEventListener("click",u),i}function n(e,t){return e.likes.some((function(e){return e._id===t}))}function r(e,t,n,r,o,c,a){(n(e,t)?o:r)(e._id).then((function(t){c.textContent=t.likes.length,a.classList.toggle("card__like-button_is-active"),e.likes=t.likes})).catch((function(e){return console.log(e)}))}function o(e){e.target.classList.contains("popup_is-opened")?u(e.target):e.target.classList.contains("popup__close")&&u(e.target.parentElement.parentElement)}function c(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("click",o),document.addEventListener("keydown",c)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",o),document.removeEventListener("keydown",c)}e.d({},{T:()=>g});var i=function(e,t,n,r,o){var c=e.querySelector(".".concat(r.id,"-error"));r.classList.add(t),c.textContent=o,c.classList.add(n)},l=function(e,t,n,r){var o=e.querySelector(".".concat(r.id,"-error"));r.classList.remove(t),o.classList.remove(n),o.textContent=""},s=function(e,t){t.disabled=!0,t.classList.add(e)},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){t.disabled=!1,t.classList.remove(e)}(e.inactiveButtonClass,n):s(e.inactiveButtonClass,n)},d=function(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,t.inputErrorClass,t.errorClass,n)})),s(t.inactiveButtonClass,r)},f={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"2a007593-ae06-44d1-a635-16d60c33b6e6","Content-Type":"application/json"}},_=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},m=function(e){return fetch("".concat(f.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:f.headers}).then(_)},y=function(e){return fetch("".concat(f.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:f.headers}).then(_)},v=function(e,t){e.style="background-image: url(".concat(t.avatar,");")},h=function(e,t,n){e.textContent=n.name,t.textContent=n.about};function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var b,q,E,g=document.querySelector("#card-template").content,L=document.querySelector(".places__list"),C=document.querySelector(".popup_type_new-avatar"),k=C.querySelector(".popup__form"),A=k.querySelector(".popup__input"),x=document.querySelector(".popup_type_image"),U=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),O=document.querySelector(".popup_type_edit"),j=O.querySelector(".popup__form"),T=j.querySelector(".popup__input_type_name"),P=j.querySelector(".popup__input_type_description"),B=document.querySelector(".profile__image"),D=document.querySelector(".profile__title"),M=document.querySelector(".profile__description"),N=document.querySelector(".popup_type_new-card"),I=N.querySelector(".popup__form"),J=I.querySelector(".popup__input_type_card-name"),H=I.querySelector(".popup__input_type_url"),z=document.querySelector(".popup_type_delete-card"),$=z.querySelector(".popup__button"),F=null,G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function K(e){a(x),U.src=e.target.src,U.alt=e.target.alt,w.textContent=e.target.alt}function Q(e){e.preventDefault();var t,n,r=j.querySelector(".popup__button");X(!0,r),(t=T.value,n=P.value,fetch("".concat(f.baseUrl,"/users/me"),{method:"PATCH",headers:f.headers,body:JSON.stringify({name:t,about:n})}).then(_)).then((function(e){h(D,M,e)})).catch((function(e){console.log(e)})).finally((function(){u(O),X(!1,r)})),j.removeEventListener("submit",Q)}function R(e){e.preventDefault();var t,n=k.querySelector(".popup__button");X(!0,n),(t=A.value,fetch("".concat(f.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:f.headers,body:JSON.stringify({avatar:t})}).then(_)).then((function(e){v(B,e)})).catch((function(e){console.log(e)})).finally((function(){u(C),X(!1,n)})),k.removeEventListener("submit",R)}function V(e){e.preventDefault();var o,c,a=I.querySelector(".popup__button");X(!0,a),(o=J.value,c=H.value,fetch("".concat(f.baseUrl,"/cards"),{method:"POST",headers:f.headers,body:JSON.stringify({name:o,link:c})}).then(_)).then((function(e){L.prepend(t(e,F,W,r,m,y,n,K))})).catch((function(e){console.log(e)})).finally((function(){u(N),X(!1,a)})),I.removeEventListener("submit",V)}function W(e,t){a(z),b=e,q=t}function X(e,t){t.textContent=e?"Сохранение...":"Сохранить"}$.addEventListener("click",(function(){var e;(e=b,fetch("".concat(f.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:f.headers}).then(_)).then((function(){q.remove()})).catch((function(e){console.log(e)})).finally((function(){u(z)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){d(j,G),a(O),T.value=D.textContent,P.value=M.textContent,j.addEventListener("submit",Q)})),B.addEventListener("click",(function(){d(k,G),a(C),k.addEventListener("submit",R),k.reset()})),document.querySelector(".profile__add-button").addEventListener("click",(function(){d(I,G),a(N),I.addEventListener("submit",V),I.reset()})),E=G,Array.from(document.querySelectorAll(E.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?i(t,e.inputErrorClass,e.errorClass,n,n.dataset.errorMessage):n.validity.valid?l(t,e.inputErrorClass,e.errorClass,n):i(t,e.inputErrorClass,e.errorClass,n,n.validationMessage)}(t,e,o),p(t,n,r)}))}))}(e,E)})),Promise.all([fetch("".concat(f.baseUrl,"/users/me"),{headers:f.headers}).then(_),fetch("".concat(f.baseUrl,"/cards"),{headers:f.headers}).then(_)]).then((function(e){var o,c,a=(c=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(o,c)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];F=u._id,v(B,u),h(D,M,u),i.forEach((function(e){L.append(t(e,F,W,r,m,y,n,K))}))})).catch((function(e){console.log(e)}))})();