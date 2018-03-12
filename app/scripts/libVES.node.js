/**
 * @title libVES
 * @dev A JavaScript end-to-end encryption interface to VESvault REST API
 * @version 1.01b
 *
 * @dev Official source code: https://github.com/vesvault/libVES
 *
 * @author Jim Zubov <jz@vesvault.com> (VESvault)
 * GPL license, http://www.gnu.org/licenses/
 */

if (!window.libVES) window.libVES = function(optns) {
    try {
	if (!window.crypto.subtle.digest) throw new libVES.Error('Init','crypto.subtle is improperly implemented?');
    } catch (e) {
	if (e instanceof libVES.Error) throw e;
	throw new libVES.Error('Init','crypto.subtle is not usable' + (document.location.protocol.match(/https/) ? '' : ' (try https?)'));
    }
    for (var k in optns) this[k] = optns[k];
    if (this.domain) this.type = 'secondary';
    else if (this.user) this.type = 'primary';
    else throw new libVES.Error('InvalidValue','Required parameters: user || domain');
    this.unlockedKeys = {};
}

libVES.prototype = {
    apiUrl: 'https://api.ves.host/v1/',
    wwwUrl: 'https://www.vesvault.com/',
    keyAlgo: 'RSA',
    textCipher: 'AES256CBC',
    defaultHash: 'SHA256',
    
    request: function(method,uri,body,optns) {
	if (!optns) optns = {};
	return new Promise(function(resolve,reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method,this.apiUrl + uri);
	    if (optns.abortFn) optns.abortFn(function() {
		return xhr.abort();
	    });
	    xhr.onreadystatechange = function() {
		switch(xhr.readyState) {
		    case 4:
			if (xhr.response && typeof(xhr.response) == 'object') {
			    if (xhr.response.errors) {
				var errs = xhr.response.errors.map(function(e) {
				    return new libVES.Error(e.type,e.message,e);
				});
				if (errs.length) {
				    if (optns && optns.onerror) try {
					resolve(optns.onerror(errs));
				    } catch (e) {
					reject(e);
				    }
				    else reject(errs[0]);
				}
			    }
			    else resolve(xhr.response.result);
			} else reject(new libVES.Error('BadResponse','Empty response'));
		}
	    };
	    if (body != null) xhr.setRequestHeader('Content-Type','application/json');
	    xhr.setRequestHeader('Accept','application/json');
	    if (this.user && optns.password) xhr.setRequestHeader('Authorization','Basic ' + btoa(this.user + ':' + optns.password));
	    else if (this.token) xhr.setRequestHeader('Authorization','Bearer ' + this.token);
	    xhr.responseType = 'json';
	    xhr.send(body);
	}.bind(this));
    },
    get: function(uri,fields,optns) {
	return this.request('GET',this.uriWithFields(uri,fields),null,optns);
    },
    post: function(uri,data,fields,optns) {
	return this.request('POST',this.uriWithFields(uri,fields),JSON.stringify(data),optns);
    },
    uriWithFields: function(uri,fields) {
	return fields ? uri + (uri.match(/\?/) ? '&' : '?') + 'fields=' + this.uriListFields(fields) : uri;
    },
    uriListFields: function(fields) {
	if (typeof(fields) == 'object') {
	    var rs = [];
	    if (fields[0]) rs = fields;
	    else for (var k in fields) {
		if (fields[k]) rs.push(k + (typeof(fields[k]) == 'object' ? '(' + this.uriListFields(fields[k]) + ')' : ''));
	    }
	    return rs.join(',');
	}
	return '';
    },
    login: function(passwd) {
	if (this.token) return this.me();
	var self = this;
	return this.userMe = Promise.resolve(passwd).then(function(passwd) {
	    return self.get('me',{sessionToken: true},{password: passwd}).then(function(data) {
		if (!data.sessionToken) throw new libVES.Error('InvalidValue','Session Token is not received');
		self.token = data.sessionToken;
		return new libVES.User(data,self);
	    });
	});
    },
    logout: function() {
	this.token = undefined;
	return this.lock();
    },
    delegate: function() {
	var self = this;
	return libVES.getModule(libVES,'Delegate').then(function(dlg) {
	    return dlg.login(self);
	});
    },
    me: function() {
	var self = this;
	if (!this.userMe) this.userMe = this.get('me').then((function(data) {
	    return new libVES.User(data,self);
	}).bind(this));
	return this.userMe;
    },
    unlock: function(veskey) {
	var self = this;
	return this.getVaultKey().then(function(vkey) {
	    return vkey.unlock(Promise.resolve(veskey)).then(function(cryptoKey) {
		if (!self.token && self.type == 'secondary') return vkey.getSessionToken().then(function(tkn) {
		    self.token = tkn;
		    return Promise.resolve(veskey).then(function(veskey) {
			if (veskey) return vkey.reshareVESkey(veskey).catch(function(){});
		    }).then(function() {
			return cryptoKey;
		    });
		});
		return cryptoKey;
	    });
	});
    },
    lock: function() {
	this.unlockedKeys = {};
	return Promise.resolve(true);
    },
    reset: function(val) {
	this.userMe = undefined;
	return this.lock().then(function() {
	    return val;
	});
    },
    getVaultKey: function() {
	var self = this;
	switch (this.type) {
	    case 'primary': return this.me().then(function(me) {
		return me.getCurrentVaultKey();
	    });
	    case 'secondary': return (this.vaultKey || (this.vaultKey = this.prepareExternals({externalId: self.externalId}).then(function(ext) {
		var vKey = new libVES.VaultKey({type: 'secondary', externals: ext},self);
		return vKey.getField('encSessionToken').then(function(tk) {
		    return vKey;
		});
	    })));
	    default: throw new libVES.Error('Internal','Invalid libVES.type: ' + this.type);
	}
    },
    getShadowKey: function() {
	return this.me().then(function(me) {
	    return me.getShadowVaultKey();
	});
    },
    getVaultKeysById: function() {
	if (!this.vaultKeysById) this.vaultKeysById = this.me().then(function(me) {
	    return me.getVaultKeys().then(function(vaultKeys) {
		return Promise.all(vaultKeys.map(function(e,i) {
		    return e.getId();
		})).then(function(ids) {
		    var rs = {};
		    for (var i = 0; i < ids.length; i++) rs[ids[i]] = vaultKeys[i];
		    return rs;
		});
	    });
	});
	return this.vaultKeysById;
    },
    getItems: function() {
	var self = this;
	return this.getVaultKey().then(function(k) {
	    return k.getId().then(function(kid) {
		return k.getVaultEntries().then(function(ves) {
		    var vis = {};
		    var vlst = [];
		    for (var i = 0; i < ves.length; i++) {
			var viid = ves[i].vaultItem.id;
			if (!vis[viid]) {
			    var vi = vis[viid] = self.getItem(ves[i].vaultItem);
			    vlst.push(vi);
			    vi.vaultEntryByKey[kid] = ves[i];
			}
		    }
		    return vlst;
		});
	    });
	});
    },
    getItem: function(data) {
	return new libVES.VaultItem(data,this);
    },
    postItem: function(data) {
	var vi = new libVES.VaultItem(data,this);
	return vi.validate().then(function() {
	    return vi.post();
	});
    },
    usersToKeys: function(users) {
	var self = this;
	return Promise.all(users.map(function(u) {
	    if (typeof(u) == 'object') {
		if (u instanceof libVES.VaultKey) return [u];
		else if (u instanceof libVES.External) return [new libVES.VaultKey({externals:[u]},self)];
		else if (u instanceof libVES.User) return self.getUserKeys(u);
		else if (u instanceof Array || u.domain != null || u.externalId != null) return self._matchSecondaryKey(u,u.user).then(function(vkey) {
		    return [vkey];
		});
	    }
	    return self.getUserKeys(self._matchUser(u));
	})).then(function(ks) {
	    var rs = [];
	    for (var i = 0; i < ks.length; i++) for (var j = 0; j < ks[i].length; j++) rs.push(ks[i][j]);
	    return rs;
	});
    },
    _matchUser: function(u) {
	if (typeof(u) == 'object') {
	    if (u instanceof libVES.User) return u;
	    else return new libVES.User(u,this);
	} else if (typeof(u) == 'string' && u.match(/^\S+\@\S+$/)) return new libVES.User({email: u},this);
	throw new libVES.Error('BadUser',"Cannot match user: " + u,{value: u});
    },
    _matchSecondaryKey: function(ext,user) {
	var self = this;
	var m = function() {
	    return libVES.getModule(libVES.Domain,ext.domain);
	};
	return (ext.externalId ? self.prepareExternals(ext) : m().then(function(dom) {
	    return Promise.resolve(user || self.me()).then(function(u) {
		return dom.userToVaultRef(u);
	    }).then(function(ex) {
		return self.prepareExternals([ex]);
	    });
	}).catch(function(e) {
	    throw new libVES.Error('NotFound','Cannot match externalId for domain:' + ext.domain + ', user:' + user + '. Define libVES.Domain.' + ext.domain + '.userToVaultRef(user) to return a valid reference.',{error: e});
	})).then(function(exts) {
	    var vkey = new libVES.VaultKey({externals: exts, creator: self.me()},self);
	    return vkey.getId().then(function() {
		return vkey;
	    }).catch(function(e) {
		if (e.code != 'NotFound') throw e;
		return Promise.resolve(user || m().then(function(dom) {
		    return dom.vaultRefToUser(exts[0]);
		})).catch(function(e) {
		    throw new libVES.Error('NotFound','No matching secondary key (domain:' + ext.domain + ', externalId:' + ext.externalId + '). Supply "user" to create the temp key, or define libVES.Domain.' + ext.domain + '.vaultRefToUser(vaultRef) to return matching libVES.User',{error: e});
		}).then(function(u) {
		    return self.me().then(function(me) {
			return Promise.all([me.getId(),u.getId()]).then(function(ids) {
			    if (ids[0] == ids[1]) return self.getSecondaryKey(exts,true);
			}).catch(function(e) {
			    if (e != 'NotFound') throw e;
			}).then(function(rs) {
			    return rs || self.createTempKey(self._matchUser(u)).then(function(vkey) {
				return vkey.setField('externals',exts).then(function() {
				    return vkey;
				});
			    });
			});
		    });
		});
	    });
	});
    },
    getUserKeys: function(usr) {
	var self = this;
	return usr.getActiveVaultKeys().catch(function(e) {
	    if (e.code == 'NotFound') return [];
	    throw e;
	}).then(function(keys) {
	    return Promise.all(keys.map(function(k,i) {
		return k.getPublicCryptoKey().then(function() {
		    return k;
		}).catch(function() {});
	    })).then(function(keys) {
		var rs = [];
		for (var i = 0; i < keys.length; i++) if (keys[i]) rs.push(keys[i]);
		return rs;
	    });
	}).then(function(keys) {
	    if (!keys.length) return self.createTempKey(usr).then(function(k) {
		return [k];
	    });
	    return keys;
	});
    },
    createTempKey: function(usr,optns) {
	var self = this;
	var key = new libVES.VaultKey({type: 'temp', algo: this.keyAlgo, user: usr},self);
	var veskey = this.generateVESkey(usr);
	return key.generate(veskey,optns).then(function(k) {
	    if (self.e2e && self.e2e.length) usr.e2e = self.getVESkeyE2E(veskey,usr);
	    key.setField('vaultItems',veskey.then(function(v) {
		var vi = new libVES.VaultItem({type: 'password'},self);
		return self.me().then(function(me) {
		    return vi.shareWith([me],v,false).then(function() {
			return [vi];
		    });
		});
	    }));
	    key.setField('creator',self.me());
	    return key;
	});
    },
    generateVESkey: function(usr) {
	var buf = new Uint8Array(24);
	crypto.getRandomValues(buf);
	return Promise.resolve(libVES.Util.ByteArrayToB64(buf));
    },
    getVESkeyE2E: function(veskey,usr) {
	var self = this;
	return veskey.then(function(v) {
	    return libVES.getModule(libVES.E2E,['Dialog','TempKey']).then(function(cls) {
		return new cls({
		    user: usr,
		    e2e: self.e2e,
		    tempKey: v
		});
	    });
	});
    },
    setVESkey: function(veskey,lost,options) {
	var self = this;
	return this.me().then(function(me) {
	    return (new libVES.VaultKey({type: 'current', algo: self.keyAlgo, user: me},self)).generate(Promise.resolve(veskey),options).then(function(k) {
		return self.getVaultKey().then(function(cur) {
		    var r;
		    if (cur) {
			if (lost) r = cur.setField('type','lost').then(function() {
			    k.user = undefined;
			    return me.setField('vaultKeys',[cur,k]).then(function() {
				return me;
			    });
			});
			else r = k.rekeyFrom(cur);
		    } else r = k;
		    me.currentVaultKey = me.activeVaultKeys = undefined;
		    if (!cur || !lost) me.vaultKeys = undefined;
		    return r;
		}).then(function(r) {
		    return r.post(undefined,undefined,options);
		}).then(function(post) {
		    return self.reset(post);
		}).then(function() {
		    return self.getVaultKey();
		});
	    });
	});
    },
    prepareExternals: function(ext) {
	var self = this;
	if (!ext) return Promise.reject(new libVES.Error('InvalidValue','External reference is required'));
	return Promise.resolve(ext).then(function(ext) {
	    if (!(ext instanceof Array)) ext = [ext];
	    if (ext.length < 1) throw new libVES.Error('InvalidValue','External reference is required');
	    var rs = [];
	    for (var i = 0; i < ext.length; i++) {
		rs[i] = (typeof(ext[i]) == 'object') ? {externalId: ext[i].externalId, domain: ext[i].domain} : {externalId: ext[i]};
		if (!rs[i].domain && !(rs[i].domain = self.domain)) throw new libVES.Error('InvalidValue','External reference: domain is required');
		if (!rs[i].externalId) throw new libVES.Error('InvalidValue','External reference: externalId is required');
	    }
	    return rs;
	});
    },
    getSecondaryKey: function(ext,force) {
	var self = this;
	return this.prepareExternals(Promise.resolve(ext).then(function(e) {
	    if (e.domain && !e.externalId) return libVES.getModule(libVES.Domain,e.domain).then(function(mod) {
		return self.me().then(function(me) {
		    return mod.userToVaultRef(me,self);
		});
	    });
	    return e;
	})).then(function(ext) {
	    var vkey = new libVES.VaultKey({externals: ext},self);
	    return vkey.getId().then(function(id) {
		return vkey;
	    }).catch(function(e) {
		if (!force) throw e;
		return self.setSecondaryKey(ext);
	    });
	});
    },
    setSecondaryKey: function(ext,veskey,optns) {
	var self = this;
	return this.prepareExternals(ext).then(function(ext) {
	    if (!veskey) veskey = self.generateVESkey();
	    return self.me().then(function(me) {
		return (new libVES.VaultKey({type: 'secondary', algo: self.keyAlgo, user: me, externals: ext},self)).generate(veskey,optns).then(function(k) {
		    var vi = new libVES.VaultItem({type: "password"},self);
		    k.setField('vaultItems',[vi]);
		    return Promise.resolve(veskey).then(function(v) {
			if (!v) throw new libVES.Error('InvalidValue','VESkey cannot be empty');
			return vi.shareWith([me],v,false).then(function() {
			    return k.post().then(function(post) {
				self.reset(post);
				return k;
			    });
			});
		    });
		});
	    });
	});
    },
    setShadow: function(usrs,optns) {
	if (!optns || !optns.n) return Promise.reject(new libVES.Error('InvalidValue','optns.n must be an integer'));
	var self = this;
	var rkey = new Uint8Array(32);
	window.crypto.getRandomValues(rkey);
	var algo = optns.v ? libVES.Scramble.algo[optns.v] : libVES.Scramble.RDX;
	if (!algo) return Promise.reject(new libVES.Error('InvalidValue','Unknown scramble algorithm: ' + optns.v));
	var s = new algo(optns.n);
	return s.explode(rkey,usrs.length).then(function(tkns) {
	    return self.me().then(function(me) {
		me.activeVaultKeys = undefined;
		return me.setField('shadowVaultKey',new libVES.VaultKey({type: 'shadow', user: me, algo: self.keyAlgo},self).generate(rkey,optns),false).then(function(k) {
		    return me.getCurrentVaultKey().then(function(curr) {
			return k.rekeyFrom(curr).catch(function() {}).then(function() {
			    libVES.Object._refs = {"#/":k};
			    k.setField('vaultItems',Promise.all(tkns.map(function(tk,i) {
				var vi = new  libVES.VaultItem({type: 'secret'},self);
				return vi.shareWith([usrs[i]],tk,false).then(function() {
				    return vi;
				});
			    })).then(function(vis) {
				delete(libVES.Object._refs);
				return vis;
			    }));
			    return k.post();
			});
		    });
		}).catch(function(e) {
		    me.shadowVaultKey = undefined;
		    throw e;
		}).then(function() {
		    me.currentVaultKey = me.activeVaultKeys = undefined;
		    return me.getShadowVaultKey();
		});
	    });
	});
    },
    getFile: function(fileRef) {
	var self = this;
	return self.prepareExternals(fileRef).then(function(ext) {
	    return new libVES.File({externals: ext},self);
	});
    },
    getFileItem: function(fileRef) {
	var self = this;
	return self.getFile(fileRef).then(function(file) {
	    return new libVES.VaultItem({file: file},self);
	});
    },
    getValue: function(fileRef) {
	return this.getFileItem(fileRef).then(function(vaultItem) {
	    return vaultItem.get();
	});
    },
    putValue: function(fileRef,value,shareWith) {
	var self = this;
	return this.getFileItem(fileRef).then(function(vaultItem) {
	    return vaultItem.setField('type',libVES.VaultItem.Type._detect(value)).then(function(type) {
		return vaultItem.getFile().then(function(file) {
		    return file.getExternals().then(function(exts) {
			return exts[0].getDomain().then(function(domain) {
			    var m = libVES.getModule(libVES.Domain,domain);
			    file.setField('path',m.then(function(mod) {
				return mod.defaultFilePath(file,exts[0]);
			    }).catch(function() {
				return '';
			    }));
			    file.setField('name',m.then(function(mod) {
				return mod.defaultFileName(file,exts[0]);
			    }).catch(function() {
				return null;
			    }));
			    return type;
			});
		    });
		});
	    }).then(function() {
	        return Promise.resolve(shareWith || self.getFileItem(fileRef).then(function(vi) {
	    	    return vi.getShareList();
	    	}).catch(function(e) {
		    return self.usersToKeys([{domain: fileRef.domain}]);
		})).then(function(shareWith) {
		    return vaultItem.shareWith(shareWith,value);
		});
	    });
	});
    },
    shareFile: function(fileRef,shareWith) {
	return this.getFileItem(fileRef).then(function(vaultItem) {
	    return vaultItem.shareWith(shareWith);
	});
    },
    deleteFile: function(fileRef) {
	return this.getFile(fileRef).then(function(file) {
	    return file.delete();
	});
    },
    newSecret: function(cls) {
	if (!cls) cls = this.textCipher;
	else cls = cls.split('.')[0];
	return libVES.getModule(libVES.Cipher,cls).then(function(ci) {
	    return (new ci()).getSecret().then(function(buf) {
		return cls + '.' + libVES.Util.ByteArrayToB64W(buf);
	    });
	});
    },
    secretToCipher: function(secret) {
	var ss = secret.split('.');
	return libVES.getModule(libVES.Cipher,ss[0]).then(function(cls) {
	    return new cls(libVES.Util.B64ToByteArray(ss[1]));
	});
    },
    encryptText: function(openText,secret) {
	return this.secretToCipher(secret).then(function(ci) {
	    return ci.encrypt(libVES.Util.StringToByteArray(openText),true).then(function(buf) {
		return libVES.Util.ByteArrayToB64W(buf);
	    });
	});
    },
    decryptText: function(cipherText,secret) {
	return this.secretToCipher(secret).then(function(ci) {
	    return ci.decrypt(libVES.Util.B64ToByteArray(cipherText),true).then(function(buf) {
		return libVES.Util.ByteArrayToString(buf);
	    });
	});
    },
    hashText: function(text,cls) {
	if (cls) cls = cls.split('.')[0];
	else cls = this.defaultHash;
	return libVES.getModule(libVES.Util,['Hash',cls]).then(function(fn) {
	    return fn(libVES.Util.StringToByteArray(text)).then(function(buf) {
		return cls + '.' + libVES.Util.ByteArrayToB64W(buf);
	    });
	});
    },
    found: function(veskeys,vaultKeys) {
	var self = this;
	return Promise.resolve(veskeys).then(function(veskeys) {
	    var chain = Promise.resolve(0);
	    if (veskeys && !(veskeys instanceof Array)) veskeys = [veskeys];
	    return (vaultKeys ? Promise.resolve(vaultKeys) : self.me().then(function(me) {
		var rs = [];
		return me.getVaultKeys().then(function(vaultKeys) {
		    return Promise.all(vaultKeys.map(function(vaultKey,i) {
			return vaultKey.getType().then(function(t) {
			    switch (t) {
				case 'temp': case 'lost': case 'recovery': rs.push(vaultKey);
			    }
			});
		    }));
		}).then(function() {
		    return rs;
		});
	    })).then(function(vaultKeys) {
		if (!(vaultKeys instanceof Array)) vaultKeys = [vaultKeys];
		return Promise.all(vaultKeys.map(function(vaultKey,i) {
		    return vaultKey.getRecovery().then(function(rcv) {
			return rcv.unlock();
		    }).catch(function(e) {
			var rs = vaultKey.unlock();
			if (veskeys) veskeys.map(function(veskey,i) {
			    rs = rs.catch(function() {
				return vaultKey.unlock(veskey);
			    });
			});
			return rs;
		    }).then(function() {
			chain = chain.then(function(ct) {
			    return vaultKey.rekey().then(function() {
				if (self.onRekey) return self.onRekey(vaultKey);
			    }).then(function() {
				return ct + 1;
			    });
			}).catch(function(e) {console.log(e);});;
		    }).catch(function() {});
		}));
	    }).then(function() {
		return chain;
	    });
	}).then(function(ct) {
	    if (ct) return ct + self.found();
	});
    },
    getMyRecoveries: function() {
	var self = this;
	return self.me().then(function(me) {
	    return me.getVaultKeys().then(function(vaultKeys) {
			return Promise.all(vaultKeys.map(function(e,i) {
				return e.getType();
			})).then(function(types) {
				var rs = [];
				for (var i = 0; i < types.length; i++) switch (types[i]) {
					case 'recovery': case 'shadow':
					rs.push(vaultKeys[i].getRecovery());
				}
				return Promise.all(rs);
			});
		});
	});
    },
    getFriendsRecoveries: function() {
	var self = this;
	return self.me().then(function(me) {
	    return me.getFriendsVaultKeys().then(function(vaultKeys) {
		return Promise.all(vaultKeys.map(function(e,i) {
		    return e.getType();
		})).then(function(types) {
		    var rs = [];
		    for (var i = 0; i < types.length; i++) switch (types[i]) {
			case 'recovery': case 'shadow':
			    rs.push(vaultKeys[i].getRecovery());
		    }
		    return Promise.all(rs);
		});
	    });
	});
    }
};

