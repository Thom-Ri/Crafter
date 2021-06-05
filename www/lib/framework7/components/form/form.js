(function framework7ComponentLoader(t,e){void 0===e&&(e=!0);var a=t.$,o=t.utils,r=(t.getDevice,t.getSupport,t.Class,t.Modal,t.ConstructorMethods,t.ModalMethods,o.extend),n=o.serializeObject,i={store:function(t,e){var o=t,r=a(t);r.length&&r.is("form")&&r.attr("id")&&(o=r.attr("id")),this.form.data["form-"+o]=e,window.localStorage["f7form-"+o]=JSON.stringify(e)},get:function(t){var e=t,o=a(t);return o.length&&o.is("form")&&o.attr("id")&&(e=o.attr("id")),window.localStorage["f7form-"+e]?JSON.parse(window.localStorage["f7form-"+e]):this.form.data["form-"+e]?this.form.data["form-"+e]:void 0},remove:function(t){var e=this,o=t,r=a(t);r.length&&r.is("form")&&r.attr("id")&&(o=r.attr("id")),e.form.data["form-"+o]&&(e.form.data["form-"+o]="",delete e.form.data["form-"+o]),window.localStorage["f7form-"+o]&&(window.localStorage["f7form-"+o]="",window.localStorage.removeItem("f7form-"+o))}},f={init:function(t){var e=this,o=a(t),r=o.attr("id");if(r){var n=e.form.getFormData(r);n&&e.form.fillFromData(o,n),o.on("change submit",(function(){var t=e.form.convertToData(o);t&&(e.form.storeFormData(r,t),o.trigger("form:storedata",t),e.emit("formStoreData",o[0],t))}))}},destroy:function(t){a(t).off("change submit")}};function s(t){var e=a(t).eq(0);if(0!==e.length){var o={},r=["submit","image","button","file"],n=[];return e.find("input, select, textarea").each((function(t){var i=a(t);if(!i.hasClass("ignore-store-data")&&!i.hasClass("no-store-data")){var f=i.attr("name"),s=i.attr("type"),m=t.nodeName.toLowerCase();if(!(r.indexOf(s)>=0)&&!(n.indexOf(f)>=0)&&f)if("select"===m&&i.prop("multiple"))n.push(f),o[f]=[],e.find('select[name="'+f+'"] option').each((function(t){t.selected&&o[f].push(t.value)}));else switch(s){case"checkbox":n.push(f),o[f]=[],e.find('input[name="'+f+'"]').each((function(t){t.checked&&o[f].push(t.value)}));break;case"radio":n.push(f),e.find('input[name="'+f+'"]').each((function(t){t.checked&&(o[f]=t.value)}));break;default:o[f]=i.val()}}})),e.trigger("form:todata",o),this.emit("formToData",e[0],o),o}}function m(t,e){var o=a(t).eq(0);if(o.length){var r=e,n=o.attr("id");if(!r&&n&&(r=this.form.getFormData(n)),r){var i=["submit","image","button","file"],f=[];o.find("input, select, textarea").each((function(t){var e=a(t);if(!e.hasClass("ignore-store-data")&&!e.hasClass("no-store-data")){var n=e.attr("name"),s=e.attr("type"),m=t.nodeName.toLowerCase();if(void 0!==r[n]&&null!==r[n]&&!(i.indexOf(s)>=0)&&!(f.indexOf(n)>=0)&&n){if("select"===m&&e.prop("multiple"))f.push(n),o.find('select[name="'+n+'"] option').each((function(t){var e=t;r[n].indexOf(t.value)>=0?e.selected=!0:e.selected=!1}));else switch(s){case"checkbox":f.push(n),o.find('input[name="'+n+'"]').each((function(t){var e=t;r[n].indexOf(t.value)>=0?e.checked=!0:e.checked=!1}));break;case"radio":f.push(n),o.find('input[name="'+n+'"]').each((function(t){var e=t;r[n]===t.value?e.checked=!0:e.checked=!1}));break;default:e.val(r[n])}"select"!==m&&"input"!==m&&"textarea"!==m||e.trigger("change","fromdata")}}})),o.trigger("form:fromdata",r),this.emit("formFromData",o[0],r)}}}function c(){var t=this;a(document).on("submit change","form.form-ajax-submit, form.form-ajax-submit-onchange",(function(e,o){var r=a(this);if(("change"!==e.type||r.hasClass("form-ajax-submit-onchange"))&&("submit"===e.type&&e.preventDefault(),"change"!==e.type||"fromdata"!==o)){var i,f=(r.attr("method")||"GET").toUpperCase(),s=r.prop("enctype")||r.attr("enctype"),m=r.attr("action");if(m)i="POST"===f?"application/x-www-form-urlencoded"===s?t.form.convertToData(r[0]):new window.FormData(r[0]):n(t.form.convertToData(r[0])),t.request({method:f,url:m,contentType:s,data:i,beforeSend:function(e){r.trigger("formajax:beforesend",{data:i,xhr:e}),t.emit("formAjaxBeforeSend",r[0],i,e)},error:function(e){r.trigger("formajax:error",{data:i,xhr:e}),t.emit("formAjaxError",r[0],i,e)},complete:function(e){r.trigger("formajax:complete",{data:i,xhr:e}),t.emit("formAjaxComplete",r[0],i,e)},success:function(e,a,o){r.trigger("formajax:success",{data:i,xhr:o}),t.emit("formAjaxSuccess",r[0],i,o)}})}}))}var d={name:"form",create:function(){var t=this;r(t,{form:{data:{},storeFormData:i.store.bind(t),getFormData:i.get.bind(t),removeFormData:i.remove.bind(t),convertToData:s.bind(t),fillFromData:m.bind(t),storage:{init:f.init.bind(t),destroy:f.destroy.bind(t)}}})},on:{init:function(){c.call(this)},tabBeforeRemove:function(t){var e=this;a(t).find(".form-store-data").each((function(t){e.form.storage.destroy(t)}))},tabMounted:function(t){var e=this;a(t).find(".form-store-data").each((function(t){e.form.storage.init(t)}))},pageBeforeRemove:function(t){var e=this;t.$el.find(".form-store-data").each((function(t){e.form.storage.destroy(t)}))},pageInit:function(t){var e=this;t.$el.find(".form-store-data").each((function(t){e.form.storage.init(t)}))}}};if(e){if(t.prototype.modules&&t.prototype.modules[d.name])return;t.use(d),t.instance&&(t.instance.useModuleParams(d,t.instance.params),t.instance.useModule(d))}return d}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
