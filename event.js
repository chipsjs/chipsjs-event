let Event = {};

Event.event_map = {};

//something 参数;
Event.subscribe = function(event_name, callback) {
    if(typeof event_name !== "string" || typeof callback !== "function"){
        throw TypeError("Event::subscribe: args type error");
    }

    this.event_map[event_name].push(callback);
};

Event.subscribeOnce = function(event_name, callback) {
    if(typeof event_name !== "string" || typeof callback !== "function"){
        throw TypeError("Event::subscribe: args type error");
    }

    const fn = () => {
        this.unsubscribe(event_name, callback);

        callback();
    };

    this.event_map[event_name].push(fn);
};

Event.publish = function(event_name, args_arr) {
    if(typeof event_name !== "string"){
        throw TypeError("Event::publish: args type error");
    }

    if(this.event_map.hasOwnProperty(event_name)) {
        let callbacks = this.event_map[event_name];

        if(Array.isArray(args_arr)) {
            callbacks.apply(null, args_arr);
        } else {
            callbacks.apply(null);
        }
    }
};

Event.unsubscribe = function(event_name, fn) {
    if(typeof event_name !== "string"){
        throw TypeError("Event::unsubscribe: args type error");
    }

    let callbacks = this.event_map[event_name];
    for(let i = 0; i < callbacks.length ; i++ ) {
        if(callbacks[i] === fn) {
            this.event_map[event_name].slice(i, 1);
        }
    }
};

Event.unsubscribeAll = function(event_name) {
    if(typeof event_name !== "string"){
        throw TypeError("Event::unsubscribeAll: args type error");
    }

    delete this.event_map[event_name];
};

Event.clear = function() {
    this.event_map = [];
};

Event.show = function() {
    let events_str = "";
    for(let i in this.event_map) {
        events_str += i + ", ";
    }

    return events_str;
};

module.exports = {Event};