libVES.Error = function(code,msg,optns) {
    this.code = code;
    this.message = msg;
    if (optns) for (var k in optns) this[k] = optns[k];
};

libVES.Error.prototype.toString = function() {
    return this.message || this.code;
};

libVES.getModule = function(sectn,mods) {
    var mod;
    if (mods instanceof Array) mod = mods[0];
    else mods = [mod = mods];
    if (sectn[mod]) return mods.length > 1 ? libVES.getModule(sectn[mod],mods.slice(1)) : Promise.resolve(sectn[mod]);
    if (sectn.loadModule) {
	if (sectn.loadModule[mod]) return sectn.loadModule[mod];
    } else sectn.loadModule = {};
    return sectn.loadModule[mod] = libVES.loadModule(sectn,mod).then(function(m) {
	delete(sectn.loadModule[mod]);
	sectn[mod] = m;
	return ((mods instanceof Array) && mods.length > 1 ? libVES.getModule(m,mods.slice(1)) : m);
    });
};
libVES.getModuleFunc = function(sectn,mod,then) {
    return function() { var m = libVES.getModule(sectn,mod); return then ? m.then(then) : m; };
};
libVES.loadModule = function(sectn,mod) {
    return Promise.reject(new libVES.Error('Internal',"Cannot load " + sectn + '.' + mod));
};

