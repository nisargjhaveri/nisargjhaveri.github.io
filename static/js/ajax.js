/*
 * AJAX utils
 */

function ajax(url) {
    return new AjaxRequest(url);
}

function AjaxRequest(url) {
    this.url = url;
    this.req = new XMLHttpRequest();
    this.doAsync = true;
}

AjaxRequest.prototype = {
    load: function(callback) {
        this.req.addEventListener('load', callback);
        return this;
    },
    error: function(callback) {
        this.req.addEventListener('error', callback);
        return this;
    },
    httpError: function(callback) {
        this.req.addEventListener('load', function(e) {
            if (!(this.status >= 200 && this.status < 300 || this.status < 304)) {
                callback.bind(this)(e);
            }
        });
        return this;
    },
    success: function(callback) {
        this.req.addEventListener('load', function(e) {
            if (this.status >= 200 && this.status < 300 || this.status < 304) {
                callback.bind(this)(e);
            }
        });
        return this;
    },
    fail: function(callback) {
        this.error(callback);
        this.httpError(callback);
        return this;
    },
    abort: function(callback) {
        this.req.addEventListener('abort', callback);
        return this;
    },
    complete: function(callback) {
        this.req.addEventListener('loadend', callback);
        return this;
    },
    type: function(responseType) {
        this.req.responseType = responseType;
        return this;
    },
    async: function(async) {
        this.doAsync = async;
        return this;
    },
    open: function(method, url) {
        method = method || 'GET';
        this.url = url || this.url;
        if (this.req.readyState === 0) {
            this.req.open(method, this.url, this.doAsync);
        }
        return this;
    },
    send: function() {
        if (this.req.readyState === 0) {
            this.open();
        }
        if (this.req.readyState === 1) {
            this.req.send();
        }
        return this;
    }
};
