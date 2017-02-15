//----------------------------------------------------------
// Copyright (C) Microsoft Corporation. All rights reserved.
//----------------------------------------------------------
// MicrosoftAjaxWebForms.js
Type.registerNamespace("Sys.WebForms");
Sys.WebForms.BeginRequestEventArgs = function(b, a) {
	Sys.WebForms.BeginRequestEventArgs.initializeBase(this);
	this._request = b;
	this._postBackElement = a
};
Sys.WebForms.BeginRequestEventArgs.prototype = {
	get_postBackElement: function() {
		return this._postBackElement
	},
	get_request: function() {
		return this._request
	}
};
Sys.WebForms.BeginRequestEventArgs.registerClass("Sys.WebForms.BeginRequestEventArgs", Sys.EventArgs);
Sys.WebForms.EndRequestEventArgs = function(c, a, b) {
	Sys.WebForms.EndRequestEventArgs.initializeBase(this);
	this._errorHandled = false;
	this._error = c;
	this._dataItems = a || new Object;
	this._response = b
};
Sys.WebForms.EndRequestEventArgs.prototype = {
	get_dataItems: function() {
		return this._dataItems
	},
	get_error: function() {
		return this._error
	},
	get_errorHandled: function() {
		return this._errorHandled
	},
	set_errorHandled: function(a) {
		this._errorHandled = a
	},
	get_response: function() {
		return this._response
	}
};
Sys.WebForms.EndRequestEventArgs.registerClass("Sys.WebForms.EndRequestEventArgs", Sys.EventArgs);
Sys.WebForms.InitializeRequestEventArgs = function(b, a) {
	Sys.WebForms.InitializeRequestEventArgs.initializeBase(this);
	this._request = b;
	this._postBackElement = a
};
Sys.WebForms.InitializeRequestEventArgs.prototype = {
	get_postBackElement: function() {
		return this._postBackElement
	},
	get_request: function() {
		return this._request
	}
};
Sys.WebForms.InitializeRequestEventArgs.registerClass("Sys.WebForms.InitializeRequestEventArgs", Sys.CancelEventArgs);
Sys.WebForms.PageLoadedEventArgs = function(b, a, c) {
	Sys.WebForms.PageLoadedEventArgs.initializeBase(this);
	this._panelsUpdated = b;
	this._panelsCreated = a;
	this._dataItems = c || new Object
};
Sys.WebForms.PageLoadedEventArgs.prototype = {
	get_dataItems: function() {
		return this._dataItems
	},
	get_panelsCreated: function() {
		return this._panelsCreated
	},
	get_panelsUpdated: function() {
		return this._panelsUpdated
	}
};
Sys.WebForms.PageLoadedEventArgs.registerClass("Sys.WebForms.PageLoadedEventArgs", Sys.EventArgs);
Sys.WebForms.PageLoadingEventArgs = function(b, a, c) {
	Sys.WebForms.PageLoadingEventArgs.initializeBase(this);
	this._panelsUpdating = b;
	this._panelsDeleting = a;
	this._dataItems = c || new Object
};
Sys.WebForms.PageLoadingEventArgs.prototype = {
	get_dataItems: function() {
		return this._dataItems
	},
	get_panelsDeleting: function() {
		return this._panelsDeleting
	},
	get_panelsUpdating: function() {
		return this._panelsUpdating
	}
};
Sys.WebForms.PageLoadingEventArgs.registerClass("Sys.WebForms.PageLoadingEventArgs", Sys.EventArgs);
Sys.WebForms.PageRequestManager = function() {
	this._form = null;
	this._updatePanelIDs = null;
	this._updatePanelClientIDs = null;
	this._oldUpdatePanelIDs = null;
	this._childUpdatePanelIDs = null;
	this._panelsToRefreshIDs = null;
	this._updatePanelHasChildrenAsTriggers = null;
	this._asyncPostBackControlIDs = null;
	this._asyncPostBackControlClientIDs = null;
	this._postBackControlIDs = null;
	this._postBackControlClientIDs = null;
	this._scriptManagerID = null;
	this._pageLoadedHandler = null;
	this._additionalInput = null;
	this._onsubmit = null;
	this._onSubmitStatements = [];
	this._originalDoPostBack = null;
	this._postBackSettings = null;
	this._request = null;
	this._onFormSubmitHandler = null;
	this._onFormElementClickHandler = null;
	this._onWindowUnloadHandler = null;
	this._asyncPostBackTimeout = null;
	this._controlIDToFocus = null;
	this._scrollPosition = null;
	this._dataItems = null;
	this._response = null;
	this._processingRequest = false;
	this._scriptDisposes = {}
};
Sys.WebForms.PageRequestManager.prototype = {
	_get_eventHandlerList: function() {
		if (!this._events) this._events = new Sys.EventHandlerList;
		return this._events
	},
	get_isInAsyncPostBack: function() {
		return this._request !== null
	},
	add_beginRequest: function(a) {
		this._get_eventHandlerList().addHandler("beginRequest", a)
	},
	remove_beginRequest: function(a) {
		this._get_eventHandlerList().removeHandler("beginRequest", a)
	},
	add_endRequest: function(a) {
		this._get_eventHandlerList().addHandler("endRequest", a)
	},
	remove_endRequest: function(a) {
		this._get_eventHandlerList().removeHandler("endRequest", a)
	},
	add_initializeRequest: function(a) {
		this._get_eventHandlerList().addHandler("initializeRequest", a)
	},
	remove_initializeRequest: function(a) {
		this._get_eventHandlerList().removeHandler("initializeRequest", a)
	},
	add_pageLoaded: function(a) {
		this._get_eventHandlerList().addHandler("pageLoaded", a)
	},
	remove_pageLoaded: function(a) {
		this._get_eventHandlerList().removeHandler("pageLoaded", a)
	},
	add_pageLoading: function(a) {
		this._get_eventHandlerList().addHandler("pageLoading", a)
	},
	remove_pageLoading: function(a) {
		this._get_eventHandlerList().removeHandler("pageLoading", a)
	},
	abortPostBack: function() {
		if (!this._processingRequest && this._request) {
			this._request.get_executor().abort();
			this._request = null
		}
	},
	_createPageRequestManagerTimeoutError: function() {
		var b = "Sys.WebForms.PageRequestManagerTimeoutException: " + Sys.WebForms.Res.PRM_TimeoutError,
			a = Error.create(b, {
				name: "Sys.WebForms.PageRequestManagerTimeoutException"
			});
		a.popStackFrame();
		return a
	},
	_createPageRequestManagerServerError: function(a, d) {
		var c = d || "Sys.WebForms.PageRequestManagerServerErrorException: " + String.format(Sys.WebForms.Res.PRM_ServerError, a),
			b = Error.create(c, {
				name: "Sys.WebForms.PageRequestManagerServerErrorException",
				httpStatusCode: a
			});
		b.popStackFrame();
		return b
	},
	_createPageRequestManagerParserError: function(b) {
		var c = "Sys.WebForms.PageRequestManagerParserErrorException: " + String.format(Sys.WebForms.Res.PRM_ParserError, b),
			a = Error.create(c, {
				name: "Sys.WebForms.PageRequestManagerParserErrorException"
			});
		a.popStackFrame();
		return a
	},
	_createPostBackSettings: function(c, b, a) {
		return {
			async: c,
			panelID: b,
			sourceElement: a
		}
	},
	_convertToClientIDs: function(a, d, c) {
		if (a) for (var b = 0; b < a.length; b++) {
			Array.add(d, a[b]);
			Array.add(c, this._uniqueIDToClientID(a[b]))
		}
	},
	_decodeString: function(a) {
		return a.replace(/\\\u00FF\\/g, "\x00").replace(/\u00FF\u00FF/g, "\u00FF")
	},
	_destroyTree: function(f) {
		if (f.nodeType === 1) {
			var d = f.childNodes;
			for (var b = d.length - 1; b >= 0; b--) {
				var a = d[b];
				if (a.nodeType === 1) {
					if (a.dispose && typeof a.dispose === "function") a.dispose();
					else if (a.control && typeof a.control.dispose === "function") a.control.dispose();
					var e = Sys.UI.Behavior.getBehaviors(a);
					for (var c = e.length - 1; c >= 0; c--) e[c].dispose();
					this._destroyTree(a)
				}
			}
		}
	},
	dispose: function() {
		if (this._form) {
			Sys.UI.DomEvent.removeHandler(this._form, "submit", this._onFormSubmitHandler);
			Sys.UI.DomEvent.removeHandler(this._form, "click", this._onFormElementClickHandler);
			Sys.UI.DomEvent.removeHandler(window, "unload", this._onWindowUnloadHandler);
			Sys.UI.DomEvent.removeHandler(window, "load", this._pageLoadedHandler)
		}
		if (this._originalDoPostBack) {
			window.__doPostBack = this._originalDoPostBack;
			this._originalDoPostBack = null
		}
		this._form = null;
		this._updatePanelIDs = null;
		this._oldUpdatePanelIDs = null;
		this._childUpdatePanelIDs = null;
		this._updatePanelClientIDs = null;
		this._asyncPostBackControlIDs = null;
		this._asyncPostBackControlClientIDs = null;
		this._postBackControlIDs = null;
		this._postBackControlClientIDs = null;
		this._asyncPostBackTimeout = null;
		this._scrollPosition = null;
		this._dataItems = null
	},
	_doPostBack: function(a, e, callback) {
		this._additionalInput = null;
		var b = this._form;
		if (b.action !== b._initialAction) this._postBackSettings = this._createPostBackSettings(false, null, null);
		else {
			var f = this._uniqueIDToClientID(a),
				d = document.getElementById(f);
			if (!d) if (Array.contains(this._asyncPostBackControlIDs, a)) this._postBackSettings = this._createPostBackSettings(true, this._scriptManagerID + "|" + a, null);
			else if (Array.contains(this._postBackControlIDs, a)) this._postBackSettings = this._createPostBackSettings(false, null, null);
			else {
				var c = this._findNearestElement(a);
				if (c) this._postBackSettings = this._getPostBackSettings(c, a);
				else this._postBackSettings = this._createPostBackSettings(false, null, null)
			} else this._postBackSettings = this._getPostBackSettings(d, a)
		}
		if (!this._postBackSettings.async) {
			b.onsubmit = this._onsubmit;
			this._originalDoPostBack(a, e);
			b.onsubmit = null;
			return
		}
		b.__EVENTTARGET.value = a;
		b.__EVENTARGUMENT.value = e;
		this._onFormSubmit(null, callback)
	},
	_elementContains: function(b, a) {
		while (a) {
			if (a === b) return true;
			a = a.parentNode
		}
		return false
	},
	_endPostBack: function(a, e) {
		this._processingRequest = false;
		this._request = null;
		this._additionalInput = null;
		var d = this._get_eventHandlerList().getHandler("endRequest"),
			b = false;
		if (d) {
			var c = new Sys.WebForms.EndRequestEventArgs(a, this._dataItems, e);
			d(this, c);
			b = c.get_errorHandled()
		}
		this._dataItems = null;
		if (a && !b) alert(a.message)
	},
	_findNearestElement: function(a) {
		while (a.length > 0) {
			var d = this._uniqueIDToClientID(a),
				c = document.getElementById(d);
			if (c) return c;
			var b = a.lastIndexOf("$");
			if (b === -1) return null;
			a = a.substring(0, b)
		}
		return null
	},
	_findText: function(b, a) {
		var c = Math.max(0, a - 20),
			d = Math.min(b.length, a + 20);
		return b.substring(c, d)
	},
	_getPageLoadedEventArgs: function(f) {
		var e = [],
			d = [],
			h = this._oldUpdatePanelIDs || [],
			b = this._updatePanelIDs,
			g = this._childUpdatePanelIDs || [],
			c = this._panelsToRefreshIDs || [];
		for (var a = 0; a < c.length; a++) Array.add(e, document.getElementById(this._uniqueIDToClientID(c[a])));
		for (var a = 0; a < b.length; a++) if (f || Array.indexOf(g, b[a]) !== -1) Array.add(d, document.getElementById(this._uniqueIDToClientID(b[a])));
		return new Sys.WebForms.PageLoadedEventArgs(e, d, this._dataItems)
	},
	_getPageLoadingEventArgs: function() {
		var e = [],
			d = [],
			b = this._oldUpdatePanelIDs,
			g = this._updatePanelIDs,
			f = this._childUpdatePanelIDs,
			c = this._panelsToRefreshIDs;
		for (var a = 0; a < c.length; a++) Array.add(e, document.getElementById(this._uniqueIDToClientID(c[a])));
		for (var a = 0; a < b.length; a++) if (Array.indexOf(c, b[a]) === -1 && (Array.indexOf(g, b[a]) === -1 || Array.indexOf(f, b[a]) > -1)) Array.add(d, document.getElementById(this._uniqueIDToClientID(b[a])));
		return new Sys.WebForms.PageLoadingEventArgs(e, d, this._dataItems)
	},
	_getPostBackSettings: function(a, c) {
		var d = a,
			b = null;
		while (a) {
			if (a.id) {
				if (!b && Array.contains(this._asyncPostBackControlClientIDs, a.id)) b = this._createPostBackSettings(true, this._scriptManagerID + "|" + c, d);
				else if (!b && Array.contains(this._postBackControlClientIDs, a.id)) return this._createPostBackSettings(false, null, null);
				else {
					var e = Array.indexOf(this._updatePanelClientIDs, a.id);
					if (e !== -1) if (this._updatePanelHasChildrenAsTriggers[e]) return this._createPostBackSettings(true, this._updatePanelIDs[e] + "|" + c, d);
					else return this._createPostBackSettings(true, this._scriptManagerID + "|" + c, d)
				}
				if (!b && this._matchesParentIDInList(a.id, this._asyncPostBackControlClientIDs)) b = this._createPostBackSettings(true, this._scriptManagerID + "|" + c, d);
				else if (!b && this._matchesParentIDInList(a.id, this._postBackControlClientIDs)) return this._createPostBackSettings(false, null, null)
			}
			a = a.parentNode
		}
		if (!b) return this._createPostBackSettings(false, null, null);
		else return b
	},
	_getScrollPosition: function() {
		var a = document.documentElement;
		if (a && (this._validPosition(a.scrollLeft) || this._validPosition(a.scrollTop))) return {
			x: a.scrollLeft,
			y: a.scrollTop
		};
		else {
			a = document.body;
			if (a && (this._validPosition(a.scrollLeft) || this._validPosition(a.scrollTop))) return {
				x: a.scrollLeft,
				y: a.scrollTop
			};
			else if (this._validPosition(window.pageXOffset) || this._validPosition(window.pageYOffset)) return {
				x: window.pageXOffset,
				y: window.pageYOffset
			};
			else return {
				x: 0,
				y: 0
			}
		}
	},
	_initializeInternal: function(a, b) {
		this._scriptManagerID = a;
		this._form = b;
		this._form._initialAction = this._form.action;
		this._onsubmit = this._form.onsubmit;
		this._form.onsubmit = null;
		this._onFormSubmitHandler = Function.createDelegate(this, this._onFormSubmit);
		this._onFormElementClickHandler = Function.createDelegate(this, this._onFormElementClick);
		this._onWindowUnloadHandler = Function.createDelegate(this, this._onWindowUnload);
		Sys.UI.DomEvent.addHandler(this._form, "submit", this._onFormSubmitHandler);
		Sys.UI.DomEvent.addHandler(this._form, "click", this._onFormElementClickHandler);
		Sys.UI.DomEvent.addHandler(window, "unload", this._onWindowUnloadHandler);
		this._originalDoPostBack = window.__doPostBack;
		if (this._originalDoPostBack) window.__doPostBack = Function.createDelegate(this, this._doPostBack);
		this._pageLoadedHandler = Function.createDelegate(this, this._pageLoadedInitialLoad);
		Sys.UI.DomEvent.addHandler(window, "load", this._pageLoadedHandler)
	},
	_matchesParentIDInList: function(c, b) {
		for (var a = 0; a < b.length; a++) if (c.startsWith(b[a] + "_")) return true;
		return false
	},
	_onFormElementClick: function(b) {
		var a = b.target;
		if (a.disabled) return;
		this._postBackSettings = this._getPostBackSettings(a, a.name);
		if (a.name) if (a.tagName === "INPUT") {
			var c = a.type;
			if (c === "submit") this._additionalInput = a.name + "=" + encodeURIComponent(a.value);
			else if (c === "image") {
				var d = b.offsetX,
					e = b.offsetY;
				this._additionalInput = a.name + ".x=" + d + "&" + a.name + ".y=" + e
			}
		} else if (a.tagName === "BUTTON" && a.name.length !== 0 && a.type === "submit") this._additionalInput = a.name + "=" + encodeURIComponent(a.value)
	},
	_onFormSubmit: function(f, callback) {
		var d = true;
		if (this._onsubmit) d = this._onsubmit();
		if (d) for (var g = 0; g < this._onSubmitStatements.length; g++) if (!this._onSubmitStatements[g]()) {
			d = false;
			break
		}
		if (!d) {
			if (f) f.preventDefault();
			return
		}
		var i = this._form;
		if (i.action !== i._initialAction) return;
		if (!this._postBackSettings.async) return;
		var a = new Sys.StringBuilder;
		a.append(this._scriptManagerID + "=" + this._postBackSettings.panelID + "&");
		var p = i.elements.length;
		for (var g = 0; g < p; g++) {
			var c = i.elements[g],
				e = c.name;
			if (typeof e === "undefined" || e === null || e.length === 0) continue;
			var l = c.tagName;
			if (l === "INPUT") {
				var j = c.type;
				if (j === "text" || j === "password" || j === "hidden" || (j === "checkbox" || j === "radio") && c.checked) {
					a.append(e);
					a.append("=");
					a.append(encodeURIComponent(c.value));
					a.append("&")
				}
			} else if (l === "SELECT") {
				var o = c.options.length;
				for (var m = 0; m < o; m++) {
					var n = c.options[m];
					if (n.selected) {
						a.append(e);
						a.append("=");
						a.append(encodeURIComponent(n.value));
						a.append("&")
					}
				}
			} else if (l === "TEXTAREA") {
				a.append(e);
				a.append("=");
				a.append(encodeURIComponent(c.value));
				a.append("&")
			}
		}
		if (this._additionalInput) {
			a.append(this._additionalInput);
			this._additionalInput = null
		}
		var b = new Sys.Net.WebRequest;
		b.set_url(i.action);
		b.get_headers()["X-MicrosoftAjax"] = "Delta=true";
		b.get_headers()["Cache-Control"] = "no-cache";
		b.set_timeout(this._asyncPostBackTimeout);
		b.add_completed(Function.createDelegate(this, function(sender, eventArgs){
			this._onFormSubmitCompleted(sender, eventArgs, callback);
		}.bind(this)));
		b.set_body(a.toString());
		var h = this._get_eventHandlerList().getHandler("initializeRequest");
		if (h) {
			var k = new Sys.WebForms.InitializeRequestEventArgs(b, this._postBackSettings.sourceElement);
			h(this, k);
			d = !k.get_cancel()
		}
		if (!d) {
			if (f) f.preventDefault();
			return
		}
		this._scrollPosition = this._getScrollPosition();
		this.abortPostBack();
		h = this._get_eventHandlerList().getHandler("beginRequest");
		if (h) {
			var k = new Sys.WebForms.BeginRequestEventArgs(b, this._postBackSettings.sourceElement);
			h(this, k)
		}
		this._request = b;
		b.invoke();
		if (f) f.preventDefault()
	},
	_onFormSubmitCompleted: function(sender, eventArgs, callback) {
		this._processingRequest = true;
		var delimitByLengthDelimiter = "|";
		if (sender.get_timedOut()) {
			this._endPostBack(this._createPageRequestManagerTimeoutError(), sender);
			return
		}
		if (sender.get_aborted()) {
			this._endPostBack(null, sender);
			return
		}
		if (!this._request || sender.get_webRequest() !== this._request) return;
		var errorMessage, delta = [];
		if (sender.get_statusCode() !== 200) {
			this._endPostBack(this._createPageRequestManagerServerError(sender.get_statusCode()), sender);
			return
		}
		var reply = sender.get_responseData(),
			delimiterIndex, len, type, id, content, replyIndex = 0,
			parserErrorDetails = null;
		while (replyIndex < reply.length) {
			delimiterIndex = reply.indexOf(delimitByLengthDelimiter, replyIndex);
			if (delimiterIndex === -1) {
				parserErrorDetails = this._findText(reply, replyIndex);
				break
			}
			len = parseInt(reply.substring(replyIndex, delimiterIndex), 10);
			if (len % 1 !== 0) {
				parserErrorDetails = this._findText(reply, replyIndex);
				break
			}
			replyIndex = delimiterIndex + 1;
			delimiterIndex = reply.indexOf(delimitByLengthDelimiter, replyIndex);
			if (delimiterIndex === -1) {
				parserErrorDetails = this._findText(reply, replyIndex);
				break
			}
			type = reply.substring(replyIndex, delimiterIndex);
			replyIndex = delimiterIndex + 1;
			delimiterIndex = reply.indexOf(delimitByLengthDelimiter, replyIndex);
			if (delimiterIndex === -1) {
				parserErrorDetails = this._findText(reply, replyIndex);
				break
			}
			id = reply.substring(replyIndex, delimiterIndex);
			replyIndex = delimiterIndex + 1;
			if (replyIndex + len >= reply.length) {
				parserErrorDetails = this._findText(reply, reply.length);
				break
			}
			content = this._decodeString(reply.substr(replyIndex, len));
			replyIndex += len;
			if (reply.charAt(replyIndex) !== delimitByLengthDelimiter) {
				parserErrorDetails = this._findText(reply, replyIndex);
				break
			}
			replyIndex++;
			Array.add(delta, {
				type: type,
				id: id,
				content: content
			})
		}
		if (parserErrorDetails) {
			this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_ParserErrorDetails, parserErrorDetails)), sender);
			return
		}
		var updatePanelNodes = [],
			hiddenFieldNodes = [],
			arrayDeclarationNodes = [],
			scriptBlockNodes = [],
			expandoNodes = [],
			onSubmitNodes = [],
			dataItemNodes = [],
			dataItemJsonNodes = [],
			scriptDisposeNodes = [],
			asyncPostBackControlIDsNode, postBackControlIDsNode, updatePanelIDsNode, asyncPostBackTimeoutNode, childUpdatePanelIDsNode, panelsToRefreshNode, formActionNode;
		for (var i = 0; i < delta.length; i++) {
			var deltaNode = delta[i];
			switch (deltaNode.type) {
			case "updatePanel":
				Array.add(updatePanelNodes, deltaNode);
				break;
			case "hiddenField":
				Array.add(hiddenFieldNodes, deltaNode);
				break;
			case "arrayDeclaration":
				Array.add(arrayDeclarationNodes, deltaNode);
				break;
			case "scriptBlock":
				Array.add(scriptBlockNodes, deltaNode);
				break;
			case "expando":
				Array.add(expandoNodes, deltaNode);
				break;
			case "onSubmit":
				Array.add(onSubmitNodes, deltaNode);
				break;
			case "asyncPostBackControlIDs":
				asyncPostBackControlIDsNode = deltaNode;
				break;
			case "postBackControlIDs":
				postBackControlIDsNode = deltaNode;
				break;
			case "updatePanelIDs":
				updatePanelIDsNode = deltaNode;
				break;
			case "asyncPostBackTimeout":
				asyncPostBackTimeoutNode = deltaNode;
				break;
			case "childUpdatePanelIDs":
				childUpdatePanelIDsNode = deltaNode;
				break;
			case "panelsToRefreshIDs":
				panelsToRefreshNode = deltaNode;
				break;
			case "formAction":
				formActionNode = deltaNode;
				break;
			case "dataItem":
				Array.add(dataItemNodes, deltaNode);
				break;
			case "dataItemJson":
				Array.add(dataItemJsonNodes, deltaNode);
				break;
			case "scriptDispose":
				Array.add(scriptDisposeNodes, deltaNode);
				break;
			case "pageRedirect":
				window.location.href = deltaNode.content;
				return;
			case "error":
				this._endPostBack(this._createPageRequestManagerServerError(Number.parseInvariant(deltaNode.id), deltaNode.content), sender);
				return;
			case "pageTitle":
				document.title = deltaNode.content;
				break;
			case "focus":
				this._controlIDToFocus = deltaNode.content;
				break;
			default:
				this._endPostBack(this._createPageRequestManagerParserError(String.format(Sys.WebForms.Res.PRM_UnknownToken, deltaNode.type)), sender);
				return
			}
		}
		if(callback){
			setTimeout(callback, 1);
		}
		var i;
		if (asyncPostBackControlIDsNode && postBackControlIDsNode && updatePanelIDsNode && panelsToRefreshNode && asyncPostBackTimeoutNode && childUpdatePanelIDsNode) {
			this._oldUpdatePanelIDs = this._updatePanelIDs;
			var childUpdatePanelIDsString = childUpdatePanelIDsNode.content;
			this._childUpdatePanelIDs = childUpdatePanelIDsString.length ? childUpdatePanelIDsString.split(",") : [];
			var asyncPostBackControlIDsArray = this._splitNodeIntoArray(asyncPostBackControlIDsNode),
				postBackControlIDsArray = this._splitNodeIntoArray(postBackControlIDsNode),
				updatePanelIDsArray = this._splitNodeIntoArray(updatePanelIDsNode);
			this._panelsToRefreshIDs = this._splitNodeIntoArray(panelsToRefreshNode);
			for (i = 0; i < this._panelsToRefreshIDs.length; i++) {
				var panelClientID = this._uniqueIDToClientID(this._panelsToRefreshIDs[i]);
				if (!document.getElementById(panelClientID)) {
					this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel, panelClientID)), sender);
					return
				}
			}
			var asyncPostBackTimeout = asyncPostBackTimeoutNode.content;
			this._updateControls(updatePanelIDsArray, asyncPostBackControlIDsArray, postBackControlIDsArray, asyncPostBackTimeout)
		}
		this._dataItems = {};
		for (i = 0; i < dataItemNodes.length; i++) {
			var dataItemNode = dataItemNodes[i];
			this._dataItems[dataItemNode.id] = dataItemNode.content
		}
		for (i = 0; i < dataItemJsonNodes.length; i++) {
			var dataItemJsonNode = dataItemJsonNodes[i];
			this._dataItems[dataItemJsonNode.id] = eval(dataItemJsonNode.content)
		}
		var handler = this._get_eventHandlerList().getHandler("pageLoading");
		if (handler) handler(this, this._getPageLoadingEventArgs());
		if (formActionNode) {
			this._form.action = formActionNode.content;
			this._form._initialAction = this._form.action
		}
		for (i = 0; i < updatePanelNodes.length; i++) {
			var deltaUpdatePanel = updatePanelNodes[i],
				deltaPanelID = deltaUpdatePanel.id,
				deltaPanelRendering = deltaUpdatePanel.content,
				updatePanelElement = document.getElementById(deltaPanelID);
			if (!updatePanelElement) {
				this._endPostBack(Error.invalidOperation(String.format(Sys.WebForms.Res.PRM_MissingPanel, deltaPanelID)), sender);
				return
			}
			this._updatePanel(updatePanelElement, deltaPanelRendering)
		}
		for (i = 0; i < scriptDisposeNodes.length; i++) {
			var disposePanelId = scriptDisposeNodes[i].id,
				disposeScript = scriptDisposeNodes[i].content;
			this._registerDisposeScript(disposePanelId, disposeScript)
		}
		for (i = 0; i < hiddenFieldNodes.length; i++) {
			var id = hiddenFieldNodes[i].id,
				value = hiddenFieldNodes[i].content,
				hiddenFieldElement = document.getElementById(id);
			if (!hiddenFieldElement) {
				hiddenFieldElement = document.createElement("input");
				hiddenFieldElement.id = id;
				hiddenFieldElement.name = id;
				hiddenFieldElement.type = "hidden";
				this._form.appendChild(hiddenFieldElement)
			}
			hiddenFieldElement.value = value
		}
		var arrayScript = "";
		for (i = 0; i < arrayDeclarationNodes.length; i++) arrayScript += "Sys.WebForms.PageRequestManager._addArrayElement('" + arrayDeclarationNodes[i].id + "', " + arrayDeclarationNodes[i].content + ");\r\n";
		var expandoScript = "";
		for (i = 0; i < expandoNodes.length; i++) {
			var propertyReference = expandoNodes[i].id,
				propertyValue = expandoNodes[i].content;
			expandoScript += propertyReference + " = " + propertyValue + "\r\n"
		}
		Sys._ScriptLoader.readLoadedScripts();
		Sys.Application.beginCreateComponents();
		var scriptLoader = Sys._ScriptLoader.getInstance();
		if (arrayScript.length) scriptLoader.queueScriptBlock(arrayScript);
		if (expandoScript.length) scriptLoader.queueScriptBlock(expandoScript);
		for (i = 0; i < scriptBlockNodes.length; i++) {
			var scriptBlockType = scriptBlockNodes[i].id;
			switch (scriptBlockType) {
			case "ScriptContentNoTags":
				scriptLoader.queueScriptBlock(scriptBlockNodes[i].content);
				break;
			case "ScriptContentWithTags":
				var scriptTagAttributes;
				eval("scriptTagAttributes = " + scriptBlockNodes[i].content);
				if (scriptTagAttributes.src && Sys._ScriptLoader.isScriptLoaded(scriptTagAttributes.src)) continue;
				scriptLoader.queueCustomScriptTag(scriptTagAttributes);
				break;
			case "ScriptPath":
				if (Sys._ScriptLoader.isScriptLoaded(scriptBlockNodes[i].content)) continue;
				scriptLoader.queueScriptReference(scriptBlockNodes[i].content);
				break
			}
		}
		var onSubmitStatementScript = "";
		for (var i = 0; i < onSubmitNodes.length; i++) {
			if (i === 0) onSubmitStatementScript = "Array.add(Sys.WebForms.PageRequestManager.getInstance()._onSubmitStatements, function() {\r\n";
			onSubmitStatementScript += onSubmitNodes[i].content + "\r\n"
		}
		if (onSubmitStatementScript.length) {
			onSubmitStatementScript += "\r\nreturn true;\r\n});\r\n";
			scriptLoader.queueScriptBlock(onSubmitStatementScript)
		}
		this._response = sender;
		// scriptLoader.loadScripts(0, Function.createDelegate(this, this._scriptsLoadComplete), null, null)
	},
	_onWindowUnload: function() {
		this.dispose()
	},
	_pageLoaded: function(a) {
		var b = this._get_eventHandlerList().getHandler("pageLoaded");
		if (b) b(this, this._getPageLoadedEventArgs(a));
		if (!a) Sys.Application.raiseLoad()
	},
	_pageLoadedInitialLoad: function() {
		this._pageLoaded(true)
	},
	_registerDisposeScript: function(a, b) {
		if (!this._scriptDisposes[a]) this._scriptDisposes[a] = [b];
		else Array.add(this._scriptDisposes[a], b)
	},
	_scriptsLoadComplete: function() {
		if (window.__theFormPostData) window.__theFormPostData = "";
		if (window.__theFormPostCollection) window.__theFormPostCollection = [];
		if (window.WebForm_InitCallback) window.WebForm_InitCallback();
		if (this._scrollPosition) {
			if (window.scrollTo) window.scrollTo(this._scrollPosition.x, this._scrollPosition.y);
			this._scrollPosition = null
		}
		Sys.Application.endCreateComponents();
		this._pageLoaded(false);
		this._endPostBack(null, this._response);
		this._response = null;
		if (this._controlIDToFocus) {
			var a, c;
			if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
				var b = $get(this._controlIDToFocus),
					a = b;
				if (b && !WebForm_CanFocus(b)) a = WebForm_FindFirstFocusableChild(b);
				if (a && typeof a.contentEditable !== "undefined") {
					c = a.contentEditable;
					a.contentEditable = false
				} else a = null
			}
			WebForm_AutoFocus(this._controlIDToFocus);
			if (a) a.contentEditable = c;
			this._controlIDToFocus = null
		}
	},
	_splitNodeIntoArray: function(b) {
		var a = b.content,
			c = a.length ? a.split(",") : [];
		return c
	},
	_uniqueIDToClientID: function(a) {
		return a.replace(/\$/g, "_")
	},
	_updateControls: function(a, d, g, e) {
		if (a) {
			this._updatePanelIDs = new Array(a.length);
			this._updatePanelClientIDs = new Array(a.length);
			this._updatePanelHasChildrenAsTriggers = new Array(a.length);
			for (var b = 0; b < a.length; b++) {
				var c = a[b].substr(1),
					f = a[b].charAt(0) === "t";
				this._updatePanelHasChildrenAsTriggers[b] = f;
				this._updatePanelIDs[b] = c;
				this._updatePanelClientIDs[b] = this._uniqueIDToClientID(c)
			}
			this._asyncPostBackTimeout = e * 1000
		} else {
			this._updatePanelIDs = [];
			this._updatePanelClientIDs = [];
			this._updatePanelHasChildrenAsTriggers = [];
			this._asyncPostBackTimeout = 0
		}
		this._asyncPostBackControlIDs = [];
		this._asyncPostBackControlClientIDs = [];
		this._convertToClientIDs(d, this._asyncPostBackControlIDs, this._asyncPostBackControlClientIDs);
		this._postBackControlIDs = [];
		this._postBackControlClientIDs = [];
		this._convertToClientIDs(g, this._postBackControlIDs, this._postBackControlClientIDs)
	},
	_updatePanel: function(updatePanelElement, rendering) {
		for (var updatePanelID in this._scriptDisposes) if (this._elementContains(updatePanelElement, document.getElementById(updatePanelID))) {
			var disposeScripts = this._scriptDisposes[updatePanelID];
			for (var i = 0; i < disposeScripts.length; i++) eval(disposeScripts[i]);
			delete this._scriptDisposes[updatePanelID]
		}
		this._destroyTree(updatePanelElement);
		updatePanelElement.innerHTML = rendering
	},
	_validPosition: function(a) {
		return typeof a !== "undefined" && a !== null && a !== 0
	}
};
Sys.WebForms.PageRequestManager.getInstance = function() {
	return Sys.WebForms.PageRequestManager._instance || null
};
Sys.WebForms.PageRequestManager._addArrayElement = function(a, b) {
	if (typeof window[a] === "undefined") window[a] = [b];
	else Array.add(window[a], b)
};
Sys.WebForms.PageRequestManager._initialize = function(a, b) {
	if (Sys.WebForms.PageRequestManager.getInstance()) throw Error.invalidOperation(Sys.WebForms.Res.PRM_CannotRegisterTwice);
	Sys.WebForms.PageRequestManager._instance = new Sys.WebForms.PageRequestManager;
	Sys.WebForms.PageRequestManager.getInstance()._initializeInternal(a, b)
};
Sys.WebForms.PageRequestManager.registerClass("Sys.WebForms.PageRequestManager");
Sys.UI._UpdateProgress = function(a) {
	Sys.UI._UpdateProgress.initializeBase(this, [a]);
	this._displayAfter = 500;
	this._dynamicLayout = true;
	this._associatedUpdatePanelId = null;
	this._beginRequestHandlerDelegate = null;
	this._startDelegate = null;
	this._endRequestHandlerDelegate = null;
	this._pageRequestManager = null;
	this._timerCookie = null
};
Sys.UI._UpdateProgress.prototype = {
	get_displayAfter: function() {
		return this._displayAfter
	},
	set_displayAfter: function(a) {
		this._displayAfter = a
	},
	get_dynamicLayout: function() {
		return this._dynamicLayout
	},
	set_dynamicLayout: function(a) {
		this._dynamicLayout = a
	},
	get_associatedUpdatePanelId: function() {
		return this._associatedUpdatePanelId
	},
	set_associatedUpdatePanelId: function(a) {
		this._associatedUpdatePanelId = a
	},
	_handleBeginRequest: function(d, c) {
		var a = c.get_postBackElement(),
			b = !this._associatedUpdatePanelId;
		while (!b && a) {
			if (a.id && this._associatedUpdatePanelId === a.id) b = true;
			a = a.parentNode
		}
		if (b) this._timerCookie = window.setTimeout(this._startDelegate, this._displayAfter)
	},
	_startRequest: function() {
		if (this._pageRequestManager.get_isInAsyncPostBack()) if (this._dynamicLayout) this.get_element().style.display = "block";
		else this.get_element().style.visibility = "visible";
		this._timerCookie = null
	},
	_handleEndRequest: function() {
		if (this._dynamicLayout) this.get_element().style.display = "none";
		else this.get_element().style.visibility = "hidden";
		if (this._timerCookie) {
			window.clearTimeout(this._timerCookie);
			this._timerCookie = null
		}
	},
	dispose: function() {
		if (this._pageRequestManager !== null) {
			this._pageRequestManager.remove_beginRequest(this._beginRequestHandlerDelegate);
			this._pageRequestManager.remove_endRequest(this._endRequestHandlerDelegate)
		}
		Sys.UI._UpdateProgress.callBaseMethod(this, "dispose")
	},
	initialize: function() {
		Sys.UI._UpdateProgress.callBaseMethod(this, "initialize");
		this._beginRequestHandlerDelegate = Function.createDelegate(this, this._handleBeginRequest);
		this._endRequestHandlerDelegate = Function.createDelegate(this, this._handleEndRequest);
		this._startDelegate = Function.createDelegate(this, this._startRequest);
		if (Sys.WebForms && Sys.WebForms.PageRequestManager) this._pageRequestManager = Sys.WebForms.PageRequestManager.getInstance();
		if (this._pageRequestManager !== null) {
			this._pageRequestManager.add_beginRequest(this._beginRequestHandlerDelegate);
			this._pageRequestManager.add_endRequest(this._endRequestHandlerDelegate)
		}
	}
};
Sys.UI._UpdateProgress.registerClass("Sys.UI._UpdateProgress", Sys.UI.Control)
Type.registerNamespace('Sys.WebForms');
Sys.WebForms.Res = {
	"PRM_UnknownToken": "Unknown token: \u0027{0}\u0027.",
	"PRM_MissingPanel": "Could not find UpdatePanel with ID \u0027{0}\u0027. If it is being updated dynamically then it must be inside another UpdatePanel.",
	"PRM_ServerError": "An unknown error occurred while processing the request on the server. The status code returned from the server was: {0}",
	"PRM_ParserError": "The message received from the server could not be parsed. Common causes for this error are when the response is modified by calls to Response.Write(), response filters, HttpModules, or server trace is enabled.\r\nDetails: {0}",
	"PRM_TimeoutError": "The server request timed out.",
	"PRM_ParserErrorDetails": "Error parsing near \u0027{0}\u0027.",
	"PRM_CannotRegisterTwice": "The PageRequestManager cannot be initialized more than once."
};

if (typeof(Sys) !== 'undefined') Sys.Application.notifyScriptLoaded();