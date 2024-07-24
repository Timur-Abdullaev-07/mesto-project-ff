(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,o,r,c,u,i){var a=E.querySelector(".card").cloneNode(!0),s=a.querySelector(".card__image");s.src=e.link,s.alt=e.name,a.querySelector(".card__title").textContent=e.name;var l=a.querySelector(".card__delete-button");e.owner._id===t?l.addEventListener("click",(function(){return n(e._id,a)})):l.remove();var p=a.querySelector(".card__likes-number");p.textContent=e.likes.length;var d=a.querySelector(".card__like-button");return c(e,t)&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){c(e,t)?r(e._id).then((function(t){u(p,t.likes.length,d),e.likes=t.likes})):o(e._id).then((function(t){u(p,t.likes.length,d),e.likes=t.likes}))})),s.addEventListener("click",i),a}function n(e,t){return e.likes.find((function(e){return e._id===t}))}function o(e,t,n){e.textContent=t,n.classList.toggle("card__like-button_is-active")}function r(e){e.target.classList.contains("popup_is-opened")?i(e.target):e.target.classList.contains("popup__close")&&i(e.target.parentElement.parentElement)}function c(e){"Escape"===e.key&&(console.log(e),i(document.querySelector(".popup_is-opened")))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("click",r),document.addEventListener("keydown",c)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("click",r),document.removeEventListener("keydown",c)}e.d({},{T:()=>E});var a,s,l,p=function(e,t,n,o,r){var c=e.querySelector(".".concat(o.id,"-error"));o.classList.add(t),c.textContent=r,c.classList.add(n)},d=function(e,t,n,o){var r=e.querySelector(".".concat(o.id,"-error"));o.classList.remove(t),r.classList.remove(n),r.textContent=""},_=function(e,t){t.disabled=!0,t.classList.add(e)},f=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){t.disabled=!1,t.classList.remove(e)}(e.inactiveButtonClass,n):_(e.inactiveButtonClass,n)},m=function(e,t){var n=e.querySelectorAll(t.inputSelector),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,t.inputErrorClass,t.errorClass,n),_(t.inactiveButtonClass,o)}))},v={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"2a007593-ae06-44d1-a635-16d60c33b6e6","Content-Type":"application/json"}},y=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},h=function(e){return fetch("".concat(v.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:v.headers}).then(y)},S=function(e){return fetch("".concat(v.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:v.headers}).then(y)},b=function(e,t){e.style="background-image: url(".concat(t.avatar,");")},q=function(e,t,n){e.textContent=n.name,t.textContent=n.about},E=document.querySelector("#card-template").content,C=document.querySelector(".places__list"),L=document.querySelector(".popup_type_new-avatar"),k=L.querySelector(".popup__form"),g=k.querySelector(".popup__input"),B=document.querySelector(".popup_type_image"),x=document.querySelector(".popup__image"),P=document.querySelector(".popup__caption"),U=document.querySelector(".popup_type_edit"),T=U.querySelector(".popup__form"),w=T.querySelector(".popup__input_type_name"),A=T.querySelector(".popup__input_type_description"),O=document.querySelector(".profile__image"),j=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),N=document.querySelector(".popup_type_new-card"),J=N.querySelector(".popup__form"),M=J.querySelector(".popup__input_type_card-name"),H=J.querySelector(".popup__input_type_url"),z=document.querySelector(".popup_type_delete-card"),F=z.querySelector(".popup__button"),G=null;function I(e){u(B),x.src=e.target.src,x.alt=e.target.alt,P.textContent=e.target.alt}function K(e){e.preventDefault();var t,n,o=T.querySelector(".popup__button");W(!0,o),(t=w.value,n=A.value,fetch("".concat(v.baseUrl,"/users/me"),{method:"PATCH",headers:v.headers,body:JSON.stringify({name:t,about:n})}).then(y)).then((function(e){q(j,D,e)})).catch((function(e){console.log(e)})).finally((function(){i(U),W(!1,o)})),T.removeEventListener("submit",K)}function Q(e){e.preventDefault();var t,n=k.querySelector(".popup__button");W(!0,n),(t=g.value,fetch("".concat(v.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:v.headers,body:JSON.stringify({avatar:t})}).then(y)).then((function(e){b(O,e)})).catch((function(e){console.log(e)})).finally((function(){i(L),W(!1,n)})),k.removeEventListener("submit",Q)}function R(e){e.preventDefault();var r,c,u=J.querySelector(".popup__button");W(!0,u),(r=M.value,c=H.value,fetch("".concat(v.baseUrl,"/cards"),{method:"POST",headers:v.headers,body:JSON.stringify({name:r,link:c})}).then(y)).then((function(e){C.prepend(t(e,G,V,h,S,n,o,I))})).catch((function(e){console.log(e)})).finally((function(){i(N),W(!1,u)})),J.removeEventListener("submit",R)}function V(e,t){u(z),a=e,s=t}function W(e,t){t.textContent=e?"Сохранение...":"Сохранить"}F.addEventListener("click",(function(){var e;(e=a,fetch("".concat(v.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:v.headers}).then((function(e){return e.ok?Promise.resolve():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){s.remove()})).catch((function(e){console.log(e)})).finally((function(){i(z)}))})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){m(T,{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",inactiveButtonClass:"popup__button_disabled",submitButtonSelector:".popup__button"}),u(U),w.value=j.textContent,A.value=D.textContent,T.addEventListener("submit",K)})),O.addEventListener("click",(function(){m(k,{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",inactiveButtonClass:"popup__button_disabled",submitButtonSelector:".popup__button"}),u(L),k.addEventListener("submit",Q),g.value=""})),document.querySelector(".profile__add-button").addEventListener("click",(function(){m(J,{inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",inactiveButtonClass:"popup__button_disabled",submitButtonSelector:".popup__button"}),u(N),J.addEventListener("submit",R),M.value="",H.value=""})),l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(l.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?p(t,e.inputErrorClass,e.errorClass,n,n.dataset.errorMessage):n.validity.valid?d(t,e.inputErrorClass,e.errorClass,n):p(t,e.inputErrorClass,e.errorClass,n,n.validationMessage)}(t,e,r),f(t,n,o)}))}))}(e,l)})),Promise.all([fetch("".concat(v.baseUrl,"/users/me"),{headers:v.headers}).then(y),fetch("".concat(v.baseUrl,"/cards"),{headers:v.headers}).then(y)]).then((function(e){G=e[0]._id,b(O,e[0]),q(j,D,e[0]),e[1].forEach((function(e){C.append(t(e,G,V,h,S,n,o,I))}))})).catch((function(e){console.log(e)}))})();