if (!libVES.Domain) libVES.Domain = {};

libVES.Util = {
    B64ToByteArray: function(s) {
	var buf = new Uint8Array(s.length);
	var boffs = 0;
	for (var i = 0; i < s.length; i++) {
	    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/-_".indexOf(s[i]);
	    if (p >= 0) {
		if (p >= 64) p -= 2;
		buf[boffs >> 3] |= p << 2 >> (boffs & 7);
		boffs += 6;
		if ((boffs & 7) < 6) buf[boffs >> 3] |= p << (8 - (boffs & 7));
	    }
	}
	var l = boffs >> 3;
	var buf2 = new Uint8Array(l);
	for (var i = 0; i < l; i++) buf2[i] = buf[i];
	return buf2.buffer;
    },
    ByteArrayToB64D: function(b,dict) {
	var buf = new Uint8Array(b);
	var s = "";
	var boffs = 0;
	while ((boffs >> 3) < buf.byteLength) {
	    var c = (buf[boffs >> 3] << (boffs & 7)) & 0xfc;
	    boffs += 6;
	    if (((boffs & 7) < 6) && ((boffs >> 3) < buf.byteLength)) c |= (buf[boffs >> 3] >> (6 - (boffs & 7)));
	    s += dict[c >> 2];
	}
	for (; boffs & 7; boffs += 6) s += dict.substr(64);
	return s;
    },
    ByteArrayToB64: function(b) {
	return libVES.Util.ByteArrayToB64D(b,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
    },
    ByteArrayToB64W: function(b) {
	return libVES.Util.ByteArrayToB64D(b,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
    },
    StringToByteArray: function(s) {
	if ((s instanceof ArrayBuffer) || (s instanceof Uint8Array)) return s;
	var rs = new Uint8Array(4 * s.length);
	var j = 0;
	for (var i = 0; i < s.length;i++) {
	    var c = s.charCodeAt(i);
	    if (c >= 0x80) {
		if (c >= 0x0800) {
		    if (c >= 0x10000) {
			rs[j++] = (c >> 16) | 0xf0;
			rs[j++] = ((c >> 12) & 0x3f) | 0x80;
		    } else rs[j++] = ((c >> 12) & 0x0f) | 0xe0;
		    rs[j++] = ((c >> 6) & 0x3f) | 0x80;
		} else rs[j++] = ((c >> 6) & 0x1f) | 0xc0;
		rs[j++] = (c & 0x3f) | 0x80;
	    } else rs[j++] = c;
	}
	return rs.slice(0,j).buffer;
    },
    ByteArrayToString: function(b) {
	var buf = new Uint8Array(b);
	var rs = '';
	var c;
	for (var i = 0; i < buf.length; i++) {
	    var v = buf[i];
	    if (v & 0x80) {
		if (v & 0x40) {
		    c = ((v & 0x1f) << 6) | (buf[++i] & 0x3f);
		    if (v & 0x20) {
			c = (c << 6) | (buf[++i] & 0x3f);
			if (v & 0x10) c = ((c & 0xffff) << 6) | (buf[++i] & 0x3f);
		    }
		} else c = -1;
	    } else c = buf[i];
	    rs += String.fromCharCode(c);
	}
	return rs;
    },
    PEM: {
	toDER: function(pem) {
	    var pp = pem.match(/-----BEGIN.*?-----\s*\r?\n([A-Za-z0-9\/\+\=\s\r\n]*)-----END/);
	    if (!pp) throw new libVES.Error('Internal','PEM formatted key expected');
	    return new Uint8Array(libVES.Util.B64ToByteArray(pp[1]));
	},
	decode: function(pem) {
	    return libVES.Util.ASN1.decode(libVES.Util.PEM.toDER(pem));
	},
	import: function(pem,optns) {
	    return libVES.Util.ASN1.import(libVES.Util.PEM.toDER(pem),optns);
	},
	fromDER: function(der) {
	},
	encode: function(der,sgn) {
	    return '-----BEGIN ' + sgn + '-----\r\n' + libVES.Util.ByteArrayToB64(der).match(/.{1,64}/g).join("\r\n") + '\r\n-----END ' + sgn + '-----';
	}
    },
    ASN1: {
	decode: function(der) {
	    var p = 0;
	    var data = function() {
		var l = der[p++];
		var len;
		if (l < 128) len = l;
		else {
		    len = 0;
		    for (var i = 128; i < l; i++) len = (len << 8) | der[p++];
		}
		if (p + len > der.length) throw new libVES.Error('Internal',"Invalid ASN.1 package");
		return der.slice(p,p = p + len);
	    };
	    var rs = [];
	    for (; p < der.length;) {
		var tag = der[p++];
		switch (tag) {
		    case 48:
			rs.push(libVES.Util.ASN1.decode(data()));
			break;
		    case 6:
			rs.push(new libVES.Util.OID(data()));
			break;
		    case 2:
			var d = data();
			var v = 0;
			for (var i = 0; i < d.length; i++) v = (v << 8) | d[i];
			rs.push(v);
			break;
		    case 5:
			data();
			rs.push(null);
			break;
		    default:
			rs.push(data());
			break;
		}
	    }
	    return rs;
	},
	encode: function(data) {
	    var i2a = function(v) {
		if (v < 0) throw new libVES.Error('Internal',"Negative value for ASN.1 integer!");
		var rs = [];
		do {
		    rs.push(v & 0xff);
		    v >>= 8;
		} while (v > 0);
		return rs.reverse();
	    };
	    var bufs = [];
	    var buf = function(tag,bf) {
		var b = new Uint8Array(bf);
		var l = b.length;
		var rs;
		if (l <= 127) {
		    rs = new Uint8Array(l + 2);
		    rs[1] = l; 
		    rs.set(b,2);
		} else {
		    var lb = i2a(l);
		    rs = new Uint8Array(l + lb.length + 2);
		    rs[1] = 128 + lb.length;
		    rs.set(lb,2);
		    rs.set(b,2 + lb.length);
		}
		rs[0] = tag;
		bufs.push(rs);
		return rs;
	    };
	    var d;
	    for (var i = 0; i < data.length; i++) switch (typeof(d = data[i])) {
		case 'object':
		    if (d == null) buf(5,new Uint8Array(0));
		    else if (d instanceof Array) buf(48,libVES.Util.ASN1.encode(d));
		    else if (d instanceof libVES.Util.OID) buf(6,d.getBuffer());
		    else if (d instanceof Uint8Array || d instanceof ArrayBuffer) buf((d.ASN1type || 4),d);
		    else throw new libVES.Error('Internal',"ASN.1 encode - Unknown type");
		    break;
		case 'number':
		    buf(2,i2a(d));
		    break;
		default: throw new libVES.Error('Internal',"ASN.1 encode - Unknown type");
	    }
	    var l = 0;
	    for (var i = 0; i < bufs.length; i++) l += bufs[i].length;
	    var der = new Uint8Array(l);
	    var p = 0;
	    for (i = 0, p = 0; i < bufs.length; p += bufs[i].length, i++) der.set(bufs[i],p);
	    return der;
	},
	import: function(der,optns) {
	    var k = libVES.Util.ASN1.decode(der)[0];
	    if (!k) throw new libVES.Error('Internal','Empty ASN.1 package?');
	    var i = 0;
	    if (typeof(k[i]) == 'number') (optns || (optns = {})).version = k[i++];
	    if (typeof(k[i]) == 'object' && (k[i][0] instanceof libVES.Util.OID)) return k[i][0].object().then(function(m) {
		return m.import(k[i][1],function(call,optns) {
		    return new Promise(function(resolve,reject) {
			switch (call) {
			    case 'container': return resolve(der);
			    default: return resolve(k[i + 1]);
			}
		    });
		},optns);
	    });
	    return libVES.Util.ASN1.import(libVES.Util.ASN1.encode([[0,[new libVES.Util.OID('1.2.840.113549.1.1.1'),null],der]])).catch(function(e) {
		throw new libVES.Error('Internal',"Unknown key format",{error: e});
	    });
	},
	setType: function(t,buf) {
	    var rs = new Uint8Array(buf);
	    rs.ASN1type = t;
	    return rs;
	}
    },
    OID: function(s) {
	if (s instanceof Uint8Array) {
	    var rs = [ Math.floor(s[0] / 40), s[0] % 40 ];
	    var r = 0;
	    for (var p = 1; p < s.length; p++) {
		var v = s[p];
		r = (r << 7) | (v & 0x7f);
		if (!(v & 0x80)) {
		    rs.push(r);
		    r = 0;
		}
	    }
	    this.value = rs.join('.');
	} else this.value = s;
    },
    PKCS1: {
	import: function(args,chain,optns) {
	    return chain('container',optns).then(function(der) {
		return crypto.subtle.importKey('spki',der,{name:'RSA-OAEP', hash:'SHA-1'},true,['encrypt']).catch(function(e) {
		    return crypto.subtle.importKey('pkcs8',der,{name:'RSA-OAEP', hash:'SHA-1'},true,['decrypt']);
		});
	    });
	}
    },
    PKCS5: {
	import: function(args,chain,optns) {
	    var f = chain;
	    for (var i = args.length - 1; i >= 0; i--) f = (function(obj,fp) {
		if (obj[0] instanceof libVES.Util.OID) return function(call,optns) {
		    return obj[0].object().then(function(m) {
			return m[call](obj[1],fp,optns);
		    });
		};
		else return fp;
	    })(args[i],f);
	    return f('import',optns).then(function(der) {
		return crypto.subtle.importKey('pkcs8',der,{name:'RSA-OAEP', hash:'SHA-1'},true,['decrypt']);
	    }).catch(function(e) {
		throw new libVES.Error('InvalidKey',"Cannot import the private key (Invalid VESkey?)");
	    });
	},
	export: function(chain,optns) {
	    var args = [];
	    var f = chain;
	    if (!optns || !(optns.members instanceof Array)) throw new libVES.Error('Internal','PKCS#5: optns.members must be an array');
	    for (var i = optns.members.length - 1; i >= 0; i--) f = (function(obj,fp,idx) {
		return function(call,optns) {
		    return obj[call](fp,optns).then(function(v) {
			if (call == 'export') args[idx] = v;
			return v;
		    });
		};
	    })(optns.members[i],f,i);
	    return f('export',optns).then(function() {
		return [new libVES.Util.OID('1.2.840.113549.1.5.13'), args];
	    });
	}
    },
    PBKDF2: {
	deriveKey: function(args,pwd,algo) {
	    return crypto.subtle.importKey('raw',libVES.Util.StringToByteArray(pwd),'PBKDF2',false,['deriveKey']).then(function(k) {
		return crypto.subtle.deriveKey({name:'PBKDF2', salt:args[0], iterations:args[1], hash: 'SHA-1'},k,algo,true,['encrypt','decrypt']);
	    });
	},
	import: function(args,chain,optns) {
	    if (!optns || !optns.password) throw new libVES.Error('InvalidKey',"VESkey is not supplied");
	    var pwd = (typeof(optns.password) == 'function') ? optns.password() : optns.password;
	    return chain('info').then(function(info) {
		return libVES.Util.PBKDF2.deriveKey(args,pwd,info.algorithm).then(function(k) {
		    return chain('import',{key: k});
		});
	    });
	},
	export: function(chain,optns) {
	    if (!optns || !optns.password) throw new libVES.Error('InvalidKey',"VESkey is not supplied");
	    var pwd = (typeof(optns.password) == 'function') ? optns.password() : optns.password;
	    var args = [new Uint8Array(8),((optns && optns.KDF && optns.KDF.iterations) || 2048)];
	    crypto.getRandomValues(args[0]);
	    return chain('info').then(function(info) {
		return libVES.Util.PBKDF2.deriveKey(args,pwd,info.algorithm).then(function(k) {
		    optns.key = k;
		    return chain('export',optns).then(function() {
			return [new libVES.Util.OID('1.2.840.113549.1.5.12'), args];
		    });
		});
	    });
	}
    },
    Hash: {
	SHA256: function(buf) {
	    return crypto.subtle.digest('SHA-256',buf);
	}
    }
};

libVES.Util.OID.prototype = {
    object: function() {
	var o = libVES.Util.OID[this.value];
	if (!o) throw new libVES.Error('Internal',"Unknown object identifier: " + this.value);
	return o();
    },
    getBuffer: function() {
	var oid = this.value.split(/\./).map(function(v) { return Number(v); });
	var rs = [oid[0] * 40 + oid[1]];
	for (var i = 2; i < oid.length; i++) {
	    var n = oid[i];
	    var v = [n & 0x7f];
	    n >>= 7;
	    while (n) {
		v.push((n & 0x7f) | 0x80);
		n >>= 7;
	    }
	    for (var j = v.length - 1; j >= 0; j--) rs.push(v[j]);
	}
	return new Uint8Array(rs);
    },
    toString: function() {
	return this.value;
    }
}

libVES.Util.OID['1.2.840.113549.1.5.13'] = libVES.getModuleFunc(libVES,['Util','PKCS5']);
libVES.Util.OID['1.2.840.113549.1.5.12'] = libVES.getModuleFunc(libVES,['Util','PBKDF2']);
libVES.Util.OID['2.16.840.1.101.3.4.1.42'] = libVES.getModuleFunc(libVES,['Cipher','AES256CBC']);
libVES.Util.OID['1.2.840.113549.1.1.1'] = libVES.getModuleFunc(libVES,['Util','PKCS1']);

libVES.Math = {
    pad: function(a,n) {
	if (isNaN(n)) n = 0;
	if (typeof(a) == 'number') {
	    var rs = [0];
	    for (var i = 0;;) {
		var f = (rs[i] = a & 0xff) & 0x80;
		a >>= 8;
		if (++i >= n && a == (f ? -1 : 0)) break;
	    }
	    return new Uint8Array(rs);
	}
	if (a.length >= n) return a;
	var rs = new Uint8Array(n);
	rs.set(a,0);
	var sgn = (a.length > 0 && (a[a.length - 1] & 0x80)) ? 0xff : 0;
	rs.fill(sgn,a.length);
	return rs;
    },
    add: function(a,b) {
	var l = (a.length > b.length ? a.length : b.length) + 1;
	a = this.pad(a,l);
	b = this.pad(b,l);
	var rs = new Uint8Array(l);
	var c = 0;
	var hi = 0;
	var hs = 0;
	for (var i = 0; i < l; i++) {
	    var v = a[i] + b[i] + c;
	    if ((rs[i] = v & 0xff) != (hs ? 0xff : 0)) hi = i;
	    hs = v & 0x80;
	    c = v >> 8;
	}
	return rs.slice(0,hi + 1);
    },
    sub: function(a,b) {
	return this.add(a,this.neg(b));
    },
    neg: function(a) {
	if (typeof(a) == 'number') return -a;
	var rs = new Uint8Array(a.length + 1);
	var c = 1;
	var o = 0;
	for (var i = 0; i < a.length; i++) {
	    var v = (~a[i] & 0xff) + c;
	    o = c & (v == 0x80);
	    rs[i] = v & 0xff;
	    c = v >> 8;
	}
	if (o) rs[i++] = 0;
	return rs.slice(0,i);
    },
    cmp: function(a,b) {
	var l = a.length > b.length ? a.length : b.length;
	a = this.pad(a,l);
	b = this.pad(b,l);
	var f = true;
	for (var i = l - 1; i >= 0; i--) {
	    if (f) {
		if ((a[i] ^ b[i]) & 0x80) return ((a[i] & 0x80) ? -1 : 1);
		f = false;
	    }
	    if (a[i] > b[i]) return 1;
	    if (a[i] < b[i]) return -1;
	}
	return 0;
    },
    isNeg: function(a) {
	if (typeof(a) == 'number') return a < 0;
	return a.length && (a[a.length - 1] & 0x80);
    },
    isZero: function(a) {
	if (typeof(a) == 'number') return a == 0;
	for (var i = 0; i < a.length; i++) if (a[i]) return false;
	return true;
    },
    mul: function(a,b) {
	var neg = false;
	if (this.isNeg(a)) {
	    neg = true;
	    a = this.neg(a);
	} else a = new Uint8Array(a);
	var int = typeof(b) == 'number';
	if (this.isNeg(b)) {
	    neg = !neg;
	    b = this.neg(b);
	} else if (!int) b = new Uint8Array(b);
	var sh_a = new libVES.Math.Shifter(a);
	if (!int) var sh_b = new libVES.Math.Shifter(b);
	var rs = this.pad(0,1);
	while (true) {
	    if ((int ? b : b[0]) & 0x01) rs = this.add(rs,a);
	    b = int ? b >> 1 : sh_b.shr();
	    if (this.isZero(b)) break;
	    a = sh_a.shl();
	}
	return neg ? this.neg(rs) : rs;
    },
    div_qr: function(a,b) {
	var neg = false;
	if (this.isNeg(a)) {
	    neg = true;
	    a = this.neg(a);
	} else a = new Uint8Array(a);
	if (typeof(b) == 'number') b = this.pad(b);
	if (this.isNeg(b)) {
	    neg = !neg;
	    b = this.neg(b);
	} else b = new Uint8Array(b);
	for (var l = b.length; l > 0 && !b[l - 1]; l--);
	if (!l) return null;
	var sh_b = new libVES.Math.Shifter(b);
	var q;
	for (var sh = (a.length - l + 1) * 8; sh >= 0; sh--) {
	    var d = sh_b.get(sh);
	    if (this.cmp(a,d) >= 0) {
		a = this.sub(a,d);
		if (!q) {
		    q = new Uint8Array(((sh + 1) >> 3) + 1);
		    q.fill(0);
		}
		q[sh >> 3] |= 1 << (sh & 7);
	    }
	}
	if (!q) q = new Uint8Array([0]);
	return {q: neg ? this.neg(q) : q, r: neg ? this.neg(a) : a};
    },
    div: function(a,b) {
	return this.div_qr(a,b).q;
    },
    mulv: function(v1,v2) {
	if (v1.length != v2.length) throw new libVES.Error('Internal','mulv: vectors have different size');
	var rs = this.pad(0);
	for (var i = 0; i < v1.length; i++) rs = this.add(rs,this.mul(v1[i],v2[i]));
	return rs;
    },
    matrixReduce: function(matrix) {
	var m = [];
	for (var i = 0; i < matrix.length; i++) {
	    m[i] = [];
	    for (var j = 0; j < matrix[i].length; j++) m[i][j] = matrix[i][j];
	}
	for (var i = 0; i < m.length; i++) {
	    var q = m[i][i];
	    for (var ii = 0; ii < m.length; ii++) if (ii != i) {
		var p = m[ii][i];
		for (var j = 0; j < m[i].length; j++) m[ii][j] = this.sub(this.mul(m[ii][j],q),this.mul(m[i][j],p));
	    }
	}
	return m;
    },
    
    hexChars: '0123456789abcdef',
    hex: function(a) {
	var rs = [];
	for (var i = 0; i < a.length; i++) rs[a.length - i - 1] = this.hexChars[a[i] >> 4] + this.hexChars[a[i] & 0x0f];
	return rs.join('');
    },
    Shifter: function(a) {
	this.shifts = [a];
	this.offs = 0;
    }
};
libVES.Math.Shifter.prototype = {
    get: function(offs) {
	var self = this;
	var sh = offs & 7;
	var bs = offs >> 3;
	var shf;
	var v = (shf = function(sh) {
	    if (!self.shifts[sh]) {
		if (sh <= 0) throw new libVES.Error('Internal','Shifter offset is not available');
		var prev = shf(sh - 1);
		self.shifts[sh] = libVES.Math.add(prev,prev);
	    }
	    return self.shifts[sh];
	})(sh);
	if (bs <= 0) return v.length + bs >= 1 ? v.slice(-bs) : libVES.Math.pad(v[v.length - 1] & 0x80 ? -1 : 1);
	var rs = new Uint8Array(v.length + bs);
	rs.fill(0,0,bs);
	rs.set(v,bs);
	return rs;
    },
    shl: function() {
	return this.get(++this.offs);
    },
    shr: function() {
	return this.get(--this.offs);
    }
};

libVES.Object = function(data) {
    for (var k in data) this[k] = data[k];
    if (window.Trigger) this.trigger = Trigger.resolve(this);
};

libVES.Object.prototype = {
    fieldList: {id: true},
    fieldExtra: {},
    fieldClass: {},
    fieldSets: [],
    init: function(data,VES,refs) {
	this.VES = VES;
	this.fieldUpdate = data.id ? {id: true} : {};
	this.setFields(data,data.id == null);
	if (refs) for (var k in refs) this[k] = Promise.resolve(refs[k]);
    },
    setFields: function(data,up) {
	var self = this;
	var chg = false;
	for (var k in data) {
	    if (up === undefined || up) this.fieldUpdate[k] = true;
	    if (this[k] instanceof Promise) {
		this[k] = undefined;
		chg = true;
	    }
	    if (this[k] === undefined) this[k] = Promise.resolve(data[k]).then((function(k) {
		return function(v) {
		    var clsf;
		    if (self.fieldClass[k]) return (clsf = function(v) {
			if (v instanceof libVES.Object) return v;
			else if (v instanceof Array) return v.map(function(vv) { return clsf(vv); });
			else return new (self.fieldClass[k])(v,self.VES);
		    })(v);
		    return v;
		};
	    })(k));
	    else return Promise.reject(new libVES.Error('Internal',"Unknown field: " + k));
	}
	if (chg && self.trigger) self.trigger.resolve(self);
	return Promise.resolve(self);
    },
    setField: function(fld,val,upd) {
	var flds = {};
	flds[fld] = val;
	return this.setFields(flds,upd).then(function(self) {
	    return self[fld];
	});
    },
    getField: function(fld,fldlst,force) {
	var self = this;
	if (!this[fld] || force) {
	    var flds = {};
	    for (var i = 0; i < this.fieldSets.length; i++) if (this.fieldSets[i][fld]) {
		for (var k in this.fieldSets[i]) flds[k] = this.fieldSets[i][k];
		break;
	    }
	    if (fldlst) flds[fld] = fldlst;
	    if (!flds[fld]) {
		var cls = self.fieldClass[fld];
		flds[fld] = cls ? cls.prototype.fieldList : true;
	    }
	    this.loadFields(flds,force);
	}
	return this[fld];
    },
    loadFields: function(flds,force,optns) {
	var self = this;
	var req = this.id ? this.id.then(function(id) {  return self.VES.get(self.apiUri + '/' + id,flds,optns); }) : self.postData().then(function(data) {
	    data['$op'] = 'fetch';
	    return self.VES.post(self.apiUri,data,flds,optns);
	}).then(function(data) {
	    if (data.id) {
		self.id = Promise.resolve(data.id);
		self.fieldUpdate = {id: true};
	    }
	    return data;
	});
	for (var k in flds) if (force || this[k] === undefined) {
	    this[k] = req.then((function(fld) {
		var cls = self.fieldClass[fld];
		return function(data) {
		    if (cls && data[fld]) return ((data[fld] instanceof Array) ? data[fld].map(function(v) {
			return new cls(v,self.VES);
		    }) : new cls(data[fld],self.VES));
		    return data[fld];
		};
	    })(k));
	}
    },
    reset: function() {
	for (var k in this.fieldClass) delete(this[k]);
	return Promise.resolve();
    },
    getId: function() {
	return this.id ? Promise.resolve(this.id) : this.getField('id');
    },
    postData: function(fields,refs,parent) {
	if (refs && parent) for (var k in refs) if (refs[k] === this) return Promise.resolve({"$ref": k});
	var data = {};
	var prs = [];
	var self = this;
	var fmt = function(v,a) {
	    if (v instanceof libVES.Object) return v.postData(a,refs,self);
	    else if (v instanceof Array) return Promise.all(v.map(function(vv,i) {
		return fmt(vv,a);
	    }));
	    else return v;
	};
	var pf = function(k,pr,a) {
	    if (!(pr instanceof Promise)) pr = fmt(pr,a);
	    if (pr instanceof Promise) prs.push(pr.then(function(pr2) {
		return Promise.resolve(fmt(pr2,a)).then(function(v) {
		    data[k] = v;
		});
	    }));
	    else data[k] = pr;
	};
	if (!(fields instanceof Object)) fields = this.fieldUpdate;
	if (fields) for (var k in fields) if (this[k] !== undefined) pf(k,this[k],fields[k]);
	return Promise.all(prs).then(function() {
	    return data;
	});
    },
    post: function(fields,rfields,optns) {
	var self = this;
	if (!optns) optns = {};
	if (optns.retry == null) optns.retry = 3;
	return this.postData(fields,optns.refs).then(function(d) {
	    var op = {
		onerror: function(errors) {
		    if (optns.retry-- <= 0) throw new libVES.Error('RequestFailed',"Retry count exceeded",{errors: errors});
		    var rs = [];
		    for (var i = 0; i < errors.length; i++) {
			if (!errors[i].path) throw errors[i];
			rs.push(self.resolveErrorPath(errors[i]));
		    }
		    return Promise.all(rs).then(function() {
			return self.post(fields,rfields,optns);
		    });
		}
	    };
	    for (var k in optns) op[k] = optns[k];
	    return self.VES.post(self.apiUri,d,rfields,op);
	});
    },
    resolveErrorPath: function(e,idx) {
	var self = this;
	if (!e.path) throw e;
	if (!idx) idx = 0;
	if (e.path.length == idx) return this.resolveError(e,null);
	var f = e.path[idx++];
	if (this[f] === undefined) throw new libVES.Error('BadPath',"Path not found: " + f,{error: e});
	return Promise.resolve(this[f]).then(function(v) {
	    if (v instanceof libVES.Object) return v.resolveErrorPath(e,idx);
	    else if ((e.path.length > idx) && (v instanceof Array)) {
		var i = e.path[idx++];
		if (v[i] === undefined) throw new libVES.Error('BadPath',"Path not found: " + i,{error: e});
		else if (v[i] instanceof libVES.Object) return v[i].resolveErrorPath(e,idx);
		else throw e;
	    } else return self.resolveError(e,f);
	});
    },
    resolveError: function(e,field) {
	throw e;
    }
};


libVES.User = function(data,VES,refs) {
    this.init(data,VES,refs);
};

libVES.VaultKey = function(data,VES,refs) {
    this.init(data,VES,refs);
};

libVES.VaultItem = function(data,VES,refs) {
    this.vaultEntryByKey = {};
    this.init(data,VES,refs);
};

libVES.External = function(data,VES,refs) {
    this.init(data,VES,refs);
};

libVES.Lockbox = function(data,VES,refs) {
    this.init(data,VES,refs);
};

libVES.File = function(data,VES,refs) {
    this.init(data,VES,refs);
};

libVES.User.prototype = new libVES.Object({
    apiUri: 'users',
    fieldList: {id: true, email: true, type: true, firstName: true, lastName: true},
    fieldExtra: {vaultKeys: true, activeVaultKeys: true, currentVaultKey: true},
    fieldClass: {vaultKeys: libVES.VaultKey, activeVaultKeys: libVES.VaultKey, currentVaultKey: libVES.VaultKey, shadowVaultKey: libVES.VaultKey, friendsVaultKeys: libVES.VaultKey},
    getEmail: function() {
	return this.getField('email');
    },
    getFirstName: function() {
	return this.getField('firstName');
    },
    getLastName: function() {
	return this.getField('lastName');
    },
    getFullName: function() {
	var self = this;
	return this.getFirstName().then(function(f) {
	    return self.getLastName().then(function(l) {
		return f ? (l ? f + ' ' + l : f) : l;
	    });
	});
    },
    getVaultKeys: function() {
	return this.getField('vaultKeys');
    },
    getActiveVaultKeys: function() {
	var self = this;
	if (!this.activeVaultKeys && (this.currentVaultKey || this.shadowVaultKey)) return this.getCurrentVaultKey().then(function(curr) {
	    return curr ? self.getShadowVaultKey().then(function(sh) {
		return sh ? [curr,sh] : [curr];
	    }) : [];
	});
	return this.getField('activeVaultKeys');
    },
    getFriendsVaultKeys: function() {
	return this.getField('friendsVaultKeys');
    },
    getCurrentVaultKey: function() {

	return this.getField('currentVaultKey');
    },
    getShadowVaultKey: function() {
	return this.getField('shadowVaultKey');
    },
    getExternals: function() {
	return this.getField('externals');
    },
    getExternalsByDomain: function() {
	return this.getExternals().then(function(ex) {
	    var rs = {};
	    for (var i = 0; i < ex.length; i++) (rs[ex[i].domain] || (rs[ex[i].domain] = [])).push(ex[i]);
	    return rs;
	});
    },
    unlock: function(veskey) {
	return this.getCurrentVaultKey().then(function(k) {
	    return k.unlock(veskey);
	});
    },
    lock: function(veskey) {
	if (this.currentVaultKey) return this.currentVaultKey.then(function(k) {
	    return k.lock();
	});
    },
});


libVES.VaultKey.prototype = new libVES.Object({
    apiUri: 'vaultKeys',
    fieldList: {id: true, algo: true, type: true, publicKey: true, privateKey: true},
    fieldClass: {user: libVES.User, vaultItems: libVES.VaultItem, externals: libVES.External, sharedKeys: libVES.VaultKey},
    fieldExtra: {user: true, vaultItems: true},
    fieldSets: [{vaultEntries: {id: true, encData: true, vaultItem: {id: true}}},{type: true, algo: true, publicKey: true}],
    getAlgo: function() {
	return this.getField('algo');
    },
    getType: function() {
	return this.getField('type');
    },
    getPublicKey: function() {
	return this.getField('publicKey');
    },
    getPrivateKey: function() {
	return this.getField('privateKey');
    },
    getUnlockedPrivateKey: function() {
	var self = this;
	return this.unlock().then(function(k) {
	    return self.engine().then(function(e) {
		return e.export(k,{opentext:true});
	    });
	});
    },
    getVaultItems: function() {
	return this.getField('vaultItems');
    },
    getSharedKeys: function() {
	return this.getField('sharedKeys');
    },
    getExternals: function() {
	return this.getField('externals');
    },
    getUser: function() {
	return this.getField('user');
    },
    getVaultItems: function() {
	return this.getField('vaultItems');
    },
    resolveVESkey: function(veskey) {
	if (veskey) return Promise.resolve(veskey);
	var self = this;
	return self.getType().then(function(t) {
	    switch (t) {
	    case 'secondary':
	    case 'temp':
		return self.getVaultItems().then(function(vis) {
		    var f = function(vis) {
			if (!vis.length) throw new libVES.Error('InvalidKey','Cannot unlock the secondary key');
			return vis[0].getType().then(function(t) {
			    switch (t) {
				case 'password': return vis[0].get();
				default: return f(vis.slice(1));
			    }
			});
		    };
		    return f(vis);
		});
	    default: throw new libVES.Error('InvalidKey','Cannot unlock the key',{vaultKey: self});
	    }
	});
    },
    unlock: function(veskey) {
	var self = this;
	if (self.wcPriv) return self.wcPriv;
	return self.getId().then(function(id) {
	    if (!self.VES.unlockedKeys[id]) return self.VES.unlockedKeys[id] = self.engine().then(function(m) {
		return self.resolveVESkey(veskey).then(function(v) {
		    return self.getPrivateKey().then(function(prk) {
			return m.import(prk,{password: v});
		    }).catch(function(e) {
			if (e.code != 'Legacy' || !self.VES.unlockLegacyKey) throw e;
			delete(self.VES.unlockedKeys[id]);
			return self.VES.unlockLegacyKey(self,veskey);
		    });
		});
	    });
	    else return self.VES.unlockedKeys[id].catch(function(e) {
		self.VES.unlockedKeys[id] = null;
		return self.unlock(veskey);
	    });
	});
    },
    lock: function() {
	var self = this;
	return this.getId().then(function(id) {
	    delete(self.wcPriv);
	    delete(self.VES.unlockedKeys[id]);
	    return true;
	});
    },
    getPublicCryptoKey: function() {
	if (!this.wcPub) {
	    var self = this;
	    self.wcPub = this.engine().then(function(e) {
		return self.getPublicKey().then(function(pubk) {
		    return e.import(pubk);
		});
	    });
	}
	return this.wcPub;
    },
    engine: function() {
	return this.getAlgo().then(function(algo) {
	    return libVES.getModule(libVES.Algo,algo);
	});
    },
    generate: function(veskey,optns) {
	var self = this;
	var wc = optns && optns.privateKey ? libVES.Algo.acquire(optns.privateKey).then(function(wc) {
	    self.setField('algo',wc.engine.tag);
	    if (!wc.privateKey) throw new libVES.Error('InvalidValue','Private key expected');
	    return wc;
	}) : this.engine().then(function(e) {
	    return e.generate(optns).then(function(ks) {
		ks.engine = e;
		return ks;
	    });
	});
	return Promise.resolve(veskey).then(function(v) {
	    self.wcPub = wc.then(function(ks) {
		return ks.publicKey;
	    });
	    self.setField('publicKey',wc.then(function(ks) {
		return ks.engine.export(ks.publicKey);
	    }));
	    self.wcPriv = wc.then(function(ks) {
		return ks.privateKey;
	    });
	    self.setField('privateKey',wc.then(function(ks) {
		return ks.engine.export(ks.privateKey,{password:v});
	    }));
	    return self;
	});
    },
    encrypt: function(ptxt) {
	var self = this;
	return self.engine().then(function(e) {
	    return self.getPublicCryptoKey().then(function(k) {
		return e.encrypt(k,ptxt).then(function(ctxt) {
		    return libVES.Util.ByteArrayToB64(ctxt);
		});
	    });
	});
    },
    decrypt: function(ctxt) {
	var self = this;
	return self.engine().then(function(e) {
	    return self.unlock().then(function(k) {
		return e.decrypt(k,libVES.Util.B64ToByteArray(ctxt));
	    });
	});
    },
    getVaultEntries: function(details) {
	return this.getField('vaultEntries',{id: true, encData: true, vaultItem: (typeof(details) == 'object' ? details : ((details != null && !details) ? true : {id: true, type: true, meta: true}))});
    },
    rekeyFrom: function(key,veskey) {
	var self = this;
	var old_vis = {};
	return (self.vaultEntries ? self.vaultEntries.then(function(old_ves) {
	    return old_ves.map(function(ve,i) {
		old_vis[ve.vaultItem.id] = true;
	    });
	}) : Promise.resolve(null)).then(function() {
	    return self.setField('vaultEntries',key.unlock(veskey).then(function() {
		return key.getVaultEntries().then(function(ves) {
		    return Promise.all(ves.map(function(ve) {
			return old_vis[ve.vaultItem.id] ? Promise.resolve({
			    vaultItem: {id: ve.vaultItem.id}
			}) : key.decrypt(ve.encData).then(function(ptxt) {
			    return self.encrypt(ptxt).then(function(ctxt) {
				return {
				    vaultItem: {id: ve.vaultItem.id},
				    encData: ctxt
				};
			    });
			}).catch(function(e) {
			    return {
				vaultItem: {id: ve.vaultItem.id},
				"$op": "ignore"
			    };
			});
		    }));
		});
	    }));
	}).then(function() {
	    return self;
	});
    },
    rekey: function() {
	var self = this;
	return self.getUser().then(function(user) {
	    return self.getExternals().then(function(exts) {
		return (exts && exts.length ? exts[0].toRef().then(function(ext) {
		    ext.user = user;
		    return ext;
		}) : Promise.resolve(user)).then(function(ref) {
		    return self.VES.usersToKeys([ref]);
		});
	    }).then(function(keys) {
		return Promise.all(keys.map(function(key,i) {
		    return key.getVaultEntries().catch(function(e) {
			if (e.code != 'NotFound') throw e;
			key.vaultEntries = undefined;
		    }).then(function() {
			return key.rekeyFrom(self);
		    });
		}));
	    }).then(function(keys) {
		return user.setField('vaultKeys',keys).then(function() {
		    return user.post(null,{vaultEntries: true},{refs: {'#/': user}}).then(function(data) {
			self.setFields(data,false);
			return self;
		    });
		});
	    });
	});
    },
    getRecovery: function() {
	var self = this;
	return self.getType().then(function(t) {
	    switch (t) {
		case 'shadow': case 'recovery':
		    return new libVES.Recovery(self);
		default: throw new libVES.Error('InvalidValue','Recovery is not applicable for VaultKey type ' + t);
	    }
	});
    },
    getSessionToken: function() {
	var self = this;
	return this.getField('encSessionToken').then(function(tk) {
	    return self.decrypt(tk).then(function(b) {
		return libVES.Util.ByteArrayToString(b);
	    });
	});
    },
    reshareVESkey: function(veskey) {
	var self = this;
	return self.getVaultItems().then(function(vaultItems) {
	    return self.getUser().then(function(user) {
		return Promise.all(vaultItems.map(function(vaultItem,i) {
		    return vaultItem.getType().then(function(t) {
			if (t == 'password') return vaultItem.reshareWith([user],veskey);
		    });
		}));
	    });
	});
    },
    matchVaults: function(vaultKeys) {
	return Promise.resolve(false);
    }
});

libVES.VaultItem.prototype = new libVES.Object({
    apiUri: 'vaultItems',
    fieldList: {id: true},
    fieldClass: {vaultKey: libVES.VaultKey, file: libVES.File},
    fieldSets: [{type: true, meta: true},{vaultEntries: {id: true, encData: true, vaultKey: {id: true}}},{vaultKey: true, file: true, lockbox: true}],
    defaultCipher: 'AES256',
    getRaw: function() {
	var self = this;
	return self.VES.getVaultKeysById().then(function(vaultKeys) {
	    var f = function(vaultEntries) {
	        var i = 0;
		var fn = function() {
		    for (; i < vaultEntries.length; i++) {
			var k,d;
			if ((d = vaultEntries[i].encData) != null && (k = vaultKeys[vaultEntries[i].vaultKey.id])) {
			    i++;
			    return k.decrypt(d).catch(fn);
			}
		    }
		    return Promise.reject(new libVES.Error('Invalid Key',"No unlocked key to decrypt the item",{vaultItem: self}));
		};
		return fn();
	    };
	    var vaultEntries = [];
	    if (self.vaultEntryByKey) for (var k in self.vaultEntryByKey) vaultEntries.push(self.vaultEntryByKey[k]);
	    return f(vaultEntries).catch(function() {
		return self.getVaultEntries().then(f);
	    });
	});
    },
    get: function() {
	var self = this;
	return this.getRaw().then(function(buf) {
	    return self.parse(buf);
	});
    },
    getType: function() {
	return this.getField('type');
    },
    getMeta: function() {
	return this.getField('meta');
    },
    getVaultEntries: function() {
	var self = this;
	return this.getField('vaultEntries').then(function(ves) {
	    for (var i = 0; i < ves.length; i++) self.vaultEntryByKey[ves[i].vaultKey.id] = ves[i];
	    return ves;
	});
    },
    getVaultKey: function() {
	return this.getField('vaultKey');
    },
    getFile: function() {
	return this.getField('file');
    },
    getLockbox: function() {
	return this.getField('lockbox');
    },
    parse: function(buf) {
	var self = this;
	return this.getType().then(function(type) {
	    return libVES.getModule(libVES.VaultItem.Type,type).then(function(m) {
		return m.parse.call(self,buf);
	    }).catch(function(e) {
		return new Uint8Array(buf);
	    });
	});
    },
    build: function(data) {
	var self = this;
	return this.getType().then(function(type) {
	    return libVES.getModule(libVES.VaultItem.Type,type).then(function(m) {
		return m.build.call(self,data);
	    });
	});
    },
    shareWith: function(usrs,val,save) {
	var self = this;
	return (val == null ? self.getRaw() : self.build(val)).then(function(v) {
	    return self.VES.usersToKeys(usrs).then(function(ks) {
		return (val == null ? self.getVaultEntries().then(function(ves) {
		    var k_ves = {};
		    var k_used = {};
		    for (var j = 0; j < ves.length; j++) k_ves[ves[j].vaultKey.id] = ves[j];
		    return Promise.all(ks.map(function(k,j) {
			return k.getId().then(function(k_id) {
			    k_used[k_id] = true;
			    return k_ves[k_id];
			}).catch(function(){});
		    })).then(function(old_ves) {
			for (var k_id in k_ves) if (!k_used[k_id]) old_ves.push(k_ves[k_id]);
			return old_ves;
		    });
		}) : Promise.resolve([])).then(function(old_ves) {
		    var new_ves = [];
		    var set_ves = [];
		    return Promise.all(ks.map(function(k,j) {
			return new_ves[j] = (old_ves[j] || k.encrypt(v).then(function(ctext) {
			    return k.postData(null,libVES.Object._refs).then(function(pd) {
				return set_ves.push({vaultKey: pd, encData: ctext});
			    });
			}));
		    })).then(function() {
			return Promise.all(old_ves.slice(ks.length).map(function(ve,j) {
			    return (new libVES.VaultKey(ve.vaultKey,self.VES)).matchVaults(ks).then(function(f) {
				if (f === false) set_ves.push({vaultKey: ve.vaultKey, '$op': 'delete'});
			    });
			}));
		    }).then(function() {
			if (!set_ves.length) return save = false;
			return self.setField('vaultEntries',set_ves);
		    });
		});
	    });
	}).then(function() {
	    if (save || save === undefined) return self.post().then(function() {
		return self;
	    });
	    return self;
	});
    },
    reshareWith: function(share,val,save) {
	var self = this;
	return self.VES.usersToKeys(share).then(function(new_ks) {
	    return self.getShareVaultKeys().then(function(curr_ks) {
		return Promise.all(curr_ks.map(function(k,i) {
		    return k.getId();
		})).then(function(curr_ids) {
		    var m_curr_ks = {};
		    for (var i = 0; i < curr_ks.length; i++) m_curr_ks[curr_ids[i]] = curr_ks[i];
		    return Promise.all(new_ks.map(function(k,i) {
			return k.getId();
		    })).then(function(new_ids) {
			for (var i = 0; i < new_ks.length; i++) if (!m_curr_ks[new_ids[i]]) curr_ks.push(m_curr_ks[new_ids[i]] = new_ks[i]);
			return self.shareWith(curr_ks,val,save);
		    });
		});
	    });
	});
    },
    getShareVaultKeys: function() {
	var self = this;
	return this.getVaultEntries().then(function(vaultEntries) {
	    return vaultEntries.map(function(e,i) {
		return new libVES.VaultKey(e.vaultKey,self.VES);
	    });
	});
    },
    getShareList: function() {
	var self = this;
	return this.getShareVaultKeys().then(function(vaultKeys) {
	    var uids = {};
	    return Promise.all(vaultKeys.map(function(e,i) {
		return e.getExternals().then(function(exts) {
		    if (exts && exts.length) return exts[0];
		    return e.getUser().then(function(u) {
			return u.getId().then(function(uid) {
			    if (uids[uid]) return null;
			    uids[uid] = true;
			    return u;
			});
		    });
		});
	    })).then(function(lst) {
		var rs = [];
		for (var i = 0; i < lst.length; i++) if (lst[i]) rs.push(lst[i]);
		return rs;
	    });
	});
    }
});
libVES.VaultItem.Type = {
    _detect: function(data) {
	if (typeof(data) == 'object') {
	    if (data instanceof libVES.Cipher) return 'file';
	    throw new libVES.Error('Internal','Unknown vault item data type');
	} else return 'string';
    },
    string: {
	parse: function(buf) {
	    return libVES.Util.ByteArrayToString(buf);
	},
	build: function(data) {
	    return libVES.Util.StringToByteArray(String(data));
	}
    },
    file: {
	parse: function(buf) {
	    var self = this;
	    return this.getMeta().then(function(meta) {
		var ci = libVES.Cipher[meta.a || self.defaultCipher];
		return new ci(new Uint8Array(buf));
	    });
	},
	build: function(data) {
	    if (!(data instanceof libVES.Cipher)) throw new libVES.Error('InvalidData',"Content of a VaultItem type 'file' must be libVES.Cipher");
	    return data.getSecret();
	}
    },
    secret: {
	parse: function(buf) {
	    var self = this;
	    return this.getMeta().then(function(meta) {
		return {value: buf, meta: meta};
	    });
	},
	build: function(data) {
	    this.setField('meta',data.meta);
	    return data.value;
	}
    }
};
libVES.VaultItem.Type.password = libVES.VaultItem.Type.string;

libVES.File.prototype = new libVES.Object({
    apiUri: 'files',
    fieldList: {id: true},
    fieldClass: {externals: libVES.External},
    getExternals: function() {
	return this.getField('externals');
    }
});

libVES.External.prototype = new libVES.Object({
    apiUri: 'externals',
    fieldList: {id: true},
    getDomain: function() {
	return this.getField('domain');
    },
    getExternalId: function() {
	return this.getField('externalId');
    },
    toRef: function() {
	return Promise.all([this.getDomain(),this.getExternalId()]).then(function(r) {
	    return {domain: r[0], externalId: r[1]};
	});
    }
});

libVES.Algo = {
    RSA: {
	tag: 'RSA',
	decrypt: function(k,buf) {
	    return crypto.subtle.decrypt('RSA-OAEP',k,buf);
	},
	encrypt: function(k,buf) {
	    return crypto.subtle.encrypt('RSA-OAEP',k,buf);
	},
	import: function(data,optns) {
	    return libVES.Util.PEM.import(data,optns);
	},
	export: function(data,optns) {
	    if (data instanceof CryptoKey) switch (data.type) {
		case 'private':
		    var ops = {};
		    for (var k in optns) ops[k] = optns[k];
		    if (!ops.members) ops.members = [
			libVES.getModule(libVES.Util,'PBKDF2'),
			libVES.getModule(libVES.Cipher,'AES256CBC')
		    ];
		    return Promise.all(ops.members).then(function(ms) {
			ops.members = ms;
			return crypto.subtle.exportKey('pkcs8',data).then(function(der) {
			    ops.content = der;
			    var rec = [];
			    if (ops.password) return libVES.Util.PKCS5.export(function(call,optns) {
				rec[1] = optns.content;
				return Promise.resolve();
			    },ops).then(function(data) {
				rec[0] = data;
				return libVES.Util.PEM.encode(libVES.Util.ASN1.encode([rec]),'ENCRYPTED PRIVATE KEY');
			    });
			    else if (ops.opentext) return crypto.subtle.exportKey('pkcs8',data).then(function(der) {
				return libVES.Util.PEM.encode(der,'PRIVATE KEY');
			    });
			    else throw libVES.Error('Internal','No password for key export (opentext=true to export without password?)');
			});
		    });
		case 'public':
		    return crypto.subtle.exportKey('spki',data).then(function(der) {
			return libVES.Util.PEM.encode(der,'PUBLIC KEY');
		    });
	    }
	    throw new libVES.Error('Internal',"Unknown type of key object");
	},
	generate: function(optns) {
	    var op = {name:'RSA-OAEP', modulusLength:2048, publicExponent:new Uint8Array([1,0,1]), hash:'SHA-1'};
	    if (optns) for (var k in optns) op[k] = optns[k];
	    return crypto.subtle.generateKey(op,true,['decrypt','encrypt']);
	},
	getPublic: function(priv) {
	    return crypto.subtle.exportKey('jwk',priv).then(function(k) {
		return crypto.subtle.importKey('jwk',{
		    alg: k.alg,
		    e: k.e,
		    ext: true,
		    key_ops: ['encrypt'],
		    kty: 'RSA',
		    n: k.n
		},{name:'RSA-OAEP',hash:'SHA-1'},true,['encrypt']);
	    });
	}
	
    },
    RSA_PKCS1_15: {
	tag: 'RSA_PKCS1_15',
	import: function(data,optns) {
	    throw new libVES.Error('Legacy','RSA with PKCS#1 1.5 padding is not supported');
	}
    },
    acquire: function(key,optns) {
	return Promise.resolve(key).then(function(k) {
	    if (k instanceof window.CryptoKey) return k;
	    else if (typeof(k) == 'object') {
		if (k.privateKey) return k.privateKey;
		else if (k.publicKey) return k.publicKey;
		else throw new libVES.Error('Internal','Unknown key format');
	    } else return libVES.Util.PEM.import(k,optns);
	}).then(function(k) {
	    switch (k.algorithm.name) {
		case 'RSA-OAEP': return libVES.getModule(libVES.Algo,'RSA').then(function(e) {
		    var rs = {engine: e};
		    switch (k.type) {
			case 'private':
			    rs.privateKey = k;
			    return e.getPublic(k).then(function(pubk) {
				rs.publicKey = pubk;
				return rs;
			    });
			case 'public':
			    rs.publicKey = k;
			    return rs;
			default: throw new libVES.Error('Internal','Unsupported key type: ' + k.type);
		    }
		});
		default: throw new libVES.Error('Internal','Unsupported key algorithm: ' + k.algorithm.name);
	    }
	});
    },
    toString: function() {
	return 'libVES.Algo';
    }
};

libVES.Cipher = function(data) {
    for (var k in data) this[k] = data[k];
};
libVES.Cipher.prototype = {
    init: function(secret) {
	if (!secret) {
	    secret = new Uint8Array(this.keySize + this.ivSize);
	    crypto.getRandomValues(secret);
	} else if (secret.length < this.keySize) throw new libVES.Error('Internal','Invalid cipher key data');
	this.key = this.buildKey(secret.slice(0,this.keySize));
	this.IV = Promise.resolve(secret.slice(0,this.keySize + this.ivSize).slice(-this.ivSize));
	try {
	    this.meta = JSON.parse(libVES.Util.ByteArrayToString(secret.slice(this.keySize + this.ivSize)));
	} catch(e) {
	    this.meta = {};
	}
    },
    getSecret: function() {
	var meta = null;
	if (this.meta) for (var k in this.meta) {
	    meta = libVES.Util.StringToByteArray(JSON.stringify(this.meta));
	    break;
	}
	var buf = new Uint8Array(this.keySize + this.ivSize + (meta ? meta.byteLength : 0));
	return Promise.all([this.key,this.IV]).then(function(data) {
	    return crypto.subtle.exportKey("raw",data[0]).then(function(key) {
		buf.set(new Uint8Array(key),0);
		buf.set(new Uint8Array(data[1]),key.byteLength);
		if (meta) buf.set(meta,key.byteLength + data[1].byteLength);
		return buf;
	    });
	});
    },
    buildKey: function(key) {
	if (!this.algo) return Promise.resolve(key);
	return crypto.subtle.importKey('raw',key,this.algo,true,['encrypt','decrypt']);
    },
    process: function(buf,final,callbk,chunkSize) {
	buf = new Uint8Array(buf);
	if (this.processBuf) {
	    var b = new Uint8Array(buf.byteLength + this.processBuf.byteLength);
	    b.set(this.processBuf,0);
	    b.set(buf,this.processBuf.byteLength);
	    buf = b;
	}
	var p = final ? buf.byteLength : (chunkSize ? Math.floor(buf.byteLength / chunkSize) * chunkSize : 0);
	this.processBuf = p < buf.byteLength ? buf.slice(p) : null;
	return p > 0 ? callbk(buf.slice(0,p)) : Promise.resolve(new Uint8Array(0));
    },
    encryptChunk: function(buf) {
	return Promise.all([this.key,this.algoInfo()]).then(function(info) {
	    return crypto.subtle.encrypt(info[1],info[0],buf);
	});
    },
    decryptChunk: function(buf) {
	return Promise.all([this.key,this.algoInfo()]).then(function(info) {
	    return crypto.subtle.decrypt(info[1],info[0],buf);
	});
    },
    algoInfo: function() {
	return Promise.resolve(this.algo);
    },
    encrypt: function(buf,final) {
	return this.process(buf,final,this.encryptChunk.bind(this),this.chunkSizeP);
    },
    decrypt: function(buf,final) {
	return this.process(buf,final,this.decryptChunk.bind(this),this.chunkSizeC);
    }
};

libVES.Cipher.AES256 = function(rec) {
    this.init(rec);
};

libVES.Cipher.AES256CBC = function(rec) {
    this.init(rec);
};

libVES.Cipher.AES256.prototype = new libVES.Cipher({
    keySize: 32,
    ivSize: 32
});

libVES.Cipher.AES256CBC.prototype = new libVES.Cipher({
    algo: 'AES-CBC',
    keySize: 32,
    ivSize: 16,
    algoInfo: function() {
	return this.IV.then(function(iv) {
	    return {name: 'AES-CBC', iv: iv};
	});
    }
});

libVES.Cipher.AES256CBC.import = function(args,chain,optns) {
    return chain('import').then(function(buf) {
	return crypto.subtle.decrypt({name: 'AES-CBC', iv: args},optns.key,buf);
    });
};
libVES.Cipher.AES256CBC.export = function(chain,optns) {
    var args = new Uint8Array(16);
    crypto.getRandomValues(args);
    return crypto.subtle.encrypt({name: 'AES-CBC', iv: args},optns.key,optns.content).then(function(buf) {
	return chain('export',{content: buf}).then(function() {
	    return [new libVES.Util.OID('2.16.840.1.101.3.4.1.42'), args];
	});
    });
};
libVES.Cipher.AES256CBC.info = function(chain,optns) {
    return Promise.resolve({algorithm: {name: 'AES-CBC', length: 256}});
};

libVES.Scramble = {
    RDX: function(x) {
	this.size = x;
    }
};
libVES.Scramble.RDX.prototype = {
    tag: 'RDX1.2',
    name: 'RDX 1.2 Shamir',
    getBases: function(n) {
	var rs = [];
	for (var b = 0; rs.length < n; b++) if (b % 4) rs.push(b);
	return rs;
    },
    getCv: function(b) {
	var rs = [libVES.Math.pad(1)];
	b = Number(b);
	for (var i = 1; i < this.size; i++) rs.push(libVES.Math.mul(rs[rs.length - 1], b));
	return rs;
    },
    toVector: function(sc) {
	var u = [sc];
	for (var i = 1; i < this.size; i++) {
	    u[i] = new Uint8Array(sc.length);
	    window.crypto.getRandomValues(u[i]);
	}
	var v = [];
	for (var i = 0; i < this.size - 1; i++) v[i] = (function(ui,ui1) {
	    var kbuf = new Uint8Array(32);
	    kbuf.set(ui1);
	    return crypto.subtle.importKey('raw',kbuf,'AES-CTR',true,['encrypt','decrypt']).then(function(k) {
		return crypto.subtle.encrypt({name: 'AES-CTR', counter: new Uint8Array(16).fill(0), length: 128},k,ui).then(function(ctx) {
		    var ctxt = new Uint8Array(ctx);
		    var rs = new Uint8Array(ctxt.length + 1);
		    rs.set(ctxt);
		    rs[ctxt.length] = 1;
		    return rs;
		});
	    });
	})(u[i],u[i + 1]);
	var vi = new Uint8Array(u[i].length + 1);
	vi.set(u[i]);
	vi[u[i].length] = 1;
	v[i] = Promise.resolve(vi);
	return Promise.all(v);
    },
    fromVector: function(vec) {
	var v = [];
	var rs = new Promise(function(resolve,reject) {
	    for (var i = 0; i < vec.length; i++) {
		if (vec[i][vec[i].length - 1] != 1) return reject(new libVES.Error('Internal','Invalid recovery vector'));
		v[i] = vec[i].slice(0,vec[i].length - 1);
	    }
	    resolve(v[v.length - 1]);
	});
	for (var i = v.length - 2; i >= 0; i--) rs = rs.then((function(vi) {
	    return function(vi1) {
		var kbuf = new Uint8Array(32);
		kbuf.set(vi1);
		return crypto.subtle.importKey('raw',kbuf,'AES-CTR',true,['encrypt','decrypt']).then(function(k) {
		    return crypto.subtle.decrypt({name: 'AES-CTR', counter: new Uint8Array(16).fill(0), length: 128},k,vi).then(function(v) {
			return new Uint8Array(v);
		    });
		});
	    };
	})(v[i]));
	return rs;
    },
    scramble: function(vec,b) {
	return libVES.Math.mulv(vec,this.getCv(b));
    },
    explode: function(sc,ct) {
	var self = this;
	return this.toVector(sc).then(function(v) {
	    var bs = self.getBases(ct);
	    var rs = [];
	    for (i = 0; i < bs.length; i++) rs[i] = {
		meta: {
		    v: self.tag,
		    n: self.size,
		    b: bs[i]
		},
		value: self.scramble(v,bs[i])
	    }
	    return rs;
	});
    },
    unscramble: function(tokens) {
	var matrix = [];
	var oidx = 0;
	for (var b in tokens) {
	    var row = this.getCv(b);
	    row.push(tokens[b]);
	    matrix.push(row);
	    if (matrix.length >= this.size) break;
	}
	if (matrix.length < this.size) throw new libVES.Error('Internal','Insufficient number of tokens to unscramble');
	return libVES.Math.matrixReduce(matrix).map(function(v,i) {
	    return libVES.Math.div(v[v.length - 1],v[i]);
	});
    },
    implode: function(tokens,then,okfn) {
	var self = this;
	var f = function(offs) {
	    var tks = {};
	    var tidx = 0;
	    var oidx = 0;
	    var more = false;
	    for (var i = 0; i < tokens.length; i++) {
		if (tidx >= self.size) {
		    more = true;
		    break;
		}
		if (tidx >= self.size - offs[oidx]) oidx++;
		else {
		    tks[tokens[i].meta.b] = tokens[i].value;
		    tidx++;
		}
	    }
	    var v = self.unscramble(tks);
	    var rs = self.fromVector(v);
	    if (then) rs = rs.then(then);
	    if (okfn) rs = rs.then(function(sc) {
		for (var i = 0; i < tokens.length; i++) okfn(tokens[i],!!tks[b] && !libVES.Math.cmp(tokens[i].value,self.scramble(v,tokens[i].meta.b)),i);
		return sc;
	    });
	    if (more) {
		var offs2 = offs.slice();
		var jmax = offs.length > 1 ? offs[offs.length - 2] : self.size;
		offs2[offs.length] = 0;
		for (var j = 1; j <= jmax; j++) rs = rs.catch((function(j) {
		    return function() {
			offs2[offs.length - 1] = j;
			return f(offs2);
		    };
		})(j));
	    }
	    return rs;
	};
	return f([0]);
    }
};
libVES.Scramble.algo = {
    'RDX1.2': libVES.Scramble.RDX
};

libVES.Recovery = function(vaultKey) {
    this.vaultKey = vaultKey;
};

libVES.Recovery.prototype = {
    getTokens: function() {
	if (this.tokens) return this.tokens;
	var self = this;
	return this.tokens = self.vaultKey.getType().then(function(t) {
	    switch (t) {
		case 'shadow': case 'recovery': return self.vaultKey.getField('vaultItems',{
		    id: true,
		    meta: true,
		    type: true,
		    vaultEntries: {
			encData: true,
			vaultKey: {
			    user: true,
			    type: true
			}
		    }
		},true).then(function(vis) {
		    var frnds = {};
		    var fn = function() {
			return self.vaultKey.getUser().then(function(my_u) {
			    return my_u.getId().then(function(my_uid) {
				return Promise.all(vis.map(function(vi) {
				    var frnd = {vaultItem: vi};
				    return Promise.all([
					vi.getVaultEntries().then(function(ves) {
					    return Promise.all(ves.map(function(ve) {
						return new libVES.VaultKey(ve.vaultKey,self.vaultKey.VES).getUser().then(function(u) {
						    return u.getId().then(function(uid) {
							if (uid == my_uid) frnd.assisted = true;
							else {
							    frnd.user = u;
							    frnds[uid] = frnd;
							}
						    });
						});
					    }));
					}),
					vi.get().then(function(data) {
					    frnd.meta = data.meta;
					    frnd.value = data.value;
					}).catch(function(e) {
					    return vi.getMeta().then(function(meta) {
						frnd.meta = meta;
					    });
					})
				    ]);
				}));
			    });
			}).then(function() {
			    var rs = [];
			    for (var id in frnds) rs.push(frnds[id]);
			    return rs;
			});
		    };
		    return self.vaultKey.trigger ? self.vaultKey.trigger.then(fn) : fn();
		});
		default: throw new libVES.Error('InvalidValue','Recovery info is applicable for key type shadow or recovery');
	    }
	});
    },
    requireOwner: function() {
	return Promise.all([this.vaultKey.getUser(),this.vaultKey.VES.me()]).then(function(usrs) {
	    return Promise.all(usrs.map(function(v,i) {
		return v.getId();
	    })).then(function(uids) {
		if (uids[0] == uids[1]) return true;
		throw new libVES.Error('InvalidValue','Not an owner of the VESrecovery');
	    });
	});
    },
    getFriends: function() {
	return this.getTokens().then(function(tkns) {
	    return tkns.map(function(v,i) {
		return v.user;
	    });
	});
    },
    getOptions: function() {
	return this.getTokens().then(function(tkns) {
	    return tkns.length ? tkns[0].meta : null;
	});
    },
    getFriendInfo: function(user) {
	var self = this;
	return this.getTokens().then(function(tkns) {
	    return Promise.all(tkns.map(function(v,i) {
		return v.user.getId();
	    })).then(function(uids) {
			return user.getId().then(function(uid) {
				for (var i = 0; i < uids.length; i++) if (uids[i] == uid) return tkns[i];
				throw new libVES.Error('InvalidValue','Not a friend: ' + uid);
			});
	    });
	});
    },
    getMyToken: function() {
	var self = this;
	return self.vaultKey.VES.me().then(function(me) {
	    return self.getFriendInfo(me);
	});
    },
    getFriendsTotal: function() {
	return this.getTokens().then(function(tkns) {
	    return tkns.length;
	});
    },
    getFriendsRequired: function() {
	return this.getTokens().then(function(tkns) {
	    return tkns[0].meta.n;
	});
    },
    getFriendsAssisted: function() {
	var self = this;
	return this.getTokens().then(function(tkns) {
	    return Promise.all(tkns.map(function(v,i) {
		return v.vaultItem.getVaultEntries().then(function() {
		    return v.vaultEntryByKey;
		});
	    })).then(function(ves) {
		return self.vaultKey.getUser().then(function(user) {
		    return user.getCurrentVaultKey().then(function(vk) {
			return vk.getId().then(function(vkid) {
			    var rs = 0;
			    for (var i = 0; i < ves.length; i++) if (ves[i]) if(ves[i][vkid]) rs++;
			    return rs;
			});
		    });
		});
	    });
	    return tkns[0].meta.n;
	});
    },
    getFriendsToGo: function() {
	var self = this;
	return self.getFriendsRequired().then(function(n) {
	    return self.getFriendsAssisted().then(function(a) {
		return a < n ? n - a : 0;
	    });
	});
    },
    _assist: function(assist) {
	var self = this;
	return this.getMyToken().then(function(tkn) {
	    if (!tkn) throw new libVES.Error('InvalidValue','No assistance available');
	    return self.vaultKey.getUser().then(function(user) {
		return tkn.vaultItem.shareWith(assist ? [tkn.user,user] : [tkn.user]).then(function() {
		    self.tokens = undefined;
		    self.vaultKey.vaultItems = undefined;
		    return true;
		});
	    });
	});
    },
    assist: function() {
	return this._assist(true);
    },
    revoke: function() {
	return this._assist(false);
    },
    unlock: function() {
	var self = this;
	return self.getTokens().then(function(tkns) {
	    var vtkns = [];
	    for (var i = 0; i < tkns.length; i++) if (tkns[i].value != null) vtkns.push(tkns[i]);
	    if (vtkns.length) return libVES.getModule(libVES,['Scramble','algo',vtkns[0].meta.v]).then(function(sc) {
		return new sc(vtkns[0].meta.n).implode(vtkns,function(secret) {
		    return self.vaultKey.unlock(secret);
		});
	    });
	});
    },
    _recover: function() {
	var self = this;
	return self.unlock().then(function() {
	    return self.vaultKey.rekey();
	});
    },
    recover: function() {
	var self = this;
	if (!this.recovery) this.recovery = this.requireOwner().then(function() {
	    return self._recover();
	});
	return this.recovery;
    }
};

libVES.Delegate = {
    html: '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:table;z-index:200000;">'
	+ '<div style="display:table-row;"><div style="display:table-cell;vertical-align:middle;text-align:center;">'
	+ '<div style="min-width:320px;max-width:640px;;background-color:white;margin: auto;padding: 30px;">'
	+ '<p>Use the VESvault popup window to grant access to the App Vault</p>'
	+ '<p class="VESvaultDelegateBlockerMsg" style="color: #bf7f00; font-style:italic;">&nbsp;</p>'
	+ '<p><a class="VESvaultDelegateRetryLnk" href="{$url}" target="VESvaultDelegate" onclick="return !libVES.Delegate.retryPopup(this.href,this)">Click here</a> if you can\'t see VESvault popup window</p>'
	+ '<p><a class="VESvaultDelegateCancelLnk" href="#" onclick="libVES.Delegate.cancel(); return false;">Cancel</a></p>'
	+ '</div></div></div></div>',
    htmlBlockerMsg: 'Looks like your browser is using a popup blocker...',
    name: 'VESvaultDelegate',
    login: function(VES,challenge,optns) {
	if (this.popup) return this.response || Promise.reject(new libVES.Error('InvalidValue','The delegate popup is already open'));
	if (!challenge) {
	} else try {
	    var info = document.location.search.match(/[\?\&]VESvaultDelegate=([^\&]+)/)[0];
	} catch(e) {}
	this.VES = VES;
	var self = this;
	return this.response = new Promise(function(resolve,reject) {
	    self.reject = reject;
	    self.resolve = resolve;
	    var url = VES.wwwUrl + 'session/delegate/' + escape(VES.app) + '/' + escape(VES.domain);
	    self.matchOrigin = (function(m) { return m ? m[0] : document.location.protocol + '//' + document.location.host; })(url.match(/^(https\:\/\/[^\/\?\#]+)/));
	    self.popup = document.createElement('DIV');
	    self.popup.innerHTML = self.html.replace('{$url}',url);
	    document.getElementsByTagName('BODY')[0].appendChild(self.popup);
	    self.retryPopupCalled = 0;
	    try {
		document.getElementsByClassName('VESvaultDelegateRetryLnk')[0].onclick = function() {
		    return !libVES.Delegate.retryPopup(this.href,this);
		};
		document.getElementsByClassName('VESvaultDelegateCancelLnk')[0].onclick = function() {
		    libVES.Delegate.cancel();
		    return false;
		};
	    } catch(e) {}
	    if (!self.openPopup(url)) try {
		document.getElementsByClassName('VESvaultDelegateBlockerMsg')[0].innerHTML = self.htmlBlockerMsg;
	    } catch(e) {
		window.alert(self.htmlBlockerMsg);
	    }
	    window.addEventListener('message',self.listener.bind(self));
	    window.addEventListener('focus',self.chkCancel.bind(self));
	    window.addEventListener('beforeunload',self.cancel.bind(self));
	    window.clearInterval(self.popupInterval);
	    self.popupInterval = window.setInterval(self.chkCancel.bind(self),1000);
	});
    },
    openPopup: function(url) {
	return this.popupWindow = window.open(url,this.name,"width=600,height=600,top=100,left=100");
    },
    retryPopup: function(url,href) {
	var f = this.retryPopupCalled;
	this.retryPopupCalled++;
	if (href && f > 1) href.target = '_blank';
	else if (this.popupWindow) try {
	    this.popupWindow.focus();
	} catch(e) {}
	return !f && this.openPopup(url);
    },
    listener: function(evnt) {
	if (this.popupWindow && evnt.origin == this.matchOrigin) try {
	    var msg = JSON.parse(evnt.data);
	    var VES = this.VES;
	    if (msg.externalId) {
		VES.externalId = msg.externalId;
		this.resolve(VES.unlock(msg.VESkey).then(function() {
		    return VES;
		}));
	    } else if (msg.token) {
		VES.token = msg.token;
		this.resolve(VES.getSecondaryKey({domain:VES.domain},true).then(function(vaultKey) {
		    return vaultKey.getExternals().then(function(externals) {
			return Promise.all(externals.map(function(ext,i) {
			    return ext.getDomain();
			})).then(function(domains) {
			    for (var i = 0; i < domains.length; i++) if (domains[i] == VES.domain) return externals[i].getExternalId();
			    throw new libVES.Error('Internal','No external id found for newly created secondary key');
			}).then(function(extId) {
			    VES.externalId = extId;
			    return VES;
			});
		    });
		}));
	    } else return;
	    this.close();
	    if (!evnt.source.closed) evnt.source.close();
	} catch(e) {}
    },
    close: function() {
	if (this.popup) {
	    if (this.popupWindow) {
		try {
		    this.popupWindow.close();
		} catch (e) {}
		this.popupWindow = null;
	    }
	    window.clearInterval(this.popupInterval);
	    this.popupInterval = null;
	    this.popup.parentNode.removeChild(this.popup);
	    this.popup = null;
	    return self.response;
	}
    },
    cancel: function() {
	var rs = this.close();
	if (this.response && this.reject) this.reject(new libVES.Error('Aborted','VESvault login is cancelled'));
	return rs;
    },
    chkCancel: function() {
	if (this.popupWindow && this.popupWindow.closed) this.cancel();
    }
};

module.exports = libVES;
